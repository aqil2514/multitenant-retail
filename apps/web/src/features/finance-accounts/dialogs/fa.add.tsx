import { useResourceAction } from "@/_shared/hooks/use-resources-action";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { useFinanceAccounts } from "../fa.context";
import { BaseAddDialog } from "@/_shared/dialogs/base-add-dialog";
import { FinanceAccountForm } from "../forms/fa.form";

export function FinanceAccountsAddDialog() {
  const { refetch } = useFinanceAccounts();
  const storeSlug = useStoreSlugParam();

  const { handleClose, isOpen, performAction } = useResourceAction({
    dialogType: "add",
    endpoint: `${storeSlug}/finance/accounts`,
    refetchList: refetch,
    resourceKey: `${storeSlug}-finance-accounts`,
    translations: {
      pending: "Menambah akun keuangan baru...",
      success: "Akun keuangan berhasil ditambah",
    },
  });

  return (
    <BaseAddDialog
      title="Tambah Akun Keuangan"
      description="Tambahkan akun baru ke dalam Chart of Accounts (COA) toko Anda."
      open={isOpen}
      onOpenChange={handleClose}
      renderForm={() => <FinanceAccountForm onSubmit={performAction} />}
    />
  );
}