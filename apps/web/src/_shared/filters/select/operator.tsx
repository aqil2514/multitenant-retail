import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOperator } from "../filter.interface";

interface FilterOperatorSelectProps {
  value: SelectOperator;
  onChange: (value: SelectOperator) => void;
}

const SELECT_OPERATOR_OPTIONS: { value: SelectOperator; label: string }[] = [
  { value: "eq", label: "is" },
  { value: "neq", label: "is not" },
  { value: "is_null", label: "is empty" },
  { value: "is_not_null", label: "is not empty" },
];

export function FilterOperatorSelect({
  value,
  onChange,
}: FilterOperatorSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as SelectOperator)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Operator" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {SELECT_OPERATOR_OPTIONS.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
