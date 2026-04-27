"use client";

import { ProductCategoryProvider } from "./pc.context";
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
  return <div>OK</div>;
};
