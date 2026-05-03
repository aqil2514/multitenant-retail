import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinanceAccounts } from "@/features/finance-accounts/fa.context";

interface AccountSelectFieldProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AccountSelectField({
  value,
  onChange,
  disabled,
}: AccountSelectFieldProps) {
  const { data, isLoading } = useFinanceAccounts();

  return (
    <Select
      value={value || undefined}
      onValueChange={onChange}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className="w-full min-w-0">
        <SelectValue
          className="truncate"
          placeholder={isLoading ? "Memuat akun..." : "Pilih akun"}
        />
      </SelectTrigger>
      <SelectContent>
        {(data ?? []).map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.code} - {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
