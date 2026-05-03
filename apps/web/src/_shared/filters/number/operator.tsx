import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NumberOperator,
  NumberSingleOperator,
  NumberRangeOperator,
} from "../filter.interface";

interface FilterOperatorNumberProps {
  value: NumberOperator;
  mode: "single" | "range";
  onChange: (value: NumberOperator) => void;
}

const SINGLE_OPERATOR_OPTIONS: {
  value: NumberSingleOperator;
  label: string;
}[] = [
  { value: "eq", label: "=" },
  { value: "neq", label: "≠" },
  { value: "gt", label: ">" },
  { value: "gte", label: "≥" },
  { value: "lt", label: "<" },
  { value: "lte", label: "≤" },
  { value: "is_null", label: "is empty" },
  { value: "is_not_null", label: "is not empty" },
];

const RANGE_OPERATOR_OPTIONS: { value: NumberRangeOperator; label: string }[] =
  [
    { value: "between", label: "between" },
    { value: "not_between", label: "not between" },
  ];

export function FilterOperatorNumber({
  value,
  mode,
  onChange,
}: FilterOperatorNumberProps) {
  const options =
    mode === "single" ? SINGLE_OPERATOR_OPTIONS : RANGE_OPERATOR_OPTIONS;

  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as NumberOperator)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Operator" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {options.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
