import React, { useEffect, useState } from 'react';
import { ICitysResult, ISearchProps } from './../../types/IResult';
import { SearchResultsCard } from '../SearchResultsCard/SearchResultsCard';
import { SearchDropdownMenu } from '../SearchDropdownMenu/SearchDropdownMenu';

export const Search = ({ setLoading }: ISearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ICitysResult[]>([]);
  const [hideShowDropdown, setHideShowDropdown] = useState<boolean>(false);
  const [citys, setCitys] = useState<ICitysResult[]>([]);

  const [selectedCitys, setSelectedCitys] = useState<ICitysResult[]>([]);

  useEffect(() => {
    // Fetch all cities from API
    if (citys.length === 0) {
      fetch(
        `https://api.openaq.org/v2/cities?limit=1000&page=1&offset=0&sort=asc&country_id=GB&order_by=city`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length > 0) {
            setCitys(data.results);
            setLoading(false);
          }
        });
    }
  }, []);

  useEffect(() => {
    // Filter results based on search term
    const filterResults = (results: ICitysResult[]) => {
      return results.filter((result) => {
        return result.city.toLowerCase().includes(searchTerm.toLowerCase());
      });
    };
    searchTerm.length > 0 ? setResults(filterResults(citys)) : setResults([]);
  }, [searchTerm]);

  return (
    <>
      <div className='w-full md:w-1/2 relative'>
        <div
          style={{ zIndex: '999', top: 'calc(50% - 18px)', right: '5px' }}
          className='w-9 h-9 absolute rounded-full justify-center items-center  hover:border-slate-500 flex bg-slate-200'
          onClick={() => {
            setSearchTerm('');
            setHideShowDropdown(false);
          }}
          data-testid='clear-search'
        >
          <svg
            style={{ width: '12px' }}
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 1000 1000'
            enableBackground='new 0 0 1000 1000'
            xmlSpace='preserve'
          >
            <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
            <g>
              <path d='M500,623.8L159.9,963.9c-34.6,34.6-90.1,34.7-124.3,0.5c-34.4-34.4-34-89.8,0.5-124.3L376.2,500L36.1,159.9C1.5,125.3,1.4,69.8,35.6,35.6c34.4-34.4,89.8-34,124.3,0.5L500,376.2L840.1,36.1c34.6-34.6,90.1-34.7,124.3-0.5c34.4,34.4,34,89.8-0.5,124.3L623.8,500l340.1,340.1c34.6,34.6,34.7,90.1,0.5,124.3c-34.4,34.4-89.8,34-124.3-0.5L500,623.8z' />
            </g>
          </svg>
        </div>
        <input
          type='text'
          placeholder='Search for a city'
          className='p-2 pl-14 m-0 w-full md:w-full rounded-xl border-2 border-col border-slate-300 md:p-4 md:pl-14 mb-0 text-lg focus:outline-none search-icon z-50 relative'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setHideShowDropdown(true);
          }}
          onFocus={() => {
            setHideShowDropdown(true);
          }}
        />
        <SearchDropdownMenu
          results={results}
          hideShowDropdown={hideShowDropdown}
          setHideShowDropdown={setHideShowDropdown}
          selectedCitys={selectedCitys}
          setSelectedCitys={setSelectedCitys}
        />
      </div>

      <div className='flex flex-wrap mt-8 md:mt-24 justify-center w-full'>
        {selectedCitys &&
          selectedCitys.length > 0 &&
          selectedCitys.map((result, i) => (
            <SearchResultsCard
              key={`result${i}`}
              result={result}
              setSelectedCitys={setSelectedCitys}
            />
          ))}
      </div>
    </>
  );
};
