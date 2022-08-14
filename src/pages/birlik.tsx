import prisma from "../db/client";
import { GetStaticProps } from "next";
import Link from "next/link";
import UserStoryList from "../components/user-story-list";

interface Requirement {
  id: number;
  description: string;
  RequirementType: string;
  UserStory: UserStory[];
}

interface UserStory {
  id: number;
  title: string;
  description: string;
  requirements: Requirement[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const dbRequirements = await prisma.requirement.findMany({
    select: {
      id: true,
      Description: true,
      RequirementType: true,
      UserStory: {
        select: {
          id: true,
          Title: true,
          Description: true,
        },
      },
    },
  });
  const dbUserStories = await prisma.userStory.findMany({
    select: {
      id: true,
      Title: true,
      Description: true,
      Requirements: {
        select: {
          id: true,
          Description: true,
          RequirementType: true,
        },
      },
    },
  });

  const requirements = JSON.parse(JSON.stringify(dbRequirements));
  const userStories = JSON.parse(JSON.stringify(dbUserStories));

  return {
    props: {
      requirements: requirements,
      userStories: userStories,
    },
  };
};

export default function Birlik({ requirements, userStories }: any) {
  return (
    <>
      <div className="flex gap-4">
        <Link href="/">
          <a className="mb-8">
            <h2 className="text-2xl text-sky-400 hover:text-sky-300 hover:text-4xl">
              Back to Home
            </h2>
          </a>
        </Link>
        <Link href="/requirements">
          <a>
            <h2 className="text-2xl text-sky-400 hover:text-sky-300 hover:text-4xl">
              Requirements
            </h2>
          </a>
        </Link>
      </div>

      <UserStoryList userStories={userStories} requirements={requirements} />
    </>
  );
}
