import { Pagination } from 'src/@types/server';

export function getResponsePagination(
  total: number,
  page: number,
  limit: number,
): Pagination {
  return {
    total,
    page: page,
    limit: limit,
    totalPages: Math.ceil(total / limit),
  };
}
