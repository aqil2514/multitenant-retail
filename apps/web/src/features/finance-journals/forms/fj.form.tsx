import { BaseFormComponentProps } from "@/_shared/forms/form.interface";
import { BaseForm, FormFieldDate, FormFieldText, FormFieldTextarea } from "@/_shared/forms";
import { FormFieldArray } from "@/_shared/forms/form-field-array";
import { FormFieldCurrency } from "@/_shared/forms/form-field-currency";
import {
  defaultJournalEntry,
  JournalEntryInput,
  JournalEntryOutput,
  journalEntrySchema,
} from "./fj.schema";
import { AccountSelectField } from "./account-select-field";
import { useWatch, UseFormReturn } from "react-hook-form";
import { InfoIcon } from "lucide-react";

function JournalEntryFormFields({
  form,
}: {
  form: UseFormReturn<JournalEntryInput, unknown, JournalEntryOutput>;
}) {
  const items = useWatch({ control: form.control, name: "items" }) || [];
  const totalDebit = items.reduce(
    (sum: number, item: JournalEntryInput["items"][number]) =>
      sum + (Number(item.debit) || 0),
    0,
  );
  const totalCredit = items.reduce(
    (sum: number, item: JournalEntryInput["items"][number]) =>
      sum + (Number(item.credit) || 0),
    0,
  );
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFieldDate form={form} name="date" label="Tanggal Transaksi" />
        <FormFieldText
          form={form}
          name="reference"
          label="No. Referensi / Bukti"
          placeholder="Misal: INV-001 atau BM-001"
        />
      </div>

      <FormFieldTextarea
        form={form}
        name="description"
        label="Keterangan Jurnal"
        placeholder="Deskripsikan tujuan transaksi ini..."
      />

      <div className="border rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/50">
        <FormFieldArray
          form={form}
          name="items"
          label="Item Debit & Kredit"
          addLabel="Tambah Baris Jurnal"
          defaultItem={{ accountId: "", debit: 0, credit: 0, note: "" }}
          columns={[
            {
              key: "accountId",
              label: "Akun",
              width: "minmax(0,2fr)",
              render: ({ field, disabled }) => (
                <AccountSelectField
                  value={String(field.value ?? "")}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              ),
            },
            {
              key: "debit",
              label: "Debit",
              width: "minmax(0,1.1fr)",
              render: ({ field, disabled }) => (
                <div>
                  <FormFieldCurrency
                    form={form}
                    name={field.name as never}
                    label=" "
                    disabled={disabled}
                    placeholder="0"
                  />
                </div>
              ),
            },
            {
              key: "credit",
              label: "Kredit",
              width: "minmax(0,1.1fr)",
              render: ({ field, disabled }) => (
                <div>
                  <FormFieldCurrency
                    form={form}
                    name={field.name as never}
                    label=" "
                    disabled={disabled}
                    placeholder="0"
                  />
                </div>
              ),
            },
            {
              key: "note",
              label: "Catatan Baris",
              width: "minmax(0,1.35fr)",
              placeholder: "Opsional",
            },
          ]}
        />

        <div className="mt-4 pt-4 border-t flex flex-col md:flex-row md:justify-end gap-4 text-sm">
          <div className="flex justify-between md:gap-8 border-b md:border-none pb-2 md:pb-0">
            <span className="text-muted-foreground">Total Debit:</span>
            <span className="font-mono font-bold text-blue-600">
              {Intl.NumberFormat("id-ID").format(totalDebit)}
            </span>
          </div>
          <div className="flex justify-between md:gap-8 border-b md:border-none pb-2 md:pb-0">
            <span className="text-muted-foreground">Total Kredit:</span>
            <span className="font-mono font-bold text-orange-600">
              {Intl.NumberFormat("id-ID").format(totalCredit)}
            </span>
          </div>
        </div>

        {!isBalanced && items.length >= 2 && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              Jurnal belum seimbang. Selisih:{" "}
              {Intl.NumberFormat("id-ID").format(
                Math.abs(totalDebit - totalCredit),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function JournalEntryForm({
  onSubmit,
  defaultValues,
}: BaseFormComponentProps<JournalEntryInput, JournalEntryOutput>) {
  return (
    <BaseForm
      defaultValues={defaultValues ?? defaultJournalEntry}
      schema={journalEntrySchema}
      onSubmit={onSubmit}
    >
      {(form) => <JournalEntryFormFields form={form} />}
    </BaseForm>
  );
}
