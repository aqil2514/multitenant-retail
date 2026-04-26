import { phoneFieldSchema } from "@/_shared/forms/form-field-phone";
import z from "zod";
export const onBoardingSchema = z.object({
  name: z.string().min(1, "Nama warung wajib diisi"),
  phone: phoneFieldSchema.optional(),
  address: z.string().optional(),
});

export type OnBoardingInput = z.input<typeof onBoardingSchema>;
export type OnBoardingOutput = z.output<typeof onBoardingSchema>;

export const defaultOnBoarding: OnBoardingInput = {
  name: "",
  address: "",
  phone: "",
};
