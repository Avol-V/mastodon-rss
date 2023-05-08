export type ApiRequestOptions = {
	method?: string,
	headers?: Record<string, string>,
	body?: object,
	searchParams?: Record<string, string | number>,
	withoutAuth?: boolean,
	bodyAsText?: boolean,
};
