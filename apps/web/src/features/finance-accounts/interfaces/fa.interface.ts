export enum AccountCategory {
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  EQUITY = "EQUITY",
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
}

export enum NormalBalance {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export interface FinanceAccountsColumn {
  id: string;
  code: string;
  name: string;
  category: AccountCategory;
  normalBalance: NormalBalance;
  isSystem: boolean;
  isHeader: boolean;
  parentId: string | null;
}
