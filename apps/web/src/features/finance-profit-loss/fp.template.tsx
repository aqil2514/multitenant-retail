"use client"

import { FinanceAccountsProvider } from "../finance-accounts/fa.context"

interface Props{
    storeSlug: string
}

export default function FinanceProfitLossTemplate({storeSlug}: Props){
    return(
        <FinanceAccountsProvider storeSlug={storeSlug}>
            <InnerTemplate/>
        </FinanceAccountsProvider>
    )
}

//TODO: Nanti ini dibikin orkestrasi untuk nampilin data cashflownya
const InnerTemplate = ()=>{
    return(
        <>Test</>
    )
}