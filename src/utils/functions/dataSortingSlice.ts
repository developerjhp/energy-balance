import { dbArr } from 'types/db';

export const dataSortingSlice = (data: dbArr, condition: string): dbArr => {
  if (condition === '재구매율') {
    return [
      ...data.sort((a, b) => {
        return b.repurchase_rate - a.repurchase_rate;
      }),
    ].slice(0, 5);
  } else {
    return [
      ...data.sort((a, b) => {
        return b.grade - a.grade;
      }),
    ].slice(0, 5);
  }
};
