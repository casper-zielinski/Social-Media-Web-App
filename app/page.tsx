"use client";

import Logo from "./Logo";
import {
  MdHome,
  MdNotificationsActive,
  MdGif,
  MdEmojiEmotions,
} from "react-icons/md";
import {
  FaSearch,
  FaBrain,
  FaCreativeCommonsSamplingPlus,
  FaCommentAlt,
} from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { AiFillLike, AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { BiRepost } from "react-icons/bi";
import { FaEye, FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { PiDownloadFill } from "react-icons/pi";
import LogInPopUp from "./components/LogInPopUp";

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
  const [navigationPagerForYou, setNavigationPagerForYou] = useState(true);
  const [likeColor, setLikeColor] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const [repost, setRepost] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {/* Login Dialog */}

      <dialog id="LoginModal" className="modal me-66" data-theme="dark">
        <div className="modal-box w-3/5 max-w-md mx-4">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="grid grid-cols-1 gap-4 justify-center items-center p-4">
            {" "}
            {/* grid-cols-1 */}
            <div className="flex justify-center">
              <button className="btn btn-info w-full">Sign Up</button>
            </div>
            <div className="divider">OR</div>
            <div className="flex justify-center">
              <button className="btn btn-soft btn-info w-full">Log In</button>
            </div>
          </div>
        </div>
      </dialog>

      {/**
       * Navigation buttons for Home, Explore, Notifications, Messages, and AI Chatbot.
       * Present in both sidebar (desktop) and footer (mobile).
       */}

      <aside className="hidden sm:flex flex-col sm:col-span-3 bg-gray-950 border-r-2 border-blue-950">
        <Logo />
        <ul className="list">
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
              onClick={() =>
                loggedIn
                  ? ""
                  : (
                      document.getElementById("LoginModal") as HTMLDialogElement
                    )?.showModal()
              }
            >
              <div className="indicator">
                <span className="indicator-item status status-success"></span>
                <MdHome className="h-7 w-7"></MdHome>
              </div>
              <div className="text-xs">Home</div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
              onClick={() =>
                loggedIn
                  ? ""
                  : (
                      document.getElementById("LoginModal") as HTMLDialogElement
                    )?.showModal()
              }
            >
              <FaSearch className="h-7 w-7" />
              <div className="text-xs">Explore</div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-1.3 btn btn-soft btn-info rounded-xl px-2"
              onClick={() =>
                loggedIn
                  ? ""
                  : (
                      document.getElementById("LoginModal") as HTMLDialogElement
                    )?.showModal()
              }
            >
              <MdNotificationsActive className="h-7 w-7" />
              <div className="text-xs md:ms-2">Notifications</div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
              onClick={() =>
                loggedIn
                  ? ""
                  : (
                      document.getElementById("LoginModal") as HTMLDialogElement
                    )?.showModal()
              }
            >
              <LuMessageSquare className="h-7 w-7" />
              <div className="text-xs">Message</div>
            </button>
          </li>
          <li className="list-row">
            <button
              className="flex col-span-full items-center space-x-4 btn btn-soft btn-info rounded-xl px-2"
              onClick={() =>
                loggedIn
                  ? ""
                  : (
                      document.getElementById("LoginModal") as HTMLDialogElement
                    )?.showModal()
              }
            >
              <FaBrain className="h-7 w-7" />
              <div className="text-xs">AI Chatbot</div>
            </button>
          </li>
        </ul>

        {/* "Post" button in sidebar (desktop) */}
        <button
          className="btn btn-info w-1/2 m-3"
          onClick={() =>
            loggedIn
              ? (
                  document.getElementById("PostModal") as HTMLDialogElement
                )?.showModal()
              : (
                  document.getElementById("LoginModal") as HTMLDialogElement
                )?.showModal()
          }
        >
          Post
        </button>
        {/*
         * Modal dialog for creating a new post (desktop).
         * Includes avatar, input field, and media options.
         */}
        <dialog
          id="PostModal"
          className="modal flex justify-center items-start pt-5"
          data-theme="dark"
        >
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="grid grid-cols-5 justify-center items-baseline">
              <div className="avatar avatar-placeholder m-4 col-span-1">
                <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
                  <span>D</span>
                </div>
              </div>
              <textarea
                placeholder="Type here"
                className="textarea textarea-ghost col-span-4"
                name="Post-Desktop"
              />
              <div className="divider col-span-5"></div>
              <div className="col-span-2 flex justify-evenly">
                <AiFillPicture className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                <MdGif className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                <MdEmojiEmotions className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                <GiPositionMarker className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
              </div>
            </div>
          </div>
        </dialog>

        <div className="flex items-center">
          <div className="avatar avatar-placeholder m-4">
            <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
              <span>D</span>
            </div>
          </div>
          <div>
            <p className="font-bold">Avatar</p>
            <p className="text-xs text-gray-400">Avatar@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* Main content section displaying the feed based on navigationPagerForYou state */}

      <main className="col-span-12 sm:col-span-6 bg-gray-950 min-h-screen">
        {/**
         * Main feed section.
         * Displays either "For you" or "Following" posts depending on navigationPagerForYou.
         */}

        <header className="border-b-2 border-blue-950 grid grid-cols-2 text-center">
          <div
            className={`hover:bg-gray-800 p-3 ${
              navigationPagerForYou ? "font-bold" : "text-gray-500"
            }`}
            onClick={() => setNavigationPagerForYou(true)}
          >
            For you
          </div>
          <div
            className={`hover:bg-gray-800 p-3 ${
              navigationPagerForYou ? "text-gray-500" : "font-bold"
            }`}
            onClick={() => setNavigationPagerForYou(false)}
          >
            Following
          </div>
          <div
            className={`items-end w-1/2 h-1 translate-x-1/2 rounded ${
              navigationPagerForYou ? "bg-sky-600" : "bg-gray-950"
            }`}
          ></div>
          <div
            className={`items-end w-1/2 h-1 translate-x-1/2 rounded ${
              navigationPagerForYou ? "bg-gray-950" : "bg-sky-600"
            }`}
          ></div>
        </header>
        {/* All the Posts with the follow Button*/}
        <article className="border-y-2 border-blue-950">
          <div className="grid items-center grid-cols-12">
            <div className="avatar avatar-placeholder col-span-2 m-4">
              <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
                <span>D</span>
              </div>
            </div>
            <div className="col-span-2">
              <p className="font-bold">Avatar</p>
              <p className="text-xs text-gray-400">Avatar@gmail.com</p>
            </div>
            <div className="col-span-8 flex justify-end me-3 mt-3">
              <button
                className="btn btn-info col-span-8"
                onClick={() =>
                  loggedIn
                    ? ""
                    : (
                        document.getElementById(
                          "LoginModal"
                        ) as HTMLDialogElement
                      )?.showModal()
                }
              >
                Follow
              </button>
            </div>
          </div>
          <p className="m-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            corporis neque alias delectus temporibus, commodi libero inventore
            voluptates quam. Cum suscipit molestias officiis nemo quasi
            cupiditate saepe autem quaerat dolores.
          </p>
          <div className="divider"></div>
          <div className="flex justify-evenly items-baseline mb-5">
            <div
              className="tooltip tooltip-info flex flex-row items-center"
              data-tip="Like"
            >
              <AiFillLike
                className={likeColor ? "text-blue-600" : "text-white"}
                onClick={() =>
                  loggedIn
                    ? setLikeColor((prev) => !prev)
                    : (
                        document.getElementById(
                          "LoginModal"
                        ) as HTMLDialogElement
                      )?.showModal()
                }
              />
            </div>
            <div
              className="tooltip tooltip-success flex flex-col items-center"
              data-tip="Repost"
            >
              <BiRepost
                className={repost ? "text-green-600" : "text-white"}
                onClick={() =>
                  loggedIn
                    ? setRepost((prev) => !prev)
                    : (
                        document.getElementById(
                          "LoginModal"
                        ) as HTMLDialogElement
                      )?.showModal()
                }
              />
            </div>
            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="Comment"
            >
              <FaCommentAlt
                onClick={() =>
                  loggedIn
                    ? ""
                    : (
                        document.getElementById(
                          "LoginModal"
                        ) as HTMLDialogElement
                      )?.showModal()
                }
              />
            </div>
            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="Views"
            >
              <FaEye
                onClick={() =>
                  loggedIn
                    ? ""
                    : (
                        document.getElementById(
                          "LoginModal"
                        ) as HTMLDialogElement
                      )?.showModal()
                }
              />
            </div>
            <div
              className="tooltip tooltip-error flex flex-col items-center"
              data-tip="Bookmark"
            >
              {bookMark ? (
                <FaBookmark
                  onClick={() => setBookMark((prev) => !prev)}
                  className="text-red-600"
                />
              ) : (
                <CiBookmark
                  onClick={() =>
                    loggedIn
                      ? setBookMark((prev) => !prev)
                      : (
                          document.getElementById(
                            "LoginModal"
                          ) as HTMLDialogElement
                        )?.showModal()
                  }
                />
              )}
            </div>
            <div
              className="tooltip tooltip-info flex flex-col items-center"
              data-tip="Download"
            >
              <PiDownloadFill
                onClick={() =>
                  loggedIn
                    ? ""
                    : (
                        document.getElementById(
                          "LoginModal"
                        ) as HTMLDialogElement
                      )?.showModal()
                }
              />
            </div>
          </div>
        </article>
      </main>

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
                (
                  document.getElementById(
                    "PostModalMobile"
                  ) as HTMLDialogElement
                )?.showModal()
              }
            >
              <FaCreativeCommonsSamplingPlus className="w-11 h-11" />
            </button>
            {/**
             * Modal dialog for creating a new post (mobile).
             * Includes avatar, input field, and media options.
             */}
            <dialog
              id="PostModalMobile"
              className="modal flex justify-center items-start pt-5 -translate-x-5"
            >
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div className="grid grid-cols-10 justify-center items-baseline m-4">
                  <div className="avatar avatar-placeholder m-4 col-span-3">
                    <div className="bg-gray-400 text-neutral-content w-24 rounded-full">
                      <span className="text-base">D</span>
                    </div>
                  </div>
                  <textarea
                    placeholder="Type here"
                    className="textarea textarea-ghost col-span-7"
                    name="Post"
                  />
                  <div className="divider col-span-10"></div>
                  <div className="col-span-10 flex justify-between">
                    <AiFillPicture className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                    <MdGif className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                    <MdEmojiEmotions className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                    <GiPositionMarker className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                    <FaBrain className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
                  </div>
                </div>
              </div>
            </dialog>

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
