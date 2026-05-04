"use client";

import MainContainer from "@/_shared/containers/main-container";
import { PageHeader } from "@/_shared/molecules/page-header";
import { PurchaseReceiptsProvider } from "./pr.context";

interface Props {
  storeSlug: string;
}

export function PurchaseReceiptsTemplate({ storeSlug }: Props) {
  return (
    <PurchaseReceiptsProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </PurchaseReceiptsProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader title="Penerimaan Barang" description="Manage penerimaan barang anda di sini" />
    </MainContainer>
  );
};
