"use client";

import Logo from "./Logo";
import {
  MdHome,
  MdLocalPostOffice,
  MdNotificationsActive,
} from "react-icons/md";
import {
  FaSearch,
  FaBrain,
  FaCreativeCommonsSamplingPlus,
} from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { useState } from "react";
import LogInPopUp from "./components/SignUpLoginProp";
import Main from "./components/Main";
import PopUpModals from "./components/PopUpModals";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

{
  /**
   * Home page component for the social media app.
   *
   * Layout:
   * - Left sidebar (desktop): Navigation, post button, user avatar.
   * - Main section: Displays either "For you" or "Following" feed, controlled by navigationPagerForYou state.
   * - Right sidebar (desktop): Search input and premium subscription prompt.
   * - Footer (mobile): Navigation and post button.
   *
   * @component
   */
}

export default function Home() {
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);

  return (
    <>
      {/* Modals for Login & Posting */}
      <PopUpModals />

      {/**
       * Navigation buttons for Home, Explore, Notifications, Messages, and AI Chatbot.
       * Present in both sidebar (desktop) and footer (mobile).
       */}

      <aside className="flex-col col-span-2 sm:col-span-3 bg-gray-950 border-r-2 border-blue-950">
        <Logo />
        <ul className="list">
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
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
              <div className="indicator">
                <span className="indicator-item status status-success"></span>
                <MdHome className="h-7 w-7"></MdHome>
              </div>
              <div className="hidden sm:block sm:text-xs">Home</div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
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
              <FaSearch className="h-7 w-7" />
              <div className="hidden sm:block sm:text-xs">Explore</div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-1.3 btn btn-soft btn-info rounded-xl px-2"
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
              <MdNotificationsActive className="h-7 w-7" />
              <div className="hidden sm:block sm:text-xs md:ms-2">
                Notifications
              </div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
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
              <LuMessageSquare className="h-7 w-7" />
              <div className="hidden sm:block sm:text-xs">Message</div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
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
              <FaBrain className="h-7 w-7" />
              <div className="hidden sm:block sm:text-xs">AI Chatbot</div>
            </button>
          </li>
          <li className="list-row">
            {/* "Post" button in sidebar (desktop) */}
            <button
              className="flex col-span-full items-center space-x-4 btn btn-info rounded-xl px-2"
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
              <MdLocalPostOffice className="w-7 h-7" />
              <div className="hidden sm:flex">Post</div>
            </button>
          </li>
          <li className="list-row">
            <div className="flex items-center">
              <div className="avatar avatar-placeholder m-4">
                <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
                  <span>D</span>
                </div>
              </div>
              <div className="hidden md:block">
                <p className="font-bold">Avatar</p>
                <p className="text-xs text-gray-400">Avatar@gmail.com</p>
              </div>
            </div>
          </li>
        </ul>
      </aside>

      {/* Main content section displaying the feed based on navigationPagerForYou state */}
      <Main logedIn={loggedIn} />

      <aside className="hidden sm:flex sm:flex-col sm:col-span-3 bg-gray-950 border-l-2 border-blue-950 space-y-3.5 p-3">
        <input
          type="text"
          placeholder="Search..."
          className="input input-md rounded-3xl w-95/100"
          name="Search"
        />
        {/* Premium subscription section */}
        <section className="bg-gray-800 rounded-3xl p-3 border border-gray-600 w-95/100">
          <h3 className="text-lg font-bold">Subscribe to Premium</h3>
          <p className="text-sm">
            Subscribe to unlock new features and if eligible, receive a share of
            revenue.
          </p>
          <button className="btn btn-outline btn-info mt-3">Subscribe</button>
        </section>
      </aside>

      {/* The Footer Interface for Smart Phones*/}

      <footer
        className={`${
          loggedIn ? "" : "bg-blue-500"
        } absolute bottom-0 footer footer-horizontal z-10 footer-center border-t-2 border-blue-950 text-base-content`}
      >
        {loggedIn ? (
          <div className="flex m-5  space-x-5 col-span-1 sm:hidden">
            {/**
             * Opens the post creation modal dialog for mobile users.
             * @button
             */}
            <button
              className="btn btn-circle btn-info absolute left-0 rounded-cir m-3"
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
              <FaCreativeCommonsSamplingPlus className="w-11 h-11" />
            </button>

            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="Home Page"
            >
              <MdHome className="w-6 h-6" />
            </div>

            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="Search"
            >
              <FaSearch className="w-5 h-5" />
            </div>

            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="Notifications"
            >
              <MdNotificationsActive className="w-5 h-5" />
            </div>
            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="Messages"
            >
              <LuMessageSquare className="w-5 h-5" />
            </div>
            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="AI Chatbot"
            >
              <FaBrain className="w-5 h-5" />
            </div>
          </div>
        ) : (
          <LogInPopUp />
        )}
      </footer>
    </>
  );
}
