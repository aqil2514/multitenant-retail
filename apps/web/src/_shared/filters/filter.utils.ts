import { FilterConfig } from "./filter.config";
import {
  DateFilterState,
  DateSingleOperator,
  DEFAULT_DATE_FILTER,
  DEFAULT_NUMBER_FILTER,
  DEFAULT_SELECT_FILTER,
  DEFAULT_TEXT_FILTER,
  FilterState,
  NumberFilterState,
  NumberSingleOperator,
} from "./filter.interface";

export function buildDefaultState(config: FilterConfig): FilterState {
  if (config.type === "text") {
    return { ...DEFAULT_TEXT_FILTER, key: config.key };
  }
  if (config.type === "select") {
    return { ...DEFAULT_SELECT_FILTER, key: config.key };
  }
  if (config.type === "number") {
    return { ...DEFAULT_NUMBER_FILTER, key: config.key };
  }
  if (config.type === "date") {
    return { ...DEFAULT_DATE_FILTER, key: config.key };
  }
  const _exhaustive: never = config;
  throw new Error(
    `Tipe filter tidak dikenali: ${(_exhaustive as FilterConfig).type}`,
  );
}

export function toggleDateMode(state: DateFilterState): DateFilterState {
  if (state.mode === "single") {
    return {
      ...state,
      mode: "range",
      operator: "between",
      value: { from: state.value.from, to: null },
    };
  }

  const singleOperator: DateSingleOperator =
    state.operator === "between" || state.operator === "not_between"
      ? "eq"
      : (state.operator as DateSingleOperator);

  return {
    ...state,
    mode: "single",
    operator: singleOperator,
    value: { from: state.value.from, to: null },
  };
}

// Single → range: bawa from, kosongkan to
// Range → single: pakai from saja, operator reset ke gt
export function toggleNumberMode(state: NumberFilterState): NumberFilterState {
  if (state.mode === "single") {
    return {
      ...state,
      mode: "range",
      operator: "between",
      value: { from: state.value.from, to: null },
    };
  }

  const singleOperator: NumberSingleOperator =
    state.operator === "between" || state.operator === "not_between"
      ? "gt"
      : (state.operator as NumberSingleOperator);

  return {
    ...state,
    mode: "single",
    operator: singleOperator,
    value: { from: state.value.from, to: null },
  };
}
