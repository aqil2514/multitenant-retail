import z from "zod";

export const productsCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
  description: z.string().optional(),
  parentId: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export type ProductCategorySchemaInput = z.input<typeof productsCategorySchema>;
export type ProductCategorySchemaOutput = z.output<
  typeof productsCategorySchema
>;

export const defaultProductCategory: ProductCategorySchemaInput = {
  name: "",
  description: undefined,
  parentId: "",
};
