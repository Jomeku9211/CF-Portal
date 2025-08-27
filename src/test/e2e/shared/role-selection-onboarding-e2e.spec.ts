import { test, expect } from '@playwright/test';

test.describe('Role Selection and Onboarding E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication - simulate logged in user
    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({
        id: 'test-user-id',
        email: 'test@example.com',
        roles: []
      }));
    });
  });

  test.describe('Role Selection Page', () => {
    test('displays role selection page correctly', async ({ page }) => {
      await page.goto('/role-selection');
      
      await expect(page.getByText('What best describes your role?')).toBeVisible();
      await expect(page.getByText('Client')).toBeVisible();
      await expect(page.getByText('Service Provider')).toBeVisible();
      await expect(page.getByText('Agency')).toBeVisible();
      await expect(page.getByText('Continue')).toBeVisible();
    });

    test('shows role descriptions and icons', async ({ page }) => {
      await page.goto('/role-selection');
      
      // Check client role description
      await expect(page.getByText('Hire developers and build your team')).toBeVisible();
      
      // Check service provider role description
      await expect(page.getByText('Find opportunities and showcase your skills')).toBeVisible();
      
      // Check agency role description
      await expect(page.getByText('Manage multiple clients and projects')).toBeVisible();
    });

    test('allows role selection with visual feedback', async ({ page }) => {
      await page.goto('/role-selection');
      
      // Select client role
      const clientButton = page.getByText('Client').closest('button');
      await clientButton.click();
      
      // Check if selected role has visual feedback
      await expect(clientButton).toHaveClass(/selected/);
      
      // Continue button should be enabled
      await expect(page.getByText('Continue')).toBeEnabled();
    });

    test('prevents continuation without role selection', async ({ page }) => {
      await page.goto('/role-selection');
      
      // Continue button should be disabled initially
      await expect(page.getByText('Continue')).toBeDisabled();
      
      // Try to click continue without selection
      await page.getByText('Continue').click();
      
      // Should still be on role selection page
      await expect(page).toHaveURL(/.*role-selection/);
    });
  });

  test.describe('Client Role Selection Flow', () => {
    test('completes client role selection and navigates to onboarding', async ({ page }) => {
      // Mock userService.updateUserById
      await page.route('**/api/users/**', async route => {
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

      await page.goto('/role-selection');
      
      // Select client role
      await page.getByText('Client').click();
      await page.getByText('Continue').click();
      
      // Should navigate to client onboarding
      await expect(page).toHaveURL(/.*clientOnboarding/);
    });

    test('updates user role in backend when client is selected', async ({ page }) => {
      let updateUserCalled = false;
      
      await page.route('**/api/users/**', async route => {
        if (route.request().method() === 'PUT') {
          updateUserCalled = true;
          const postData = JSON.parse(route.request().postData() || '{}');
          expect(postData.roles).toContain('client');
          expect(postData.onboarding_stage).toBe('organization_profile');
        }
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      });

      await page.goto('/role-selection');
      await page.getByText('Client').click();
      await page.getByText('Continue').click();
      
      expect(updateUserCalled).toBe(true);
    });
  });

  test.describe('Service Provider Role Selection Flow', () => {
    test('completes service provider role selection and navigates to developer onboarding', async ({ page }) => {
      // Mock userService.updateUserById
      await page.route('**/api/users/**', async route => {
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

      await page.goto('/role-selection');
      
      // Select service provider role
      await page.getByText('Service Provider').click();
      await page.getByText('Continue').click();
      
      // Should navigate to developer onboarding
      await expect(page).toHaveURL(/.*developer-onboarding/);
    });

    test('updates user role in backend when service provider is selected', async ({ page }) => {
      let updateUserCalled = false;
      
      await page.route('**/api/users/**', async route => {
        if (route.request().method() === 'PUT') {
          updateUserCalled = true;
          const postData = JSON.parse(route.request().postData() || '{}');
          expect(postData.roles).toContain('freelancer');
          expect(postData.onboarding_stage).toBe('pending');
        }
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      });

      await page.goto('/role-selection');
      await page.getByText('Service Provider').click();
      await page.getByText('Continue').click();
      
      expect(updateUserCalled).toBe(true);
    });
  });

  test.describe('Agency Role Selection Flow', () => {
    test('completes agency role selection and shows pending message', async ({ page }) => {
      // Mock userService.updateUserById
      await page.route('**/api/users/**', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            user: {
              id: 'test-user-id',
              roles: ['agency'],
              onboarding_stage: 'pending'
            }
          })
        });
      });

      await page.goto('/role-selection');
      
      // Select agency role
      await page.getByText('Agency').click();
      await page.getByText('Continue').click();
      
      // Should show pending message since agency onboarding is not implemented
      await expect(page.getByText(/not yet implemented/i)).toBeVisible();
    });
  });

  test.describe('Client Onboarding Flow', () => {
    test('displays organization profile step correctly', async ({ page }) => {
      await page.goto('/clientOnboarding');
      
      await expect(page.getByText('Organization Profile')).toBeVisible();
      await expect(page.getByText('Quick Setup')).toBeVisible();
      await expect(page.getByText('Purpose & Story')).toBeVisible();
      await expect(page.getByText('Growth & Success')).toBeVisible();
      await expect(page.getByText('Culture & Values')).toBeVisible();
    });

    test('completes organization profile step', async ({ page }) => {
      // Mock organizationService.createOrganization
      await page.route('**/api/organizations', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            organization: { id: 'org-123', name: 'Test Company' }
          })
        });
      });

      await page.goto('/clientOnboarding');
      
      // Fill organization profile form
      await page.getByLabel('Company Name').fill('Test Company');
      await page.getByLabel('Company Size').selectOption('10-50');
      await page.getByLabel('Funding Status').selectOption('Series A');
      await page.getByLabel('Industry').fill('Technology');
      await page.getByLabel('Company Function').fill('Product Development');
      await page.getByLabel('Revenue Status').fill('Growing');
      
      await page.getByText('Next').click();
      
      // Should move to next step
      await expect(page.getByText('Purpose & Story')).toBeVisible();
    });

    test('completes team onboarding step', async ({ page }) => {
      // Mock team creation
      await page.route('**/api/teams', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            team: { id: 'team-123' }
          })
        });
      });

      await page.goto('/clientOnboarding');
      
      // Navigate to team onboarding step
      await page.getByText('Team Onboarding').click();
      
      // Fill team form
      await page.getByLabel('Team Size').selectOption('5-10');
      await page.getByLabel('Hiring Needs').fill('Developers, Designers');
      
      await page.getByText('Next').click();
      
      // Should move to hiring intent step
      await expect(page.getByText('Hiring Intent')).toBeVisible();
    });

    test('completes hiring intent step', async ({ page }) => {
      // Mock hiring intent creation
      await page.route('**/api/hiring-intents', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            hiring_intent: { id: 'hiring-123' }
          })
        });
      });

      await page.goto('/clientOnboarding');
      
      // Navigate to hiring intent step
      await page.getByText('Hiring Intent').click();
      
      // Fill hiring intent form
      await page.getByLabel('Number of Hires').selectOption('3-5');
      await page.getByLabel('Hire Timeline').selectOption('1-3 months');
      await page.getByLabel('Employment Type').check('Full-time');
      await page.getByLabel('Location Preference').selectOption('Remote');
      await page.getByLabel('Salary Period').selectOption('Annual');
      await page.getByLabel('Currency').selectOption('USD');
      
      await page.getByText('Complete Onboarding').click();
      
      // Should show completion message
      await expect(page.getByText(/onboarding completed/i)).toBeVisible();
    });
  });

  test.describe('Developer Onboarding Flow', () => {
    test('displays developer onboarding page correctly', async ({ page }) => {
      await page.goto('/developer-onboarding');
      
      await expect(page.getByText('Complete Your Developer Profile')).toBeVisible();
      await expect(page.getByText('Personal Info')).toBeVisible();
      await expect(page.getByText('Role Selection')).toBeVisible();
      await expect(page.getByText('Skills')).toBeVisible();
      await expect(page.getByText('Work Preferences')).toBeVisible();
      await expect(page.getByText('Soft Skills')).toBeVisible();
      await expect(page.getByText('Verification')).toBeVisible();
      await expect(page.getByText('Final Details')).toBeVisible();
    });

    test('completes personal info step', async ({ page }) => {
      // Mock profile creation
      await page.route('**/api/developer-profiles', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            profile: { id: 'profile-123' }
          })
        });
      });

      await page.goto('/developer-onboarding');
      
      // Fill personal info form
      await page.getByLabel('Full Name').fill('John Doe');
      await page.getByLabel('Email').fill('john@example.com');
      await page.getByLabel('Phone Number').fill('+1234567890');
      await page.getByLabel('Country').selectOption('United States');
      await page.getByLabel('State').fill('California');
      await page.getByLabel('City').fill('San Francisco');
      
      await page.getByText('Next').click();
      
      // Should move to role selection step
      await expect(page.getByText('Role Selection')).toBeVisible();
    });

    test('completes role selection step', async ({ page }) => {
      // Mock role selection creation
      await page.route('**/api/developer-roles', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            role_selection: { id: 'role-123' }
          })
        });
      });

      await page.goto('/developer-onboarding');
      
      // Navigate to role selection step
      await page.getByText('Role Selection').click();
      
      // Fill role selection form
      await page.getByLabel('Work Types').check('Full-time');
      await page.getByLabel('Work Types').check('Contract');
      await page.getByLabel('Primary Job Role').selectOption('Full Stack Developer');
      
      await page.getByText('Next').click();
      
      // Should move to skills step
      await expect(page.getByText('Skills')).toBeVisible();
    });

    test('completes skills step', async ({ page }) => {
      // Mock skills creation
      await page.route('**/api/developer-skills', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            skills: { id: 'skills-123' }
          })
        });
      });

      await page.goto('/developer-onboarding');
      
      // Navigate to skills step
      await page.getByText('Skills').click();
      
      // Add skills
      await page.getByLabel('Skill Name').fill('JavaScript');
      await page.getByLabel('Skill Level').selectOption('Advanced');
      await page.getByText('Add Skill').click();
      
      await page.getByLabel('Skill Name').fill('React');
      await page.getByLabel('Skill Level').selectOption('Intermediate');
      await page.getByText('Add Skill').click();
      
      await page.getByText('Next').click();
      
      // Should move to work preferences step
      await expect(page.getByText('Work Preferences')).toBeVisible();
    });

    test('completes work preferences step', async ({ page }) => {
      // Mock work preferences creation
      await page.route('**/api/developer-work-preferences', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            work_preferences: { id: 'prefs-123' }
          })
        });
      });

      await page.goto('/developer-onboarding');
      
      // Navigate to work preferences step
      await page.getByText('Work Preferences').click();
      
      // Fill work preferences form
      await page.getByLabel('Timezone Overlap').selectOption('4-6 hours');
      await page.getByLabel('Team Size').selectOption('5-10');
      await page.getByLabel('Company Stage').selectOption('Series A');
      await page.getByLabel('Work Styles').check('Collaborative');
      await page.getByLabel('Work Styles').check('Independent');
      
      await page.getByText('Next').click();
      
      // Should move to soft skills step
      await expect(page.getByText('Soft Skills')).toBeVisible();
    });

    test('completes soft skills step', async ({ page }) => {
      // Mock soft skills creation
      await page.route('**/api/developer-soft-skills', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            soft_skills: { id: 'soft-123' }
          })
        });
      });

      await page.goto('/developer-onboarding');
      
      // Navigate to soft skills step
      await page.getByText('Soft Skills').click();
      
      // Select soft skills
      await page.getByLabel('Communication').check('Clear');
      await page.getByLabel('Communication').check('Active Listening');
      await page.getByLabel('Ownership').check('Accountable');
      await page.getByLabel('Collaboration').check('Team Player');
      await page.getByLabel('Problem Solving').check('Analytical');
      await page.getByLabel('Learning Attitude').check('Curious');
      
      await page.getByText('Next').click();
      
      // Should move to verification step
      await expect(page.getByText('Verification')).toBeVisible();
    });

    test('completes verification step', async ({ page }) => {
      // Mock verification creation
      await page.route('**/api/developer-verification', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            verification: { id: 'verify-123' }
          })
        });
      });

      await page.goto('/developer-onboarding');
      
      // Navigate to verification step
      await page.getByText('Verification').click();
      
      // Fill verification form
      await page.getByLabel('LinkedIn URL').fill('https://linkedin.com/in/johndoe');
      await page.getByLabel('GitHub URL').fill('https://github.com/johndoe');
      await page.getByLabel('Portfolio URL').fill('https://johndoe.dev');
      
      // Upload files (simulate file selection)
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Government ID').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles('test-files/sample-id.pdf');
      
      const resumeFileChooserPromise = page.waitForEvent('filechooser');
      await page.getByLabel('Resume').click();
      const resumeFileChooser = await resumeFileChooserPromise;
      await resumeFileChooser.setFiles('test-files/sample-resume.pdf');
      
      await page.getByText('Next').click();
      
      // Should move to final details step
      await expect(page.getByText('Final Details')).toBeVisible();
    });

    test('completes final details step and finishes onboarding', async ({ page }) => {
      // Mock final details creation and user update
      await page.route('**/api/developer-final-details', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            final_details: { id: 'final-123' }
          })
        });
      });

      await page.route('**/api/users/**', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            user: { id: 'test-user-id', onboarding_stage: 'completed' }
          })
        });
      });

      await page.goto('/developer-onboarding');
      
      // Navigate to final details step
      await page.getByText('Final Details').click();
      
      // Fill final details form
      await page.getByLabel('Availability').selectOption('Immediate');
      await page.getByLabel('Salary Expectation').fill('80000');
      await page.getByLabel('Currency').selectOption('USD');
      
      await page.getByText('Complete Onboarding').click();
      
      // Should show completion message
      await expect(page.getByText(/onboarding completed/i)).toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('handles network errors during role selection', async ({ page }) => {
      // Mock network error
      await page.route('**/api/users/**', async route => {
        await route.abort('Failed');
      });

      await page.goto('/role-selection');
      await page.getByText('Client').click();
      await page.getByText('Continue').click();
      
      // Should show error message
      await expect(page.getByText(/error/i)).toBeVisible();
    });

    test('handles validation errors in client onboarding', async ({ page }) => {
      // Mock validation error
      await page.route('**/api/organizations', async route => {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Company name is required'
          })
        });
      });

      await page.goto('/clientOnboarding');
      await page.getByText('Next').click();
      
      // Should show validation error
      await expect(page.getByText('Company name is required')).toBeVisible();
    });

    test('handles server errors in developer onboarding', async ({ page }) => {
      // Mock server error
      await page.route('**/api/developer-profiles', async route => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Internal server error'
          })
        });
      });

      await page.goto('/developer-onboarding');
      await page.getByLabel('Full Name').fill('John Doe');
      await page.getByText('Next').click();
      
      // Should show error message
      await expect(page.getByText('Internal server error')).toBeVisible();
    });
  });

  test.describe('Accessibility and Responsiveness', () => {
    test('maintains accessibility standards throughout onboarding', async ({ page }) => {
      await page.goto('/role-selection');
      
      // Check for proper heading structure
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      
      // Check for proper button labels
      await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
      
      // Check for form labels
      await expect(page.getByLabel('Company Name')).toBeVisible();
    });

    test('responds correctly to different screen sizes', async ({ page }) => {
      await page.goto('/role-selection');
      
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.getByText('What best describes your role?')).toBeVisible();
      
      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.getByText('What best describes your role?')).toBeVisible();
      
      // Test desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.getByText('What best describes your role?')).toBeVisible();
    });
  });

  test.describe('Performance and Loading States', () => {
    test('shows loading states during API calls', async ({ page }) => {
      // Mock slow API response
      await page.route('**/api/users/**', async route => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      });

      await page.goto('/role-selection');
      await page.getByText('Client').click();
      await page.getByText('Continue').click();
      
      // Should show loading state
      await expect(page.getByText(/loading/i)).toBeVisible();
      
      // Wait for completion
      await expect(page).toHaveURL(/.*clientOnboarding/);
    });

    test('handles multiple rapid role selections gracefully', async ({ page }) => {
      await page.goto('/role-selection');
      
      // Rapidly click different roles
      await page.getByText('Client').click();
      await page.getByText('Service Provider').click();
      await page.getByText('Agency').click();
      await page.getByText('Client').click();
      
      // Should only have one role selected
      const selectedButtons = page.locator('button.selected');
      await expect(selectedButtons).toHaveCount(1);
    });
  });
});
