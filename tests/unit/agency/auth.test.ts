import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { authService } from '../../../src/services/authService';
import { Login } from '../../../src/components/Auth/Login';
import { Signup } from '../../../src/components/Auth/Signup';

// Mock the auth service
jest.mock('../../../src/services/authService');

describe('Agency Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('agency can signup with valid information', async () => {
    const mockSignup = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'agency', email: 'agency@example.com' }
    });
    (authService.signup as jest.Mock) = mockSignup;

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Sign Up');

    fireEvent.change(emailInput, { target: { value: 'agency@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'agencypass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalled();
    });
  });

  test('agency can login with valid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'agency', email: 'agency@example.com' }
    });
    (authService.login as jest.Mock) = mockLogin;

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'agency@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'agencypass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'agency@example.com',
        password: 'agencypass123'
      });
    });
  });
});
