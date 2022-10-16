import { gql } from "apollo-server-micro";

export default gql`
  type Board {
    id: Int!

    activity: Activity!
    user: User!

    activities: [Activity!]!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
