import { BasePageProps } from "@/@types/general"
import { FinanceBalanceSheetTemplate } from "@/features/finance-balance-sheet/fb.template"

export default async function BalanceSheetPage({params}: BasePageProps){
    const { storeSlug } = await params;
    return(
        <FinanceBalanceSheetTemplate storeSlug={storeSlug} />
    )
}