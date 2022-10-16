import { gql } from "apollo-server-micro";

export default gql`
  type Action {
    id: Int!

    index: Int!


    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
