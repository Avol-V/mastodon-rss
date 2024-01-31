import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { config } from '../config.js';
import { isFileExists } from '../is-file-exists.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

/**
 * @param { Array<Status> } statuses
 */
export async function writeTimelineFile( statuses )
{
	const filePath = config.timelineJsonPath;
	
	if ( !(await isFileExists( filePath )) )
	{
		await mkdir(
			dirname( filePath ),
			{ recursive: true },
		)
			.catch(
				( error ) =>
				{
					console.error( error );
				},
			);
	}
	
	await writeFile(
		filePath,
		JSON.stringify( statuses, null, '\t' ),
		'utf8',
	);
}
