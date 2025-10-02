import Image from "next/image";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

/* Left Side Bar, only for bigger Phones and bigger, search bar and Subscribtion Tab*/

const LeftAside = () => {
  return (
    <aside className="hidden bg-slate-100 dark:bg-gray-950 sm:flex sm:flex-col sm:col-span-3 lg:col-span-3 border-l-2 border-blue-400 dark:border-blue-950 space-y-3.5 p-3 h-[100vh] overflow-y-auto scrollbar-hide">
      <input
        type="text"
        placeholder="Search..."
        className="rounded-3xl p-3 w-95/100 bg-slate-300 dark:bg-gray-800 text-black dark:text-white"
        name="Search"
      />
      {/* Premium subscription section */}
      <section className="bg-blue-100 dark:bg-gray-800 rounded-3xl p-3 border border-gray-600 w-95/100">
        <h3 className="text-lg font-bold text-black dark:text-white">
          Subscribe to Premium
        </h3>
        <p className="text-sm text-gray-400">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button className="btn btn-outline btn-info mt-3">Subscribe</button>
      </section>

      {/*What's happening Section */}
      <section className="bg-blue-100 dark:bg-gray-800 rounded-3xl p-3 border border-gray-600 w-95/100">
        <h3 className="text-lg font-bold mb-4 text-black dark:text-white">
          What's happening
        </h3>
        <div className="mb-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">Trending in Austria</p>
            <p className="ms-auto">
              <HiDotsHorizontal className="hover:font-bold text-black dark:text-white" />
            </p>
          </div>
          <p className="text-sm font-bold text-black dark:text-white">#React</p>
          <p className="text-sm text-gray-500">220k Clicks</p>
        </div>
        <div className="mb-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">Trending in Austria</p>
            <p className="ms-auto">
              <HiDotsHorizontal className="hover:font-bold text-black dark:text-white" />
            </p>
          </div>
          <p className="text-sm font-bold text-black dark:text-white">#React</p>
          <p className="text-sm text-gray-500">220k Clicks</p>
        </div>
        <div className="mb-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">Trending in Austria</p>
            <p className="ms-auto">
              <HiDotsHorizontal className="hover:font-bold text-black dark:text-white" />
            </p>
          </div>
          <p className="text-sm font-bold text-black dark:text-white">#React</p>
          <p className="text-sm text-gray-500">220k Clicks</p>
        </div>
      </section>

      {/* Who to follow Section*/}
      <section className="bg-blue-100 dark:bg-gray-800 p-3.5 grid grid-cols-6 gap-2 rounded-3xl border border-gray-600">
        <div className="col-span-full lg:col-span-4 flex justify-self-start space-x-2 text-xs lg:text-base">
          <div className="avatar">
            <div className="w-8 rounded-sm">
              <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
            </div>
          </div>
          <div className="text-xs text-start lg:text-base min-w-0">
            <p className="font-bold break-words whitespace-normal text-black dark:text-white">
              Dua Lipa
            </p>
            <p className="text-gray-500 break-words whitespace-normal">
              D.lipa@gmail.com
            </p>
          </div>
        </div>
        <div className="col-span-full lg:col-span-2 flex justify-self-center items-center lg:justify-self-end my-2 lg:m-0">
          <button className="btn btn-accent btn-sm ml-auto">Follow</button>
        </div>

        <div className="col-span-full lg:col-span-4 flex justify-self-start space-x-2 text-xs lg:text-base">
          <div className="avatar">
            <div className="w-8 rounded-sm">
              <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
            </div>
          </div>
          <div className="text-xs text-start lg:text-base min-w-0">
            <p className="font-bold break-words whitespace-normal text-black dark:text-white">
              Dua Lipa
            </p>
            <p className="text-gray-500 break-words whitespace-normal">
              D.lipa@gmail.com
            </p>
          </div>
        </div>
        <div className="col-span-full lg:col-span-2 flex justify-self-center items-center lg:justify-self-end my-2 lg:m-0">
          <button className="btn btn-accent btn-sm ml-auto">Follow</button>
        </div>

        <div className="col-span-full lg:col-span-4 flex justify-self-start space-x-2 text-xs lg:text-base">
          <div className="avatar">
            <div className="w-8 rounded-sm">
              <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
            </div>
          </div>
          <div className="text-xs text-start lg:text-base min-w-0">
            <p className="font-bold break-words whitespace-normal text-black dark:text-white">
              Dua Lipa
            </p>
            <p className="text-gray-500 break-words whitespace-normal">
              D.lipa@gmail.com
            </p>
          </div>
        </div>
        <div className="col-span-full lg:col-span-2 flex justify-self-center items-center lg:justify-self-end my-2 lg:m-0">
          <button className="btn btn-accent btn-sm ml-auto">Follow</button>
        </div>
      </section>
    </aside>
  );
};

export default LeftAside;
