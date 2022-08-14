import Requirement from "./requirement";
import { useRouter } from "next/router";
import NewRequirement from "./new-requirement";
import { useState } from "react";
export default function RequirementList({
  requirements,
  className,
  acceptInput,
  addRequirement,
  removeRequirementFromUS,
}: any) {
  const router = useRouter();
  const [requirementID, setRequirementID] = useState("");
  const [error, setError] = useState(undefined);
  const refreshData = () => {
    router.replace(router.asPath);
  };

  function onAddRequirement() {
    addRequirement(requirementID);
    setRequirementID("");
    refreshData();
  }

  console.log(requirements.length);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {requirements.length > 0 && (
        <h1 className="font-semibold mb-2">Requirements</h1>
      )}

      <ul className={router.asPath === "/requirements" ? "w-8/12" : ""}>
        {requirements &&
          requirements.map((requirement: any) => (
            <Requirement
              requirement={requirement}
              key={requirement.id}
              acceptInput={acceptInput}
              removeRequirementFromUS={removeRequirementFromUS}
            />
          ))}
        {acceptInput && <NewRequirement />}
        {!acceptInput && (
          <li>
            <input
              type="number"
              className="bg-sky-200 rounded-md w-3/12 mb-4 block p-1"
              placeholder="Requirement ID"
              value={requirementID}
              onChange={(e) => setRequirementID(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button
              className="bg-sky-200 rounded-md p-1"
              onClick={onAddRequirement}
            >
              Connect
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
