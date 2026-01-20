import FollowSectionBluePrint from "./FollowSectionBluePrint";

const FollowSectionFallback = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        return <FollowSectionBluePrint key={index} />;
      })}
    </>
  );
};

export default FollowSectionFallback;
