import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useFinanceJournals } from "../fj.context";
import { BaseAddDialog } from "@/_shared/dialogs/base-add-dialog";
import { JournalEntryForm } from "../forms/fj.form";

export function FinanceJournalsAddDialog() {
  const { refetch } = useFinanceJournals();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, performAction } = useResourceAction({
    dialogType: "add",
    // Endpoint diarahkan ke journals
    endpoint: `${storeSlug}/finance/journals`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-finance-journals`,
    translations: {
      pending: "Sedang mencatat jurnal umum...",
      success: "Jurnal umum berhasil dicatat",
    },
  });

  return (
    <BaseAddDialog
      title="Buat Jurnal Umum"
      description="Catat transaksi keuangan baru dengan entri debit dan kredit yang seimbang."
      open={isOpen}
      onOpenChange={handleClose}
      // Kita panggil form jurnal yang sudah dibuat
      renderForm={() => <JournalEntryForm onSubmit={performAction} />}
      // Karena form jurnal biasanya lebar (ada tabel debit/kredit),
      // Anda mungkin ingin menambahkan size="2xl" atau "3xl" jika BaseAddDialog mendukungnya
    />
  );
}
