import { createResourceContext } from "@/context/create-resource-context";
import { AudotLogWithMeta } from "./interfaces/al.interface";

export const { Provider: AuditLogProvider, useData: useAuditLog } =
  createResourceContext<AudotLogWithMeta, { storeSlug: string }>(
    ({ storeSlug }) => [`${storeSlug}-audit-log`],
    ({ storeSlug }) => `${storeSlug}/audit-log`,
  );
