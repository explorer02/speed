// lib
import * as React from 'react';

// hooks
import { useFireStoreQuery } from 'hooks/firebase';

// helpers
import { getQueryForStoreItems } from 'helper/query';

// types
import { Store } from 'types/store';

export const StockTable = ({ selectedStore }: { selectedStore: Store }): React.ReactElement => {
  const query = React.useMemo(() => getQueryForStoreItems(selectedStore.id), [selectedStore.id]);
  const { data, loading, error } = useFireStoreQuery(query);
  console.log(data, loading, error);

  return <p>Hello table</p>;
};
