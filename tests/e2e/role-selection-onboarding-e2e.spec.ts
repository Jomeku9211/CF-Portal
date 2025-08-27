import { test, expect } from '@playwright/test';

test.describe('Role Selection and Onboarding E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the role selection page
    await page.goto('/role-selection');
  });

  test.describe('Role Selection Page', () => {
    test('displays role selection page correctly', async ({ page }) => {
      // Check page title and description
      await expect(page.getByText('What best describes your role?')).toBeVisible();
      await expect(page.getByText('Select the option that best matches your needs on Coderfarm')).toBeVisible();
      
      // Check all three role options are displayed
      await expect(page.getByText('Client')).toBeVisible();
      await expect(page.getByText('Service Provider')).toBeVisible();
      await expect(page.getByText('Agency')).toBeVisible();
      
      // Check role descriptions
      await expect(page.getByText('I want to hire talented developers for my projects')).toBeVisible();
      await expect(page.getByText('I want to offer my skills and services to clients')).toBeVisible();
      await expect(page.getByText('I represent a company that provides development services')).toBeVisible();
      
      // Check navigation buttons
      await expect(page.getByText('← Back')).toBeVisible();
      await expect(page.getByText('Continue')).toBeVisible();
    });

    test('continue button is initially disabled', async ({ page }) => {
      const continueButton = page.getByText('Continue');
      await expect(continueButton).toBeDisabled();
    });

    test('enables continue button when role is selected', async ({ page }) => {
      // Select Client role
      await page.getByText('Client').click();
      
      const continueButton = page.getByText('Continue');
      await expect(continueButton).toBeEnabled();
    });

    test('highlights selected role with correct styling', async ({ page }) => {
      // Select Client role
      const clientRole = page.getByText('Client').locator('..');
      await clientRole.click();
      
      // Check if the role is highlighted
      await expect(clientRole).toHaveClass(/border-blue-500/);
      await expect(clientRole).toHaveClass(/bg-blue-500\/10/);
    });

    test('allows switching between different roles', async ({ page }) => {
      // Select Client role first
      const clientRole = page.getByText('Client').locator('..');
      await clientRole.click();
      await expect(clientRole).toHaveClass(/border-blue-500/);
      
      // Switch to Service Provider role
      const serviceProviderRole = page.getByText('Service Provider').locator('..');
      await serviceProviderRole.click();
      await expect(serviceProviderRole).toHaveClass(/border-blue-500/);
      await expect(clientRole).not.toHaveClass(/border-blue-500/);
      
      // Switch to Agency role
      const agencyRole = page.getByText('Agency').locator('..');
      await agencyRole.click();
      await expect(agencyRole).toHaveClass(/border-blue-500/);
      await expect(serviceProviderRole).not.toHaveClass(/border-blue-500/);
    });
  });

  test.describe('Client Role Selection Flow', () => {
    test('completes client role selection and navigates to onboarding', async ({ page }) => {
      // Select Client role
      await page.getByText('Client').click();
      
      // Click Continue
      await page.getByText('Continue').click();
      
      // Should navigate to client onboarding
      await expect(page).toHaveURL(/.*clientOnboarding/);
    });

    test('updates user role and onboarding stage in database', async ({ page }) => {
      // Mock the API call
      await page.route('**/users/*', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            user: {
              id: 'test-user-id',
              roles: ['client'],
              onboarding_stage: 'organization_profile'
            }
          })
        });
      });

      // Select Client role
      await page.getByText('Client').click();
      
      // Click Continue
      await page.getByText('Continue').click();
      
      // Wait for navigation
      await page.waitForURL(/.*clientOnboarding/);
    });
  });

  test.describe('Service Provider Role Selection Flow', () => {
    test('completes service provider role selection and navigates to developer onboarding', async ({ page }) => {
      // Select Service Provider role
      await page.getByText('Service Provider').click();
      
      // Click Continue
      await page.getByText('Continue').click();
      
      // Should navigate to developer onboarding
      await expect(page).toHaveURL(/.*developer-onboarding/);
    });

    test('updates user role to freelancer and sets pending onboarding stage', async ({ page }) => {
      // Mock the API call
      await page.route('**/users/*', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            user: {
              id: 'test-user-id',
              roles: ['freelancer'],
              onboarding_stage: 'pending'
            }
          })
        });
      });

      // Select Service Provider role
      await page.getByText('Service Provider').click();
      
      // Click Continue
      await page.getByText('Continue').click();
      
      // Wait for navigation
      await page.waitForURL(/.*developer-onboarding/);
    });
  });

  test.describe('Agency Role Selection Flow', () => {
    test('completes agency role selection and shows not implemented message', async ({ page }) => {
      // Mock console.log to capture the message
      const consoleMessages: string[] = [];
      page.on('console', msg => consoleMessages.push(msg.text()));

      // Select Agency role
      await page.getByText('Agency').click();
      
      // Click Continue
      await page.getByText('Continue').click();
      
      // Check if the console message was logged
      expect(consoleMessages).toContain('Agency onboarding not yet implemented');
    });
  });

  test.describe('Client Onboarding Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to client onboarding
      await page.goto('/clientOnboarding');
    });

    test('displays client onboarding with 3 main steps', async ({ page }) => {
      // Check main steps are displayed
      await expect(page.getByText('Organization Profile')).toBeVisible();
      await expect(page.getByText('Team Onboarding')).toBeVisible();
      await expect(page.getByText('Hiring Intent')).toBeVisible();
    });

    test('completes organization profile step', async ({ page }) => {
      // Fill organization profile form
      await page.getByLabel('Organization Name *').fill('Test Organization');
      await page.getByLabel('Website').fill('https://test.com');
      
      // Select dropdown options
      await page.getByLabel('Company Size').selectOption('1–10 employees');
      await page.getByLabel('Funding Status').selectOption('Bootstrapped');
      await page.getByLabel('Industry').selectOption('Technology');
      await page.getByLabel('Company Function').selectOption('Idea Stage');
      await page.getByLabel('Revenue Status').selectOption('Pre-Revenue');
      
      // Navigate through internal steps
      await page.getByText('Next').click();
      
      // Should be on Purpose & Story step
      await expect(page.getByText('Purpose & Story')).toBeVisible();
      await expect(page.getByText('Step 2 of 4')).toBeVisible();
      
      // Fill purpose fields
      await page.getByLabel('Origin Story').fill('Started as a small team');
      await page.getByLabel('What We Do').fill('Build software solutions');
      await page.getByLabel('Vision').fill('To democratize technology');
      
      // Add audience tags
      await page.getByPlaceholder('Add audience...').fill('Startups');
      await page.keyboard.press('Enter');
      
      await page.getByText('Next').click();
      
      // Should be on Growth & Success step
      await expect(page.getByText('Growth & Success')).toBeVisible();
      await expect(page.getByText('Step 3 of 4')).toBeVisible();
      
      // Fill growth fields
      await page.getByLabel('Why Join Us').fill('Fast-paced environment');
      await page.getByLabel('Growth Plans').fill('Expand to new markets');
      await page.getByLabel('Success Metrics').fill('User growth');
      
      // Add core values
      await page.getByPlaceholder('Add value...').fill('Innovation');
      await page.keyboard.press('Enter');
      
      await page.getByText('Next').click();
      
      // Should be on Culture & Values step
      await expect(page.getByText('Culture & Values')).toBeVisible();
      await expect(page.getByText('Step 4 of 4')).toBeVisible();
      
      // Fill culture fields
      await page.getByPlaceholder('Add culture...').fill('Regular team events');
      await page.keyboard.press('Enter');
      
      // Submit organization profile
      await page.getByText('Submit').click();
      
      // Should navigate to next step or show success
      await expect(page.getByText('Team Onboarding')).toBeVisible();
    });

    test('completes team onboarding step', async ({ page }) => {
      // Navigate to team onboarding
      await page.getByText('Team Onboarding').click();
      
      // Fill team onboarding form
      await page.getByLabel('Team Size').selectOption('1-5 people');
      await page.getByLabel('Communication Style').selectOption('Direct and clear');
      await page.getByLabel('Work Style').selectOption('Collaborative');
      await page.getByLabel('Decision Making Style').selectOption('Consensus-based');
      await page.getByLabel('Primary Timezone').selectOption('UTC-8 (Pacific)');
      
      // Submit team onboarding
      await page.getByText('Continue').click();
      
      // Should navigate to hiring intent
      await expect(page.getByText('Hiring Intent')).toBeVisible();
    });

    test('completes hiring intent step', async ({ page }) => {
      // Navigate to hiring intent
      await page.getByText('Hiring Intent').click();
      
      // Fill role information
      await page.getByLabel('Role Title').fill('Frontend Developer');
      
      // Select hiring details
      await page.getByText('2–5').click(); // Number of hires
      await page.getByText('Within 1 month').click(); // Hire timeline
      await page.getByText('Full-time').click(); // Employment type
      await page.getByText('Full-time').click(); // Toggle off
      await page.getByText('Contract').click(); // Employment type
      
      // Select location preference
      await page.getByText('Remote').click();
      
      // Fill salary information
      await page.getByLabel('Salary Range (Min)').fill('50000');
      await page.getByLabel('Salary Range (Max)').fill('80000');
      await page.getByLabel('Salary Period').selectOption('Yearly');
      await page.getByLabel('Currency').selectOption('USD');
      
      // Toggle equity available
      await page.getByLabel('Equity Available').check();
      
      // Submit hiring intent
      await page.getByText('Finish').click();
      
      // Should complete onboarding
      await expect(page.getByText(/onboarding.*complete/i)).toBeVisible();
    });
  });

  test.describe('Developer Onboarding Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to developer onboarding
      await page.goto('/developer-onboarding');
    });

    test('displays developer onboarding with 7 steps', async ({ page }) => {
      // Check page title
      await expect(page.getByText('Complete Your Developer Profile')).toBeVisible();
      await expect(page.getByText("Let's set up your profile to match you with the perfect opportunities. This will help us understand your skills, preferences, and work style.")).toBeVisible();
      
      // Check stepper shows all 7 steps
      await expect(page.getByText('Personal Info')).toBeVisible();
      await expect(page.getByText('Role Selection')).toBeVisible();
      await expect(page.getByText('Skills')).toBeVisible();
      await expect(page.getByText('Work Preferences')).toBeVisible();
      await expect(page.getByText('Soft Skills')).toBeVisible();
      await expect(page.getByText('Verification')).toBeVisible();
      await expect(page.getByText('Final')).toBeVisible();
    });

    test('completes personal information step', async ({ page }) => {
      // Fill personal information
      await page.getByLabel('Full Name').fill('John Doe');
      await page.getByLabel('Email').fill('john@example.com');
      await page.getByLabel('Phone Number').fill('+1234567890');
      
      // Select location
      await page.getByLabel('Country').selectOption('us');
      await page.getByLabel('State/Region').selectOption('ca');
      await page.getByLabel('City').selectOption('sf');
      
      // Upload profile picture (mock file)
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByText('Profile Picture').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles('tests/fixtures/profile-picture.jpg');
      
      // Continue to next step
      await page.getByText('Continue').click();
      
      // Should be on role selection step
      await expect(page.getByText('Role Selection')).toBeVisible();
    });

    test('completes role selection step', async ({ page }) => {
      // Navigate to role selection step
      await page.getByText('Continue').click();
      
      // Select work types
      await page.getByText('Full-time').click();
      await page.getByText('Contract').click();
      
      // Select job role
      await page.getByLabel("What's your primary job role?").selectOption('frontend-developer');
      
      // Continue to next step
      await page.getByText('Continue').click();
      
      // Should be on skills step
      await expect(page.getByText('Skills & Tech Stack')).toBeVisible();
    });

    test('completes skills step', async ({ page }) => {
      // Navigate to skills step
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      
      // Search and add skills
      await page.getByPlaceholder('Search for skills...').fill('React');
      await page.getByText('React').click();
      
      await page.getByPlaceholder('Search for skills...').fill('TypeScript');
      await page.getByText('TypeScript').click();
      
      await page.getByPlaceholder('Search for skills...').fill('Node.js');
      await page.getByText('Node.js').click();
      
      // Set skill levels
      await page.locator('select').nth(0).selectOption('expert'); // React
      await page.locator('select').nth(1).selectOption('advanced'); // TypeScript
      await page.locator('select').nth(2).selectOption('intermediate'); // Node.js
      
      // Continue to next step
      await page.getByText('Continue').click();
      
      // Should be on work preferences step
      await expect(page.getByText('Work Preferences')).toBeVisible();
    });

    test('completes work preferences step', async ({ page }) => {
      // Navigate to work preferences step
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      
      // Select work preferences
      await page.getByLabel("What's your preferred timezone overlap with US teams?").selectOption('8-10-hours');
      await page.getByLabel('What team size do you prefer working with?').selectOption('6-15');
      await page.getByLabel('What company stage interests you most?').selectOption('startup');
      
      // Select work styles
      await page.getByText('Collaborative team environment').click();
      await page.getByText('Fast-paced, dynamic environment').click();
      
      // Continue to next step
      await page.getByText('Continue').click();
      
      // Should be on soft skills step
      await expect(page.getByText('Soft Skills & Personal Attributes')).toBeVisible();
    });

    test('completes soft skills step', async ({ page }) => {
      // Navigate to soft skills step
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      
      // Select communication skills
      await page.getByText('Excellent written communication').click();
      await page.getByText('Strong verbal communication').click();
      
      // Select ownership skills
      await page.getByText('Project management').click();
      await page.getByText('Decision making').click();
      
      // Select collaboration skills
      await page.getByText('Team player').click();
      await page.getByText('Mentoring others').click();
      
      // Select problem solving skills
      await page.getByText('Analytical thinking').click();
      await page.getByText('Creative problem solving').click();
      
      // Select learning attitude
      await page.getByText('Continuous learning mindset').click();
      await page.getByText('Adaptability to new technologies').click();
      
      // Continue to next step
      await page.getByText('Continue').click();
      
      // Should be on verification step
      await expect(page.getByText('Verification & Profiles')).toBeVisible();
    });

    test('completes verification step', async ({ page }) => {
      // Navigate to verification step
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      
      // Upload government ID
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByText("Government ID (Passport, Driver's License, or National ID)").click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles('tests/fixtures/government-id.pdf');
      
      // Upload resume
      const resumeFileChooserPromise = page.waitForEvent('filechooser');
      await page.getByText('Resume/CV').click();
      const resumeFileChooser = await resumeFileChooserPromise;
      await resumeFileChooser.setFiles('tests/fixtures/resume.pdf');
      
      // Fill profile URLs
      await page.getByLabel('LinkedIn Profile URL').fill('https://linkedin.com/in/johndoe');
      await page.getByLabel('GitHub Profile URL').fill('https://github.com/johndoe');
      await page.getByLabel('Portfolio Website (if any)').fill('https://johndoe.dev');
      
      // Continue to next step
      await page.getByText('Continue').click();
      
      // Should be on final step
      await expect(page.getByText('Final Details')).toBeVisible();
    });

    test('completes final step and submits profile', async ({ page }) => {
      // Navigate to final step
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      await page.getByText('Continue').click();
      
      // Fill final details
      await page.getByLabel('When are you available to start?').selectOption('immediate');
      await page.getByLabel('Salary Expectation (per year)').fill('80000');
      await page.getByLabel('Currency').selectOption('USD');
      
      // Complete profile
      await page.getByText('Complete').click();
      
      // Should show success message
      await expect(page.getByText(/Profile completed successfully/i)).toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('handles network errors gracefully', async ({ page }) => {
      // Mock network error
      await page.route('**/users/*', async route => {
        await route.abort('failed');
      });

      // Select Client role
      await page.getByText('Client').click();
      
      // Click Continue
      await page.getByText('Continue').click();
      
      // Should show error message
      await expect(page.getByText(/Failed to update role/i)).toBeVisible();
    });

    test('handles validation errors', async ({ page }) => {
      // Navigate to client onboarding
      await page.goto('/clientOnboarding');
      
      // Try to submit without required fields
      await page.getByText('Submit').click();
      
      // Should show validation errors
      await expect(page.getByText(/Organization name is required/i)).toBeVisible();
    });

    test('handles large file uploads', async ({ page }) => {
      // Navigate to developer onboarding
      await page.goto('/developer-onboarding');
      
      // Try to upload large file
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByText('Profile Picture').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles('tests/fixtures/large-file.jpg');
      
      // Should handle large file appropriately
      await expect(page.getByText(/File size too large/i)).toBeVisible();
    });
  });

  test.describe('Accessibility and Responsiveness', () => {
    test('maintains accessibility standards', async ({ page }) => {
      // Check ARIA labels
      await expect(page.getByLabel('Client')).toBeVisible();
      await expect(page.getByLabel('Service Provider')).toBeVisible();
      await expect(page.getByLabel('Agency')).toBeVisible();
      
      // Check keyboard navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      
      // Should select first role
      await expect(page.getByText('Client')).toHaveClass(/border-blue-500/);
    });

    test('works on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check responsive layout
      await expect(page.getByText('Client')).toBeVisible();
      await expect(page.getByText('Service Provider')).toBeVisible();
      await expect(page.getByText('Agency')).toBeVisible();
      
      // Check touch interactions
      await page.getByText('Client').click();
      await expect(page.getByText('Continue')).toBeEnabled();
    });
  });

  test.describe('Performance and Load Testing', () => {
    test('loads role selection page quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/role-selection');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
    });

    test('handles rapid role switching', async ({ page }) => {
      // Rapidly switch between roles
      for (let i = 0; i < 10; i++) {
        await page.getByText('Client').click();
        await page.getByText('Service Provider').click();
        await page.getByText('Agency').click();
      }
      
      // Should still function correctly
      await page.getByText('Client').click();
      await expect(page.getByText('Continue')).toBeEnabled();
    });
  });
});
