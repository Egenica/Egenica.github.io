import React, { useEffect, useState } from 'react';
import { ISearchResultsProps, ICityLocationsResult } from '../../types/IResult';
import { displayDate, hyphenate } from '../../utils/utils';
import closeIcon from './../../assets/img/close-icon.svg';

export const SearchResultsCard = ({ result, setSelectedCitys }: ISearchResultsProps) => {
  const [animate, setAnimate] = React.useState<boolean>(false);
  const [cityLocations, setCityLocations] = useState<ICityLocationsResult[]>([]);
  // Remove city from city list (removes all instances of city)
  const removeCityFromCityList = (removeCity: string) => {
    setSelectedCitys((current) =>
      current.filter((cityName) => {
        return cityName.city !== removeCity;
      }),
    );
    setCityLocations((current) =>
      current.filter((cityName) => {
        return cityName.city !== removeCity;
      }),
    );
  };

  // remove city from cityLocations by id when close icon is clicked
  // const removeCityByIdFromCityLocations = (removeCityId: number) => {
  //   setCityLocations((current) =>
  //     current.filter((cityName) => {
  //       return cityName.id !== removeCityId;
  //     }),
  //   );
  // };

  useEffect(() => {
    fetch(
      `https://api.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=GB&city=${result.city}&order_by=lastUpdated&dumpRaw=false`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCityLocations(data.results);
      });
  }, []);

  return (
    <>
      {cityLocations.map((cityLocation, i) => (
        <div
          key={cityLocation.id}
          className={`rounded-lg md:mx-8 lg:mx-14 overflow-hidden shadow-lg bg-white w-full md:w-1/3 lg:w-1/4 relative  mb-6 md:mb-14 lg:mb-20 md:hover:scale-105 transform transition-all ease-in-out duration-500 cursor-default ${
            setTimeout(() => {
              setAnimate(true);
            }, 500) && animate
              ? 'border-1 border-col border-white opacity-100'
              : 'border-1 border-col border-blue-700 scale-90 shadow-xl opacity-0'
          }`}
          id={
            result.locations > 1 && cityLocations.length - 1 === i
              ? hyphenate(cityLocation.city)
              : hyphenate(cityLocation.city)
          }
        >
          {result.locations > 1 && (
            <span
              className='text-sm text-black absolute right-2 bottom-2 opacity-30'
              title={`Linked card (${cityLocation.city})`}
            >
              {i + 1}{' '}
              <span
                style={{ width: '11px', display: 'inline-block', position: 'relative', top: '1px' }}
              >
                <svg
                  version='1.1'
                  id='Layer_1'
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  viewBox='0 0 512 512'
                  enableBackground='new 0 0 512 512'
                  xmlSpace='preserve'
                >
                  <path
                    fill='#000'
                    className='text-slate-400'
                    d='M459.654,233.373l-90.531,90.5c-49.969,50-131.031,50-181,0c-7.875-7.844-14.031-16.688-19.438-25.813
	l42.063-42.063c2-2.016,4.469-3.172,6.828-4.531c2.906,9.938,7.984,19.344,15.797,27.156c24.953,24.969,65.563,24.938,90.5,0
	l90.5-90.5c24.969-24.969,24.969-65.563,0-90.516c-24.938-24.953-65.531-24.953-90.5,0l-32.188,32.219
	c-26.109-10.172-54.25-12.906-81.641-8.891l68.578-68.578c50-49.984,131.031-49.984,181.031,0
	C509.623,102.342,509.623,183.389,459.654,233.373z M220.326,382.186l-32.203,32.219c-24.953,24.938-65.563,24.938-90.516,0
	c-24.953-24.969-24.953-65.563,0-90.531l90.516-90.5c24.969-24.969,65.547-24.969,90.5,0c7.797,7.797,12.875,17.203,15.813,27.125
	c2.375-1.375,4.813-2.5,6.813-4.5l42.063-42.047c-5.375-9.156-11.563-17.969-19.438-25.828c-49.969-49.984-131.031-49.984-181.016,0
	l-90.5,90.5c-49.984,50-49.984,131.031,0,181.031c49.984,49.969,131.031,49.969,181.016,0l68.594-68.594
	C274.561,395.092,246.42,392.342,220.326,382.186z'
                  />
                </svg>
              </span>
            </span>
          )}
          <button
            className='absolute right-3 top-3'
            onClick={() => {
              removeCityFromCityList(cityLocation.city);
              // removeCityByIdFromCityLocations(cityLocation.id);
            }}
          >
            <img src={closeIcon} alt='close' className='close-icon' />
          </button>
          <div className='px-8 py-6'>
            <p className='text-gray-700 text-base uppercase'>
              {displayDate(cityLocation.lastUpdated)}
            </p>
            <h2 className='text-base font-bold md:text-xl lg:text-3xl my-2 text-purple-700 md:font-medium tracking-wide'>
              {cityLocation.name}
            </h2>
            <p className='text-gray-700 text-base'>
              in {`${cityLocation.city}, ${cityLocation.country === 'GB' && 'United Kingdom'}`}
            </p>

            <p className='text-gray-900 font-bold text-sm'>
              Values:{' '}
              {cityLocation.parameters.map((prama, i) => {
                return (
                  <span key={prama.id} className='text-gray-700 text-base font-normal uppercase '>
                    {prama.parameter +
                      ': ' +
                      prama.lastValue +
                      (cityLocation.parameters.length - 1 !== i ? ', ' : ' ')}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
