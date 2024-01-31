/**
 * @template TValue
 * @param { TValue } value
 * @return { NonNullable<TValue> }
 */
export function nonNull( value )
{
	if (
		( value === null )
		|| ( value === undefined )
	)
	{
		throw new Error( 'The value should not be NULL.' );
	}
	
	return value;
}
