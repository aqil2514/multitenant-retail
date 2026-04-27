import { createResourceContext } from "@/context/create-resource-context";

export const { Provider: ProductCategoryProvider, useData: useProductCategory } =
  createResourceContext<unknown, { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-product-category`],
    ({ storeSlug }) => `${storeSlug}/products/category`,
  );
