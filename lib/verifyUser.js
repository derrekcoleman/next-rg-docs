import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { MEMBER_SHARES } from './GraphQL/member-queries';

export const verifyUser = async (userAddress) => {
  const gqlClient = new ApolloClient({
    link: new HttpLink({
      uri:
        'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const daos = ['0x957a41e54f640dbab7e60172bb97c22b94b697d4'];

  let results = daos.map((dao) => {
    return gqlClient.query({
      query: MEMBER_SHARES,
      fetchPolicy: 'network-only',
      variables: {
        molochAddr: dao.toString(),
        memberAddr: userAddress.toString(),
      },
    });
  });

  let isMember = false;

  await Promise.all(results).then((res) => {
    res.forEach((response) => {
      if (response.data?.members.length > 0 && response.data.members[0].shares > 0) {
        isMember = true; 
      }
    });
  });

  return isMember;
};
