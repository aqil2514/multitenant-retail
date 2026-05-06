import { BasePageProps } from "@/@types/general";
import { FinanceCashflowTemplate } from "@/features/finance-cashflows/fc.template";
import { Metadata } from "next";

export const metadata : Metadata= {
  title: "Cashflow",
  description: "Cashflow",
};

export default async function CashflowPage({params}: BasePageProps) {
 const { storeSlug } = await params;
 return(
  <FinanceCashflowTemplate storeSlug={storeSlug} />
)   
}