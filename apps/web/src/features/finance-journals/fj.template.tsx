"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { FinanceJournalsProvider } from "./fj.context";

interface Props {
  storeSlug: string;
}

export function FinanceJournalsTemplate({ storeSlug }: Props) {
  return (
    <FinanceJournalsProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </FinanceJournalsProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader
        title="Jurnal Umum"
        description="Manage jurnal umum anda di sini"
      />
    </MainContainer>
  );
};
