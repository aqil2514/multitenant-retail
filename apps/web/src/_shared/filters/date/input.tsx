import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DateValue } from "../filter.interface";

interface FilterDateInputProps {
  value: DateValue;
  mode: "single" | "range";
  disabled?: boolean;
  onValueChange: (value: DateValue) => void;
  onClear?: () => void;
}

export function FilterDateInput({
  value,
  mode,
  disabled,
  onValueChange,
  onClear,
}: FilterDateInputProps) {
  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const from = e.target.value === "" ? null : e.target.value;
    onValueChange({ ...value, from });
  };

  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const to = e.target.value === "" ? null : e.target.value;
    onValueChange({ ...value, to });
  };

  return (
    <div className="flex min-w-0 items-center gap-1">
      {mode === "single" ? (
        <Input
          type="date"
          disabled={disabled}
          className="min-w-0 flex-1"
          value={value.from ?? ""}
          onChange={handleFrom}
        />
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <Input
            type="date"
            disabled={disabled}
            className="min-w-0 flex-1"
            placeholder="Dari"
            value={value.from ?? ""}
            onChange={handleFrom}
          />
          <span className="text-muted-foreground shrink-0 text-xs">—</span>
          <Input
            type="date"
            disabled={disabled}
            className="min-w-0 flex-1"
            placeholder="Sampai"
            value={value.to ?? ""}
            onChange={handleTo}
          />
        </div>
      )}

      <Button type="button" variant="outline" size="icon" onClick={onClear}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}