/**
 * @typedef { import( '../types/mastodon-error.js' ).MastodonError } MastodonError
 */

export class ApiError extends Error
{
	/** @override */
	name = 'ApiError';
	
	/**
	 * @param { number } statusCode
	 * @param { MastodonError } body
	 */
	static fromHttp( statusCode, body )
	{
		let message = body.error_description || body.error;
		
		return new ApiError( `[${statusCode}] ${message}` );
	}
}
