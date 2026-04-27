"use client";

import { ProductListProvider } from "./pl.context";
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
  return <div>OK</div>;
};
