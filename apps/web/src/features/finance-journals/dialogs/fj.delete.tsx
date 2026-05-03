import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useFinanceJournals } from "../fj.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseDeleteDialog } from "@/_shared/dialogs/base-delete-dialog";
import { JournalEntry } from "../interfaces/fj.interface";

export function FinanceJournalsDeleteDialog() {
  const { refetch } = useFinanceJournals();
  const storeSlug = useStoreSlugParam();

  const {
    handleClose,
    isOpen,
    isLoadingData,
    performAction,
    data,
    isSubmitting,
  } = useResourceAction<JournalEntry>({
    dialogType: "delete",
    endpoint: `${storeSlug}/finance/journals`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-finance-journals`,
    translations: {
      pending: "Sedang membatalkan entri jurnal...",
      success: "Jurnal berhasil dibatalkan (Void)",
    },
    idParamKey: "id",
    hasFile: false,
  });

  const journalIdentifier = data?.reference || data?.description;

  return (
    <BaseDeleteDialog
      onConfirm={performAction}
      onOpenChange={handleClose}
      open={isOpen}
      data={data}
      title="Batalkan Jurnal Umum"
      description={
        data
          ? `Apakah Anda yakin ingin membatalkan (Void) jurnal "${journalIdentifier}"? Tindakan ini akan menghapus pengaruh nilai transaksi terhadap saldo akun terkait, namun data historis akan tetap tersimpan di Audit Log.`
          : "Batalkan entri jurnal yang dipilih dan hapus pengaruh saldonya dari sistem."
      }
      isDeleting={isSubmitting}
      isLoadingData={isLoadingData}
    />
  );
}
