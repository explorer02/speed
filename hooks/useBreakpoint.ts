// hooks
import { useWindowSize } from 'react-use';
import { Breakpoint, useTheme } from '@mui/material';

export const useBreakpoint = (): Breakpoint => {
  const {
    breakpoints: { values, keys },
  } = useTheme();

  const { width } = useWindowSize();

  const breakpointIndex = Object.values(values).findIndex((val) => val > width);
  if (breakpointIndex === 0) return keys[0];
  if (breakpointIndex === -1) return keys[keys.length - 1];
  return keys[breakpointIndex - 1];
};
