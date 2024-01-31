import { getStatusLink } from '../timeline/get-status-link.js';
import { getStatusDate } from '../timeline/get-status-date.js';
import { renderTitle } from './render-title.js';
import { renderDescription } from './render-description.js';
import { xml } from './xml.js';

/**
 * @typedef { import( '../../types/api.js' ).Status } Status
 * @typedef { import( '../../types/api.js' ).Account } Account
 */

/**
 * @param { Status } status
 */
export function renderStatusItem( status )
{
	return xml`
<item>
	<guid isPermaLink="false">${status.uri}</guid>
	<link>${getStatusLink( status )}</link>
	<pubDate>${getStatusDate( status ).toUTCString()}</pubDate>
	<title>${renderTitle( status )}</title>
	<description>${xml.cdata( renderDescription( status ) )}</description>
</item>
`.trim();
}
