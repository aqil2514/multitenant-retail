import { ReactNode } from "react";
import { BaseDialog } from "./base-dialog";

/**
 * Props untuk komponen `BaseEditDialog`.
 * Menyediakan struktur dialog generik untuk aksi edit suatu resource,
 * dengan dukungan loading skeleton dan render form yang fleksibel.
 */
interface BaseEditDialogProps {
  /** Apakah dialog sedang terbuka. */
  open: boolean;

  /**
   * Callback yang dipanggil saat state dialog berubah.
   * @param open - `true` jika dialog dibuka, `false` jika ditutup
   */
  onOpenChange: (open: boolean) => void;

  /** Judul yang ditampilkan di header dialog. */
  title: string;

  /** Deskripsi opsional yang ditampilkan di bawah judul. */
  description?: string;

  /**
   * Apakah data resource sedang di-fetch.
   * Jika `true`, menampilkan loading skeleton sebagai pengganti form.
   */
  isLoadingData?: boolean;

  /**
   * Render prop untuk menampilkan form di dalam dialog.
   * Dipanggil hanya ketika `isLoadingData` bernilai `false`.
   *
   * @example
   * renderForm={() => (
   *   <CustomerCategoryForm
   *     onSubmit={performAction}
   *     defaultValues={formValues}
   *   />
   * )}
   */
  renderForm?: () => ReactNode;
}

export function BaseEditDialog({
  open,
  onOpenChange,
  title,
  description,
  isLoadingData,
  renderForm,
}: BaseEditDialogProps) {
  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="lg"
    >
      <div className="min-h-50">
        {isLoadingData ? (
          <div className="space-y-4 animate-pulse p-4">
            <div className="h-4 bg-zinc-100 rounded w-1/4" />
            <div className="h-10 bg-zinc-100 rounded w-full" />
            <div className="h-4 bg-zinc-100 rounded w-1/4" />
            <div className="h-24 bg-zinc-100 rounded w-full" />
            <div className="flex justify-end gap-2 mt-6">
              <div className="h-10 bg-zinc-100 rounded w-20" />
              <div className="h-10 bg-zinc-100 rounded w-24" />
            </div>
          </div>
        ) : (
          renderForm?.()
        )}
      </div>
    </BaseDialog>
  );
}