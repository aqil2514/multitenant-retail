export type Assets = {
  id: string;
  name: string;
  type: "Current" | "Fixed";
  value: number;
};

export type Liability = {
  id: string;
  name: string;
  type: "short" | "long";
  amount: number;
};

export type Equity = {
  id: string;
  name: string;
  type: "short" | "long";
  amount: number;
};

export type FinanceBalanceSheet = {
  id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  result: [assets: Assets[], liability: Liability[], equity: Equity[]];
};

export type FinanceBalanceSheetResponse = FinanceBalanceSheetResponse[];
