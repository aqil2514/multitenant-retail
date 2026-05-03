import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { NumberValue } from "../filter.interface";

interface FilterNumberInputProps {
  value: NumberValue;
  mode: "single" | "range";
  disabled?: boolean;
  onValueChange: (value: NumberValue) => void;
  onClear?: () => void;
}

export function FilterNumberInput({
  value,
  mode,
  disabled,
  onValueChange,
  onClear,
}: FilterNumberInputProps) {
  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const from = e.target.value === "" ? null : Number(e.target.value);
    onValueChange({ ...value, from });
  };

  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const to = e.target.value === "" ? null : Number(e.target.value);
    onValueChange({ ...value, to });
  };

  return (
    <div className="flex gap-1 items-center">
      {mode === "single" ? (
        <Input
          type="number"
          disabled={disabled}
          className="w-full"
          placeholder="Masukkan nilai"
          value={value.from ?? ""}
          onChange={handleFrom}
        />
      ) : (
        <div className="flex gap-1 items-center w-full">
          <Input
            type="number"
            disabled={disabled}
            className="w-full"
            placeholder="Dari"
            value={value.from ?? ""}
            onChange={handleFrom}
          />
          <span className="text-muted-foreground text-xs shrink-0">—</span>
          <Input
            type="number"
            disabled={disabled}
            className="w-full"
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
