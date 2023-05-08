import { access } from 'node:fs/promises';

/**
 * @param { string } path
 */
export function isFileExists( path )
{
	return access( path ).then(
		() => true,
		() => false,
	);
}
