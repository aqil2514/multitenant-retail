type EntityLabel =
  | "StoreUser"
  | "ProductCategory"
  | "ProductUnit"
  | "Product"
  | "Authentication";

export const modulLables: Record<EntityLabel, string> = {
  StoreUser: "Pegawai Toko",
  ProductCategory: "Kategori Produk",
  ProductUnit: "Unit Produk",
  Product: "List Produk",
  Authentication: "Autentikasi",
};
