import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { SelectOption } from "../filter.interface";

interface FilterSelectInputProps {
  value: string[];
  options: SelectOption[];
  multiple?: boolean;
  disabled?: boolean;
  onValueChange: (value: string[]) => void;
  onClear?: () => void;
}

export function FilterSelectInput({
  value,
  options,
  multiple = false,
  disabled,
  onValueChange,
  onClear,
}: FilterSelectInputProps) {
  const handleCheck = (optValue: string, checked: boolean) => {
    if (multiple) {
      if (checked) {
        onValueChange([...value, optValue]);
      } else {
        onValueChange(value.filter((v) => v !== optValue));
      }
    } else {
      onValueChange(checked ? [optValue] : []);
    }
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <div className="flex min-w-0 items-center gap-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="min-w-0 flex-1 justify-start overflow-hidden font-normal"
          >
            <span className="block truncate">
              {selectedLabels || (
                <span className="text-muted-foreground">Pilih nilai</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          <div className="space-y-1">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-accent cursor-pointer text-sm"
              >
                <Checkbox
                  checked={value.includes(opt.value)}
                  onCheckedChange={(checked) =>
                    handleCheck(opt.value, checked as boolean)
                  }
                />
                {opt.label}
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button type="button" variant="outline" size="icon" onClick={onClear}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
