import { createResourceContext } from "@/context/create-resource-context";

export const {
  Provider: PurchaseOrdersProvider,
  useData: usePurchaseOrders,
} = createResourceContext<unknown, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-purchase-orders`],
  ({ storeSlug }) => `${storeSlug}/purchase/orders`,
);
