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
      console.log(input);
      setMatches([
        ...data.filter((item) => {
          const regex = new RegExp(e.target.value, 'gi');
          return item.product_name.match(regex);
        }),
      ]);
    },
    [input]
  );
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length !== 0) {
      setSearched([...searched, input]);
      setInput('');
    }
  };

  const focusInput = useCallback(() => {
    setInputFocused(true);
    console.log(inputFocused);
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
