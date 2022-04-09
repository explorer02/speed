// lib
import { createContext, useContext } from 'react';

// constants
import { EMPTY_ARRAY } from 'constants/empty';

// types
import { Store } from 'types/store';

type StoreInfo = {
  storeList: Store[];
};

const StoreListContext = createContext<StoreInfo>({ storeList: EMPTY_ARRAY as Store[] });

export const useStoreList = (): StoreInfo => useContext(StoreListContext);

export const StoreListProvider = ({
  value,
  children,
}: {
  value: StoreInfo;
  children: JSX.Element;
}): JSX.Element => <StoreListContext.Provider value={value}>{children}</StoreListContext.Provider>;
