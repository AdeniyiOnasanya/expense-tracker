import type { TransactionType } from './TransactionType';

export type Transaction = {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
};
