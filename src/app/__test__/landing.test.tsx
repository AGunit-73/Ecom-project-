// __test__/LandingPage.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from '@/app/page';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook for testing navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LandingPage', () => {
  it('renders Isolora text', () => {
    render(<LandingPage />);
    const isoloraText = screen.getByText('Isolora');
    expect(isoloraText).toBeInTheDocument();
  });

  it('renders the Sign In button', () => {
    render(<LandingPage />);
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });

  it('navigates to the login page when Sign In button is clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<LandingPage />);
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);

    expect(pushMock).toHaveBeenCalledWith('/pages/login');
  });

  it('renders the search bar with placeholder text', () => {
    render(<LandingPage />);
    const searchBar = screen.getByPlaceholderText('Search for products...');
    expect(searchBar).toBeInTheDocument();
  });

  it('navigates to the fashion page when Fashion is clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<LandingPage />);
    const fashionLink = screen.getByText('Fashion');
    fireEvent.click(fashionLink);

    expect(pushMock).toHaveBeenCalledWith('/pages/fashion');
  });
});
