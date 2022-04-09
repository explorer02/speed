// lib
import React, { forwardRef } from 'react';

// types
import { StringAnyMap } from 'types/generic';
import { Override } from './types';

export const getOverride = <T extends StringAnyMap = any, P extends StringAnyMap = any>(
  override: Override<T>,
  defaultComponent: (p: P) => JSX.Element,
): [(p: P) => JSX.Element] => {
  const Component = override?.component ?? defaultComponent;
  const props = override?.props;

  const OverridedComponent = forwardRef((_props: P, ref) => {
    const sx = { ..._props?.sx, ...props?.sx };
    // @ts-ignore
    return <Component {..._props} {...props} sx={sx} ref={ref} />;
  }) as unknown as (p: P) => JSX.Element;

  return [OverridedComponent];
};
