import { dbArr } from 'types/db';

interface Props {
  inputFocused: boolean;
  searched: string[];
  matches: dbArr;
}
function ItemList({ inputFocused, searched, matches }: Props) {
  return <div className={'item-list' + (inputFocused ? ' active' : '')}></div>;
}
export default ItemList;
