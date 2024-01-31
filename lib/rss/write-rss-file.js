import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config } from '../config.js';
import { isFileExists } from '../is-file-exists.js';

/**
 * @param { string } name
 * @param { string } content
 * @param { boolean } [ifNotExists=false]
 */
export async function writeRssFile( name, content, ifNotExists = false )
{
	const filePath = resolve( config.rssDirectoryPath, name + '.xml' );
	
	if (
		ifNotExists
		&& await isFileExists( filePath )
	)
	{
		return;
	}
	
	await writeFile(
		filePath,
		content,
		'utf8',
	);
}
