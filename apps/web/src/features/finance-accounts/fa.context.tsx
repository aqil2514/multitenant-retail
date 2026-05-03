import { createResourceContext } from "@/context/create-resource-context";
import { FinanceAccountsColumn } from "./interfaces/fa.interface";

export const {
  Provider: FinanceAccountsProvider,
  useData: useFinanceAccounts,
} = createResourceContext<FinanceAccountsColumn[], { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-finance-accounts`],
  ({ storeSlug }) => `${storeSlug}/finance/accounts`,
);
