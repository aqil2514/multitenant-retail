"use client"
import { FinanceAccountsProvider } from "../finance-accounts/fa.context";
import { FinanceCashflowsProvider } from "./fc.context";

interface Props {
    storeSlug: string
}

export function FinanceCashflowTemplate({storeSlug}: Props){
    return(
        <FinanceAccountsProvider storeSlug={storeSlug}>
            <FinanceCashflowsProvider storeSlug={storeSlug}>
                <InnerTemplate />
            </FinanceCashflowsProvider>
        </FinanceAccountsProvider>
    )
}

const InnerTemplate = ()=>{
    return(
        <h1>Test</h1>
    )
}