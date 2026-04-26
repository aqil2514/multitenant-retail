/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryState } from "@/hooks/use-query-state";
import { useFetch } from "@/hooks/use-fetch";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/toast/error";
import { useState } from "react";

/**
 * Props untuk hook `useResourceAction`.
 * Digunakan untuk mengelola aksi add, edit, dan delete pada suatu resource
 * secara generik, termasuk fetching data, toast feedback, dan state management.
 */
interface UseResourceActionProps {
  /**
   * Identifier unik untuk resource ini, digunakan sebagai prefix cache key.
   * @example 'customer-category'
   */
  resourceKey: string;

  /**
   * Nama key di query string yang menyimpan ID resource.
   * Tidak digunakan saat `dialogType` adalah `'add'`.
   * @example 'categoryId', 'id'
   */
  idParamKey?: string;

  /**
   * Base URL endpoint untuk resource ini, tanpa trailing slash dan tanpa ID.
   * ID akan ditambahkan otomatis oleh hook untuk aksi edit dan delete.
   * @example '/customer/categories'
   */
  endpoint: string;

  /**
   * Jenis aksi yang akan dilakukan pada dialog.
   * - `'add'`    — melakukan POST ke endpoint
   * - `'edit'`   — melakukan PATCH ke endpoint
   * - `'delete'` — melakukan DELETE ke endpoint
   */
  dialogType: "add" | "edit" | "delete";

  /** Fungsi untuk me-refetch list resource setelah aksi berhasil. */
  refetchList: () => void;

  /** Pesan toast yang ditampilkan selama dan setelah aksi berlangsung. */
  translations: {
    /** Pesan yang ditampilkan saat request sedang berjalan. */
    pending: string;
    /** Pesan yang ditampilkan saat request berhasil. */
    success: string;
  };

  /**
   * Apakah form mengandung file upload.
   * Jika `true`, request add/edit akan menggunakan `postForm`/`patchForm` (multipart/form-data).
   * Jika `false` (default), menggunakan `post`/`patch` (application/json).
   * @default false
   */
  hasFile?: boolean;
}

/**
 * Hook generik untuk mengelola aksi add, edit, dan delete pada suatu resource.
 *
 * Menangani:
 * - Fetching data resource by ID dari query string (khusus edit dan delete)
 * - Melakukan POST / PATCH / DELETE ke endpoint
 * - Menampilkan toast feedback (pending, success, error)
 * - Me-refetch list setelah aksi berhasil
 * - Menutup dialog setelah aksi berhasil
 * - Loading dan submitting state
 *
 * @template T - Tipe data resource yang di-fetch
 * @param props - Konfigurasi hook, lihat {@link UseResourceActionProps}
 * @returns State dan handler yang dibutuhkan oleh dialog add/edit/delete
 *
 * @example
 * const { isOpen, handleClose, performAction } =
 *   useResourceAction({
 *     resourceKey: "customer-category",
 *     endpoint: "/customer/categories",
 *     dialogType: "add",
 *     refetchList: refetch,
 *     translations: {
 *       pending: t("toast.addPending"),
 *       success: t("toast.addSuccess"),
 *     },
 *   });
 */
export function useResourceAction<T>({
  resourceKey,
  idParamKey,
  endpoint,
  dialogType,
  refetchList,
  hasFile = false,
  translations,
}: UseResourceActionProps) {
  const { get, update } = useQueryState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const id = dialogType !== "add" && idParamKey ? get(idParamKey) : null;
  const isOpen = get("dialog") === dialogType;

  /** Fetch hanya dijalankan saat edit atau delete, saat dialog terbuka dan ID tersedia. */
  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useFetch<T>(
    [`${resourceKey}-${id}`],
    `${endpoint}/${id}`,
    !!id && isOpen,
  );

  /** Menutup dialog dengan mereset query param `dialog` dan `id`. */
  const handleClose = (open?: boolean) => {
    if (!open)
      update({ dialog: null, ...(idParamKey ? { [idParamKey]: null } : {}) });
  };

  /**
   * Menjalankan aksi add, edit, atau delete sesuai `dialogType`.
   * @param values - Data form yang dikirim (tidak digunakan untuk aksi delete)
   */
  const performAction = async (values?: any) => {
    setIsSubmitting(true);

    try {
      const url = `${endpoint}/${id}`;
      const request =
        dialogType === "add"
          ? hasFile
            ? api.postForm(endpoint, values)
            : api.post(endpoint, values)
          : dialogType === "delete"
            ? api.delete(url)
            : hasFile
              ? api.patchForm(url, values)
              : api.patch(url, values);

      await toast.promise(request, {
        pending: translations.pending,
        success: translations.success,
        error: {
          render({ data }) {
            return getErrorMessage(data);
          },
        },
      });

      refetch();
      refetchList();
      handleClose();
    } catch {
      // Error display sudah ditangani oleh toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    isOpen,
    isLoadingData,
    isSubmitting,
    handleClose,
    performAction,
  };
}
