import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { cwd } from 'node:process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { DEFAULT_INSTANCE } from './constants.js';
import { isFileExists } from './is-file-exists.js';

/**
 * @typedef { import( '../types/config.js' ).Config } Config
 */

/**
 * @type { Config }
 */
const configData = {
	instance: DEFAULT_INSTANCE,
	dropOlderThanHours: 24,
	timelineJsonPath: 'timeline.json',
	rssDirectoryPath: 'feeds',
};
let configPath = resolve( homedir(), '.config/mastodon-rss/config.json' );
let configDir = dirname( configPath );

/**
 * @const
 */
export const config = {
	/**
	 * @param { string } [path]
	 */
	async load( path )
	{
		if ( path )
		{
			configPath = resolve( cwd(), path );
		}
		
		configDir = dirname( configPath );
		
		if ( !(await isFileExists( configPath )) )
		{
			return;
		}
		
		const json = await readFile( configPath, 'utf8' );
		
		Object.assign( configData, JSON.parse( json ) );
	},
	async write()
	{
		await mkdir(
			dirname( configPath ),
			{
				recursive: true,
			},
		);
		await writeFile(
			configPath,
			JSON.stringify( configData, null, 2 ),
			'utf8',
		);
	},
	/**
	 * @param { Partial<Config> } values
	 */
	async set( values )
	{
		Object.assign( configData, values );
		
		await this.write();
	},
	get configPath()
	{
		return configPath;
	},
	get instance()
	{
		return configData.instance;
	},
	get accessToken()
	{
		return configData.accessToken;
	},
	get clientId()
	{
		return configData.clientId;
	},
	get clientSecret()
	{
		return configData.clientSecret;
	},
	get dropOlderThanHours()
	{
		return configData.dropOlderThanHours;
	},
	get timelineJsonPath()
	{
		return resolve( configDir, configData.timelineJsonPath );
	},
	get rssDirectoryPath()
	{
		return resolve( configDir, configData.rssDirectoryPath );
	},
};
