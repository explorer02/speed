import * as React from 'react';
import _noop from 'lodash/noop';

export const PhoneContext = React.createContext<{
  phone?: string;
  setPhone: (phone: string) => void;
}>({ phone: '', setPhone: _noop });
