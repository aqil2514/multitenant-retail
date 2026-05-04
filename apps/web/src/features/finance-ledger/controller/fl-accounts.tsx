import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinanceLedger } from "../fl.context";
import { useMemo } from "react";
import { LabelValue } from "@/@types/general";

interface Props {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

export function AccountFilter({ onValueChange, value }: Props) {
  const { data, isLoading } = useFinanceLedger();

  const options = useMemo<LabelValue[]>(
    () =>
      data
        ? data.accounts.map((d) => ({
            label: `${d.code} - ${d.name}`,
            value: d.id,
          }))
        : [],
    [data],
  );

  return (
    <Select value={value} onValueChange={onValueChange} disabled={isLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Akun" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
