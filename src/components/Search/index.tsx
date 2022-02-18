import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { db, dbArr } from 'types/db';
import './style.scss';
import SearchInput from './SearchInput';
import ProductCard from './ProductCard';
import { dataFilter } from 'utils/functions/dataFilter';

function Search() {
  const [data, setData] = useState<dbArr>([]);
  const [searched, setSearched] = useState<string[]>([]);
  const [matches, setMatches] = useState<dbArr>([]);
  const [order, setOrder] = useState<string>('재구매율');
  const [inputFocused, setInputFocused] = useState(false);
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchData, setSearchData] = useState([
    {
      id: 0,
      product_name: '',
      brand: '',
      grade: 0,
      repurchase_rate: 0,
      related: [''],
    },
  ]);

  const currentUrl = window.location.search;
  const searchValue = decodeURI(currentUrl).split('?=')[1];

  useEffect(() => {
    axios('db.json')
      .then((res) => {
        setData(res.data.data);
        setSearchData(dataFilter(res.data.data, searchValue));
        return res.data.data;
      })
      .then((data) => {
        setMatches(
          [
            ...data.sort((a: db, b: db) => {
              return b.repurchase_rate - a.repurchase_rate;
            }),
          ].slice(0, 5)
        );
      });

    if ('searched' in window.localStorage) {
      setSearched([...JSON.parse(window.localStorage.getItem('searched')!)]);
    }
  }, []);
  useEffect(() => {
    inputRef.current?.focus();
  }, [input]);

  useEffect(() => {
    const focusFalse = (e: any) => {
      if (inputFocused && e.target !== inputRef.current) {
        console.log('here');
        setInputFocused(false);
      }
    };
    window.addEventListener('click', focusFalse);

    return () => {
      window.removeEventListener('click', focusFalse);
    };
  }, [inputFocused]);

  useEffect(() => {
    window.localStorage.setItem('searched', JSON.stringify(searched));
  }, [searched]);

  useEffect(() => {
    console.log(searchData);
  });

  return (
    <div className='search-tool'>
      <SearchInput
        ref={inputRef}
        order={order}
        setOrder={setOrder}
        data={data}
        inputFocused={inputFocused}
        setInputFocused={setInputFocused}
        input={input}
        setInput={setInput}
        searched={searched}
        setSearched={setSearched}
        matches={matches}
        setMatches={setMatches}
      />
      <div className='card-wrap'>
        {searchData.map((el, idx) => {
         return  <ProductCard info={el} key={idx}/>
        })}
      </div>
    </div>
  );
}

export default Search;
