import { apiRequest } from '../lib/api-request.js';

/**
 * @typedef { import( '../types/api.js' ).GetApiAccountsLookupResponse } GetApiAccountsLookupResponse
 */

/**
 * @param { import( '../types/api.js' ).GetApiAccountsLookupQuery } searchParams
 */
export function lookupAccount( searchParams )
{
	return /** @type { typeof apiRequest<GetApiAccountsLookupResponse> } */(apiRequest)(
		'/api/v1/accounts/lookup',
		{
			searchParams,
		},
	);
}
