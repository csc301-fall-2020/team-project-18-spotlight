/**
 * Credit: useHooks.com
 * Similar to React's built-in useMemo hook, but instead of receiving
 * a dependency array, it receives a function which takes
 * the previous and current element and returns a boolean of whether
 * the two are equal.
 */

import { useEffect, useRef } from "react";

function useMemoCompare(next, compare) {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;

  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);

  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
}

export default useMemoCompare;
