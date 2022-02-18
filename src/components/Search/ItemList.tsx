import { useEffect } from 'react';
import { dbArr } from 'types/db';
import Searched from './Searched';
import MatchItem from './MatchItem';
interface Props {
  inputFocused: boolean;
  searched: string[];
  matches: dbArr;
}
function ItemList({ inputFocused, searched, matches }: Props) {
  useEffect(() => {
    console.log(matches);
  }, []);
  return (
    <div className={'item-list' + (inputFocused ? ' active' : '')}>
      <p>최근 검색어</p>

      {searched.map((item) => {
        return <Searched key={item} searchedName={item} />;
      })}

      <p>일치하는 제품(재구매 비율 순서)</p>

      {matches.map((item) => {
        return <MatchItem key={item.id} matchItem={item} />;
      })}
    </div>
  );
}
export default ItemList;
