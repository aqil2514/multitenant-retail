import { BasePageProps } from "@/@types/general";
import { PurchaseReturnsTemplate } from "@/features/purchase-returns/prr.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retur Pembelian",
};

export default async function PurchaseReturnsPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <PurchaseReturnsTemplate storeSlug={storeSlug} />;
}
