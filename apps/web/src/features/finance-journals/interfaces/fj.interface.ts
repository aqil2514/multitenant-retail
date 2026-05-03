export enum AccountCategory {
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  EQUITY = "EQUITY",
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
}

export interface FinanceAccount {
  id: string;
  code: string;
  name: string;
  category: AccountCategory;
}

export interface JournalItem {
  id: string;
  journalEntryId: string;
  accountId: string;
  // Nilai datang sebagai string dari database/Prisma Decimal
  debit: string;
  credit: string;
  note: string;
  account: FinanceAccount;
}

export interface JournalEntry {
  id: string;
  storeId: string;
  date: string; // ISO Date string
  description: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  items: JournalItem[];
}

// Untuk tipe data response list
export type FinanceJournalsResponse = JournalEntry[];
