const cdataRegExp = /\]\]>/g;

/**
 * @param { string } input
 */
export function escapeCdata( input )
{
	return input.replace( cdataRegExp, ']]&gt;' );
}
