import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Search } from './Search';

// teardown and cleanup
afterEach(() => {
  jest.clearAllMocks();
});

const mockSetLoading = jest.fn();

test('renders input search component', () => {
  render(<Search setLoading={mockSetLoading} />);
  const searchInput = screen.getByPlaceholderText(/Search for a city/i);
  expect(searchInput).toBeInTheDocument();
});

// create test that checks if the search input is empty when the clear button is clicked

test('clears search input when clear button is clicked', () => {
  render(<Search setLoading={mockSetLoading} />);
  const searchInput = screen.getByPlaceholderText(/Search for a city/i);
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue('');
});

it('clears search input when clear button is clicked', async () => {
  const { getByTestId } = render(<Search setLoading={mockSetLoading} />);

  const searchInput = screen.getByPlaceholderText(/Search for a city/i);
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'london' } });
  expect(searchInput).toHaveDisplayValue('london');

  fireEvent.click(getByTestId('clear-search'));

  await waitFor(() => {
    expect(searchInput).toHaveValue('');
  });
});
