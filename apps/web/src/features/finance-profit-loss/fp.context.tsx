import { createResourceContext } from "@/context/create-resource-context";

export const {
    Provider: FinanceProfitLossProvider,
    useData: useFinanceProfitLoss,
} = createResourceContext<any, {storeSlug: string}>(
    ({storeSlug})=> [`${storeSlug}-finance-profit-loss`],
    ({storeSlug})=> `${storeSlug}/finance/profit-loss`,
)