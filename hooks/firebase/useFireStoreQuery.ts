// lib
import * as React from 'react';
import { getDocs, Query } from 'firebase/firestore';

// hooks
import { useSafeState } from 'hooks';

type QueryState<T> = {
  data?: T[];
  loading: boolean;
  error?: Error;
};

const InitialState = {
  loading: false,
};

// TODO: Add caching and refetching
export const useFireStoreQuery = <T>(
  query?: Query,
  options?: { skip?: boolean },
): QueryState<T> => {
  const [state, setState] = useSafeState<QueryState<T>>(InitialState);

  React.useEffect(() => {
    if (!options?.skip && query) {
      setState({ loading: true });
      getDocs(query)
        .then((res) => {
          if (res.size > 0) {
            const data = res.docs.map((doc) => doc.data()) as T[];
            setState({ data, loading: false });
          } else {
            setState({ loading: false, data: [] });
          }
        })
        .catch((err) => {
          setState({ loading: false, error: new Error(err?.message ?? 'Some Error Ocurred!!') });
        });
    }
  }, [options?.skip, query, setState]);
  return state;
};
