import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FilterKeyOption,
  SelectFilterState,
  SelectOperator,
  SelectOption,
} from "../filter.interface";
import { FilterOperatorSelect } from "./operator";
import { FilterSelectInput } from "./input";

interface FilterSelectProps {
  state: SelectFilterState;
  keyOptions: FilterKeyOption[];
  options: SelectOption[];
  multiple?: boolean;
  onChange: (state: SelectFilterState) => void;
  onRemove?: () => void;
}

export function FilterSelect({
  state,
  keyOptions,
  options,
  multiple = false,
  onChange,
  onRemove,
}: FilterSelectProps) {
  const isNullOperator =
    state.operator === "is_null" || state.operator === "is_not_null";

  const handleKeyChange = (key: string) => {
    onChange({ ...state, key });
  };

  const handleOperatorChange = (operator: SelectOperator) => {
    const value =
      operator === "is_null" || operator === "is_not_null" ? [] : state.value;
    onChange({ ...state, operator, value });
  };

  const handleValueChange = (value: string[]) => {
    onChange({ ...state, value });
  };

  return (
    <div className="grid grid-cols-[minmax(0,35fr)_minmax(0,25fr)_minmax(0,40fr)] gap-2">
      <Select value={state.key} onValueChange={handleKeyChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih field" />
        </SelectTrigger>
        <SelectContent position="popper">
          {keyOptions.map((opt) => (
            <SelectItem key={opt.key} value={opt.key}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FilterOperatorSelect
        value={state.operator}
        onChange={handleOperatorChange}
      />

      <FilterSelectInput
        value={state.value}
        options={options}
        multiple={multiple}
        disabled={isNullOperator}
        onValueChange={handleValueChange}
        onClear={onRemove}
      />
    </div>
  );
}
