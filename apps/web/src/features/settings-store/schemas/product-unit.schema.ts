import z from "zod";

export const productUnitSchema = z.object({
  unit: z
    .array(
      z.object({
        id: z.uuid().optional(),
        name: z.string().min(1, "Nama tidak boleh kosong"),
        value: z.string().min(1, "Value tidak boleh kosong"),
      }),
    )
    .min(1, "Minimal satu unit"),
});

export type ProductUnitSchemaInput = z.input<typeof productUnitSchema>;
export type ProductUnitSchemaOutput = z.output<typeof productUnitSchema>;
