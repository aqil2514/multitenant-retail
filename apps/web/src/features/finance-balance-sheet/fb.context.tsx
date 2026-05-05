import { createResourceContext } from "@/context/create-resource-context";
import { FinanceBalanceSheetResponse } from "./interfaces/fb.interfaces";

export const { 
    Provider: FinanceBalanceSheetProvider,
    useData: useFinanceBalanceSheet
}=createResourceContext<FinanceBalanceSheetResponse, { storeSlug: string }>(
    ({storeSlug}) => [`${storeSlug}-finance-balance-sheet`],
    ({storeSlug}) => `${storeSlug}/finance/balance-sheet`,
)