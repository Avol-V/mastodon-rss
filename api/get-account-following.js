import { apiRequest } from '../lib/api-request.js';
import { parseLinkHeader } from '../lib/parse-link-header.js';

/**
 * @typedef { import( '../types/api.js' ).GetApiAccountsFollowingResponse } GetApiAccountsFollowingResponse
 */

/**
 * @param { import( '../types/api.js' ).GetApiAccountsFollowingPath } pathParams
 * @param { import( '../types/api.js' ).GetApiAccountsFollowingQuery } searchParams
 */
export async function getAccountFollowing( pathParams, searchParams = {} )
{
	const {
		headers,
		body,
	} = await /** @type { typeof apiRequest<GetApiAccountsFollowingResponse> } */(apiRequest)(
		`/api/v1/accounts/${pathParams.id}/following`,
		{
			searchParams,
			withHeaders: true,
		},
	);
	
	const pagination = parseLinkHeader( headers.get( 'link' ) );
	
	return {
		accounts: body,
		pagination,
	};
}
