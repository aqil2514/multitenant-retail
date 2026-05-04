import { BasePageProps } from "@/@types/general";
import { PurchaseOrdersTemplate } from "@/features/purchase-orders/po.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Order",
};

export default async function PurchaseOrdersPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <PurchaseOrdersTemplate storeSlug={storeSlug} />;
}
