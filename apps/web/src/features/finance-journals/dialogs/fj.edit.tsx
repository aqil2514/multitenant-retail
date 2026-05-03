import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useFinanceJournals } from "../fj.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseEditDialog } from "@/_shared/dialogs/base-edit-dialog";
import { JournalEntryForm } from "../forms/fj.form";
import { JournalEntryInput } from "../forms/fj.schema";
import { useMemo } from "react";
import { parseISO } from "date-fns";

export function FinanceJournalsEditDialog() {
  const { refetch } = useFinanceJournals();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, isLoadingData, performAction, data } =
    useResourceAction<JournalEntryInput>({
      dialogType: "edit",
      endpoint: `${storeSlug}/finance/journals`,
      refetchList: refetch,
      resourceKey: `${storeSlug}-finance-journals`,
      translations: {
        pending: "Sedang memperbarui catatan jurnal...",
        success: "Catatan jurnal berhasil diperbarui",
      },
      idParamKey: "id",
    });

  const dialogTitle = data?.reference
    ? `Edit Jurnal: ${data.reference}`
    : "Edit Jurnal Umum";

  const dialogDescription = data?.description
    ? `Mengubah rincian transaksi: ${data.description}. Pastikan total debit dan kredit tetap seimbang.`
    : "Perbarui detail transaksi, tanggal, atau alokasi akun pada entri jurnal ini.";

  const transformedData = useMemo(() => {
    if (!data) return undefined;

    return {
      ...data,
      // Ubah string ISO dari server menjadi objek Date yang valid
      // parseISO memastikan tanggal tidak bergeser karena timezone
      date: data.date ? parseISO(data.date as unknown as string) : new Date(),

      items: data.items.map((item) => ({
        ...item,
        debit: Number(item.debit),
        credit: Number(item.credit),
        // Pastikan note tidak null agar tidak error di komponen input
        note: item.note ?? "",
      })),
    };
  }, [data]);

  return (
    <BaseEditDialog
      onOpenChange={handleClose}
      open={isOpen}
      isLoadingData={isLoadingData}
      title={dialogTitle}
      description={dialogDescription}
      renderForm={() => (
        <JournalEntryForm
          defaultValues={transformedData}
          onSubmit={performAction}
        />
      )}
    />
  );
}
