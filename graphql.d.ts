import User from "./database/models/User";

type Context = {
  user: User;
  session: any;
  req: any;
};

type ResolverFunction<Parent = null, Params = {}, ReturnType = void> = (
  parent: Parent,
  params: Params,
  context: Context
) => ReturnType;
