// lib
import * as React from 'react';

// helpers
import { isBrowserMode } from 'helper/localStorage';

// constants
import { EMPTY_OBJECT } from 'constants/empty';

export const useWindow = (): any =>
  React.useMemo(() => (isBrowserMode() ? window : EMPTY_OBJECT), []);
