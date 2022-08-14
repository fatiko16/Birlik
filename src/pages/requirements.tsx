import { GetStaticProps } from "next";
import RequirementList from "../components/requirement-list";
import prisma from "../db/client";
import Link from "next/link";

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

  const requirements = JSON.parse(JSON.stringify(dbRequirements));
  return {
    props: {
      requirements: requirements,
    },
  };
};
export default function Requirements({ requirements }: any) {
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
        <Link href="/birlik">
          <a>
            <h2 className="text-2xl text-sky-400 hover:text-sky-300 hover:text-4xl">
              Birlik
            </h2>
          </a>
        </Link>
      </div>

      <RequirementList
        requirements={requirements}
        className="bg-sky-400 w-6/12 justify-center text-start p-4 mb-36"
        acceptInput={true}
      />
    </>
  );
}
