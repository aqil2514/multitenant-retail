import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextOperator } from "../filter.interface";

interface FilterOperatorTextProps {
  value: TextOperator;
  onChange: (value: TextOperator) => void;
}

const TEXT_OPERATOR_OPTIONS: { value: TextOperator; label: string }[] = [
  { value: "ilike", label: "contains" },
  { value: "not_ilike", label: "not contains" },
  { value: "is_null", label: "is empty" },
  { value: "is_not_null", label: "is not empty" },
];

export function FilterOperatorText({
  value,
  onChange,
}: FilterOperatorTextProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as TextOperator)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Operator" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {TEXT_OPERATOR_OPTIONS.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
