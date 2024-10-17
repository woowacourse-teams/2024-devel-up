import { DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import { develupAPIClient } from './clients/develupClient';

interface PaginationParams {
  mission?: string;
  size?: string;
  page?: string;
  filter?: string;
  hashTag?: string;
}

export interface PaginationResponse<T> {
  data: T;
  currentPage: number;
  totalPage: number;
}

export const getWithPagination = async <T>(
  path: string,
  params: PaginationParams,
): Promise<PaginationResponse<T>> => {
  const { size = DEFAULT_PAGE_SIZE, page = '0', filter, hashTag, mission } = params;

  const queryParams: Record<string, string> = Object.entries({
    size,
    page,
    filter,
    hashTag,
    mission,
  }).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const { data, currentPage, totalPage } = await develupAPIClient.get<PaginationResponse<T>>(
    path,
    queryParams,
  );

  return {
    data,
    currentPage,
    totalPage,
  };
};
