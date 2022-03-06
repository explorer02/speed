// lib
import * as React from 'react';
import _orderBy from 'lodash/orderBy';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

// components
import { Table } from 'reusable/table';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

// helpers
import { getOrderCollectionRef } from 'helper/docReference';
import { getColumnConfig } from './tableConfig';

// constants
import { ORDER_COLLECTION } from 'constants/collections';
import { EMPTY_ARRAY } from 'constants/empty';

// types
import { Order } from 'types/order';

export const ViewOrder = (): JSX.Element => {
  const { user } = useLoginInfo();
  const phone = user?.phoneNumber;

  const query = React.useMemo(() => getOrderCollectionRef(phone!), [phone]);
  const { data: orders = EMPTY_ARRAY as Order[], isLoading } = useFirestoreQueryData<Order>(
    [ORDER_COLLECTION, phone],
    query,
    {
      subscribe: true,
    },
  );

  const adaptedData = React.useMemo(() => _orderBy(orders, 'createdOn', 'desc'), [orders]);

  return <Table columnConfig={getColumnConfig()} items={adaptedData} isLoading={isLoading} />;
};
