import { BasePageProps } from "@/@types/general";
import { PurchaseReceiptsTemplate } from "@/features/purchase-receipts/pr.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penerimaan Barang",
};

export default async function PurchaseReceiptsPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <PurchaseReceiptsTemplate storeSlug={storeSlug} />;
}
