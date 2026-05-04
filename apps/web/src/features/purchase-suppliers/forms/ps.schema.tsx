import { phoneFieldSchema } from "@/_shared/forms/form-field-phone";
import { z } from "zod";

export const SupplierStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);

export const SupplierSchema = z.object({
  name: z.string().min(1, "Nama supplier wajib diisi"),
  code: z.string().optional(),
  phone: phoneFieldSchema.optional(),
  email: z.email("Format email tidak valid").optional().or(z.literal("")),
  address: z.string().optional(),
  status: SupplierStatusEnum.default("ACTIVE"),
  notes: z.string().optional(),
});

export type SupplierFormInput = z.input<typeof SupplierSchema>;
export type SupplierFormOutput = z.output<typeof SupplierSchema>;

export const supplierDefaultValues: SupplierFormInput = {
  name: "",
  code: "",
  phone: "",
  email: "",
  address: "",
  status: "ACTIVE",
  notes: "",
};
