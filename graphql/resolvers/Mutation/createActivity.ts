import { ResolverFunction } from "../../../graphql";
import { ApolloError } from "apollo-server-micro";
import ActivityMember from "../../../database/models/ActivityMember";
import Activity from "../../../database/models/Activity";

const createActivity: ResolverFunction<null, { prompt: string }> = async (
  _,
  { prompt },
  { user }
) => {
  if (!user) {
    throw new ApolloError("You need to be signed in");
  }

  return await Activity.create({
    prompt,
    //@ts-ignore
    createdBy: user.id,
  });
};

export default createActivity;