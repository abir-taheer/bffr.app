import { gql } from "apollo-server-micro";

export default gql`
  type Task {
    id: Int!

    order: Int!
    action: String!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
