import * as React from 'react';

export const useSafeState = <T>(
  initializer: T | (() => T),
): [T, (arg: T | ((arg1: T) => T)) => void] => {
  const [state, setState] = React.useState<T>(initializer);
  const ref = React.useRef<boolean>();
  React.useLayoutEffect(() => {
    ref.current = true;
    return (): void => {
      ref.current = false;
    };
  });
  const setSafeState: typeof setState = React.useCallback((updater) => {
    if (ref.current) setState(updater);
  }, []);
  return [state, setSafeState];
};
