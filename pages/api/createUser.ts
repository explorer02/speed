import { gql } from '@apollo/client';
import { API_CLIENT } from 'config/apollo';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: UserInsertInput!) {
    insertOneUser(data: $data) {
      _id
      linkId
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  const { linkId } = req.body;
  if (!linkId) return res.status(400).json({ message: 'Send link Id in body!' });
  try {
    await API_CLIENT.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        data: {
          linkId,
          createdOn: new Date(),
          _id: linkId,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
  return res.status(200).json({ message: 'Success' });
}
