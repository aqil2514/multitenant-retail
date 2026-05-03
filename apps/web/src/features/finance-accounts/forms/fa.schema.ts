import z from "zod";

export const financeAccountSchema = z.object({
  code: z.string().min(1, "Kode akun wajib diisi"),
  name: z.string().min(1, "Nama akun wajib diisi"),
  category: z.enum(["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"], {
    error: "Pilih kategori akun yang valid",
  }),
  normalBalance: z.enum(["DEBIT", "CREDIT"], {
    error: "Pilih saldo normal yang valid",
  }),
  isHeader: z.boolean().default(false),
  parentId: z
    .string()
    .nullish()
    .transform((val) => (val === "" || val === "no-parent" ? null : val)),
  isSystem: z.boolean().default(false),
});

export type FinanceAccountInput = z.input<typeof financeAccountSchema>;
export type FinanceAccountOutput = z.output<typeof financeAccountSchema>;

export const defaultFinanceAccount: FinanceAccountInput = {
  code: "",
  name: "",
  category: "ASSET",
  normalBalance: "DEBIT",
  isHeader: false,
  parentId: "no-parent",
  isSystem: false,
};
