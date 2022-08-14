import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Requirement({
  requirement,
  acceptInput,
  removeRequirementFromUS,
}: any) {
  const [BRType, setBRType] = useState(requirement.RequirementType);
  const [BRDescription, setBRDescription] = useState(requirement.Description);

  let commonClass = "px-1 pt-1 rounded-md bg-sky-300 block";
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  let listItemClass;
  if (router.pathname === "/birlik") {
    listItemClass = "p-2 w-3/4";
  } else {
    listItemClass = "p-2";
  }
  //Continue from here fix the error after figuring out what it is and create API endpoint to remove requirement from US
  function unTieRequirementFromUS() {
    removeRequirementFromUS(requirement.id);
    refreshData();
  }

  async function updateRequirement() {
    console.log(requirement.id);
    console.log(BRDescription);
    try {
      await fetch("http://localhost:3000/api/requirement/update-requirement", {
        method: "POST",
        body: JSON.stringify({
          requirementId: requirement.id,
          BRDescription: BRDescription,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      refreshData();
    }
  }
  async function deleteRequirement() {
    try {
      await fetch("http://localhost:3000/api/requirement/delete-requirement", {
        method: "POST",
        body: JSON.stringify({
          requirementId: requirement.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      refreshData();
    }
  }

  return (
    // Wont show user story list if we are viewing general page for the project
    <>
      {!acceptInput ? (
        <>
          <li className={listItemClass + " flex gap-4 items-center"}>
            <div>
              <h1 className="font-medium text-lg">BR {requirement.id}</h1>
              <p className="my-2">{requirement.Description}</p>
              <p className=" font-light text-xs my-1">
                Requirement Type: {requirement.RequirementType}
              </p>
            </div>
            <button
              className="text-sm rounded-md bg-sky-200 p-1"
              onClick={unTieRequirementFromUS}
            >
              Remove
            </button>
          </li>
        </>
      ) : (
        <li className={listItemClass}>
          <h1 className="font-medium text-lg">BR {requirement.id}</h1>
          <textarea
            className={`my-2 w-full h-36 ${commonClass}`}
            value={BRDescription}
            onChange={(e) => setBRDescription(e.target.value)}
          />
          <input
            type={"text"}
            className={`font-light text-xs my-1 w-8/12 ${commonClass}`}
            value={"Requirement Type: " + BRType}
            onChange={(e) => setBRType(e.target.value)}
          />
          <button
            className="text-sm rounded-md bg-sky-200 p-1 mr-4 mt-2"
            onClick={updateRequirement}
          >
            Update
          </button>
          <button
            className="text-sm rounded-md bg-sky-200 p-1"
            onClick={deleteRequirement}
          >
            Remove
          </button>
        </li>
      )}
    </>
  );
}
