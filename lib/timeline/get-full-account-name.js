import { URL } from 'node:url';
import { config } from '../config.js';

/**
 * @typedef { import( '../../types/api.js' ).Account } Account
 */

/**
 * @param { Pick<Account, 'acct'> } account
 */
export function getFullAccountName( account )
{
	const name = account.acct;
	
	if ( name.includes( '@' ) )
	{
		return name;
	}
	
	const host = new URL( config.instance ).hostname;
	
	return `${name}@${host}`;
}
