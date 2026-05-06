import { BasePageProps } from "@/@types/general";
import FinanceProfitLossTemplate from "@/features/finance-profit-loss/fp.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profit & Loss",
    description: "Lihat profit & loss bisnis retail anda di sini"
}

export default async function Page({params}: BasePageProps){
    const { storeSlug } = await params;
    return(
        <FinanceProfitLossTemplate storeSlug={storeSlug} />
    )
}