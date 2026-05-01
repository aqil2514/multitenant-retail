import { identitySchema } from "@/features/settings-store/schemas/identity.schema";
import z from "zod";
export const onBoardingSchema = z.object({
  ...identitySchema.shape,
});

export type OnBoardingInput = z.input<typeof onBoardingSchema>;
export type OnBoardingOutput = z.output<typeof onBoardingSchema>;

export const defaultOnBoarding: OnBoardingInput = {
  name: "",
  address: "",
  phone: "",
};
