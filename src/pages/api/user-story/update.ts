import prisma from "../../../db/client";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  const newTitle = data.title;
  const newDescription = data.description;
  const userStoryId = data.userStoryId;

  console.log(newTitle, "title?");
  console.log(newDescription, "description?");
  console.log(userStoryId, "userStoryId?");

  try {
    await prisma.userStory.update({
      where: {
        id: userStoryId,
      },
      data: {
        Description: newDescription,
        Title: newTitle,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Hola" });

  console.log(data);
}
