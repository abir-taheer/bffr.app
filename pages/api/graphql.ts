import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, ForbiddenError } from "apollo-server-micro";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import resolvers from "../../graphql/resolvers";
import typeDefs from "../../graphql/typeDefs";
import { NextApiHandler } from "next";
import { runMiddleware } from "../../utils/runMiddleware";
import expressSession from "express-session";
import MysqlStore from "express-mysql-session";
import User from "../../database/models/User";

const ComplexityLimitRule = createComplexityLimitRule(35000, {
  scalarCost: 1,
  objectCost: 5,
  listFactor: 10,
});

const credentials = new URL(process.env.SEQUELIZE_URL || "");

// @ts-ignore
const sessionStore = new MysqlStore({
  // @ts-ignore
  host: credentials.hostname,
  port: 3306,
  user: credentials.username,
  password: credentials.password,
  database: "bffr",
});

const session = expressSession({
  secret: process.env.SESSION_SECRET || "bananas",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: true,
  },
  store: sessionStore,
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    await runMiddleware(req, res, session as any);

    let user: User | null = null;

    if (req.session.userID) {
      user = await User.findOne({ where: { id: req.session.userID } });
    }

    const signedIn = req.signedIn;

    function authenticationRequired() {
      if (!signedIn) {
        throw new ForbiddenError("You must be signed in to perform that query");
      }
    }

    return {
      user,
      session: req.session,
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
  if (!serverStarted || !handler) {
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
