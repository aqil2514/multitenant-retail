import { BasePageProps } from "@/@types/general";
import { FinanceLedgerTemplate } from "@/features/finance-ledger/fl.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buku Besar",
};

export default async function FinanceLedgerPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <FinanceLedgerTemplate storeSlug={storeSlug} />;
}
