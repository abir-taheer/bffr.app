import { gql } from "apollo-server-micro";

export default gql`
  type Action {
    id: Int!

    index: Int!

    board: Board!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
