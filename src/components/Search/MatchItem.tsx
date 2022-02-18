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
        <span>
          {order}:{matchItem.repurchase_rate}
        </span>
      </div>
    </>
  );
}

export default MatchItem;
