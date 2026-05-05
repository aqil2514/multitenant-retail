"use client"

import { FinanceAccountsProvider } from "../finance-accounts/fa.context"
import { FinanceBalanceSheetProvider } from "./fb.context"

interface Props{
    storeSlug:string
}

export function FinanceBalanceSheetTemplate({storeSlug}: Props){
    return(
        <FinanceAccountsProvider storeSlug={storeSlug}>
            <FinanceBalanceSheetProvider storeSlug={storeSlug}>
                <InnerTemplate />
            </FinanceBalanceSheetProvider>
        </FinanceAccountsProvider>
    )
}

const InnerTemplate = ()=>{
    return(
        <h1>Test</h1>
    )
}