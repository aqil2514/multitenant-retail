// ============================================================
// Operator
// ============================================================

export type TextOperator = "ilike" | "not_ilike" | "is_null" | "is_not_null";
export type SelectOperator = "eq" | "neq" | "is_null" | "is_not_null";
export type NumberSingleOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "is_null"
  | "is_not_null";
export type NumberRangeOperator = "between" | "not_between";
export type NumberOperator = NumberSingleOperator | NumberRangeOperator;

export type DateSingleOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "is_null"
  | "is_not_null";
export type DateRangeOperator = "between" | "not_between";
export type DateOperator = DateSingleOperator | DateRangeOperator;

// Union utama — akan bertambah seiring tipe filter baru ditambahkan
export type FilterOperator =
  | TextOperator
  | SelectOperator
  | NumberOperator
  | DateOperator;

// ============================================================
// State
// ============================================================

export interface TextFilterState {
  type: "text";
  key: string;
  operator: TextOperator;
  value: string; // kosong saat operator is_null / is_not_null
}

export interface SelectFilterState {
  type: "select";
  key: string;
  operator: SelectOperator;
  value: string[]; // selalu array, single select = array of 1
}

export interface NumberValue {
  from: number | null;
  to: number | null;
}

export interface NumberFilterState {
  type: "number";
  key: string;
  operator: NumberOperator;
  value: NumberValue;
  mode: "single" | "range";
}

export interface DateValue {
  from: string | null; // ISO string: "2026-05-03"
  to: string | null;
}

export interface DateFilterState {
  type: "date";
  key: string;
  operator: DateOperator;
  value: DateValue;
  mode: "single" | "range";
}

// Union utama — akan bertambah seiring tipe filter baru ditambahkan
export type FilterState =
  | TextFilterState
  | SelectFilterState
  | NumberFilterState
  | DateFilterState;

// ============================================================
// Config
// ============================================================

export interface SelectOption {
  value: string;
  label: string;
}

// Dipakai sebagai pilihan field di key selector
export interface FilterKeyOption {
  key: string;
  label: string;
}

// ============================================================
// Default
// ============================================================

export const DEFAULT_TEXT_FILTER: TextFilterState = {
  type: "text",
  key: "",
  operator: "ilike",
  value: "",
};

export const DEFAULT_SELECT_FILTER: SelectFilterState = {
  type: "select",
  key: "",
  operator: "eq",
  value: [],
};

export const DEFAULT_NUMBER_FILTER: NumberFilterState = {
  type: "number",
  key: "",
  operator: "gt",
  value: { from: null, to: null },
  mode: "single",
};

export const DEFAULT_DATE_FILTER: DateFilterState = {
  type: "date",
  key: "",
  operator: "eq",
  value: { from: null, to: null },
  mode: "single",
};
