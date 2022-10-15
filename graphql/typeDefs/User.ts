import { gql } from "apollo-server-micro";
export default gql`
  type User {
    id: Int!
    email: EmailAddress!
    firstName: String!
    lastName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
