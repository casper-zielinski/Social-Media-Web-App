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
import { useModal } from "../hooks/useModal";
import { MODAL_IDS } from "../constants/modal";

const RightAsideListItems = () => {
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const router = useRouter();

  return (
    <>
      <li className="list-row justify-center">
        <button
          className="flex col-span-full items-center space-x-4 btn btn-info rounded-xl px-0.5"
          onClick={() => router.push("/")}
        >
          <MdHome className="h-7 w-7" />
          <div className="hidden sm:block sm:text-xs text-start justify-self-start">
            Home
          </div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="flex col-span-full items-center space-x-4 btn btn-info rounded-xl px-0.5"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? ""
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <FaSearch className="h-5 w-5" />
          <div className="hidden sm:block sm:text-xs">Explore</div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="flex col-span-full items-center space-x-1.3 btn btn-info rounded-xl px-0.5"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? ""
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
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
          className="flex col-span-full items-center space-x-4 btn btn-info rounded-xl px-1"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? ""
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <LuMessageSquare className="h-5 w-5" />
          <div className="hidden sm:block sm:text-xs">Message</div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="flex col-span-full items-center space-x-4 btn btn-info rounded-xl px-1"
          onClick={() =>
            loggedIn.loggedIn ? "" : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <FaBrain className="h-5 w-5" />
          <div className="hidden sm:block sm:text-xs">AI Chatbot</div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="flex col-span-full items-center space-x-4 btn btn-info rounded-xl px-0.5"
          onClick={() => router.push("/settings")}
        >
          <CiSettings className="h-5 w-5" />
          <div className="hidden sm:block sm:text-xs">Settings</div>
        </button>
      </li>
      <li className="list-row justify-center">
        {/* "Post" button in sidebar (desktop) */}
        <button
          className="flex col-span-full items-center space-x-4 btn dark:btn-info dark:btn-outline rounded-xl px-1"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? useModal(MODAL_IDS.POST)
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
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
