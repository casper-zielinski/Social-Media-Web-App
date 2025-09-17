"use client";

import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FaCommentAlt, FaEye, FaBookmark } from "react-icons/fa";
import { PiDownloadFill } from "react-icons/pi";
import { useSelector } from "react-redux";

interface MainButtonsProps {
  commentId: string;
}

const MainButtons = ({ commentId }: MainButtonsProps) => {
  const [likeColor, setLikeColor] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const [repost, setRepost] = useState(false);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  return (
    <>
      <div
        className="tooltip tooltip-info flex flex-row items-center"
        data-tip="Like"
      >
        <AiFillLike
          className={likeColor ? "text-blue-600" : "text-black dark:text-white"}
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
          className={repost ? "text-green-600" : "text-black dark:text-white"}
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
              ? (
                  document.getElementById(
                    `CommentModal${commentId}`
                  ) as HTMLDialogElement
                )?.showModal()
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
    </>
  );
};

export default MainButtons;
