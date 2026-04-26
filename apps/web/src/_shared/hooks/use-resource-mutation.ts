/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetch } from "@/_shared/hooks/use-fetch";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/toast/error";
import { useState } from "react";

/**
 * Props untuk hook `useResourceMutation`.
 * Digunakan untuk mengelola aksi add, edit, dan delete pada suatu resource
 * di luar konteks dialog (full-page form, inline edit, dsb).
 */
interface UseResourceMutationProps {
  /**
   * Identifier unik untuk resource ini, digunakan sebagai prefix cache key.
   * @example 'customer-category'
   */
  resourceKey: string;

  /**
   * Base URL endpoint untuk resource ini, tanpa trailing slash dan tanpa ID.
   * @example '/customer/categories'
   */
  endpoint: string;

  /**
   * Jenis aksi yang akan dilakukan.
   * - `'add'`    — melakukan POST ke endpoint
   * - `'edit'`   — melakukan PATCH ke `endpoint/:id`
   * - `'delete'` — melakukan DELETE ke `endpoint/:id`
   */
  actionType: "add" | "edit" | "delete";

  /**
   * ID resource yang akan di-fetch, di-edit, atau di-delete.
   * Bisa berasal dari URL params, props, atau state lokal.
   * Tidak diperlukan saat `actionType` adalah `'add'`.
   * @example useParams().id
   */
  id?: string | null;

  /**
   * Apakah data resource langsung di-fetch saat hook mount.
   * Berguna untuk halaman edit full-page yang langsung membutuhkan data awal.
   * Hanya berlaku jika `id` tersedia dan `actionType` bukan `'add'`.
   * @default true
   */
  fetchOnMount?: boolean;

  /**
   * Apakah form mengandung file upload.
   * Jika `true`, request add/edit menggunakan multipart/form-data.
   * @default false
   */
  hasFile?: boolean;

  /** Pesan toast yang ditampilkan selama dan setelah aksi berlangsung. */
  translations: {
    pending: string;
    success: string;
  };

  /**
   * Callback yang dipanggil setelah aksi berhasil.
   * Bisa digunakan untuk navigasi, refetch, atau keduanya.
   *
   * @example
   * // Navigasi ke halaman lain
   * onSuccess: () => router.push('/customer/categories')
   *
   * @example
   * // Refetch data di halaman yang sama
   * onSuccess: () => refetchList()
   *
   * @example
   * // Keduanya
   * onSuccess: () => { refetchList(); router.push('/...'); }
   */
  onSuccess?: (data?: any) => void;
}

/**
 * Hook generik untuk mengelola aksi add, edit, dan delete di luar konteks dialog.
 * Cocok untuk full-page form, inline edit, bulk action, dsb.
 *
 * Berbeda dengan `useResourceAction`, hook ini:
 * - Tidak bergantung pada query string (`?dialog=`, `?id=`)
 * - Menerima `id` langsung dari props/URL params/state lokal
 * - Menyerahkan post-action handling ke `onSuccess` callback (navigasi, refetch, dll)
 *
 * @template T - Tipe data resource yang di-fetch
 * @param props - Konfigurasi hook, lihat {@link UseResourceMutationProps}
 * @returns State dan handler yang dibutuhkan oleh form/page
 *
 * @example
 * // Full-page edit (ID dari URL params)
 * const { id } = useParams();
 * const { data, isLoadingData, isSubmitting, performAction } =
 *   useResourceMutation({
 *     resourceKey: 'customer-category',
 *     endpoint: '/customer/categories',
 *     actionType: 'edit',
 *     id,
 *     onSuccess: () => router.push('/customer/categories'),
 *     translations: {
 *       pending: t('toast.editPending'),
 *       success: t('toast.editSuccess'),
 *     },
 *   });
 *
 * @example
 * // Inline delete (ID dari state lokal)
 * const [selectedId, setSelectedId] = useState<string | null>(null);
 * const { isSubmitting, performAction } =
 *   useResourceMutation({
 *     resourceKey: 'customer-category',
 *     endpoint: '/customer/categories',
 *     actionType: 'delete',
 *     id: selectedId,
 *     fetchOnMount: false,
 *     onSuccess: () => refetchList(),
 *     translations: {
 *       pending: t('toast.deletePending'),
 *       success: t('toast.deleteSuccess'),
 *     },
 *   });
 */
export function useResourceMutation<T>({
  resourceKey,
  endpoint,
  actionType,
  id = null,
  fetchOnMount = true,
  hasFile = false,
  translations,
  onSuccess,
}: UseResourceMutationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldFetch = actionType !== "add" && !!id && fetchOnMount;

  /**
   * Fetch data resource by ID.
   * Hanya aktif saat `actionType` bukan 'add', `id` tersedia, dan `fetchOnMount` true.
   */
  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useFetch<T>([`${resourceKey}-${id}`], `${endpoint}/${id}`, shouldFetch);

  /**
   * Menjalankan aksi add, edit, atau delete sesuai `actionType`.
   * @param values - Data form yang dikirim (tidak digunakan untuk aksi delete)
   */
  const performAction = async (values?: any) => {
    setIsSubmitting(true);

    try {
      const url = `${endpoint}/${id}`;
      const request =
        actionType === "add"
          ? hasFile
            ? api.postForm(endpoint, values)
            : api.post(endpoint, values)
          : actionType === "delete"
            ? api.delete(url)
            : hasFile
              ? api.patchForm(url, values)
              : api.patch(url, values);

      const response = await toast.promise(request, {
        pending: translations.pending,
        success: translations.success,
        error: {
          render({ data }) {
            return getErrorMessage(data);
          },
        },
      });

      refetch();
      onSuccess?.(response.data);
    } catch {
      // Error display sudah ditangani oleh toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    /** Data resource yang di-fetch (tersedia saat edit/delete dengan fetchOnMount true) */
    data,
    /** True saat data sedang di-fetch */
    isLoadingData,
    /** True saat request sedang berjalan */
    isSubmitting,
    /** Trigger fetch ulang data resource secara manual */
    refetch,
    /** Jalankan aksi sesuai actionType */
    performAction,
  };
}
