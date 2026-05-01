export interface StoreIdentity {
  address: string;
  name: string;
  phone: string;
}

export interface ProductUnits {
  id: string;
  value: string;
  name: string;
}

export interface StoreSettingResponse {
  productUnits: ProductUnits[];
  storeIdentity: StoreIdentity;
}
