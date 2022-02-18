import React, { Dispatch, useCallback, useEffect, forwardRef } from 'react';
import { dbArr } from 'types/db';

interface Props {
  data: dbArr;
  input: string;
  setInput: Dispatch<any>;
  inputFocused: boolean;
  setInputFocused: Dispatch<any>;
  searched: string[];
  setSearched: Dispatch<any>;
  matches: dbArr;
  setMatches: Dispatch<any>;
}
const SearchInput = forwardRef<HTMLInputElement, Props>(({ data, input, setInput, inputFocused, setInputFocused, searched, setSearched, matches, setMatches }, ref) => {
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      let match: dbArr = data.filter((item) => {
        const regex = new RegExp(e.target.value, 'gi');
        return item.product_name.match(regex);
      });
      if (match.length === 0) {
        setMatches(
          [
            ...data.sort((a, b) => {
              return b.repurchase_rate - a.repurchase_rate;
            }),
          ].slice(0, 5)
        );
      } else {
        setMatches(
          match
            .sort((a, b) => {
              return b.repurchase_rate - a.repurchase_rate;
            })
            .slice(0, 5)
        );
      }
    },
    [input]
  );
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length !== 0) {
      setSearched([input, ...searched.slice(0, 4)]);

      setInput('');
    }
    setInputFocused(true);
  };

  const focusInput = useCallback(() => {
    setInputFocused(true);
  }, [inputFocused]);
  return (
    <div className='search-input-container'>
      <form onSubmit={submitHandler}>
        <div className='search-input-border'>
          <input ref={ref} type='text' placeholder='검색어를 입력하세요.' className='search-input' value={input} onChange={onChangeHandler} onClick={focusInput}></input>
          <button type='submit'>
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </div>
      </form>
    </div>
  );
});

export default SearchInput;
