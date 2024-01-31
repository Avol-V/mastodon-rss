import { config } from '../config.js';
import { nonNull } from '../non-null.js';
import { getStatusDate } from './get-status-date.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

/**
 * @param { Array<Status> } statuses
 */
export function dropOld( statuses )
{
	const oldestDate = new Date();
	
	oldestDate.setHours( oldestDate.getHours() - config.dropOlderThanHours );
	
	while(
		( statuses.length !== 0 )
		&& (
			getStatusDate( nonNull( statuses.at( -1 ) ) ) < oldestDate
		)
	)
	{
		statuses.pop();
	}
}
