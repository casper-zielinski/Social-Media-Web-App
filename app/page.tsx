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
} from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { useState } from "react";

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

  return (
    <>
      {/**
       * Navigation buttons for Home, Explore, Notifications, Messages, and AI Chatbot.
       * Present in both sidebar (desktop) and footer (mobile).
       */}

      <aside className="hidden sm:flex flex-col sm:col-span-3 bg-gray-950 border-r-2 border-blue-950 justify-start">
        <Logo />
        <ul className="list">
          <li className="list-row">
            <button className="flex items-center space-x-4 btn btn-soft btn-info rounded-xl px-2">
              <div className="indicator">
                <span className="indicator-item status status-success"></span>
                <MdHome className="h-7 w-7"></MdHome>
              </div>
              <div>Home</div>
            </button>
          </li>
          <li className="list-row">
            <button className="flex items-center space-x-4 btn btn-soft btn-info rounded-xl px-2">
              <FaSearch className="h-7 w-7" />
              <div>Explore</div>
            </button>
          </li>
          <li className="list-row">
            <button className="flex items-center space-x-4 btn btn-soft btn-info rounded-xl px-2">
              <MdNotificationsActive className="h-7 w-7" />
              <div>Notifications</div>
            </button>
          </li>
          <li className="list-row">
            <button className="flex items-center space-x-4 btn btn-soft btn-info rounded-xl px-2">
              <LuMessageSquare className="h-7 w-7" />
              <div>Message</div>
            </button>
          </li>
          <li className="list-row">
            <button className="flex items-center space-x-4 btn btn-soft btn-info rounded-xl px-2">
              <FaBrain className="h-7 w-7" />
              <div>AI Chatbot</div>
            </button>
          </li>
        </ul>

        {/* "Post" button in sidebar (desktop) */}
        <button
          className="btn btn-info w-1/2 m-3"
          onClick={() =>
            (
              document.getElementById("PostModal") as HTMLDialogElement
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
        >
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="grid grid-cols-5 justify-center items-center">
              <div className="avatar avatar-placeholder m-4 col-span-1">
                <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
                  <span>D</span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-ghost input-lg col-span-4"
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
              <button className="btn btn-info col-span-8">Follow</button>
            </div>
          </div>
          <p className="m-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            corporis neque alias delectus temporibus, commodi libero inventore
            voluptates quam. Cum suscipit molestias officiis nemo quasi
            cupiditate saepe autem quaerat dolores.
          </p>
        </article>
      </main>

      <aside className="hidden sm:flex sm:flex-col sm:col-span-3 bg-gray-950 border-l-2 border-blue-950 space-y-3.5 p-3">
        <input
          type="text"
          placeholder="Search..."
          className="input input-md rounded-3xl"
        />
        {/* Premium subscription section */}
        <section className="bg-gray-800 rounded-3xl  p-3 border border-gray-600">
          <h3 className="text-lg font-bold">Subscribe to Premium</h3>
          <p className="text-sm">
            Subscribe to unlock new features and if eligible, receive a share of
            revenue.
          </p>
          <button className="btn btn-outline btn-info mt-3">Subscribe</button>
        </section>
      </aside>

      {/* The Footer Interface for Smart Phones*/}

      <footer className="bottom-0 absolute footer footer-horizontal footer-center bg-gray-950 border-t-2 border-blue-950 text-base-content p-5 sm:hidden">
        <div className="flex space-x-5 col-span-1">
          {/**
           * Opens the post creation modal dialog for mobile users.
           * @button
           */}
          <button
            className="btn btn-circle btn-info absolute left-0 rounded-cir m-3"
            onClick={() =>
              (
                document.getElementById("PostModalMobile") as HTMLDialogElement
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
            className="modal flex justify-center items-start pt-5"
          >
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="grid grid-cols-5 justify-center items-center m-4">
                <div className="avatar avatar-placeholder m-4 col-span-1">
                  <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
                    <span>D</span>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-ghost input-lg col-span-4"
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
      </footer>
    </>
  );
}
