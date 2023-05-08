import { URL } from 'node:url';
import { config } from './config.js';
import { getPackageData } from './get-package-data.js';
import { ApiError } from './api-error.js';

/**
 * @typedef { import( '../types/api-request-options.js' ).ApiRequestOptions } ApiRequestOptions
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
			url.searchParams.append( key, String( value ) );
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
	
	if ( bodyAsText )
	{
		return response.text();
	}
	
	return response.json();
}
