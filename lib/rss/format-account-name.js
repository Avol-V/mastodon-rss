import { getFullAccountName } from '../timeline/get-full-account-name.js';

/**
 * @typedef { import( '../../types/api.js' ).Account } Account
 */

/**
 * @param { Account } account
 */
export function formatAccountName( account )
{
	return `${account.display_name} (${getFullAccountName( account )})`;
}
