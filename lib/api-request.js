import { URL } from 'node:url';
import { config } from './config.js';
import { getPackageData } from './get-package-data.js';
import { ApiError } from './api-error.js';

/**
 * @typedef { import( '../types/api-request-options.js' ).ApiRequestOptions } ApiRequestOptions
 * @typedef { import( '../types/api-request-options.js' ).ApiRequestOptionsWithHeaders } ApiRequestOptionsWithHeaders
 * @typedef { import( '../types/api-request-options.js' ).ApiRequestOptionsWithoutHeaders } ApiRequestOptionsWithoutHeaders
 */

/**
 * @template { unknown } TBody
 * @overload
 * @param { string } path
 * @param { ApiRequestOptionsWithHeaders } options
 * @return { Promise<{ headers: Headers, body: TBody }> }
 */

/**
 * @template { unknown } TBody
 * @overload
 * @param { string } path
 * @param { ApiRequestOptionsWithoutHeaders } options
 * @return { Promise<TBody> }
 */

/**
 * @param { string } path
 * @param { ApiRequestOptions } options
 */
export async function apiRequest(
	path,
	{
		method,
		headers: additionalHeaders,
		body,
		searchParams,
		withoutAuth,
		bodyAsText,
		withHeaders,
	} = {},
)
{
	const { name, version } = getPackageData();
	
	/** @type { Record<string, string> } */
	const headers = {
		'User-Agent': `${name}/${version}`,
		'Content-Type': 'application/json',
		...additionalHeaders,
	};
	
	if ( !withoutAuth && config.accessToken )
	{
		headers.Authorization = `Bearer ${config.accessToken}`;
	}
	
	const url = new URL( path, config.instance );
	
	if ( searchParams )
	{
		for ( const [key, value] of Object.entries( searchParams ) )
		{
			if ( value !== undefined )
			{
				url.searchParams.append( key, String( value ) );
			}
		}
	}
	
	const response = await fetch(
		url,
		{
			method,
			headers,
			body: body ? JSON.stringify( body ) : undefined,
		},
	);
	
	if ( !response.ok )
	{
		const data = await response.json().catch(
			( error ) => ({
				error: String( error ),
			}),
		);
		
		throw ApiError.fromHttp( response.status, data );
	}
	
	const resultBody = await (
		bodyAsText
			? response.text()
			: response.json()
	);
	
	if ( withHeaders )
	{
		return {
			headers: response.headers,
			body: resultBody,
		};
	}
	
	return resultBody;
}
