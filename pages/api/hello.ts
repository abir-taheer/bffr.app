import { NextApiRequest, NextApiResponse } from "next";

export default  (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ name: "John Doe" });
}
