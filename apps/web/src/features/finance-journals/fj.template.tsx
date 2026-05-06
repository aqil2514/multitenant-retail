"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { FinanceAccountsProvider } from "@/features/finance-accounts/fa.context";
import { FinanceJournalsProvider } from "./fj.context";
import { FinanceJournalsAddDialog } from "./dialogs/fj.add";
import { FinanceJournalsController } from "./controller";
import { FinanceJournalsTable } from "./tables";
import { FinanceJournalsEditDialog } from "./dialogs/fj.edit";
import { FinanceJournalsDeleteDialog } from "./dialogs/fj.delete";

interface Props {
  storeSlug: string;
}

export function FinanceJournalsTemplate({ storeSlug }: Props) {
  return (
    <FinanceAccountsProvider storeSlug={storeSlug}>
      <FinanceJournalsProvider storeSlug={storeSlug}>
        <InnerTemplate />
      </FinanceJournalsProvider>
    </FinanceAccountsProvider>
  );
}

const InnerTemplate = () => {
  return (
    <>
      <MainContainer>
        <PageHeader
          title="Jurnal Umum"
          description="Manage jurnal umum anda di sini"
        />
        <FinanceJournalsController />
        <FinanceJournalsTable />
      </MainContainer>

      <FinanceJournalsAddDialog />
      <FinanceJournalsEditDialog />
      <FinanceJournalsDeleteDialog />
    </>
  );
};

