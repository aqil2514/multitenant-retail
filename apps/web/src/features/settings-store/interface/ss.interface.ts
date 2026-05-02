import { ProductUnits } from "./ss-product-units";

export interface StoreIdentity {
  address: string;
  name: string;
  phone: string;
  slug: string;
}

export interface StoreSettingResponse {
  productUnits: ProductUnits[];
  storeIdentity: StoreIdentity;
}
