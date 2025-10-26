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
          className="grid grid-cols-2 col-span-full items-center gap-x-2 md:gap-x-7 btn btn-info rounded-xl px-0.5"
          onClick={() => router.push("/")}
        >
          <MdHome className="h-8 w-8 col-span-2 sm:col-span-1 justify-self-center md:justify-self-end" />
          <div className="hidden sm:block sm:text-xs text-start">Home</div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="grid grid-cols-2 col-span-full items-center gap-x-2 md:gap-x-7 btn btn-info rounded-xl px-0.5"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? ""
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <FaSearch className="h-7 w-7 col-span-2 sm:col-span-1 justify-self-center md:justify-self-end" />
          <div className="hidden sm:block sm:text-xs text-start">Explore</div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="grid grid-cols-2 col-span-full items-center gap-x-2 md:gap-x-7 btn btn-info rounded-xl px-0.5"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? ""
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <MdNotificationsActive className="h-7 w-7 col-span-2 sm:col-span-1 justify-self-center md:justify-self-end" />
          <div className="hidden sm:block sm:text-xs text-start">
            Notifications
          </div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="grid grid-cols-2 col-span-full items-center gap-x-2 md:gap-x-7 btn btn-info rounded-xl px-0.5"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? ""
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <LuMessageSquare className="h-7 w-7 col-span-2 sm:col-span-1 justify-self-center md:justify-self-end" />
          <div className="hidden sm:block sm:text-xs text-start">Message</div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="grid grid-cols-2 col-span-full items-center gap-x-2 md:gap-x-7 btn btn-info rounded-xl px-0.5"
          onClick={() =>
            loggedIn.loggedIn ? "" : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <FaBrain className="h-7 w-7 col-span-2 sm:col-span-1 justify-self-center md:justify-self-end" />
          <div className="hidden sm:block sm:text-xs text-start">AI Chatbot</div>
        </button>
      </li>
      <li className="list-row justify-center">
        <button
          className="grid grid-cols-2 col-span-full items-center gap-x-2 md:gap-x-7 btn btn-info rounded-xl px-0.5"
          onClick={() => router.push("/settings")}
        >
          <CiSettings className="h-7 w-7 col-span-2 sm:col-span-1 justify-self-center md:justify-self-end" />
          <div className="hidden sm:block sm:text-xs text-start">Settings</div>
        </button>
      </li>
      <li className="list-row justify-center">
        {/* "Post" button in sidebar (desktop) */}
        <button
          className="grid grid-cols-2 col-span-full items-center gap-x-2 md:gap-x-7 btn dark:btn-info dark:btn-outline rounded-xl px-0.5"
          onClick={() =>
            loggedIn.loggedIn && !loggedIn.asGuest
              ? useModal(MODAL_IDS.POST)
              : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
          }
        >
          <MdLocalPostOffice className="h-7 w-7 col-span-2 sm:col-span-1 justify-self-center md:justify-self-end" />
          <div className="hidden sm:block sm:text-xs text-start">Post</div>
        </button>
      </li>
    </>
  );
};

export default RightAsideListItems;
