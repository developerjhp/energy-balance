import { Dispatch, useState } from 'react';
import { dbArr } from 'types/db';
import Searched from './Searched';
import MatchItem from './MatchItem';
interface Props {
  order: string;
  data: dbArr;
  inputFocused: boolean;
  searched: string[];
  matches: dbArr;
  setInput: Dispatch<any>;
  setMatches: Dispatch<any>;
}
function ItemList({ order, data, inputFocused, searched, matches, setInput, setMatches }: Props) {
  return (
    <div className={'item-list' + (inputFocused ? ' active' : '')}>
      <p>최근 검색어</p>

      {searched.map((item) => {
        return <Searched order={order} data={data} key={item} searchedName={item} setInput={setInput} setMatches={setMatches} />;
      })}

      <p>일치하는 제품</p>

      {matches.map((item) => {
        return <MatchItem key={item.id} matchItem={item} />;
      })}
    </div>
  );
}
export default ItemList;
