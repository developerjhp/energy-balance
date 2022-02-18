import { db } from 'types/db';

interface Props {
  matchItem: db;
}

function MatchItem({ matchItem }: Props) {
  return (
    <>
      <li>{matchItem.product_name}</li>
    </>
  );
}

export default MatchItem;
