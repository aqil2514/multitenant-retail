import { imageFieldSchemaNullish } from "@/_shared/forms/form-field-image";
import z from "zod";

export const productsListSchema = z.object({
  name: z.string({ error: "Nama produk wajib diisi" }),
  categoryId: z.string().nullish(),
  description: z.string().nullish(),
  image: imageFieldSchemaNullish,
  minStock: z.number().default(0),
  sku: z.string().nullish(),
  stock: z.number().default(0),
  unit: z.string().default("pcs"),
});

export type ProductListInput = z.input<typeof productsListSchema>;
export type ProductListOutput = z.output<typeof productsListSchema>;

export const defaultProductList: ProductListInput = {
  name: "",
  categoryId: "",
  description: "",
  image: null,
  minStock: 0,
  sku: "",
  stock: 0,
  unit: "pcs",
};
