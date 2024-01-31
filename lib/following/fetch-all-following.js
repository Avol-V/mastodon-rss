import { setTimeout } from 'node:timers/promises';
import { getAccountFollowing } from '../../api/get-account-following.js';

/**
 * @typedef { import( '../../types/api.js' ).Account } Account
 * @typedef { import( '../../types/api.js' ).PaginationQueryParams } PaginationQueryParams
 */

const REQUESTS_INTERVAL = 1000;
const MAX_PAGES = 10;
const ITEMS_PER_PAGE = 80;

/**
 * @param { string } id
 */
export async function fetchAllFollowing( id )
{
	/** @type { Array<Account> } */
	const followingAccounts = [];
	/** @type { PaginationQueryParams } */
	let nextPageParams = {
		limit: ITEMS_PER_PAGE,
	};
	
	for ( let page = 0; page < MAX_PAGES; page++ )
	{
		const {
			accounts,
			pagination,
		} = await getAccountFollowing(
			{ id },
			nextPageParams,
		);
		
		if ( accounts.length === 0 )
		{
			break;
		}
		
		followingAccounts.push( ...accounts );
		
		if ( !pagination.next )
		{
			break;
		}
		
		nextPageParams = pagination.next;
		
		await setTimeout( REQUESTS_INTERVAL );
	}
	
	return followingAccounts;
}
