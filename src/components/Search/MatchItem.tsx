import { db } from 'types/db';

interface Props {
  matchItem: db;
}

function MatchItem({ matchItem }: Props) {
  return (
    <>
      <div className='item-name'>{matchItem.product_name}</div>
    </>
  );
}

export default MatchItem;
