// pl.context.ts
import { createResourceContext } from "@/context/create-resource-context";

export const { Provider: ProductListProvider, useData: useProductList } =
  createResourceContext<unknown, { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-product-list`],
    ({ storeSlug }) => `${storeSlug}/products/list`,
  );
