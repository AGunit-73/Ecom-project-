import { render, screen } from '@testing-library/react';
import FashionPage from '@/app/pages/fashion/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('FashionPage', () => {
  it('renders the Isolora button', () => {
    render(<FashionPage />);
    const isoloraButton = screen.getByRole('button', { name: /isolora/i });
    expect(isoloraButton).toBeInTheDocument();
  });

  it('renders the fashion page heading', () => {
    render(<FashionPage />);
    const heading = screen.getByText(/fashion page/i);
    expect(heading).toBeInTheDocument();
  });
});
