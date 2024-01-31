import { xml as html } from './xml.js';
import { renderPoll } from './render-poll.js';
import { renderAttachments } from './render-attachments.js';
import { renderCard } from './render-card.js';
import { formatAccountName } from './format-account-name.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 * @typedef { import( '../../types/api.js' ).Account } Account
 */

/**
 * @param { Status } status
 */
export function renderDescription( status )
{
	let content = '';
	
	if ( status.content )
	{
		content += html`<div${html.unsafe(
			status.language
				? html` lang="${status.language}"`
				: ''
		)}>
	${html.unsafe( status.content )}
</div>`
	}
	
	if ( status.poll )
	{
		content += '\n' + renderPoll( status.poll );
	}
	
	if ( status.media_attachments.length !== 0 )
	{
		content += '\n' + renderAttachments( status.media_attachments );
	}
	
	if ( status.card )
	{
		content += '\n' + renderCard( status.card );
	}
	
	if ( status.reblog )
	{
		content += html`
<blockquote>
	<header><cite>${formatAccountName( status.reblog.account )}</cite>:</header>
	${html.unsafe( renderDescription( status.reblog ) )}
</blockquote>`
	}
	
	return content;
}
