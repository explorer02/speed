// lib
import * as React from 'react';
import { getDocs, Query } from 'firebase/firestore';

type QueryState<T> = {
  data?: T;
  loading: boolean;
  error?: string;
};
const InitialState = {
  loading: false,
};

export const useFireStoreQuery = <T>(
  query?: Query,
  options?: { skip?: boolean },
): QueryState<T> => {
  const [state, setState] = React.useState<QueryState<T>>(InitialState);
  React.useEffect(() => {
    if (!options?.skip && query) {
      setState({ loading: true });
      getDocs(query)
        .then((res) => {
          if (res.size > 0) {
            const data = res.docs[0].data() as T;
            setState({ data, loading: false });
          } else {
            setState({ loading: false, data: {} as T });
          }
        })
        .catch((err) => {
          setState({ loading: false, error: err?.message ?? 'Some Error Ocurred!!' });
        });
    }
  }, [options?.skip, query]);
  return state;
};
