export enum FinanceCashflowCategory {
  OPERATING = "operating",
  INVESTING = "investing",
  OTHER = "other",
}

export enum FinanceCashflowType {
  IN = "in",
  OUT = "out",
}

export type FinanceCashflow = {
  id: string;
  date: Date;
  category: FinanceCashflowCategory;
  amount: number;
  type: FinanceCashflowType;
};

export type FinanceCashflowEntry = {
  id: string;
  storeId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  items: FinanceCashflow[];
};

export type FinanceCashflowRespons = FinanceCashflowRespons[];
