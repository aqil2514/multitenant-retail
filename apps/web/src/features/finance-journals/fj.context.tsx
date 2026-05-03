import { createResourceContext } from "@/context/create-resource-context";
import { FinanceJournalsResponse } from "./interfaces/fj.interface";

export const {
  Provider: FinanceJournalsProvider,
  useData: useFinanceJournals,
} = createResourceContext<FinanceJournalsResponse, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-finance-journals`],
  ({ storeSlug }) => `${storeSlug}/finance/journals`,
);
