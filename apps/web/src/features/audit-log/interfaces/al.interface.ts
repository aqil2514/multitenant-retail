import { JsonObject } from "@/@types/primitive";
import { ResponseDataWithMeta } from "@/@types/server";

export interface AuditLogTable<T = JsonObject> {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: T;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

export type AudotLogWithMeta = ResponseDataWithMeta<AuditLogTable[]>;
