/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { BaseDialog } from "./base-dialog";
import { ButtonLoading } from "../atoms/button-loading";

/**
 * Props untuk komponen `BaseDeleteDialog`.
 * Menyediakan struktur dialog generik untuk aksi hapus suatu resource,
 * dengan dukungan dua mode tampilan info dan loading skeleton.
 */
interface BaseDeleteDialogProps {
  /** Apakah dialog sedang terbuka. */
  open: boolean;

  /**
   * Callback yang dipanggil saat state dialog berubah.
   * @param open - `true` jika dialog dibuka, `false` jika ditutup
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Judul yang ditampilkan di header dialog.
   */
  title?: string;

  /**
   * Deskripsi yang ditampilkan di bawah judul.
   */
  description?: string;

  /**
   * Apakah data resource sedang di-fetch.
   * Jika `true`, menampilkan loading skeleton sebagai pengganti info resource.
   */
  isLoadingData?: boolean;

  /**
   * Apakah proses hapus sedang berjalan.
   * Jika `true`, tombol konfirmasi menampilkan loading dan tombol batal di-disable.
   */
  isDeleting?: boolean;

  /** Callback yang dipanggil saat user mengkonfirmasi penghapusan. */
  onConfirm: () => void;

  /**
   * **Mode 1** — Data mentah resource yang akan ditampilkan sebagai list key-value.
   * Key yang termasuk `ignoredKeys` (seperti `id`, `created_at`) akan dilewati otomatis.
   * Gunakan prop `template` untuk mengatur label yang ditampilkan.
   *
   * @example
   * data={{ name: "Kategori A", description: "Deskripsi" }}
   */
  data?: Record<string, any>;

  /**
   * **Mode 2** — Custom render untuk menampilkan info resource dengan tampilan kustom.
   * Jika disediakan, `renderInfo` diprioritaskan di atas `data`.
   *
   * @example
   * renderInfo={<p className="text-sm">{category.name}</p>}
   */
  renderInfo?: ReactNode;

  /**
   * Pemetaan key data ke label yang ditampilkan, digunakan bersama prop `data`.
   * Jika disediakan, hanya key yang terdaftar di sini yang akan ditampilkan.
   * Jika tidak disediakan, semua key dari `data` akan ditampilkan dengan format otomatis.
   *
   * @example
   * template={{ name: "Nama Kategori", description: "Deskripsi" }}
   */
  template?: Record<string, string>;
}

export function BaseDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  isLoadingData,
  isDeleting,
  onConfirm,
  data,
  renderInfo,
  template,
}: BaseDeleteDialogProps) {
  const defaultTitle = "Hapus item";
  const defaultDescription = "Apakah Anda yakin ingin menghapus item ini? Aksi ini tidak dapat dibatalkan.";

  // Fungsi internal untuk merender list key-value jika data disediakan
  const renderDataList = () => {
    if (!data) return null;

    const displayKeys = template ? Object.keys(template) : Object.keys(data);
    const ignoredKeys = ["id", "userId", "created_at", "updated_at", "deleted_at"];

    return (
      <div className="rounded-xl border border-red-100 bg-red-50/40 p-4 space-y-3">
        {displayKeys.map((key) => {
          const value = data[key];
          if (ignoredKeys.includes(key) || value === null || value === undefined) return null;

          return (
            <div key={key} className="flex flex-col border-b border-red-100/50 pb-2 last:border-0 last:pb-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500/80">
                {template ? template[key] : key.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-semibold text-zinc-900 wrap-break-word">
                {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title ?? defaultTitle}
      description={description ?? defaultDescription}
      variant="danger"
      size="md"
    >
      <div className="space-y-6">
        <div className="min-h-15">
          {isLoadingData ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-zinc-100 rounded w-3/4" />
              <div className="h-12 bg-zinc-100 rounded w-full" />
            </div>
          ) : (
            // Prioritaskan renderInfo, jika tidak ada baru renderDataList
            renderInfo || renderDataList()
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="text-zinc-500"
          >
            Batal
          </Button>
          <ButtonLoading
            variant="destructive"
            onClick={onConfirm}
            isLoading={isDeleting}
            disabled={isDeleting || isLoadingData}
            loadingText="Menghapus..."
          >
            Konfirmasi
          </ButtonLoading>
        </div>
      </div>
    </BaseDialog>
  );
}