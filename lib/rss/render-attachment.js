import { xml as html } from './xml.js';

/**
 * @typedef { import( '../../types/api.js' ).MediaAttachment } MediaAttachment
 */

/**
 * @param { MediaAttachment } attachment
 */
export function renderAttachment( attachment )
{
	let content = '<figure>';
	
	switch ( attachment.type )
	{
		case 'image':
			content += html`<img src="${attachment.url}" alt=""/>`;
			break;
		
		case 'video':
		case 'gifv':
			content += html`<video controls src="${attachment.url}"></video>`;
			break;
		
		case 'audio':
			content += html`<audio controls src="${attachment.url}"></audio>`;
			break;
		
		default:
			break;
	}
	
	content += html`<p><a href="${attachment.url}">Open</a></p>`;
	
	if ( attachment.description )
	{
		content += html`<figcaption>${attachment.description}</figcaption>`;
	}
	
	content += '</figure>';
	
	return content;
}
