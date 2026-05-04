import { createResourceContext } from "@/context/create-resource-context";
import { JournalResponse } from "./interfaces/fl.interface";

export const { Provider: FinanceLedgerProvider, useData: useFinanceLedger } =
  createResourceContext<JournalResponse, { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-finance-ledgers`],
    ({ storeSlug }) => `${storeSlug}/finance/ledgers`,
    {
      activeParams: ["date", "account"],
    },
  );
