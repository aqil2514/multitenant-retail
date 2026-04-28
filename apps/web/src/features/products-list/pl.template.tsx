"use client";

import MainContainer from "@/_shared/containers/main-container";
import { ProductListProvider } from "./pl.context";
import { PageHeader } from "@/_shared/molecules/page-header";
import { ProductsListController } from "./controller";
import { ProductListsAddDialog } from "./dialogs/pl.add";
import { ProductListTable } from "./tables";
interface Props {
  storeSlug: string;
}

export function ProductListTemplate({ storeSlug }: Props) {
  return (
    <ProductListProvider storeSlug={storeSlug}>
      <ProductListContent />
    </ProductListProvider>
  );
}

const ProductListContent = () => {
  return (
    <>
      <MainContainer>
        <PageHeader
          title="List Produk"
          description="Manage produk anda di sini"
        />

        <ProductsListController />
        <ProductListTable  />
      </MainContainer>

      <ProductListsAddDialog />
    </>
  );
};
