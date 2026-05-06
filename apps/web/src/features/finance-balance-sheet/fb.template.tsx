"use client"

import MainContainer from "@/_shared/containers/main-container"
import { FinanceAccountsProvider } from "../finance-accounts/fa.context"
import { FinanceBalanceSheetProvider } from "./fb.context"
import { PageHeader } from "@/_shared/molecules/page-header"
import FinanceBalanceSheetController from "./controller"

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

//TODO: Nanti ini dibikin orkestrasi untuk nampilin data cashflownya
const InnerTemplate = ()=>{
    return(
        <MainContainer>
            <PageHeader
            title="Neraca"
            description="Lihat Neraca Keuangan anda di sini" />
            <h1>Test</h1>
            <FinanceBalanceSheetController />
        </MainContainer>
    )
}