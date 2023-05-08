import { scopes } from '../lib/constants.js';
import { apiRequest } from '../lib/api-request.js';
import { getPackageData } from '../lib/get-package-data.js';

/**
 * @return { Promise<import( '../types/api.js' ).PostApiAppsResponse> }
 */
export function createApp()
{
	const { name, homepage } = getPackageData();
	
	const body = {
		client_name: name,
		redirect_uris: 'urn:ietf:wg:oauth:2.0:oob',
		scopes: scopes.join( ' ' ),
		website: homepage,
	};
	
	return apiRequest(
		'/api/v1/apps',
		{
			method: 'POST',
			body,
			withoutAuth: true,
		},
	);
}
