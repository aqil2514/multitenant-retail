import { phoneFieldSchema } from "@/_shared/forms/form-field-phone";
import z from "zod";

export const identitySchema = z.object({
  name: z.string().min(1, "Nama warung wajib diisi"),
  slug: z.string().optional(),
  phone: phoneFieldSchema.optional(),
  address: z.string().optional(),
});

export type IdentitySchemaInput = z.input<typeof identitySchema>;
export type IdentitySchemaOutput = z.output<typeof identitySchema>;

export const defaultIdentity: IdentitySchemaInput = {
  name: "",
  address: "",
  phone: "",
  slug: "",
};
