
/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

/**
 * @param { Status } status
 */
export function getStatusLink( status )
{
	if ( status.url )
	{
		return status.url;
	}
	
	if (
		status.card
		&& status.card.url
	)
	{
		return status.card.url;
	}
	
	return status.account.url;
}
