import React, { Dispatch, useCallback, forwardRef } from 'react';
import { dataFilter } from 'utils/functions/dataFilter';
import { dataSortingSlice } from 'utils/functions/dataSortingSlice';
import { dbArr } from 'types/db';
import ItemList from 'components/Search/ItemList';
import { useEffect } from 'react';
import { Props } from 'types/props';

const SearchInput = forwardRef<HTMLInputElement, Props>(({ order, setOrder, data, input, setInput, inputFocused, setInputFocused, searched, setSearched, matches, setMatches }, ref) => {
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!inputFocused) {
        setInputFocused(true);
      }
      setInput(e.target.value);
      let match: dbArr = dataFilter(data, e.target.value);
      if (match.length === 0) {
        setMatches([...dataSortingSlice(data, order)]);
      } else {
        setMatches([...dataSortingSlice(match, order)]);
      }
    },
    [order, data, setInput, setMatches, inputFocused, setInputFocused]
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length !== 0) {
      setSearched([input, ...searched.filter((item) => item !== input).slice(0, 4)]);
    }
    setInputFocused(false);
    window.location.href = `/search?=${input}`;
  };

  const focusInput = useCallback(() => {
    setInputFocused(true);
  }, [setInputFocused]);
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
      <ItemList
        setInputFocused={setInputFocused}
        setSearched={setSearched}
        order={order}
        setOrder={setOrder}
        data={data}
        input={input}
        inputFocused={inputFocused}
        searched={searched}
        matches={matches}
        setInput={setInput}
        setMatches={setMatches}
      />
    </div>
  );
});

export default SearchInput;
