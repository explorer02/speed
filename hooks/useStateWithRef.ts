import * as React from 'react';

export const useStateWithRef = <T = unknown>(
  initialValue: T,
): {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  stateRef: React.MutableRefObject<T>;
} => {
  const [state, setState] = React.useState(initialValue);
  const ref = React.useRef(state);
  ref.current = state;

  return { state, stateRef: ref, setState };
};
