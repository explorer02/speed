// lib
import * as React from 'react';

// constants
import { EMPTY_ARRAY } from 'constants/empty';

// types
import { Store } from 'types/store';

export const StoresContext = React.createContext<Store[]>(EMPTY_ARRAY as Store[]);

export const useStores = (): Store[] => React.useContext(StoresContext);

export const StoresProvider = ({
  children,
  value,
}: {
  children: JSX.Element;
  value: Store[];
}): JSX.Element => <StoresContext.Provider value={value}>{children}</StoresContext.Provider>;
