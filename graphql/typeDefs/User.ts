import { gql } from "apollo-server-micro";

export default gql`
  type User {
    id: String!
    email: EmailAddress!
    firstName: String!
    lastName: String!
    picture: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
