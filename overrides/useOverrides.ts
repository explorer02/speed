// lib
import { useMemo } from 'react';

// helpers
import { getOverride } from './helper';

// constants
import { EMPTY_OBJECT } from 'constants/empty';

// types
import { Override } from './types';

type UseOverrides = <T, P>(
  override: Override<T> | undefined,
  defaultComponent: (p: P) => JSX.Element,
) => [(p: P) => JSX.Element];

export const useOverrides: UseOverrides = (override, defaultComponent) =>
  useMemo(
    () => getOverride(override ?? EMPTY_OBJECT, defaultComponent),
    [defaultComponent, override],
  );
