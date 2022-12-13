import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchDropdownMenu } from './SearchDropdownMenu';
import { ICitysResult } from '../../types/IResult';

// teardown and cleanup
afterEach(() => {
  jest.clearAllMocks();
});

const setHideShowDropdown = jest.fn();
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
  {
    country: 'GB',
    city: 'Manchester',
    count: 1,
    locations: 1,
    firstUpdated: new Date(),
    lastUpdated: new Date(),
    parameters: ['pm25'],
  },
];

const selectedCitys: ICitysResult[] = [
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

test('Renders SearchDropdownMenu component', () => {
  render(
    <SearchDropdownMenu
      results={results}
      hideShowDropdown={true}
      setHideShowDropdown={setHideShowDropdown}
      selectedCitys={selectedCitys}
      setSelectedCitys={setSelectedCitys}
    />,
  );
  const el = screen.getByText(/Manchester/i);
  expect(el).toBeInTheDocument();

  const el2 = screen.getByText(/London/i);
  expect(el2).toBeInTheDocument();
});
