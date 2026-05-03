import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FilterKeyOption,
  TextFilterState,
  TextOperator,
} from "../filter.interface";
import { FilterOperatorText } from "./operator";
import { FilterTextInput } from "./input";

interface FilterTextProps {
  state: TextFilterState;
  keyOptions: FilterKeyOption[];
  onChange: (state: TextFilterState) => void;
  onEnter?: () => void;
  onRemove?: () => void;
}

export function FilterText({
  state,
  keyOptions,
  onChange,
  onEnter,
  onRemove,
}: FilterTextProps) {
  const isNullOperator =
    state.operator === "is_null" || state.operator === "is_not_null";

  const handleKeyChange = (key: string) => {
    onChange({ ...state, key });
  };

  const handleOperatorChange = (operator: TextOperator) => {
    const value =
      operator === "is_null" || operator === "is_not_null" ? "" : state.value;
    onChange({ ...state, operator, value });
  };

  const handleValueChange = (value: string) => {
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

      <FilterOperatorText
        value={state.operator}
        onChange={handleOperatorChange}
      />

      <FilterTextInput
        value={state.value}
        disabled={isNullOperator}
        onValueChange={handleValueChange}
        onEnterEvent={onEnter}
        onClear={onRemove}
        clearable
      />
    </div>
  );
}
