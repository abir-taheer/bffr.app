import {gql} from "apollo-server-micro";

export default gql`
  type Activity {
      id: Int!

      prompt: String!

      completed: Boolean!
      hasBingo: Boolean!

      createdBy: User!
      members: [User!]!

      createdAt: DateTime!
      updatedAt: DateTime!
  }
`