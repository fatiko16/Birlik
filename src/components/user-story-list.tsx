import UserStory from "./user-story";

export default function UserStoryList({ userStories, requirements }: any) {
  return (
    <>
      {userStories.map((userStory: any) => {
        const userStoryRequirements = requirements.filter(
          (requirement: any) => {
            for (let i = 0; i < requirement.UserStory.length; i++) {
              if (requirement.UserStory[i].id === userStory.id) {
                return requirement;
              }
            }
          }
        );
        return (
          <UserStory
            userStory={userStory}
            requirements={userStoryRequirements}
            key={userStory.id}
          />
        );
      })}
    </>
  );
}
