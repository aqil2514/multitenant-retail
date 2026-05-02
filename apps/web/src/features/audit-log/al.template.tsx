"use client";
import MainContainer from "@/_shared/containers/main-container";
import { AuditLogProvider } from "./al.context";
import { PageHeader } from "@/_shared/molecules/page-header";
import { AuditLogTable } from "./tables";
import { AuditLogDetailDialog } from "./dialogs/al.detail";
import { AuditLogController } from "./controllers";

interface Props {
  storeSlug: string;
}

export function AuditLogTemplate({ storeSlug }: Props) {
  return (
    <AuditLogProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </AuditLogProvider>
  );
}

const InnerTemplate = () => {
  return (
    <>
      <MainContainer>
        <PageHeader 
          title="Log Aktivitas"
          description="Pantau seluruh riwayat perubahan data dan aktivitas pengguna di dalam sistem."
        />
        <AuditLogController />
        <AuditLogTable />
      </MainContainer>

      <AuditLogDetailDialog />
    </>
  );
};
