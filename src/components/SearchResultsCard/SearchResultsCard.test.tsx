import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchResultsCard } from './SearchResultsCard';
import { ICitysResult } from '../../types/IResult';

// teardown and cleanup
afterEach(() => {
  jest.clearAllMocks();
});

const setSelectedCitys = jest.fn();

const results: ICitysResult[] = [
  {
    country: 'GB',
    city: 'London',
    count: 1,
    locations: 1,
    firstUpdated: new Date(),
    lastUpdated: new Date(),
    parameters: ['pm25'],
  },
];

it('Renders SearchResultsCard component', async () => {
  render(<SearchResultsCard result={results[0]} setSelectedCitys={setSelectedCitys} />);

  await waitFor(() => {
    const el = screen.getByText(/Haringey Roadside/i);
    expect(el).toBeInTheDocument();
  });
});

// create new test
