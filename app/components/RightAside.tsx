"use client";

import React from "react";
import {
  MdHome,
  MdLocalPostOffice,
  MdNotificationsActive,
} from "react-icons/md";
import { FaSearch, FaBrain } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import TruncateText from "./TruncateText";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/navigation";

/* 
      Right Side Bar with Buttons for Navigation like Home, Search, AI-Tools etc. 
      both visible on Mobile and on Desktop, but without Text on Mobile (only Button Icons)
*/

const RightAside = () => {
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const useremail = useSelector((state: RootState) => state.user.email);
  const router = useRouter();

  return (
    <aside className="col-span-3 bg-gray-950 border-r-2 border-blue-950">
      <Logo />
      <ul className="list">
        <li className="list-row justify-center">
          <button
            className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl"
            onClick={() =>
              loggedIn
                ? router.push("/")
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <div className="indicator">
              <span className="indicator-item status status-success"></span>
              <MdHome className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="hidden sm:block sm:text-xs">Home</div>
          </button>
        </li>
        <li className="list-row justify-center">
          <button
            className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-0.5"
            onClick={() =>
              loggedIn
                ? ""
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <FaSearch className="h-5 w-5" />
            <div className="hidden sm:block sm:text-xs">Explore</div>
          </button>
        </li>
        <li className="list-row justify-center">
          <button
            className="flex col-span-full items-center space-x-1.3 btn btn-soft btn-info rounded-xl px-0.5"
            onClick={() =>
              loggedIn
                ? ""
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <MdNotificationsActive className="h-5 w-5" />
            <div className="hidden sm:block sm:text-xs md:ms-2">
              Notifications
            </div>
          </button>
        </li>
        <li className="list-row justify-center">
          <button
            className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-1"
            onClick={() =>
              loggedIn
                ? ""
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <LuMessageSquare className="h-5 w-5" />
            <div className="hidden sm:block sm:text-xs">Message</div>
          </button>
        </li>
        <li className="list-row justify-center">
          <button
            className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-1"
            onClick={() =>
              loggedIn
                ? ""
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <FaBrain className="h-5 w-5" />
            <div className="hidden sm:block sm:text-xs">AI Chatbot</div>
          </button>
        </li>
        <li className="list-row justify-center">
          <button
            className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-0.5"
            onClick={() =>
              loggedIn
                ? router.push("/settings")
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <CiSettings className="h-5 w-5" />
            <div className="hidden sm:block sm:text-xs">Settings</div>
          </button>
        </li>
        <li className="list-row justify-center">
          {/* "Post" button in sidebar (desktop) */}
          <button
            className="flex col-span-full items-center space-x-4 btn btn-info rounded-xl px-1"
            onClick={() =>
              loggedIn
                ? (
                    document.getElementById("PostModal") as HTMLDialogElement
                  )?.showModal()
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <MdLocalPostOffice className="w-4 h-4" />
            <div className="hidden sm:flex">Post</div>
          </button>
        </li>
        <li className="list-row p-2 justify-center">
          <div className="flex flex-col space-y-2 sm:flex-row col-span-full space-x-4 items-center">
            <div
              className="tooltip tooltip-right lg:tooltip-top tooltip-info"
              data-tip={"Avatar"}
            >
              <div className="avatar avatar-placeholder">
                <div className="bg-gray-400 text-neutral-content w-6 sm:w-12 rounded-full">
                  <span>D</span>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold">Avatar</p>
              <TruncateText
                maxLength={15}
                text={useremail}
                widthToShowFull={600}
                className="text-gray-500 text-xs"
              />
            </div>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default RightAside;
