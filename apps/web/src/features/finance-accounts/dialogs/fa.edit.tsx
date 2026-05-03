import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useFinanceAccounts } from "../fa.context";
import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { BaseEditDialog } from "@/_shared/dialogs/base-edit-dialog";
import { FinanceAccountForm } from "../forms/fa.form";
import { FinanceAccountInput } from "../forms/fa.schema";

export function FinanceAccountsEditDialog() {
  const { refetch } = useFinanceAccounts();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, isLoadingData, performAction, data } =
    useResourceAction<FinanceAccountInput>({
      dialogType: "edit",
      endpoint: `${storeSlug}/finance/accounts`,
      refetchList: refetch,
      resourceKey: `${storeSlug}-finance-accounts`,
      translations: {
        pending: "Sedang memperbarui data akun...",
        success: "Data akun berhasil diperbarui",
      },
      idParamKey: "id",
    });

  const dialogTitle = data?.name
    ? `Edit Akun: ${data.name}`
    : "Edit Data Akun Keuangan";

  const dialogDescription = data?.code
    ? `Perbarui detail untuk akun dengan kode ${data.code}. Perubahan akan dicatat dalam audit log.`
    : "Ubah kategori, saldo normal, atau struktur induk akun ini.";

  return (
    <BaseEditDialog
      onOpenChange={handleClose}
      open={isOpen}
      isLoadingData={isLoadingData}
      title={dialogTitle}
      description={dialogDescription}
      renderForm={() => (
        <FinanceAccountForm defaultValues={data} onSubmit={performAction} />
      )}
    />
  );
}
