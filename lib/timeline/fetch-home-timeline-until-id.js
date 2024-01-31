import { setTimeout } from 'node:timers/promises';
import { getHomeTimeline } from '../../api/get-home-timeline.js';

const REQUESTS_INTERVAL = 1000;
const MAX_PAGES = 10;
const ITEMS_PER_PAGE = 40;

/**
 * @param { string | undefined } id
 */
export async function fetchHomeTimelineUntilId( id )
{
	const statuses = await getHomeTimeline({
		since_id: id,
		limit: ITEMS_PER_PAGE,
	});
	
	if (
		( id === undefined )
		|| ( statuses.length < ITEMS_PER_PAGE )
	)
	{
		return statuses;
	}
	
	for ( let page = 1; page < MAX_PAGES; page++ )
	{
		await setTimeout( REQUESTS_INTERVAL );
		
		const nextStatuses = await getHomeTimeline({
			since_id: id,
			limit: ITEMS_PER_PAGE,
			max_id: statuses.at( -1 )?.id,
		});
		
		if ( nextStatuses.length === 0 )
		{
			break;
		}
		
		statuses.push( ...nextStatuses );
	}
	
	return statuses;
}
