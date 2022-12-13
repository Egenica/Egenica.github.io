import React, { useState } from 'react';
import { Search } from './components/Search/Search';
import './App.css';
import loader from './assets/img/grid.svg';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className='px-6 h-auto flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500'>
      <div
        className={`w-20 m-10 flex flex-col items-center absolute top-96 md:top-0 transition-opacity ease-in duration-700 ${
          loading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img src={loader} alt='loading' />
        <p className='center text-white text-xs p-4 tracking-widest w-max'>LOADING DATA</p>
      </div>
      <button
        className='w-12 h-12 text-xs fixed right-3 bottom-20 md:right-5 md:bottom-5 rounded-full border-2 border-slate-300 flex justify-center items-center bg-white shadow-lg transition-all hover:shadow-xl hover:border-slate-500 z-50'
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <p>TOP</p>
      </button>

      <h1 className='mt-20 text-3xl text-white md:text-6xl my-6 md:mt-40 text-center '>
        Compare your Air
      </h1>
      <p className='text-lg leading-6 text-white md:text-2xl mb-12 font-thin text-center max-w-2xl'>
        Compare the air quality between cities in the UK. Select cities to compare using the search
        tool below.
      </p>

      <Search setLoading={setLoading} />
    </div>
  );
}
