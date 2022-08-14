import RequirementList from "./requirement-list";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
export default function UserStory({ userStory, requirements }: any) {
  const router = useRouter();
  const [userStoryTitle, setUserStoryTitle] = useState(userStory.Title);
  const [userStoryDescription, setUserStoryDescription] = useState(
    userStory.Description
  );
  const [showRequirements, setShowRequirements] = useState(false);
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addRequirement = async (requirementID: string) => {
    try {
      await fetch("http://localhost:3000/api/user-story/add-requirement", {
        body: JSON.stringify({
          requirementId: requirementID,
          userStoryID: userStory.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const removeRequirement = async (requirementID: string) => {
    try {
      await fetch("http://localhost:3000/api/user-story/remove-requirement", {
        body: JSON.stringify({
          requirementId: requirementID,
          userStoryID: userStory.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStory = async () => {
    try {
      await fetch("http://localhost:3000/api/user-story/update", {
        body: JSON.stringify({
          title: userStoryTitle,
          description: userStoryDescription,
          userStoryId: userStory.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col bg-sky-300 w-7/12 shadow-lg text-start px-2 rounded-md mb-4"
      ref={parent}
    >
      <label className="font-semibold text-xl mt-1">
        User Story Title:
        <input
          type="text"
          value={userStoryTitle}
          onChange={(e) => setUserStoryTitle(e.target.value)}
          className="font-semibold text-lg px-2 mt-1 mb-2 bg-sky-200 w-full rounded-md"
        />
      </label>
      <label className="font-semibold text-xl">
        Description:
        <textarea
          value={userStoryDescription}
          onChange={(e) => setUserStoryDescription(e.target.value)}
          className="font-semibold px-2 my-2 bg-sky-200 w-8/12 rounded-md h-36 text-base block"
        />
      </label>
      <div className="flex gap-2 mb-4">
        <button
          className="rounded-md bg-sky-400 p-1 hover:bg-sky-600"
          onClick={updateUserStory}
        >
          Update
        </button>
        <button className="rounded-md bg-sky-400 p-1 hover:bg-sky-600">
          Delete
        </button>
      </div>
      {/* <h1 className="font-semibold text-2xl my-2">{userStory.Title}</h1>
      <p className="font-medium text-lg my-1">{userStory.Description}</p> */}
      {showRequirements && (
        <RequirementList
          requirements={requirements}
          acceptInput={false}
          addRequirement={addRequirement}
          removeRequirementFromUS={removeRequirement}
        />
      )}
      <button
        type="button"
        className="hover:text-sky-800 hover:text-lg w-6/12 text-start my-4"
        onClick={() => setShowRequirements(!showRequirements)}
      >
        {showRequirements
          ? "Hide Requirement Panel \u2191"
          : "Show Requirement Panel \u2193"}
      </button>
    </div>
  );
}
