// lib
import { useQuery, ApolloError } from '@apollo/client';

// hooks
import { useLoginInfo } from 'contexts/LoginContext';

// queries
import { FETCH_USER_QUERY } from 'queries/user';

// types
import { UserProfile } from 'types/profile';

type UseProfileQuery = () => { data?: UserProfile; loading: boolean; error?: ApolloError };

export const useProfileQuery: UseProfileQuery = () => {
  const { user, isLoggedIn } = useLoginInfo();

  const { data, loading, error } = useQuery<{ user: UserProfile }, { query: { phone: string } }>(
    FETCH_USER_QUERY,
    {
      variables: { query: { phone: user?.phoneNumber.substring(3) ?? '' } },
      skip: !isLoggedIn || !user,
    },
  );
  return { data: data?.user, loading, error };
};
