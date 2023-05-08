import { exit } from 'node:process';
import { parseArgs } from 'node:util';
import { config } from './lib/config.js';
import { getPackageData } from './lib/get-package-data.js';
import { registerApp } from './auth/register-app.js';
import { login } from './auth/login.js';

async function runLogin()
{
	console.log( 'Running login command...' );
	
	if ( !config.clientId || !config.clientSecret )
	{
		await registerApp();
	}
	
	await login();
	
	console.log( '✓ Successfully logged in.' );
}

async function runGenerate()
{
	// TODO
}

async function main()
{
	const { values } = parseArgs({
		options: {
			config: {
				type: 'string',
				short: 'c',
			},
			instance: {
				type: 'string',
				short: 'i',
			},
			login: {
				type: 'boolean',
			},
		},
	});
	
	await config.load( values.config );
	
	if ( values.instance )
	{
		await config.set({
			instance: values.instance,
		});
	}
	
	const packageData = getPackageData();
	
	console.log(
		`Starting ${packageData.name} ${packageData.version}
with config: ${config.configPath}
for instance: ${config.instance}`,
	);
	
	if ( values.login )
	{
		await runLogin();
	}
	else
	{
		await runGenerate();
	}
}

main().catch(
	( error ) =>
	{
		console.error( error );
		exit( 1 );
	},
);
