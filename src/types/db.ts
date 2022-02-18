export interface db {
  id: number;
  product_name: string;
  brand: string;
  grade: number;
  repurchase_rate: number;
  related: string[];
}

export type dbArr = db[];
