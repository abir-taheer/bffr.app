import { gql } from "apollo-server-micro";

export default gql`
  type Mutation {
    createUser(
      email: EmailAddress!
      firstName: NonEmptyString!
      lastName: NonEmptyString!
    ): User!
  }
`;
