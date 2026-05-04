"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { PurchasePaymentsProvider } from "./pp.context";

interface Props {
  storeSlug: string;
}

export function PurchasePaymentsTemplate({ storeSlug }: Props) {
  return (
    <PurchasePaymentsProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </PurchasePaymentsProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader title="Hutang Supplier" description="Manage hutang supplier anda di sini" />
    </MainContainer>
  );
};
