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

const InnerTemplate = ()=>{
    return(
        <>Test</>
    )
}