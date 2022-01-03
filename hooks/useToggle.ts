// lib
import * as React from 'react';

export const useToggle = (
  initValue: boolean = false,
): {
  value: boolean;
  set: () => void;
  unset: () => void;
} => {
  const [value, setValue] = React.useState(initValue);
  return {
    value,
    set: React.useCallback(() => setValue(true), []),
    unset: React.useCallback(() => setValue(false), []),
  };
};
