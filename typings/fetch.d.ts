/**
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60924
 */

import type { RequestOptions } from 'http';
import type { URLSearchParams, URL } from 'url';

type BodyInit = string;
type HeadersInit = Record<string, string>;
type RequestRedirect = 'error' | 'follow' | 'manual';

interface RequestInit
{
	body?: BodyInit | undefined;
	headers?: HeadersInit | undefined;
	method?: string | undefined;
	redirect?: RequestRedirect | undefined;
	signal?: AbortSignal | null | undefined;
	
	agent?: RequestOptions['agent'] | ((parsedUrl: URL) => RequestOptions['agent']);
	compress?: boolean | undefined;
	follow?: number | undefined;
	size?: number | undefined;
	timeout?: number | undefined;
}

interface URLLike
{
	href: string,
}
type RequestInfo = string | URLLike;

class Body
{
	constructor(body?: any, opts?: { size?: number | undefined; timeout?: number | undefined });
	arrayBuffer(): Promise<ArrayBuffer>;
	blob(): Promise<Blob>;
	body: NodeJS.ReadableStream;
	bodyUsed: boolean;
	buffer(): Promise<Buffer>;
	json(): Promise<any>;
	size: number;
	text(): Promise<string>;
	textConverted(): Promise<string>;
	timeout: number;
}

type ResponseInit = unknown;

type Headers = unknown;

type ResponseType =
	| 'basic'
	| 'cors'
	| 'default'
	| 'error'
	| 'opaque'
	| 'opaqueredirect'
;

class Response extends Body
{
	constructor(body?: BodyInit, init?: ResponseInit);
	static error(): Response;
	static redirect(url: string, status: number): Response;
	clone(): Response;
	headers: Headers;
	ok: boolean;
	redirected: boolean;
	status: number;
	statusText: string;
	type: ResponseType;
	url: string;
}

export type fetch = ( url: RequestInfo, init?: RequestInit ) => Promise<Response>;
