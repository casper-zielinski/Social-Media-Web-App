"use client";

import { useState } from "react";
import MainHeader from "../MainComponents/MainHeader";
import Poster from "../MainComponents/Poster";
import PostFeed from "../MainComponents/PostFeed";

const Main = () => {
  const [navigationPagerForYou, setNavigationPagerForYou] = useState(true);

  return (
    <main className="col-span-9 bg-white dark:bg-gray-950 lg:col-span-6 h-[100vh] overflow-y-scroll scrollbar-hide pb-20 sm:pb-4">
      {/**
       * Main feed section.
       * Displays either "For you" or "Following" posts depending on navigationPagerForYou.
       */}
      <header className="border-b-2 border-blue-400 dark:border-blue-950 grid grid-cols-2 text-center">
        <MainHeader
          navigationPagerForYou={navigationPagerForYou}
          setNavigationPagerForYou={setNavigationPagerForYou}
        />
      </header>
      {/* To post something in the main section, without needing to open the sending popup*/}
      <Poster />
      {/* All the Posts with the follow Button*/}
      <PostFeed navigationPagerForYou={navigationPagerForYou}/>
    </main>
  );
};

export default Main;
