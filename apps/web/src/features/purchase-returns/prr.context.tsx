import { createResourceContext } from "@/context/create-resource-context";

export const {
  Provider: PurchaseReturnsProvider,
  useData: usePurchaseReturns,
} = createResourceContext<unknown, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-purchase-returns`],
  ({ storeSlug }) => `${storeSlug}/purchase/returns`,
);
