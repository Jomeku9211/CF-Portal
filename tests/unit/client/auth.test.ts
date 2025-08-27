import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { authService } from '../../../src/services/authService';
import { Login } from '../../../src/components/Auth/Login';
import { Signup } from '../../../src/components/Auth/Signup';

// Mock the auth service
jest.mock('../../../src/services/authService');

describe('Client Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('client can signup with valid information', async () => {
    const mockSignup = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'client', email: 'client@example.com' }
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

    fireEvent.change(emailInput, { target: { value: 'client@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'clientpass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalled();
    });
  });

  test('client can login with valid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue({
      success: true,
      user: { role: 'client', email: 'client@example.com' }
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

    fireEvent.change(emailInput, { target: { value: 'client@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'clientpass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'client@example.com',
        password: 'clientpass123'
      });
    });
  });
});
