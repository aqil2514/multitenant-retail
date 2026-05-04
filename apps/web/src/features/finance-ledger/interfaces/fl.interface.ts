// Enum untuk kategori dan saldo normal agar tipe data lebih aman (Type-safe)
export type AccountCategory =
  | "ASSET"
  | "LIABILITY"
  | "EQUITY"
  | "REVENUE"
  | "EXPENSE";
export type NormalBalance = "DEBIT" | "CREDIT";

export interface Account {
  id: string;
  storeId: string;
  code: string;
  name: string;
  category: AccountCategory;
  normalBalance: NormalBalance;
  isSystem: boolean;
  isHeader: boolean;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface JournalEntryItem {
  id: string;
  journalEntryId: string;
  accountId: string;
  debit: string; // Menggunakan string karena JSON mengirimkan data string (presisi finansial)
  credit: string;
  note: string | null;
  deletedAt: string | null;
  account: Account;
}

export interface JournalEntry {
  id: string;
  storeId: string;
  date: string;
  description: string;
  reference: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  items: JournalEntryItem[];
}

export interface JournalAccount {
  id: string;
  name: string;
  code: string;
}

export interface JournalSummary {
  openingBalance: number;
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;
}

export interface JournalResponse {
  data: JournalEntry[];
  accounts: JournalAccount[];
  summary: JournalSummary;
}
