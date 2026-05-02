import { serverUrl } from "@/constants/urls";
import { useStoreSlugParam } from "@/hooks/use-store-slug-param";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/toast/error";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

interface UseFormEditSubmitConfig<TSuccess = unknown> {
  endpoint: string;
  pendingMessage?: string;
  successMessage?: string;
  onSuccess?: (data: TSuccess) => void;
  onError?: (data: AxiosError) => void;
}
export function useFormEditSubmit<TSuccess>({
  endpoint,
  pendingMessage = "Memperbarui data...",
  successMessage = "Data berhasil diperbarui",
  onSuccess,
  onError,
}: UseFormEditSubmitConfig<TSuccess>) {
  const storeSlug = useStoreSlugParam();

  const submit = async (data: object) => {
    const request = api.patch(`${serverUrl}/${storeSlug}/${endpoint}`, data);
    const response = await toast.promise(request, {
      pending: pendingMessage,
      success: successMessage,
      error: {
        render({ data }) {
          if (isAxiosError(data)) {
            onError?.(data);
          }
          return getErrorMessage(data);
        },
      },
    });

    onSuccess?.(response.data);
  };

  return { submit };
}
