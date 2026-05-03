import { BasePageProps } from "@/@types/general";
import { FinanceAccountsTemplate } from "@/features/finance-accounts/fa.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun",
};

export default async function FinanceAccountsPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <FinanceAccountsTemplate storeSlug={storeSlug} />;
}
