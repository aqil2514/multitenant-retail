import { createResourceContext } from "@/context/create-resource-context";

export const {
  Provider: PurchasePaymentsProvider,
  useData: usePurchasePayments,
} = createResourceContext<unknown, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-purchase-payments`],
  ({ storeSlug }) => `${storeSlug}/purchase/payments`,
);
