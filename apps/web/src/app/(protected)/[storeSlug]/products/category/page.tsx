import { BasePageProps } from "@/@types/general";
import { ProductCategoryTemplate } from "@/features/products-category/pc.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategori Produk",
};

export default async function ProductCategory({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <ProductCategoryTemplate storeSlug={storeSlug} />
}
