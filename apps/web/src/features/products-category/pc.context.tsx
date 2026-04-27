import { createResourceContext } from "@/context/create-resource-context";
import { BasicProductsCategory } from "./interfaces/pc.interface";

export const { Provider: ProductCategoryProvider, useData: useProductCategory } =
  createResourceContext<BasicProductsCategory[], { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-product-category`],
    ({ storeSlug }) => `${storeSlug}/products/category`,
  );
