"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { PurchaseSuppliersProvider } from "./ps.context";

interface Props {
  storeSlug: string;
}

export function PurchaseSuppliersTemplate({ storeSlug }: Props) {
  return (
    <PurchaseSuppliersProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </PurchaseSuppliersProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader title="Supplier" description="Manage supplier anda di sini" />
    </MainContainer>
  );
};
