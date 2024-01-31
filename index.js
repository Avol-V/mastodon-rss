import { exit } from 'node:process';
import { parseArgs } from 'node:util';
import { mkdir } from 'node:fs/promises';
import { config } from './lib/config.js';
import { getPackageData } from './lib/get-package-data.js';
import { readTimelineFile } from './lib/timeline/read-timeline-file.js';
import { writeTimelineFile } from './lib/timeline/write-timeline-file.js';
import { dropOld } from './lib/timeline/drop-old.js';
import { groupByAccount } from './lib/timeline/group-by-account.js';
import { fetchHomeTimelineUntilId } from './lib/timeline/fetch-home-timeline-until-id.js';
import { renderRssFeed } from './lib/rss/render-rss-feed.js';
import { writeRssFile } from './lib/rss/write-rss-file.js';
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
	console.log( 'Running generate command...' );
	
	const previousTimeline = await readTimelineFile();
	const lastId = previousTimeline[0]?.id;
	
	const nextTimeline = await fetchHomeTimelineUntilId( lastId );
	
	if ( nextTimeline.length === 0 )
	{
		return;
	}
	
	const timeline = [...nextTimeline, ...previousTimeline];
	
	dropOld( timeline );
	
	const groups = groupByAccount( timeline, lastId );
	
	await mkdir(
		config.rssDirectoryPath,
		{ recursive: true },
	);
	
	for ( const [account, statuses] of groups )
	{
		await writeRssFile( account, renderRssFeed( statuses ) );
		
		console.log( account, statuses.length );
	}
	
	await writeTimelineFile( timeline );
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
