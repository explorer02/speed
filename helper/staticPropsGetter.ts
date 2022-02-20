// lib
import { GetStaticProps } from 'next';
import { getDocs } from 'firebase/firestore';

// helpers
import { getQueryForStoreList } from 'helper/query';

const STORE_QUERY = getQueryForStoreList();

export const getStaticPropsForStoreList: GetStaticProps = async () => {
  const res = await getDocs(STORE_QUERY);
  return {
    props: {
      stores: res.docs.map((doc) => doc.data()),
    },
  };
};
