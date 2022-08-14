import { useRouter } from "next/router";
import { useState } from "react";

export default function NewRequirement() {
  // const [BRType, setBRType] = useState("");
  const [BRDescription, setBRDescription] = useState("");

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onCreate = async () => {
    try {
      fetch("http://localhost:3000/api/requirement/create-requirement", {
        body: JSON.stringify(BRDescription),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setBRDescription("");
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  let commonClass = "px-1 pt-1 rounded-md bg-sky-300 block";
  const router = useRouter();
  let listItemClass;
  if (router.pathname === "/birlik") {
    listItemClass = "p-2 w-3/4";
  } else {
    listItemClass = "p-2";
  }
  return (
    <li className={listItemClass + " bg-sky-300 rounded-md"}>
      <h1>Create a new BR</h1>
      <textarea
        className={`my-2 w-full ${commonClass} bg-sky-200`}
        value={BRDescription}
        onChange={(e) => setBRDescription(e.target.value)}
        placeholder="Description"
      />
      <button className="hover:text-2xl" onClick={() => onCreate()}>
        Create
      </button>
    </li>
  );
}
