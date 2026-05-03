"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { FinanceLedgerProvider } from "./fl.context";
import { FinanceLedgerController } from "./controller";

interface Props {
  storeSlug: string;
}

export function FinanceLedgerTemplate({ storeSlug }: Props) {
  return (
    <FinanceLedgerProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </FinanceLedgerProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader
        title="Buku Besar"
        description="Manage buku besar anda di sini"
      />
      <FinanceLedgerController />
    </MainContainer>
  );
};
