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
      <ul>
        {searched.map((item) => {
          return <Searched key={item} searchedName={item} />;
        })}
      </ul>
      <p>일치하는 제품</p>
      <ul>
        {matches.map((item) => {
          return <MatchItem key={item.id} matchItem={item} />;
        })}
      </ul>
    </div>
  );
}
export default ItemList;
