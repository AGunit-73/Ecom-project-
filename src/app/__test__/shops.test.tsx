import { render, screen } from '@testing-library/react';
import ShopPage from '@/app/pages/shop/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ShopPage', () => {
  it('renders the "Buy It Now" button', () => {
    render(<ShopPage />);
    const buyItNowButton = screen.getByRole('button', { name: /buy it now/i });
    expect(buyItNowButton).toBeInTheDocument();
  });

  it('renders the product name', () => {
    render(<ShopPage />);
    const productName = screen.getByText(/adidas men ultraboost running shoes/i);
    expect(productName).toBeInTheDocument();
  });
});
