import { journalDateSchema } from "@/_shared/forms/form-field-date";
import z from "zod";

export const journalItemSchema = z.object({
  accountId: z.string().uuid("Pilih akun yang valid"),
  debit: z.coerce.number().min(0, "Nilai tidak boleh negatif").default(0),
  credit: z.coerce.number().min(0, "Nilai tidak boleh negatif").default(0),
  note: z.string().optional(),
});

export const journalEntrySchema = z
  .object({
    date: journalDateSchema,
    description: z.string().min(1, "Keterangan wajib diisi"),
    reference: z.string().nullish(),
    items: z
      .array(journalItemSchema)
      .min(2, "Minimal harus ada 2 baris (Debit & Kredit)"),
  })
  .refine(
    (data) => {
      // Menghitung total debit dan kredit
      const totalDebit = data.items.reduce((sum, item) => sum + item.debit, 0);
      const totalCredit = data.items.reduce(
        (sum, item) => sum + item.credit,
        0,
      );

      // Menggunakan selisih sangat kecil untuk menghindari floating point error
      return Math.abs(totalDebit - totalCredit) < 0.01;
    },
    {
      message: "Total Debit dan Kredit harus seimbang (Balance)",
      path: ["items"], // Error akan muncul di level array items
    },
  );

export type JournalEntryInput = z.input<typeof journalEntrySchema>;
export type JournalEntryOutput = z.output<typeof journalEntrySchema>;

// Default value untuk form baru
export const defaultJournalEntry: JournalEntryInput = {
  date: new Date(),
  description: "",
  reference: "",
  items: [
    { accountId: "", debit: 0, credit: 0, note: "" },
    { accountId: "", debit: 0, credit: 0, note: "" },
  ],
};
