import { LabelValue } from "@/@types/general";
import { ResponseDataWithMeta } from "@/@types/server";

export interface ProductListRss {
  productUnits: LabelValue[];
  productCategories: LabelValue[];
}

export interface ProductListFetchRes {
  id: string;
  name: string;
  sku: string | null;
  image: string | null;
  stock: number;
  minStock: number;
  updatedAt: Date;
  category: {
    name: string;
  } | null;
  unit: {
    name: string;
  };
}

export type ProductListTable = ResponseDataWithMeta<ProductListFetchRes[]>;

export interface ProductListDelete {
  category: string | null;
  unit: string | null;
  name?: string | undefined;
  sku?: string | null | undefined;
  stock?: number | undefined;
}
