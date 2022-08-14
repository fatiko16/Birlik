import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requirements = await prisma.requirement.findMany();
  const ids = requirements.map((requirement) => requirement.id);
  const userStoryId = req.body.userStoryID;
  const requirementId = parseInt(req.body.requirementId);
  console.log("Is it even coming here");

  const userStoryExistingRequirements = await prisma.userStory.findFirst({
    where: {
      id: userStoryId,
    },
    select: {
      Requirements: true,
    },
  });

  const userStoryExistingRequirementIds =
    userStoryExistingRequirements?.Requirements.map(
      (requirement) => requirement.id
    );

  const toUpdatedUserStoryRequirementIds = userStoryExistingRequirementIds?.map(
    (requirementid) => {
      return {
        id: requirementid,
      };
    }
  );

  const updatedUserStoryRequirementIds = [
    ...toUpdatedUserStoryRequirementIds!,
    { id: requirementId },
  ];

  if (!userStoryExistingRequirementIds?.includes(requirementId)) {
    if (ids.includes(requirementId)) {
      await prisma.userStory.update({
        where: {
          id: userStoryId,
        },
        data: {
          Requirements: {
            set: updatedUserStoryRequirementIds,
          },
        },
      });

      res.status(200).json({ message: "Requirement added", error: false });
    } else {
      res
        .status(404)
        .json({ message: "Requirement does not exist", error: true });
    }
  } else {
    res.status(200).json({
      message: "Requirement is already tied to User Story",
      error: false,
    });
  }
}
