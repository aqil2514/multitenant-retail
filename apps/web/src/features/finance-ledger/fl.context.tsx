import { createResourceContext } from "@/context/create-resource-context";

export type FinanceLedgerResponse = unknown;

export const {
  Provider: FinanceLedgerProvider,
  useData: useFinanceLedger,
} = createResourceContext<FinanceLedgerResponse, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-finance-ledger`],
  ({ storeSlug }) => `${storeSlug}/finance/ledger`,
);
