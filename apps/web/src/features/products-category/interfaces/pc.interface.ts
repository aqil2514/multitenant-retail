export interface BasicProductsCategory {
  id: string;
  name: string;
}

export interface ProductCategoryFetchEdit {
  name: string;
  description?: string;
  parentId?: string;
}
