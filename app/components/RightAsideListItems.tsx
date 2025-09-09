"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSettings } from "react-icons/ci";
import { FaSearch, FaBrain } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import {
  MdHome,
  MdNotificationsActive,
  MdLocalPostOffice,
} from "react-icons/md";
import { useSelector } from "react-redux";
import TruncateText from "./TruncateText";

const RightAsideListItems = () => {
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const router = useRouter();
  

  return (
    <>
      {" "}
      <li className="list-row justify-center">
        <button
          className="flex col-span-full items-center justify-center space-x-4 btn btn-soft btn-info rounded-xl"
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
          <div className="hidden sm:block sm:text-xs text-start justify-self-start">
            Home
          </div>
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
     
    </>
  );
};

export default RightAsideListItems;
