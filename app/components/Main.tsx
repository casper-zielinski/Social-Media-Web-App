"use client";

import React, { useState } from "react";
import { BiRepost } from "react-icons/bi";
import { FaEye, FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { PiDownloadFill } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import TruncateText from "./TruncateText";

const Main = () => {
  const [navigationPagerForYou, setNavigationPagerForYou] = useState(true);
  const [likeColor, setLikeColor] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const [repost, setRepost] = useState(false);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const useremail = useSelector((state: RootState) => state.user.email);

  return (
    <main className="col-span-9 sm:col-span-6 bg-gray-950 min-h-screen">
      {/**
       * Main feed section.
       * Displays either "For you" or "Following" posts depending on navigationPagerForYou.
       */}

      <header className="border-b-2 border-blue-950 grid grid-cols-2 text-center">
        <div
          className={`hover:bg-gray-800 p-3 cursor-pointer ${
            navigationPagerForYou ? "font-bold" : "text-gray-500"
          }`}
          onClick={() => setNavigationPagerForYou(true)}
        >
          <p>For you</p>
        </div>
        <div
          className={`hover:bg-gray-800 p-3 cursor-pointer ${
            navigationPagerForYou ? "text-gray-500" : "font-bold"
          }`}
          onClick={() => setNavigationPagerForYou(false)}
        >
          <p>Following</p>
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
        <div className="flex items-center">
          <div className="avatar avatar-placeholder m-3">
            <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
              <span>D</span>
            </div>
          </div>
          <div>
            <p className="font-bold">Avatar</p>
            <TruncateText
              maxLength={15}
              text={useremail}
              widthToShowFull={600}
              className="text-gray-500 text-xs break-words whitespace-normal"
            />
          </div>
          <div className="flex justify-end ml-auto mr-2 mt-3">
            <button
              className="btn btn-info col-span-8"
              onClick={() =>
                logedIn
                  ? ""
                  : (
                      document.getElementById(
                        "LoginOrSignUpModal"
                      ) as HTMLDialogElement
                    )?.showModal()
              }
            >
              <IoMdPersonAdd className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="m-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          corporis neque alias delectus temporibus, commodi libero inventore
          voluptates quam. Cum suscipit molestias officiis nemo quasi cupiditate
          saepe autem quaerat dolores.
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
                logedIn
                  ? setLikeColor((prev) => !prev)
                  : (
                      document.getElementById(
                        "LoginOrSignUpModal"
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
                logedIn
                  ? setRepost((prev) => !prev)
                  : (
                      document.getElementById(
                        "LoginOrSignUpModal"
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
                logedIn
                  ? ""
                  : (
                      document.getElementById(
                        "LoginOrSignUpModal"
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
                logedIn
                  ? ""
                  : (
                      document.getElementById(
                        "LoginOrSignUpModal"
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
                  logedIn
                    ? setBookMark((prev) => !prev)
                    : (
                        document.getElementById(
                          "LoginOrSignUpModal"
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
                logedIn
                  ? ""
                  : (
                      document.getElementById(
                        "LoginOrSignUpModal"
                      ) as HTMLDialogElement
                    )?.showModal()
              }
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default Main;
