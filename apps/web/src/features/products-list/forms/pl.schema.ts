import { imageFieldSchemaNullish } from "@/_shared/forms/form-field-image";
import z from "zod";

export const productsListSchema = z.object({
  name: z.string({ error: "Nama produk wajib diisi" }),
  type: z.enum(["PHYSICAL", "DIGITAL"]).default("PHYSICAL"),
  categoryId: z.string().nullish(),
  description: z.string().nullish(),
  image: imageFieldSchemaNullish,
  baseCostPrice: z.number().nullish(),
  baseSellingPrice: z.number({ error: "Harga jual wajib diisi" }),
  minStock: z.number().default(0),
  sku: z.string().nullish(),
  stock: z.number().default(0),
  unitId: z.string().nullish(),
});

export type ProductListInput = z.input<typeof productsListSchema>;
export type ProductListOutput = z.output<typeof productsListSchema>;

export const defaultProductList: ProductListInput = {
  name: "",
  type: "PHYSICAL",
  categoryId: "",
  description: "",
  image: null,
  baseCostPrice: null,
  baseSellingPrice: 0,
  minStock: 0,
  sku: "",
  stock: 0,
  unitId: undefined,
};
