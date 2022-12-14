import { gql } from "apollo-server-micro";

export default gql`
  type Query {
      authenticatedUser: User
      
      getTasks(activityId: Int!): [Task!]!
  }
`;
