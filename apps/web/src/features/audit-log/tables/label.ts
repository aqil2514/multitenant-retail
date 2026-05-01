type EntityLabel =
  | "StoreUser"
  | "StoreIdentity"
  | "ProductCategory"
  | "ProductUnit"
  | "Product"
  | "Authentication";

export const modulLables: Record<EntityLabel, string> = {
  StoreUser: "Pegawai Toko",
  StoreIdentity: "Identitas Toko",
  ProductCategory: "Kategori Produk",
  ProductUnit: "Unit Produk",
  Product: "List Produk",
  Authentication: "Autentikasi",
};
