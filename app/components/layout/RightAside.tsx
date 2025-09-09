import React from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import TruncateText from "../TruncateText";
import { useRouter } from "next/navigation";
import RightAsideListItems from "../RightAsideListItems";
import Profile from "../Profile";

/* 
      Right Side Bar with Buttons for Navigation like Home, Search, AI-Tools etc. 
      both visible on Mobile and on Desktop, but without Text on Mobile (only Button Icons)
*/

const RightAside = () => {
  return (
    <aside className="col-span-3 bg-gray-950 border-r-2 border-blue-950">
      <Logo />
      <ul className="list">
        <RightAsideListItems />
        <li className="list-row p-2 justify-center">
          <Profile classname="flex flex-col space-y-2 sm:flex-row col-span-full sm:space-x-4 items-center justify-center sm:justify-start sm:pl-5" />
        </li>
      </ul>
    </aside>
  );
};

export default RightAside;
