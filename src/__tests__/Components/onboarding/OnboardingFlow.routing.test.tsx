import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { AuthProvider } from '@/contexts/AuthContext';

function renderWithStage(stage: string | null) {
  const store: Record<string, any> = {};
  const originalGetItem = window.localStorage.getItem;
  const originalSetItem = window.localStorage.setItem;
  window.localStorage.setItem = (k: string, v: string) => { store[k] = v; return undefined as any; };
  window.localStorage.getItem = (k: string) => (k in store ? store[k] : null);
  if (stage) {
    store.currentUser = JSON.stringify({ id: 'u1', onboarding_stage: stage });
  }
  const ui = render(
    <MemoryRouter initialEntries={["/clientOnboarding"]}>
      <AuthProvider>
        <OnboardingFlow />
      </AuthProvider>
    </MemoryRouter>
  );
  // restore
  window.localStorage.getItem = originalGetItem.bind(window.localStorage);
  window.localStorage.setItem = originalSetItem.bind(window.localStorage);
  return ui;
}

describe('OnboardingFlow routing by onboarding_stage', () => {
  test('routes to organization step by default', async () => {
    renderWithStage('organization_creation');
    await waitFor(() => {
      expect(screen.getByText(/Onboarding Organization/i)).toBeInTheDocument();
    });
  });

  test('routes to team onboarding when stage is team_creation', async () => {
    renderWithStage('team_creation');
    await waitFor(() => {
      expect(screen.getByText(/Onboarding Team/i)).toBeInTheDocument();
    });
  });

  test('routes to hiring intent when stage is hiring_intent', async () => {
    renderWithStage('hiring_intent');
    await waitFor(() => {
      expect(screen.getByText(/Hiring Intent/i)).toBeInTheDocument();
    });
  });

  test('routes to job persona when stage is job_creation', async () => {
    renderWithStage('job_creation');
    await waitFor(() => {
      expect(screen.getByText(/Job Persona Creation/i)).toBeInTheDocument();
    });
  });
});


