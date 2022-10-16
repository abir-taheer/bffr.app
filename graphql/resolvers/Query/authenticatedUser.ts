import { ResolverFunction } from "../../../graphql";

const authenticatedUser: ResolverFunction = async (parent, params, context) => {
  return context.user;
};

export default authenticatedUser;