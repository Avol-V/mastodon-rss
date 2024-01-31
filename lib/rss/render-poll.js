import { xml as html } from './xml.js';

/**
 * @typedef { import( '../../types/api.js' ).Poll } Poll
 * @typedef { import( '../../types/api.js' ).PollOption } PollOption
 */

/**
 * @param { Poll } poll
 */
function prepareExpires( poll )
{
	if ( poll.expired )
	{
		return ' (closed)';
	}
	
	if ( poll.expires_at )
	{
		return ` (expires at ${poll.expires_at})`;
	}
	
	return '';
}

/**
 * @param { Poll } poll
 * @param { PollOption } option
 */
function prepareOptionPercent( poll, option )
{
	if (
		!poll.votes_count
		|| !option.votes_count
	)
	{
		return '';
	}
	
	const percent = Math.round( option.votes_count / poll.votes_count * 100 );
	
	return ` ${percent}%`;
}

/**
 * @param { Poll } poll
 */
export function renderPoll( poll )
{
	let content = html`<p>Poll${prepareExpires( poll )}:</p>
<ul>`;
	
	for ( const option of poll.options )
	{
		content += html`<li>${option.title}${prepareOptionPercent( poll, option )}</li>`;
	}
	
	content += '</ul>';
	
	return content;
}
