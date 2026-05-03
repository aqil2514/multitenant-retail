import { BaseFormComponentProps } from "@/_shared/forms/form.interface";
import {
  defaultFinanceAccount,
  FinanceAccountInput,
  FinanceAccountOutput,
  financeAccountSchema,
} from "./fa.schema";
import {
  BaseForm,
  FormFieldText,
  FormFieldSwitch,
} from "@/_shared/forms";
import { ParentAccountSelectField } from "./parent-account-select-field";
import { CategoryAndNormalBalanceField } from "./category-balance-field";

export function FinanceAccountForm({
  onSubmit,
  defaultValues,
}: BaseFormComponentProps<FinanceAccountInput, FinanceAccountOutput>) {
  return (
    <BaseForm
      defaultValues={defaultValues ?? defaultFinanceAccount}
      schema={financeAccountSchema}
      onSubmit={onSubmit}
    >
      {(form) => (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldText
              form={form}
              name="code"
              label="Kode Akun"
              placeholder="Misal: 101.01"
            />
            <FormFieldText
              form={form}
              name="name"
              label="Nama Akun"
              placeholder="Misal: Kas Kecil"
            />
          </div>

          <CategoryAndNormalBalanceField form={form} />

          <ParentAccountSelectField form={form} currentId={undefined} />

          <div className="p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <FormFieldSwitch
              form={form}
              name="isHeader"
              label="Jadikan sebagai Akun Header"
              description="Akun header hanya berfungsi sebagai grup dan tidak bisa digunakan untuk transaksi langsung."
            />
          </div>
        </div>
      )}
    </BaseForm>
  );
}
