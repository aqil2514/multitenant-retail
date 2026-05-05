import { BasePageProps } from "@/@types/general";
import FinanceProfitLossTemplate from "@/features/finance-profit-loss/fp.template";

export default async function Page({params}: BasePageProps){
    const { storeSlug } = await params;
    return(
        <FinanceProfitLossTemplate storeSlug={storeSlug} />
    )
}