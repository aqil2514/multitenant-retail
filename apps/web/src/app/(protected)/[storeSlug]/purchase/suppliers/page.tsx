import { BasePageProps } from "@/@types/general";
import { PurchaseSuppliersTemplate } from "@/features/purchase-suppliers/ps.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier",
};

export default async function PurchaseSuppliersPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <PurchaseSuppliersTemplate storeSlug={storeSlug} />;
}
