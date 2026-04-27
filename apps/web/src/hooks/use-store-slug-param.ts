import { useParams } from "next/navigation";

export function useStoreSlugParam() {
  const params = useParams();

  return params.storeSlug;
}
