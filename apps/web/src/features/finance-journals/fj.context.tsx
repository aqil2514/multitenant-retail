import { createResourceContext } from "@/context/create-resource-context";

export type FinanceJournalsResponse = unknown;

export const {
  Provider: FinanceJournalsProvider,
  useData: useFinanceJournals,
} = createResourceContext<FinanceJournalsResponse, { storeSlug: string }>(
  ({ storeSlug }) => [`${storeSlug}-finance-journals`],
  ({ storeSlug }) => `${storeSlug}/finance/journals`,
);
