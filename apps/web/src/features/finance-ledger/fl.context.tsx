import { createResourceContext } from "@/context/create-resource-context";

export type FinanceLedgerResponse = unknown;

export const { Provider: FinanceLedgerProvider, useData: useFinanceLedger } =
  createResourceContext<FinanceLedgerResponse, { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-finance-ledgers`],
    ({ storeSlug }) => `${storeSlug}/finance/ledgers`,
    {
      activeParams: ["date", "description", "reference"],
    },
  );
