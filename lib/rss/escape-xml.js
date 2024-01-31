/**
 * @param { string } char
 */
function replacer( char )
{
	switch ( char )
	{
		case '<':
			return '&lt;';
		case '>':
			return '&gt;';
		case '&':
			return '&amp;';
		case '\'':
			return '&apos;';
		case '"':
			return '&quot;';
		default:
			return char;
	}
}

const charsRegExp = /[<>&'"]/g;

/**
 * @param { string } input
 */
export function escapeXml( input )
{
	return input.replace( charsRegExp, replacer );
}
