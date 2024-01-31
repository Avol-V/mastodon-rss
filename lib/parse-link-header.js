import { URLSearchParams } from 'node:url';

/**
 * @typedef { import( '../types/api.js' ).PaginationQueryParams } PaginationQueryParams
 * @typedef { import( '../types/parsed-link-header.js' ).ParsedLinkHeader } ParsedLinkHeader
 */

/**
 * @param { string | null | undefined } value
 */
export function parseLinkHeader( value )
{
	/** @type { ParsedLinkHeader } */
	const result = {
		next: undefined,
		prev: undefined,
	};
	
	if ( !value )
	{
		return result;
	}
	
	const nextMatches = /<[^?]+\?([^>]+)>; rel="next"/.exec( value );
	const prevMatches = /<[^?]+\?([^>]+)>; rel="prev"/.exec( value );
	
	if ( nextMatches )
	{
		/** @type { PaginationQueryParams } */
		const next = Object.fromEntries( new URLSearchParams( nextMatches[1] ) );
		
		result.next = next;
	}
	
	if ( prevMatches )
	{
		/** @type { PaginationQueryParams } */
		const prev = Object.fromEntries( new URLSearchParams( prevMatches[1] ) );
		
		result.prev = prev;
	}
	
	return result;
}
