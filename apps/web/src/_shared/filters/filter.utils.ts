import { FilterConfig } from "./filter.config";
import {
  DateFilterState,
  DateOperator,
  DateSingleOperator,
  DEFAULT_DATE_FILTER,
  DEFAULT_NUMBER_FILTER,
  DEFAULT_SELECT_FILTER,
  DEFAULT_TEXT_FILTER,
  FilterState,
  NumberFilterState,
  NumberOperator,
  NumberSingleOperator,
  SelectOperator,
  TextOperator,
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

const RANGE_SEPARATOR = "~";
const MULTI_SEPARATOR = "|";

export function encodeFilters(filters: FilterState[]): string {
  return filters
    .filter((f) => f.key !== "")
    .map((f) => `${f.key}=${encodeFilterValue(f)}`)
    .join("&");
}

function encodeFilterValue(filter: FilterState): string {
  if (filter.type === "text") {
    return `${filter.operator}:${filter.value}`;
  }

  if (filter.type === "select") {
    return `${filter.operator}:${filter.value.join(MULTI_SEPARATOR)}`;
  }

  if (filter.type === "number" || filter.type === "date") {
    if (filter.mode === "range") {
      return `${filter.operator}:${filter.value.from ?? ""}${RANGE_SEPARATOR}${filter.value.to ?? ""}`;
    }
    return `${filter.operator}:${filter.value.from ?? ""}`;
  }

  throw new Error(`Tipe filter tidak dikenali`);
}

export function decodeFilters(
  searchParams: URLSearchParams,
  config: FilterConfig[],
): FilterState[] {
  const result: FilterState[] = [];

  for (const cfg of config) {
    const raw = searchParams.get(cfg.key);
    if (!raw) continue;

    const decoded = decodeFilterValue(raw, cfg);
    if (decoded) result.push(decoded);
  }

  return result;
}

function decodeFilterValue(
  raw: string,
  config: FilterConfig,
): FilterState | null {
  try {
    const colonIndex = raw.indexOf(":");
    const operator = raw.slice(0, colonIndex);
    const value = raw.slice(colonIndex + 1);

    if (config.type === "text") {
      return {
        type: "text",
        key: config.key,
        operator: operator as TextOperator,
        value,
      };
    }

    if (config.type === "select") {
      return {
        type: "select",
        key: config.key,
        operator: operator as SelectOperator,
        value: value ? value.split(MULTI_SEPARATOR) : [],
      };
    }

    if (config.type === "number") {
      const isRange = operator === "between" || operator === "not_between";
      const [from, to] = isRange ? value.split(RANGE_SEPARATOR) : [value, ""];
      return {
        type: "number",
        key: config.key,
        operator: operator as NumberOperator,
        mode: isRange ? "range" : "single",
        value: {
          from: from !== "" ? Number(from) : null,
          to: to !== "" ? Number(to) : null,
        },
      };
    }

    if (config.type === "date") {
      const isRange = operator === "between" || operator === "not_between";
      const [from, to] = isRange ? value.split(RANGE_SEPARATOR) : [value, ""];
      return {
        type: "date",
        key: config.key,
        operator: operator as DateOperator,
        mode: isRange ? "range" : "single",
        value: {
          from: from !== "" ? from : null,
          to: to !== "" ? to : null,
        },
      };
    }

    return null;
  } catch {
    return null;
  }
}
