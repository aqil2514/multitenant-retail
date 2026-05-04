"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { PurchaseOrdersProvider } from "./po.context";

interface Props {
  storeSlug: string;
}

export function PurchaseOrdersTemplate({ storeSlug }: Props) {
  return (
    <PurchaseOrdersProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </PurchaseOrdersProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader title="Purchase Order" description="Manage purchase order anda di sini" />
    </MainContainer>
  );
};
