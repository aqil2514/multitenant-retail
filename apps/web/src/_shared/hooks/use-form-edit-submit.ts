import { serverUrl } from "@/constants/urls";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/toast/error";
import { toast } from "react-toastify";

interface UseFormEditSubmitConfig<TSuccess = unknown> {
  endpoint: string;
  pendingMessage?: string;
  successMessage?: string;
  onSuccess?: (data: TSuccess) => void;
}
export function useFormEditSubmit<TSuccess>({
  endpoint,
  pendingMessage = "Memperbarui data...",
  successMessage = "Data berhasil diperbarui",
  onSuccess,
}: UseFormEditSubmitConfig<TSuccess>) {
  const storeSlug = useStoreSlugParam();

  const submit = async (data: object) => {
    const request = api.patch(`${serverUrl}/${storeSlug}/${endpoint}`, data);
    const response = await toast.promise(request, {
      pending: pendingMessage,
      success: successMessage,
      error: {
        render({ data }) {
          return getErrorMessage(data);
        },
      },
    });

    onSuccess?.(response.data);
  };

  return { submit };
}
