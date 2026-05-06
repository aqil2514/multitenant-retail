import { BasePageProps } from "@/@types/general"
import { FinanceBalanceSheetTemplate } from "@/features/finance-balance-sheet/fb.template"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Neraca Keuangan",
    description: "Lihat neraca keuangan bisnis retail anda di sini"
}

export default async function BalanceSheetPage({params}: BasePageProps){
    const { storeSlug } = await params;
    return(
        <FinanceBalanceSheetTemplate storeSlug={storeSlug} />
    )
}