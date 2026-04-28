export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ResponseMeta {
  pagination?: Pagination;
}
