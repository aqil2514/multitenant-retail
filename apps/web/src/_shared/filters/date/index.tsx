import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import {
  FilterKeyOption,
  DateFilterState,
  DateOperator,
  DateValue,
} from "../filter.interface";
import { toggleDateMode } from "../filter.utils";
import { FilterOperatorDate } from "./operator";
import { FilterDateInput } from "./input";

interface FilterDateProps {
  state: DateFilterState;
  keyOptions: FilterKeyOption[];
  onChange: (state: DateFilterState) => void;
  onRemove?: () => void;
}

export function FilterDate({
  state,
  keyOptions,
  onChange,
  onRemove,
}: FilterDateProps) {
  const isNullOperator =
    state.operator === "is_null" || state.operator === "is_not_null";

  const handleKeyChange = (key: string) => {
    onChange({ ...state, key });
  };

  const handleOperatorChange = (operator: DateOperator) => {
    const value =
      operator === "is_null" || operator === "is_not_null"
        ? { from: null, to: null }
        : state.value;
    onChange({ ...state, operator, value });
  };

  const handleValueChange = (value: DateValue) => {
    onChange({ ...state, value });
  };

  const handleToggleMode = () => {
    onChange(toggleDateMode(state));
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

      <div className="flex min-w-0 gap-1">
        <FilterOperatorDate
          value={state.operator}
          mode={state.mode}
          onChange={handleOperatorChange}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          title={state.mode === "single" ? "Ganti ke rentang" : "Ganti ke nilai tunggal"}
          onClick={handleToggleMode}
        >
          <ArrowLeftRight className="w-4 h-4" />
        </Button>
      </div>

      <FilterDateInput
        value={state.value}
        mode={state.mode}
        disabled={isNullOperator}
        onValueChange={handleValueChange}
        onClear={onRemove}
      />
    </div>
  );
}