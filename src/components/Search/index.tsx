import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { db, dbArr } from 'types/db';
import './style.scss';
import SearchInput from './SearchInput';
import ItemList from './ItemList';

function Search() {
  const [data, setData] = useState<dbArr>([]);
  const [searched, setSearched] = useState<string[]>([]);
  const [matches, setMatches] = useState<dbArr>([]);
  const [related, setRelated] = useState<dbArr>([]);
  const [order, setOrder] = useState<string>('재구매율');
  const [inputFocused, setInputFocused] = useState(false);
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    axios('db.json')
      .then((res) => {
        setData(res.data.data);
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
    </div>
  );
}

export default Search;
