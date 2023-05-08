import { URL } from 'node:url';
import { config } from '../lib/config.js';
import { scopes } from '../lib/constants.js';

export function getAuthUrl()
{
	const url = new URL( '/oauth/authorize', config.instance );
	
	url.searchParams.append( 'response_type', 'code' );
	url.searchParams.append( 'redirect_uri', 'urn:ietf:wg:oauth:2.0:oob' );
	url.searchParams.append( 'scope', scopes.join( ' ' ) );
	url.searchParams.append( 'client_id', config.clientId ?? '' );
	
	return url;
}
