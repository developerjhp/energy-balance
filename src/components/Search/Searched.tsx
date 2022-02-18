import React from 'react';
import { Dispatch } from 'react';
import { dbArr } from 'types/db';
import { dataFilter } from 'utils/functions/dataFilter';
import { dataSortingSlice } from 'utils/functions/dataSortingSlice';

interface Props {
  order: string;
  data: dbArr;
  searchedName: string;
  setInput: Dispatch<any>;
  setMatches: Dispatch<any>;
}

function Searched({ order, data, searchedName, setInput, setMatches }: Props) {
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setInput(searchedName);
    let match: dbArr = dataFilter(data, searchedName);
    if (match.length === 0) {
      setMatches([...dataSortingSlice(data, order)]);
    } else {
      setMatches([...dataSortingSlice(match, order)]);
    }
  };
  return (
    <>
      <div className='searched-item' onClick={onClickHandler}>
        {searchedName}
      </div>
    </>
  );
}
export default Searched;
