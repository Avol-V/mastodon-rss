import { apiRequest } from '../lib/api-request.js';

/**
 * @typedef { import( '../types/api.js' ).GetApiTimelinesHomeResponse } GetApiTimelinesHomeResponse
 */

/**
 * @param { import( '../types/api.js' ).GetApiTimelinesHomeQuery } searchParams
 */
export function getHomeTimeline( searchParams = {} )
{
	return /** @type { typeof apiRequest<GetApiTimelinesHomeResponse> } */(apiRequest)(
		'/api/v1/timelines/home',
		{
			searchParams,
		},
	);
}
