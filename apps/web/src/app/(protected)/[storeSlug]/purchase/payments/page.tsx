import { BasePageProps } from "@/@types/general";
import { PurchasePaymentsTemplate } from "@/features/purchase-payments/pp.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hutang Supplier",
};

export default async function PurchasePaymentsPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <PurchasePaymentsTemplate storeSlug={storeSlug} />;
}
