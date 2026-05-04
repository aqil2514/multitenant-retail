"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { PurchaseReturnsProvider } from "./prr.context";

interface Props {
  storeSlug: string;
}

export function PurchaseReturnsTemplate({ storeSlug }: Props) {
  return (
    <PurchaseReturnsProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </PurchaseReturnsProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader title="Retur Pembelian" description="Manage retur pembelian anda di sini" />
    </MainContainer>
  );
};
