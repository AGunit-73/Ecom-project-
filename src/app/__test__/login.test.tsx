import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/pages/login/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  it('renders the login button', () => {
    render(<LoginPage />);
    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('renders the heading', () => {
    render(<LoginPage />);
    const heading = screen.getByText(/huge market, free services!/i);
    expect(heading).toBeInTheDocument();
  });
});
