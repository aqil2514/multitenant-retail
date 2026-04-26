import { ReactNode } from "react";
import { BaseDialog } from "./base-dialog";

/**
 * Props untuk komponen `BaseAddDialog`.
 * Menyediakan struktur dialog generik untuk aksi tambah suatu resource.
 */
interface BaseAddDialogProps {
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
   * Render prop untuk menampilkan form di dalam dialog.
   *
   * @example
   * renderForm={() => (
   *   <CustomerCategoryForm onSubmit={performAction} />
   * )}
   */
  renderForm?: () => ReactNode;
}

export function BaseAddDialog({
  open,
  onOpenChange,
  title,
  description,
  renderForm,
}: BaseAddDialogProps) {
  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="lg"
    >
      {renderForm?.()}
    </BaseDialog>
  );
}