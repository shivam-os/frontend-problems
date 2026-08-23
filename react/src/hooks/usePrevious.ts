import { useEffect, useRef } from "react";

/*
Question: Create a hook in React that remembers the previous value of the state.
Reason: We first return the stored value, then update the ref with current value (using useEffect)
*/

export default function usePrevious<T>(value: T): T | undefined {
	const valueRef = useRef<T | undefined>(undefined);

	useEffect(() => {
		valueRef.current = value;
	}, [value]);
	
	return valueRef.current;
}