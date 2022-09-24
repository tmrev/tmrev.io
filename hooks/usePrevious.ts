import { useEffect, useRef } from 'react';

function usePrevious<T>(value:T):T | undefined {
  const ref = useRef();
  useEffect(() => {
    (ref.current as any) = value; // assign the value of ref to the argument
  }, [value]); // this code will run when the value of 'value' changes
  return (ref.current as any); // in the end, return the current ref value.
}

export default usePrevious;
