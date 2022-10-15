import { IncomingMessage, ServerResponse } from "http";
import nextConnect from "next-connect";
import apolloServer from "../../graphql";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = nextConnect();

let setup = false;

let handler: (req: IncomingMessage, res: ServerResponse) => void;

router.use(async function (req, res, next) {
  if (!setup) {
    await apolloServer.start();

    handler = apolloServer.createHandler({
      path: "/api/graphql",
    });

    setup = true;
  }

  handler(req, res);
});

export default router;
