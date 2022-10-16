import { gql } from "apollo-server-micro";

export default gql`
  type Mutation {
    login(token: JWT!): User!

    createActivity(prompt: String!): Activity!
    joinActivity(id: Int!): Activity!
  }
`;
