import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requirements = await prisma.requirement.findMany();

  res.json(requirements);
}
