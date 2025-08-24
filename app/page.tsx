"use client";

import Logo from "./Logo";
import { MdHome, MdNotificationsActive } from "react-icons/md";
import { FaSearch, FaBrain } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { useState } from "react";

export default function Home() {
  const [navigationPagerForYou, setNavigationPagerForYou] = useState(true);

  return (
    <>
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
      <main className="col-span-12 sm:col-span-6 bg-gray-950 min-h-screen">
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
      </main>
      <aside className="hidden sm:flex sm:flex-col sm:col-span-3 bg-gray-950 border-l-2 border-blue-950 space-y-3.5 p-3">
        <input
          type="text"
          placeholder="Search..."
          className="input input-md rounded-3xl"
        />
        <section className="bg-gray-800 rounded-3xl  p-3 border border-gray-600">
          <h3 className="text-lg font-bold">Subscribe to Premium</h3>
          <p className="text-sm">
            Subscribe to unlock new features and if eligible, receive a share of
            revenue.
          </p>
          <button className="btn btn-outline btn-info mt-3">Subscribe</button>
        </section>
      </aside>

      <footer className="bottom-0 absolute footer footer-horizontal footer-center bg-gray-950 border-t-2 border-blue-950 b text-base-content p-5 sm:hidden">
        <div className="flex space-x-5 col-span-1">
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
