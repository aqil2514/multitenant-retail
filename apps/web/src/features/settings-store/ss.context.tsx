import { createResourceContext } from "@/context/create-resource-context";
import { StoreSettingResponse } from "./interface/ss.interface";

export const { Provider: StoreSettingsProvider, useData: useStoreSettings } =
  createResourceContext<StoreSettingResponse, { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-settings-store`],
    ({ storeSlug }) => `${storeSlug}/settings/store`,
  );