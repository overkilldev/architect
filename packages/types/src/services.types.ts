export interface Response<T = unknown> {
  data: T;
  status: StatusCode;
  filename: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  isArray: boolean; // Whether the data object is an array (useful for JS users)
  duration: number; // Time in milliseconds taken from when the endpoint is received at the server and ending when the transformer finishes
}

export type StatusCode =
  | 200
  | 201
  | 400
  | 401
  | 403
  | 404
  | 409
  | 429
  | (number & Record<never, never>);

export interface PaginatedResponse<T = unknown[]> extends Response<T> {
  links: PaginatedResponseLinks;
  meta: PaginatedResponseMeta;
}

export interface PaginatedResponseLinks {
  previous: string | null;
  current: string;
  next: string | null;
}

export interface PaginatedResponseMeta {
  pageSize: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
  from: number;
  to: number;
  count?: number;
}

export interface ErrorResponse<T = null> extends Response<T> {
  status: number; // Http status code
  code: number; // Internal error code number
  message: string; // Reason why the error happened
  moreInfo: string; // Link to the error explanation
  data: T; // Additional error data
}
