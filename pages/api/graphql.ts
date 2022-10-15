import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, ForbiddenError } from "apollo-server-micro";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import resolvers from "../../graphql/resolvers";
import typeDefs from "../../graphql/typeDefs";
import { NextApiHandler } from "next";

const ComplexityLimitRule = createComplexityLimitRule(35000, {
  scalarCost: 1,
  objectCost: 5,
  listFactor: 10,
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const user = req.user;
    const signedIn = req.signedIn;

    function authenticationRequired() {
      if (!signedIn) {
        throw new ForbiddenError("You must be signed in to perform that query");
      }
    }

    function adminRequired() {
      authenticationRequired();
      if (!user.adminPrivileges) {
        throw new ForbiddenError("You must be an admin to perform that query");
      }
    }

    return {
      user,
    };
  },
  // @ts-ignore
  playground: {
    settings: {
      "schema.polling.enable": false,
      "request.credentials": "same-origin",
      "prettier.useTabs": true,
    },
  },
  introspection: true,
  uploads: {
    maxFileSize: 10000000,
  },
  validationRules: [ComplexityLimitRule],
  // @ts-ignore
  plugins: [new ApolloServerPluginLandingPageGraphQLPlayground()],
});

let serverStarted = false;
let handler: NextApiHandler | null = null;

const APIHandler: NextApiHandler = async (req, res) => {
  if (!serverStarted || ! handler) {
    await apolloServer.start();
    handler = apolloServer.createHandler({
      path: "/api/graphql",
      disableHealthCheck: true,
    }) as NextApiHandler;
    serverStarted = true;
  }

  return await handler(req, res);
};

export default APIHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};