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
    <aside className="col-span-3 pb-16 sm:pb-0 bg-slate-100 dark:bg-gray-950 border-r-2 border-blue-400 dark:border-blue-950 flex flex-col h-[100vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
      <Logo />
      <ul className="list">
        <RightAsideListItems />
      </ul>
      <Profile
        classname="cursor-pointer m-2 space-y-2 flex bg-slate-200 hover:bg-gray-300 p-2 dark:bg-base-200 dark:hover:bg-base-300 rounded-lg  sm:items-center mt-auto flex-col mb-20 sm:mb-3 sm:flex-row sm:space-x-2"
        displayUserInfo={true}
        route={{
          Userprofile: true,
        }}
      />
    </aside>
  );
};

export default RightAside;
