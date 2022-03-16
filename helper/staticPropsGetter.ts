// lib
import { GetStaticProps } from 'next';

import { client } from 'config/apollo';

// queries
import { FETCH_ALL_STORES } from 'queries/store';

// types
import { Store } from 'types/store';

export const getStaticPropsForStoreList: GetStaticProps = async () => {
  const res = await client.query<{ stores: Store[] }>({
    query: FETCH_ALL_STORES,
  });
  return {
    props: {
      stores: res.data.stores,
    },
  };
};
