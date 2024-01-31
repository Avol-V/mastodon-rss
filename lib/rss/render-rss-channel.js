import { xml } from './xml.js';
import { formatAccountName } from './format-account-name.js';

/**
 * @typedef { import( '../../types/api.js' ).Account } Account
 */

/**
 * @param { Account } account
 * @param { string } content
 */
export function renderRssChannel( account, content )
{
	const title = formatAccountName( account );
	const link = account.url;
	
	return xml`<?xml version="1.0"?>
<rss version="2.0">
	<channel>
		<title>${title}</title>
		<description>Posts and boosts from ${title}</description>
		<link>${link}</link>
		<image>
			<url>${account.avatar}</url>
			<title>${title}</title>
			<link>${link}</link>
		</image>
		${xml.unsafe( content )}
	</channel>
</rss>`;
}
