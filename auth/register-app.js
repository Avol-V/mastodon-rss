import { createApp } from '../api/create-app.js';
import { config } from '../lib/config.js';

export async function registerApp()
{
	console.log( 'Registering application...' );
	
	const data = await createApp();
	
	await config.set({
		clientId: data.client_id,
		clientSecret: data.client_secret,
	});
	
	console.log( 'Application tokens saved.' );
}
