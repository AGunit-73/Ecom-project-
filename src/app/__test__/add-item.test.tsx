// src/pages/add-item/page.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddItemPage from '../pages/add-item/page';


// Mock the global fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Item added successfully!' }),
    })
  );
describe('AddItemPage', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear any mocks after each test
  });

  it('renders the AddItemPage form correctly', () => {
    render(<AddItemPage />);

    // Check if form fields are present
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stock Quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vendor ID/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Item/i })).toBeInTheDocument();
  });

  it('allows the user to fill out the form and submit', async () => {
    render(<AddItemPage />);

    // Fill out form inputs
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByLabelText(/Stock Quantity/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Vendor ID/i), { target: { value: '1' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Add Item/i }));

    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText(/Item added successfully!/i)).toBeInTheDocument();
    });

    // Check if fetch was called with the correct data
    expect(global.fetch).toHaveBeenCalledWith('/api/items/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vendorid: 1,
        name: 'Test Item',
        description: 'Test Description',
        price: 100,
        category: 'Test Category',
        stockquantity: 10,
      }),
    });
  });

  it('shows an error message if the item could not be added', async () => {
    // Mock fetch to return an error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(<AddItemPage />);

    // Fill out form inputs
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByLabelText(/Stock Quantity/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Vendor ID/i), { target: { value: '1' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Add Item/i }));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Error occurred while adding item/i)).toBeInTheDocument();
    });

    // Ensure that fetch was still called even in case of an error
    expect(global.fetch).toHaveBeenCalled();
  });
});
