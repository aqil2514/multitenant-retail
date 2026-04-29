import { BasePageProps } from "@/@types/general";
import { AuditLogTemplate } from "@/features/audit-log/al.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Log",
};

export default async function AuditLogPage({ params }: BasePageProps) {
  const { storeSlug } = await params;
  return <AuditLogTemplate storeSlug={storeSlug} />;
}
