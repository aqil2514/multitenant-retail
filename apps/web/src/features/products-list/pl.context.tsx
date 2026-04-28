// pl.context.ts
import { createResourceContext } from "@/context/create-resource-context";
import { ProductListTable } from "./interfaces/pl.interface";

export const { Provider: ProductListProvider, useData: useProductList } =
  createResourceContext<ProductListTable, { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-product-list`],
    ({ storeSlug }) => `${storeSlug}/products/list`,
  );
