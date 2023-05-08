import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @typedef { keyof typeof packageData } PackageDataKeys
 */

let inited = false;

const packageData = {
	name: 'unknown',
	version: 'unknown',
	homepage: '',
};

function readFormPackage()
{
	const path = resolve(
		dirname( fileURLToPath( import.meta.url ) ),
		'../package.json',
	);
	const json = readFileSync( path, 'utf8' );
	const data = JSON.parse( json );
	
	Object.assign( packageData, data );
}

/**
 * @overload
 * @return { typeof packageData }
 */

/**
 * @overload
 * @param { PackageDataKeys } key
 * @return { string }
 */

/**
 * @param { PackageDataKeys } [key]
 */
export function getPackageData( key )
{
	if ( !inited )
	{
		readFormPackage();
		
		inited = true;
	}
	
	if ( key )
	{
		return packageData[key];
	}
	
	return packageData;
}
