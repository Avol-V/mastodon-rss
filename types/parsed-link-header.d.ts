import type { PaginationQueryParams } from './api.js';

export type ParsedLinkHeader = {
	next: PaginationQueryParams | undefined,
	prev: PaginationQueryParams | undefined,
};
