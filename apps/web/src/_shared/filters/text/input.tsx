import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FilterTextInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onEnterEvent?: () => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  autoFocus?: boolean;
  maxLength?: number;
}

export function FilterTextInput({
  onEnterEvent,
  onValueChange,
  value,
  autoFocus,
  clearable,
  disabled,
  maxLength,
  onClear,
  placeholder = "Masukkan nilai",
}: FilterTextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    onEnterEvent?.();
  };

  return (
    <div className="flex gap-1 items-center">
      <Input
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        className="w-full"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
      />
      {clearable && (
        <Button type="button" variant="outline" size="icon" onClick={onClear}>
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
