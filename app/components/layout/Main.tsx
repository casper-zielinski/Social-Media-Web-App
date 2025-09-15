import React from "react";
import Profile from "../Profile";
import MainHeader from "../MainComponents/MainHeader";
import FollowButton from "../MainComponents/FollowButton";
import MainButtons from "../MainComponents/MainButtons";

const Main = () => {
  return (
    <main className="col-span-9 sm:col-span-6 bg-gray-950 min-h-screen">
      {/**
       * Main feed section.
       * Displays either "For you" or "Following" posts depending on navigationPagerForYou.
       */}

      <header className="border-b-2 border-blue-950 grid grid-cols-2 text-center">
        <MainHeader />
      </header>
      {/* All the Posts with the follow Button*/}
      <article className="border-y-2 border-blue-950 overflow-hidden">
        <div className="flex items-center w-full">
          <div className="m-2 flex-1 min-w-0">
            <Profile
              classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
              tooltipDirectionEmail="tooltip-bottom"
            />
          </div>
          <div className="flex flex-shrink-0 justify-end ml-auto mr-2 mt-3">
            <FollowButton />
          </div>
        </div>
        <p className="m-2 break-words">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          corporis neque alias delectus temporibus, commodi libero inventore
          voluptates quam. Cum suscipit molestias officiis nemo quasi cupiditate
          saepe autem quaerat dolores.
        </p>
        <div className="divider"></div>
        <div className="flex justify-evenly items-baseline mb-5">
          <MainButtons />
        </div>
      </article>
    </main>
  );
};

export default Main;
