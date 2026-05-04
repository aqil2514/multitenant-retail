import { createResourceContext } from "@/context/create-resource-context";

export const {
  Provider: PurchaseSuppliersProvider,
  useData: usePurchaseSuppliers,
} = createResourceContext<unknown, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-purchase-suppliers`],
  ({ storeSlug }) => `${storeSlug}/purchase/suppliers`,
);
