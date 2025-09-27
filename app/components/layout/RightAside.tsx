import React from "react";
import Logo from "../Logo";
import RightAsideListItems from "../RightAsideListItems";
import Profile from "../Profile";

/* 
      Right Side Bar with Buttons for Navigation like Home, Search, AI-Tools etc. 
      both visible on Mobile and on Desktop, but without Text on Mobile (only Button Icons)
*/

const RightAside = () => {
  return (
    <aside className="col-span-3 pb-16 sm:pb-0 bg-slate-100 dark:bg-gray-950 border-r-2 border-blue-400 dark:border-blue-950 flex flex-col h-[100vh] overflow-y-auto overflow-x-hidden">
      <Logo />
      <ul className="list">
        <RightAsideListItems />
      </ul>
      <Profile
        classname="m-2 space-y-2 flex sm:items-center mt-auto flex-col mb-20 sm:mb-3 sm:flex-row sm:space-x-2"
        displayUserInfo={true}
      />
    </aside>
  );
};

export default RightAside;
