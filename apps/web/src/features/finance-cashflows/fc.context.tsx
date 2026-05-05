import { createResourceContext } from "@/context/create-resource-context";
import { FinanceJournalsResponse } from "../finance-journals/interfaces/fj.interface";
import { FinanceBalanceSheetResponse } from "../finance-balance-sheet/interfaces/fb.interfaces";

export const { 
    Provider: FinanceCashflowsProvider,
    useData: useFinanceCashflows
} = createResourceContext<FinanceBalanceSheetResponse,{ storeSlug:string }>(
    ({storeSlug}) => [`${storeSlug}-finance-cashflows`],
    ({storeSlug}) => `${storeSlug}/finance/cashflows`,
)