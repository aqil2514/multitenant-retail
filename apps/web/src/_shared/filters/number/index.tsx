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
  NumberFilterState,
  NumberOperator,
  NumberValue,
} from "../filter.interface";
import { toggleNumberMode } from "../filter.utils";
import { FilterOperatorNumber } from "./operator";
import { FilterNumberInput } from "./input";

interface FilterNumberProps {
  state: NumberFilterState;
  keyOptions: FilterKeyOption[];
  onChange: (state: NumberFilterState) => void;
  onRemove?: () => void;
}

export function FilterNumber({
  state,
  keyOptions,
  onChange,
  onRemove,
}: FilterNumberProps) {
  const isNullOperator =
    state.operator === "is_null" || state.operator === "is_not_null";

  const handleKeyChange = (key: string) => {
    onChange({ ...state, key });
  };

  const handleOperatorChange = (operator: NumberOperator) => {
    const value =
      operator === "is_null" || operator === "is_not_null"
        ? { from: null, to: null }
        : state.value;
    onChange({ ...state, operator, value });
  };

  const handleValueChange = (value: NumberValue) => {
    onChange({ ...state, value });
  };

  const handleToggleMode = () => {
    onChange(toggleNumberMode(state));
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

      <div className="flex gap-1">
        <FilterOperatorNumber
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

      <FilterNumberInput
        value={state.value}
        mode={state.mode}
        disabled={isNullOperator}
        onValueChange={handleValueChange}
        onClear={onRemove}
      />
    </div>
  );
}