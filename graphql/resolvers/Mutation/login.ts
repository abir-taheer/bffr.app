import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { ResolverFunction } from "../../../graphql";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../../../constants";
import User from "../../../database/models/User";

type Payload = {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;

  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};

async function getIdTokenPayload(idToken: string): Promise<Payload | null> {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    // Once the token is verified return the payload
    return ticket.getPayload() as Payload;
  } catch (e) {
    // If the token can't be verified, return null
    return null;
  }
}

const login: ResolverFunction<null, { token: string }> = async (
  mutation,
  { token },
  { user, session }
) => {
  if (user) {
    throw new ForbiddenError("You are already signed in.");
  }

  const payload = await getIdTokenPayload(token);

  if (!payload) {
    throw new ApolloError("Invalid token.");
  }

  // check to see if they already exist
  let dbUser = await User.findOne({ where: { id: payload.sub } });

  if (!dbUser) {
    dbUser = await User.create({
      id: payload.sub,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      picture: payload.picture,
    });
  }

  session.userID = dbUser.id;
  await session.save();

  return dbUser;
};

export default login;
