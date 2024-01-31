import { renderAttachment } from './render-attachment.js';

/**
 * @typedef { import( '../../types/api.js' ).MediaAttachment } MediaAttachment
 */

/**
 * @param { Array<MediaAttachment> } attachments
 */
export function renderAttachments( attachments )
{
	let content = '';
	
	for ( const attachment of attachments )
	{
		content += renderAttachment( attachment ) + '\n';
	}
	
	return content;
}
