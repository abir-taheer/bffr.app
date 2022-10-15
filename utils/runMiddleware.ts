import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type ApiRequestHandlerWithNext = (request: NextApiRequest, response: NextApiResponse, next: (err?: any) => void) => void;

export async function runMiddleware(req: NextApiRequest, res:NextApiResponse, fn:ApiRequestHandlerWithNext) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}