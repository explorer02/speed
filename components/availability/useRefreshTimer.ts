// lib
import * as React from 'react';

// hooks
import { useSafeState } from 'hooks';

export const useRefreshTimer = (
  refreshInterval: number,
  deps?: React.DependencyList,
): { isRefreshActive: boolean; resetTimer: () => void } => {
  const [isRefreshActive, setIsRefreshActive] = useSafeState(false);
  const timerRef = React.useRef<number>();

  const resetTimer = React.useCallback(() => {
    clearTimeout(timerRef.current);
    setIsRefreshActive(false);
    timerRef.current = setTimeout(() => {
      setIsRefreshActive(true);
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }, refreshInterval) as unknown as number;
  }, [refreshInterval, setIsRefreshActive]);

  React.useEffect(() => {
    resetTimer();
  }, [deps, setIsRefreshActive, refreshInterval, resetTimer]);

  return { isRefreshActive, resetTimer };
};
