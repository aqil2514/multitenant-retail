"use client"

import MainContainer from "@/_shared/containers/main-container"
import { FinanceAccountsProvider } from "../finance-accounts/fa.context"
import { PageHeader } from "@/_shared/molecules/page-header"
import FinanceProfitLossController from "./controller"
import { FinanceProfitLossProvider } from "./fp.context"

interface Props{
    storeSlug: string
}

export default function FinanceProfitLossTemplate({storeSlug}: Props){
    return(
        <FinanceAccountsProvider storeSlug={storeSlug}>
            <FinanceProfitLossProvider storeSlug={storeSlug}>
                <InnerTemplate />
            </FinanceProfitLossProvider>
        </FinanceAccountsProvider>
    )
}

//TODO: Nanti ini dibikin orkestrasi untuk nampilin data cashflownya
const InnerTemplate = ()=>{
    return(
        <MainContainer>
            <PageHeader
            title="Laba Rugi"
            description="Lihat Laba Rugi anda di sini" />
            <h1>Test</h1>
            <FinanceProfitLossController />
        </MainContainer>
    )
}