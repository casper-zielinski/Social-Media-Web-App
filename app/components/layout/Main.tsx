import React from "react";
import MainHeader from "../MainComponents/MainHeader";
import Poster from "../MainComponents/Poster";
import PostFeed from "../MainComponents/PostFeed";

const Main = () => {
  return (
    <main className="col-span-9 bg-white dark:bg-gray-950 sm:col-span-6 h-[100vh] overflow-y-scroll pb-20 sm:pb-4">
      {/**
       * Main feed section.
       * Displays either "For you" or "Following" posts depending on navigationPagerForYou.
       */}

      <header className="border-b-2 border-blue-400 dark:border-blue-950 grid grid-cols-2 text-center">
        <MainHeader />
      </header>
      {/* To post something in the main section, without needing to open the sending popup*/}
      <Poster />
      {/* All the Posts with the follow Button*/}
      <PostFeed />
    </main>
  );
};

export default Main;
