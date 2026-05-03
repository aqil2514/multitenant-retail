import { BasePageProps } from "@/@types/general";
import { FinanceJournalsTemplate } from "@/features/finance-journals/fj.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jurnal Umum",
};

export default async function FinanceJournalsPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <FinanceJournalsTemplate storeSlug={storeSlug} />;
}
