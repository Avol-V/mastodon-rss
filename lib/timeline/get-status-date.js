/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

/**
 * @param { Status } status
 */
export function getStatusDate( status )
{
	return new Date( status.created_at );
}
