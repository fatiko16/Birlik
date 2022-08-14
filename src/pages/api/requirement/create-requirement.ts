import prisma from "../../../db/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const description = req.body;

  try {
    await prisma.requirement.create({
      data: {
        Description: description,
      },
    });

    res.status(200).json({ message: "Requirement created" });
  } catch (e) {
    console.log("Create note error", e);
  }
}
