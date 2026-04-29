import { BaseDialog } from "@/_shared/dialogs/base-dialog";
import { useQueryState } from "@/_shared/hooks/use-query-state";
import { ObjectRenderer } from "@/_shared/molecules/object-renderer";
import { useAuditLog } from "../al.context";
import { useMemo } from "react";
import { Loader2, AlertCircle } from "lucide-react"; // Asumsi menggunakan lucide

export function AuditLogDetailDialog() {
  const { data, isLoading, isError, error } = useAuditLog();
  const { get, update } = useQueryState();
  
  const open = get("dialog") === "detail";
  const auditId = get("id");

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) update({ dialog: null, id: null });
  };

  const fullSelectedData = useMemo(() => {
    if (!data?.data || !auditId) return undefined;
    return data.data.find((d) => d.id === auditId);
  }, [data, auditId]);

  // Handle Title & Description secara dinamis
  const title = fullSelectedData 
    ? `Detail: ${fullSelectedData.action.replace(/_/g, ' ')}` 
    : "Memuat Detail...";
    
  const description = fullSelectedData 
    ? `Dilakukan oleh ${fullSelectedData.user.name || 'Sistem'} pada ${new Date(fullSelectedData.createdAt).toLocaleString('id-ID')}`
    : "Mohon tunggu sebentar.";

  return (
    <BaseDialog 
      onOpenChange={handleClose} 
      open={open} 
      title={title} 
      description={description}
    >
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="flex items-center gap-2 p-4 text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Gagal memuat data: {error?.message || "Terjadi kesalahan"}</p>
          </div>
        ) : fullSelectedData ? (
          <div className="bg-muted/30 p-4 rounded-lg border border-muted">
            <ObjectRenderer data={fullSelectedData.details} />
          </div>
        ) : (
          <p className="text-center py-10 text-muted-foreground">Data tidak ditemukan.</p>
        )}
      </div>
    </BaseDialog>
  );
}