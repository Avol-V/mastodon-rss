import { getFullAccountName } from './get-full-account-name.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

/**
 * @param { Array<Status> } statuses
 * @param { string } [selectGroupsUntilId]
 */
export function groupByAccount( statuses, selectGroupsUntilId )
{
	/** @type { Map<string, Array<Status>> } */
	const groups = new Map();
	let selectGroupsUntilIdReached = false;
	
	for ( const status of statuses )
	{
		if (
			!selectGroupsUntilIdReached
			&& ( selectGroupsUntilId !== undefined )
			&& ( status.id === selectGroupsUntilId )
		)
		{
			selectGroupsUntilIdReached = true;
		}
		
		const account = getFullAccountName( status.account );
		
		if ( !groups.has( account ) )
		{
			if ( selectGroupsUntilIdReached )
			{
				continue;
			}
			
			groups.set( account, [] );
		}
		
		const groupStatuses = groups.get( account );
		
		if ( !groupStatuses )
		{
			continue;
		}
		
		groupStatuses.push( status );
	}
	
	return groups;
}
