import { readFile } from 'node:fs/promises';
import { config } from '../config.js';
import { isFileExists } from '../is-file-exists.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

export async function readTimelineFile()
{
	const filePath = config.timelineJsonPath;
	
	if ( !(await isFileExists( filePath )) )
	{
		return [];
	}
	
	try
	{
		const json = await readFile( filePath, 'utf8' );
		/** @type { Array<Status> } */
		const data = JSON.parse( json );
		
		if ( !Array.isArray( data ) )
		{
			throw new TypeError( `Incorrect type of the timeline in file "${filePath}".` );
		}
		
		return data;
	}
	catch ( error )
	{
		console.error( error );
	}
	
	return [];
}
