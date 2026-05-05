import { createResourceContext } from "@/context/create-resource-context";
import { FinanceCashflowRespons } from "./interfaces/fc.interface";

export const { 
    Provider: FinanceCashflowsProvider,
    useData: useFinanceCashflows
} = createResourceContext<FinanceCashflowRespons,{ storeSlug:string }>(
    ({storeSlug}) => [`${storeSlug}-finance-cashflows`],
    ({storeSlug}) => `${storeSlug}/finance/cashflows`,
)