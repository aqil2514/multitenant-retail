export interface PurchaseSupplier {
  id: string;
  storeId: string;
  name: string;
  code: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: "ACTIVE" | "INACTIVE";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdById: string;
  updatedById: string | null;
}
