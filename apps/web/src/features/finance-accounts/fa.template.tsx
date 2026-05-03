"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { FinanceAccountsProvider } from "./fa.context";
import { ProductListTable } from "./tables";

interface Props {
  storeSlug: string;
}

export function FinanceAccountsTemplate({ storeSlug }: Props) {
  return (
    <FinanceAccountsProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </FinanceAccountsProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader
        title="Daftar Akun"
        description="Manage akun keuangan anda di sini"
      />

      <ProductListTable />
    </MainContainer>
  );
};
