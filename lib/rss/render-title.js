import { getFullAccountName } from '../timeline/get-full-account-name.js';
import { formatAccountName } from './format-account-name.js';
import { xml } from './xml.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 */

/**
 * @param { Status } status
 */
export function renderTitle( status )
{
	let title = xml`${formatAccountName( status.account )}`;
	
	if ( status.reblog )
	{
		title += xml` boosted ${formatAccountName( status.reblog.account )}`;
	}
	else if ( status.in_reply_to_account_id )
	{
		const replyToAccount = status.mentions.find(
			( mention ) => mention.id === status.in_reply_to_account_id,
		);
		
		if ( replyToAccount )
		{
			title += xml` replied to ${getFullAccountName( replyToAccount )}`;
		}
		else if ( status.in_reply_to_account_id === status.account.id )
		{
			title += ' self-replied';
		}
		else
		{
			title += ' replied';
		}
	}
	else
	{
		title += ' posted';
	}
	
	title += xml` at ${status.created_at}`;
	
	return title;
}
