import gql from 'graphql-tag';

export const MEMBER_SHARES = gql`
  query memberShares($molochAddr: String!, $memberAddr: String!) {
    members(where: { molochAddress: $molochAddr, memberAddress: $memberAddr }) {
      shares
    }
  }
`;
