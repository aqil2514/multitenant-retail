export interface ProductUnits {
  id: string;
  value: string;
  name: string;
}

export interface PendingUnit {
  id?: string;
  name: string;
  value: string;
}

export interface ProductUnitsConflictData {
  message: string;
  affectedProducts: {
    id: string;
    name: string;
    unit: ProductUnits;
  }[];
  availableUnits: ProductUnits[];
  toUpdate: PendingUnit[];
  toCreate: PendingUnit[];
}
