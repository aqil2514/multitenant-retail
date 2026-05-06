"use client"
import MainContainer from "@/_shared/containers/main-container";
import { FinanceAccountsProvider } from "../finance-accounts/fa.context";
import { FinanceCashflowsProvider } from "./fc.context";
import { PageHeader } from "@/_shared/molecules/page-header";
import FinanceCashFlowsController from "./controller";

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

//TODO: Nanti ini dibikin orkestrasi untuk nampilin data cashflownya
const InnerTemplate = ()=>{
    return(
        <MainContainer>
            <PageHeader 
            title="Arus Kas" 
            description="Lihat Arus kas anda di sini" />
            <h1>Test</h1>
            <FinanceCashFlowsController />
        </MainContainer>
    )
}