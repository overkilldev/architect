// Services builder functions

import type { ErrorResponse, PaginatedResponse } from "@architect/types";
import type { Response, PaginatedResponseLinks } from "@architect/types";
import type { PaginatedResponseMeta } from "@architect/types";
import faker from "faker";

export const buildResponse = <T>(
  overrides: Partial<Response<T>> = {}
): Response<T> => {
  return {
    data: {} as T,
    duration: faker.datatype.number({ min: 100, max: 1000 }),
    isArray: false,
    method: "GET",
    pathname: "",
    status: 200,
    ...overrides
  };
};

export const buildErrorResponse = <T = null>(
  overrides: Partial<ErrorResponse<T>> = {}
): ErrorResponse<T> => {
  return {
    ...buildResponse<T>(),
    status: 400,
    code: 100,
    message: "Bad request",
    isArray: false,
    moreInfo: "",
    ...overrides
  };
};

export const buildPaginatedResponse = <T>(
  overrides: Partial<PaginatedResponse<T>> = {}
): PaginatedResponse<T> => {
  return {
    ...buildResponse<T>(),
    isArray: true,
    links: buildPaginatedResponseLinks(),
    meta: buildPaginatedResponseMeta(),
    ...overrides
  };
};

export const buildPaginatedResponseLinks = (
  overrides: Partial<PaginatedResponseLinks> = {}
): PaginatedResponseLinks => {
  return {
    current: "/?page=1&size=20",
    next: "/?page=2&size=20",
    previous: null,
    ...overrides
  };
};

export const buildPaginatedResponseMeta = (
  overrides: Partial<PaginatedResponseMeta> = {}
): PaginatedResponseMeta => {
  return {
    currentPage: 1,
    nextPage: 2,
    previousPage: null,
    totalPages: 3,
    from: 0,
    to: 19,
    pageSize: 20,
    ...overrides
  };
};
