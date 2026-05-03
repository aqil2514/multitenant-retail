export type FilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "ilike"
  | "not_ilike"
  | "is_null"
  | "is_not_null";

export interface FilterState {
  key: string;
  value: string;
  operator?: FilterOperator;
}
