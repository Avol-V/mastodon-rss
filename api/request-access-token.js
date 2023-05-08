import { apiRequest } from '../lib/api-request.js';
import { config } from '../lib/config.js';
import { scopes } from '../lib/constants.js';

/**
 * @param { string } authorizationCode
 * @return { Promise<import( '../types/api.js' ).PostOauthTokenResponse> }
 */
export function requestAccessToken( authorizationCode )
{
	const body = {
		grant_type: 'authorization_code',
		code: authorizationCode,
		client_id: config.clientId,
		client_secret: config.clientSecret,
		redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
		scope: scopes.join( ' ' ),
	};
	
	return apiRequest(
		'/oauth/token',
		{
			method: 'POST',
			body,
			withoutAuth: true,
		},
	);
}
