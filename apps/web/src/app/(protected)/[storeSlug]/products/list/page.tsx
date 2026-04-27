import { BasePageProps } from "@/@types/general";
import { ProductListTemplate } from "@/features/products-list/pl.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Produk",
};

export default async function ProductList({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <ProductListTemplate storeSlug={storeSlug} />;
}
