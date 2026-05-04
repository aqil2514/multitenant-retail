import { createResourceContext } from "@/context/create-resource-context";

export const {
  Provider: PurchaseReceiptsProvider,
  useData: usePurchaseReceipts,
} = createResourceContext<unknown, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-purchase-receipts`],
  ({ storeSlug }) => `${storeSlug}/purchase/receipts`,
);
