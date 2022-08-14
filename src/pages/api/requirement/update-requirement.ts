import prisma from "../../../db/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const requirementId = data.requirementId;
  const newDescription = data.BRDescription;

  console.log(requirementId, "Requirement?");
  console.log(newDescription, "BR");

  try {
    await prisma.requirement.update({
      where: {
        id: requirementId,
      },
      data: {
        Description: newDescription,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Thanks for trying this endpoint" });
}
