import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useFinanceAccounts } from "../fa.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseDeleteDialog } from "@/_shared/dialogs/base-delete-dialog";
import { FinanceAccountsColumn } from "../interfaces/fa.interface";

export function FinanceAccountsDeleteDialog() {
  const { refetch } = useFinanceAccounts();
  const storeSlug = useStoreSlugParam();

  const {
    handleClose,
    isOpen,
    isLoadingData,
    performAction,
    data,
    isSubmitting,
  } = useResourceAction<FinanceAccountsColumn>({
    dialogType: "delete",
    endpoint: `${storeSlug}/finance/accounts`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-finance-accounts`,
    translations: {
      pending: "Sedang menghapus akun keuangan...",
      success: "Akun keuangan berhasil dihapus",
    },
    idParamKey: "id",
    hasFile: false,
  });

  return (
    <BaseDeleteDialog
      onConfirm={performAction}
      onOpenChange={handleClose}
      open={isOpen}
      data={data}
      title="Hapus Akun Keuangan"
      description={
        data
          ? `Apakah Anda yakin ingin menghapus akun "${data.code} - ${data.name}"? Tindakan ini tidak dapat dibatalkan dan hanya bisa dilakukan jika akun tidak memiliki sub-akun atau histori transaksi.`
          : "Hapus data akun yang dipilih secara permanen dari sistem."
      }
      isDeleting={isSubmitting}
      isLoadingData={isLoadingData}
    />
  );
}
