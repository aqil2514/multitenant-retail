"use client";

import MainContainer from "@/_shared/containers/main-container";
import { ProductCategoryProvider } from "./pc.context";
import { PageHeader } from "@/_shared/molecules/page-header";
import { ProductsCategoryTable } from "./tables";
import { ProductsCategoryController } from "./controller";
import { ProductsCategoryAdd } from "./dialogs/pc.add";
import { ProductsCategoryEdit } from "./dialogs/pc.edit";
import { ProductsCategoryDelete } from "./dialogs/pc.delete";
interface Props {
  storeSlug: string;
}

export function ProductCategoryTemplate({ storeSlug }: Props) {
  return (
    <ProductCategoryProvider storeSlug={storeSlug}>
      <ProductCategoryContent />
    </ProductCategoryProvider>
  );
}

const ProductCategoryContent = () => {
  return (
    <>
      <MainContainer>
        <PageHeader
          title="Kategori Produk"
          description="Atur Kategori Produk Anda"
        />
        <ProductsCategoryController />
        <ProductsCategoryTable />
      </MainContainer>

      <ProductsCategoryAdd />
      <ProductsCategoryEdit />
      <ProductsCategoryDelete />
    </>
  );
};
