import React, { useState, useEffect, useRef } from 'react';

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

  const [inputFocused, setInputFocused] = useState(false);
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    axios('db.json').then((res) => {
      setData(res.data.data);
    });
  }, []);
  useEffect(() => {
    const focusFalse = (e: any) => {
      if (inputFocused && e.target !== inputRef.current) {
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
      <ItemList inputFocused={inputFocused} searched={searched} matches={matches} />
    </div>
  );
}

export default Search;