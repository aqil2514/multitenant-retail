import { BasePageProps } from "@/@types/general";
import { StoreSettingsTemplate } from "@/features/settings-store/ss.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan Toko",
};

export default async function StoreConfigPage({ params }: BasePageProps) {
  const { storeSlug } = await params;

  return <StoreSettingsTemplate storeSlug={storeSlug} />;
}
