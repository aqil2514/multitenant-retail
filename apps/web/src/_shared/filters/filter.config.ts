import { SelectOption } from "./filter.interface";

export interface TextFilterConfig {
  type: "text";
  key: string;
  label: string;
}

export interface SelectFilterConfig {
  type: "select";
  key: string;
  label: string;
  options: SelectOption[];
  multiple?: boolean;
}

export interface NumberFilterConfig {
  type: "number";
  key: string;
  label: string;
}

// Union utama — akan bertambah seiring tipe filter baru ditambahkan
export type FilterConfig =
  | TextFilterConfig
  | SelectFilterConfig
  | NumberFilterConfig;
