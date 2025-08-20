import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Error from '../Error';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useRouteError: () => mockRouteError,
  isRouteErrorResponse: jest.fn()
}));

let mockRouteError: any;
let mockIsRouteErrorResponse: jest.Mock;

describe('Error Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsRouteErrorResponse = jest.requireMock('react-router-dom').isRouteErrorResponse;
  });

  test('renders error message when route error response', () => {
    mockRouteError = { data: 'Page not found' };
    mockIsRouteErrorResponse.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByText('Something went wrong 😢')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
  });

  test('handles go back button click', () => {
    mockRouteError = { data: 'Test error' };
    mockIsRouteErrorResponse.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    const goBackButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('returns null for non-route errors', () => {
    mockRouteError = { data: 'Generic error' };
    mockIsRouteErrorResponse.mockReturnValue(false);

    const { container } = render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  test('handles different error data types', () => {
    mockRouteError = { data: 'Custom error message' };
    mockIsRouteErrorResponse.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  test('renders with proper accessibility', () => {
    mockRouteError = { data: 'Accessibility test' };
    mockIsRouteErrorResponse.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Something went wrong 😢');

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
