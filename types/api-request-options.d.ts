export type ApiRequestOptionsBase = {
	method?: string,
	headers?: Record<string, string>,
	body?: object,
	searchParams?: Record<string, string | number>,
	withoutAuth?: boolean,
	bodyAsText?: boolean,
};

export type ApiRequestOptionsWithoutHeaders = ApiRequestOptionsBase & {
	withHeaders?: false,
};

export type ApiRequestOptionsWithHeaders = ApiRequestOptionsBase & {
	withHeaders: true,
};

export type ApiRequestOptions = ApiRequestOptionsWithoutHeaders | ApiRequestOptionsWithHeaders;
