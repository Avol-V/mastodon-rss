import { renderStatusItem } from './render-status-item.js';
import { renderRssChannel } from './render-rss-channel.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

/**
 * @param { Array<Status> } statuses
 */
export function renderRssFeed( statuses )
{
	const account = statuses[0]?.account;
	
	if ( !account )
	{
		return '';
	}
	
	return renderRssChannel(
		account,
		statuses.map(
			( status ) => renderStatusItem( status ),
		)
			.join( '\n' ),
	);
}
