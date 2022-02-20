// lib
import * as React from 'react';

// hooks
import { useSafeState } from 'hooks';
import { useTimeoutFn } from 'react-use';

export const useRefreshTimer = (
  refreshInterval: number,
): { isRefreshActive: boolean; resetTimer: () => void } => {
  const [, forceRender] = useSafeState(false);
  const [isReady, cancel, reset] = useTimeoutFn(() => {
    forceRender((s) => !s);
  }, refreshInterval);

  React.useEffect(() => cancel, [cancel]);

  return { isRefreshActive: !!isReady(), resetTimer: reset };
};
