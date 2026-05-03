"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { FinanceAccountsProvider } from "./fa.context";
import { ProductListTable } from "./tables";
import { FinanceAccountsController } from "./controller";
import { FinanceAccountsAddDialog } from "./dialogs/fa.add";
import { FinanceAccountsEditDialog } from "./dialogs/fa.edit";
import { FinanceAccountsDeleteDialog } from "./dialogs/fe.delete";

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
    <>
      <MainContainer>
        <PageHeader
          title="Daftar Akun"
          description="Manage akun keuangan anda di sini"
        />
        <FinanceAccountsController />
        <ProductListTable />
      </MainContainer>

      <FinanceAccountsAddDialog />
      <FinanceAccountsEditDialog />
      <FinanceAccountsDeleteDialog />
    </>
  );
};
