import React, { Dispatch, useState } from 'react';
import { dbArr } from 'types/db';
import Searched from './Searched';
import MatchItem from './MatchItem';
import { orderCondition } from 'utils/constants/order';
import { useCallback } from 'react';
import { dataFilter } from 'utils/functions/dataFilter';
import { dataSortingSlice } from 'utils/functions/dataSortingSlice';
interface Props {
  order: string;
  setOrder: Dispatch<any>;
  data: dbArr;
  input: string;
  inputFocused: boolean;
  searched: string[];
  matches: dbArr;
  setInput: Dispatch<any>;
  setMatches: Dispatch<any>;
}
function ItemList({ order, setOrder, data, input, inputFocused, searched, matches, setInput, setMatches }: Props) {
  const onClickHandler = useCallback(
    (condition: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      console.log(condition);
      setOrder(condition);

      let match: dbArr = dataFilter(data, input);
      setMatches([...dataSortingSlice(match, condition)]);
    },
    [data, setOrder, setMatches, input]
  );

  return (
    <div className={'item-list' + (inputFocused ? ' active' : '')}>
      <div className='section'>
        <p>최근 검색어</p>
      </div>
      {searched.map((item) => {
        return <Searched order={order} data={data} key={item} searchedName={item} setInput={setInput} setMatches={setMatches} />;
      })}

      <div className='section'>
        <p>일치하는 제품 ({order}이 높은 순)</p>
        <div className='condition-list'>
          {orderCondition.map((order) => {
            return (
              <button key={order} onClick={onClickHandler(order)}>
                {order}
              </button>
            );
          })}
        </div>
      </div>

      {matches.map((item) => {
        return <MatchItem key={item.id} setInput={setInput} order={order} matchItem={item} />;
      })}
    </div>
  );
}
export default ItemList;
