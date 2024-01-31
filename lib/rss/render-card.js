import { xml as html } from './xml.js';

/**
 * @typedef { import( '../../types/api.js' ).PreviewCard } PreviewCard
 */

/**
 * @param { PreviewCard } card
 */
export function renderCard( card )
{
	let caption = html`${card.title || card.type}`;
	
	if ( card.author_name )
	{
		let author = html`${card.author_name}`;
		
		if ( card.author_url )
		{
			author = html`<a href="${card.author_url}">${html.unsafe( author )}</a>`;
		}
		
		caption += html` by ${html.unsafe( author )}`;
	}
	
	if ( card.provider_name )
	{
		let provider = html`${card.provider_name}`;
		
		if ( card.provider_url )
		{
			provider = html`<a href="${card.provider_url}">${html.unsafe( provider )}</a>`;
		}
		
		caption += html` on ${html.unsafe( provider )}`;
	}
	
	if ( card.description )
	{
		caption = html`<p>${html.unsafe( caption )}</p>
<p>${card.description}</p>`
	}
	
	let content = '';
	
	if ( card.image )
	{
		content = html`<img src="${card.image}" alt=""/>`;
	}
	else
	{
		content = html`${card.url}`;
	}
	
	return html`<figure>
	<a href="${card.url}">${html.unsafe( content )}</a>
	<figcaption>${html.unsafe( caption )}</figcaption>
</figure>`;
}
