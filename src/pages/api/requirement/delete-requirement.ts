import prisma from "../../../db/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const requirementId = data.requirementId;

  console.log(requirementId, "Requirement?");

  try {
    await prisma.requirement.delete({
      where: {
        id: requirementId,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Thanks for trying this endpoint" });
}
