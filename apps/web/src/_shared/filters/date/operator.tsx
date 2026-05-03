import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DateOperator,
  DateSingleOperator,
  DateRangeOperator,
} from "../filter.interface";

interface FilterOperatorDateProps {
  value: DateOperator;
  mode: "single" | "range";
  onChange: (value: DateOperator) => void;
}

const SINGLE_OPERATOR_OPTIONS: { value: DateSingleOperator; label: string }[] =
  [
    { value: "eq", label: "on" },
    { value: "neq", label: "not on" },
    { value: "gt", label: "after" },
    { value: "gte", label: "on or after" },
    { value: "lt", label: "before" },
    { value: "lte", label: "on or before" },
    { value: "is_null", label: "is empty" },
    { value: "is_not_null", label: "is not empty" },
  ];

const RANGE_OPERATOR_OPTIONS: { value: DateRangeOperator; label: string }[] = [
  { value: "between", label: "between" },
  { value: "not_between", label: "not between" },
];

export function FilterOperatorDate({
  value,
  mode,
  onChange,
}: FilterOperatorDateProps) {
  const options =
    mode === "single" ? SINGLE_OPERATOR_OPTIONS : RANGE_OPERATOR_OPTIONS;

  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as DateOperator)}
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