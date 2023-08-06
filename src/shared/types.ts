export interface PaginatedResult<T> {
  count: number;
  results: Array<T>;
}
