import { escapeXml } from './escape-xml.js';
import { escapeCdata } from './escape-cdata.js';

export const unescapedXmlSymbol = Symbol( 'Unescaped XML' );

/**
 * @param { unknown } value
 */
function processValue( value )
{
	if (
		value
		&& ( typeof value === 'object' )
		&& ( unescapedXmlSymbol in value )
	)
	{
		return value[unescapedXmlSymbol];
	}

	return escapeXml( String( value ) );
}

/**
 * @param { TemplateStringsArray } strings
 * @param { Array<unknown> } values
 */
export function xml( strings, ...values )
{
	return String.raw(
		strings,
		...values.map( processValue ),
	);
}

/**
 * @param { string } xml
 */
xml.unsafe = ( xml ) => ({
	[unescapedXmlSymbol]: xml,
});

/**
 * @param { string } content
 */
xml.cdata = ( content ) => ({
	[unescapedXmlSymbol]: xml`<![CDATA[${xml.unsafe( escapeCdata( content ) )}]]>`,
});
