import { db } from 'types/db';

interface Props {
  matchItem: db;
}

function MatchItem({ matchItem }: Props) {
  return (
    <>
      <div>
        {matchItem.product_name} <span>{matchItem.repurchase_rate}</span>
      </div>
    </>
  );
}

export default MatchItem;
