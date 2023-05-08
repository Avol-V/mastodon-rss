import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { requestAccessToken } from '../api/request-access-token.js';
import { config } from '../lib/config.js';
import { getAuthUrl } from './get-auth-url.js';

export async function login()
{
	const url = getAuthUrl();
	
	console.log( `Open this URL in browser for login:\n${url}\n` );
	
	const readLine = createInterface( stdin, stdout );
	
	let authorizationCode = '';
	
	do
	{
		authorizationCode = (
			await readLine.question(
				'Authorization code: ',
			)
		)
			.trim();
	}
	while ( !authorizationCode )
	
	readLine.close();
	
	console.log( '\nRequesting access token...' );
	
	const data = await requestAccessToken( authorizationCode );
	
	await config.set({
		accessToken: data.access_token,
	});
	
	console.log( 'Access token saved to config at:', config.configPath );
}
