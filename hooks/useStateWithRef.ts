import * as React from 'react';

export const useStateWithRef = <T = unknown>(
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>] => {
  const [state, setState] = React.useState(initialValue);
  const ref = React.useRef(state);
  ref.current = state;

  return [state, setState, ref];
};
