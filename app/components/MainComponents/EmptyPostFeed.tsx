import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import { TbUsersPlus } from "react-icons/tb";

const EmptyPostFeed = (navigationPagerForYou : boolean) => {
  return (
    <div className="w-full h-[70vh] flex justify-center items-center px-4">
      {navigationPagerForYou ? (
        <div className="flex flex-col items-center text-center max-w-sm sm:max-w-md">
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-200 dark:bg-blue-950/50 flex items-center justify-center">
              <FaBrain className="text-3xl sm:text-4xl text-blue-400 dark:text-blue-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <AiFillLike className="text-lg sm:text-xl text-amber-500 dark:text-amber-400" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            No Recommendations Yet
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            We&apos;re still getting to know you. Start interacting with posts
            and following people to get personalized recommendations in your
            feed.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 bg-gray-300 dark:bg-gray-800/50 rounded-lg px-4 py-2.5">
              <AiFillLike className="text-blue-400 flex-shrink-0" />
              <span className="text-black dark:text-white">
                Like &amp; comment on posts
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 bg-gray-300 dark:bg-gray-800/50 rounded-lg px-4 py-2.5">
              <TbUsersPlus className="text-blue-400 flex-shrink-0" />
              <span className="text-black dark:text-white">
                Follow new people
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center max-w-sm sm:max-w-md">
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-200 dark:bg-blue-950/50 flex items-center justify-center">
              <BsPeopleFill className="text-3xl sm:text-4xl text-blue-400 dark:text-blue-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-500 font-bold">
                0
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Your Following Feed Is Empty
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            Posts from people you follow will show up here. Start following
            others to fill your feed with their latest posts.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-5 py-2.5">
            <TbUsersPlus className="text-base sm:text-lg flex-shrink-0" />
            <span>Find people to follow in the sidebar</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyPostFeed;
