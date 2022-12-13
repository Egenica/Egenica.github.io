import React, { useRef, useEffect } from 'react';
import { ISearchDropdownMenuProps } from '../../types/IResult';
import { scrollIntoView } from '../../utils/utils';

export const SearchDropdownMenu = ({
  results,
  hideShowDropdown,
  setHideShowDropdown,
  selectedCitys,
  setSelectedCitys,
}: ISearchDropdownMenuProps) => {
  const dropDownMenu = useRef<HTMLDivElement>(null);

  // Handle click outside
  const handleClickOutside = (event: MouseEvent): void => {
    if (dropDownMenu.current && !dropDownMenu.current.contains(event.target as Node)) {
      setHideShowDropdown(false);
    }
  };

  useEffect(() => {
    // Add event listener for click outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className='relative' ref={dropDownMenu}>
      {hideShowDropdown && results && results.length > 0 && (
        <ul
          className='dropdown-menu w-full absolute bg-white text-base -top-4 float-left py-2 list-none text-left rounded-xl shadow-lg pt-6 bg-clip-padding border-none overflow-scroll h-content max-h-96 z-40'
          aria-labelledby='dropdownMenu'
          data-testid='dropdown-menu'
        >
          {results.map((result) => (
            <li key={result.city}>
              <a
                className={`dropdown-item text-lg py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 ${
                  selectedCitys.some((city) => city.city === result.city) ? 'city-selected' : ''
                }`}
                tabIndex={0}
                href='#'
                title={
                  selectedCitys.some((city) => city.city === result.city)
                    ? 'Already selected'
                    : 'Add city'
                }
                onClick={(e) => {
                  e.preventDefault();
                  // Check if city is already selected and return if true
                  if (selectedCitys.some((city) => city.city === result.city)) {
                    return;
                  }
                  setSelectedCitys([...selectedCitys, result]);
                  setHideShowDropdown(false);
                  scrollIntoView(result.city);
                }}
              >
                {selectedCitys.some((city) => city.city === result.city) ? (
                  <>
                    <span className='text-blue-500 font-medium'>{result.city}</span>{' '}
                    <span
                      className='text-blue-300 font-medium text-sm'
                      title={result.locations + ' Locations'}
                    >
                      [{result.locations}]
                    </span>
                  </>
                ) : (
                  <>
                    <span className=''>{result.city}</span>{' '}
                    <span
                      className='text-slate-400 font-medium text-sm'
                      title={result.locations + ' Locations'}
                    >
                      [{result.locations}]
                    </span>
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
