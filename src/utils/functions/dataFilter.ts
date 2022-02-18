import { db, dbArr } from 'types/db';

export const dataFilter = (data: dbArr, value: string): dbArr => {
  return data.filter((item) => {
    const regex = new RegExp(value, 'gi');
    return item.product_name.match(regex);
  });
};
