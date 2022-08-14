import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userStoryId = req.body.userStoryID;
  const requirementId = req.body.requirementId;
  const existingRequirements = await prisma.userStory.findFirst({
    where: {
      id: userStoryId,
    },
    select: {
      Requirements: true,
    },
  });

  const existingRequirementIds = existingRequirements?.Requirements.map(
    (requirement) => requirement.id
  );

  console.log(existingRequirementIds);
  console.log(requirementId);

  if (existingRequirementIds?.includes(requirementId)) {
    const updatedRequirementIds = existingRequirementIds.filter(
      (id) => id !== requirementId
    );
    const updatedRequirementsArraySet = updatedRequirementIds.map(
      (requirementId) => {
        return { id: requirementId };
      }
    );

    const response = await prisma.userStory.update({
      where: {
        id: userStoryId,
      },
      data: {
        Requirements: {
          set: updatedRequirementsArraySet,
        },
      },
    });

    console.log(response);

    res
      .status(200)
      .json({
        message: "Requirement is removed from the User Story.",
        error: false,
      });
  } else {
    res
      .status(404)
      .json({
        message: "Requirement is not part of the User Story.",
        error: true,
      });
  }
}
