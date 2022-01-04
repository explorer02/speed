// lib
import * as React from 'react';

// hooks
import { useSafeState } from './useSafeState';

export const useToggle = (
  initValue: boolean = false,
): {
  value: boolean;
  set: () => void;
  unset: () => void;
} => {
  const [value, setValue] = useSafeState(initValue);
  return {
    value,
    set: React.useCallback(() => setValue(true), [setValue]),
    unset: React.useCallback(() => setValue(false), [setValue]),
  };
};
