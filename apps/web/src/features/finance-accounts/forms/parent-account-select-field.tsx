import { FormFieldSelect } from "../../../_shared/forms";
import { UseFormReturn } from "react-hook-form";
import { useFinanceAccounts } from "../fa.context";
import { FinanceAccountInput, FinanceAccountOutput } from "./fa.schema";

interface ParentAccountSelectFieldProps {
  form: UseFormReturn<FinanceAccountInput, unknown, FinanceAccountOutput>;
  currentId?: string;
}

export function ParentAccountSelectField({
  form,
  currentId,
}: ParentAccountSelectFieldProps) {
  const { data, isLoading } = useFinanceAccounts();

  const parentOptions = (data ?? [])
    .filter((account) => account.isHeader && account.id !== currentId)
    .map((account) => ({
      label: `${account.code} - ${account.name}`,
      value: account.id,
    }));

  return (
    <FormFieldSelect
      form={form}
      name="parentId"
      label="Induk Akun"
      placeholder={
        isLoading ? "Memuat daftar akun..." : "Pilih akun induk (opsional)"
      }
      disabled={isLoading}
      options={[
        { label: "Tanpa Induk (Akun Utama)", value: "no-parent" },
        ...parentOptions,
      ]}
    />
  );
}
