import { Dispatch } from 'react';
import { db } from 'types/db';

interface Props {
  setInput: Dispatch<any>;
  matchItem: db;
  order: string;
}

function MatchItem({ setInput, order, matchItem }: Props) {
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setInput(matchItem.product_name);
  };
  return (
    <>
      <div className='item-name' onClick={onClickHandler}>
        {matchItem.product_name}{' '}
        <div className='score'>
          {order}:{order === '재구매율' ? matchItem.repurchase_rate : matchItem.grade}
        </div>
      </div>
    </>
  );
}

export default MatchItem;
