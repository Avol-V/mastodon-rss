import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config } from '../config.js';

/**
 * @param { string } name
 * @param { string } content
 */
export async function writeRssFile( name, content )
{
	const filePath = resolve( config.rssDirectoryPath, name + '.xml' );
	
	await writeFile(
		filePath,
		content,
		'utf8',
	);
}
