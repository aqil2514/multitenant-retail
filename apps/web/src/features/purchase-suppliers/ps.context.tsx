import { createResourceContext } from "@/context/create-resource-context";
import { PurchaseSupplier } from "./interfaces/ps.interface";

export const {
  Provider: PurchaseSuppliersProvider,
  useData: usePurchaseSuppliers,
} = createResourceContext<PurchaseSupplier[], { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-purchase-suppliers`],
  ({ storeSlug }) => `${storeSlug}/purchase/suppliers`,
  {
    activeParams: ["name", "code", "status"],
  },
);
