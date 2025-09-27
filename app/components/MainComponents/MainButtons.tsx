"use client";

import { db } from "@/firebase";
import { RootState } from "@/redux/store";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  query,
  updateDoc,
} from "firebase/firestore";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FaCommentAlt, FaEye, FaBookmark } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { PiDownloadFill } from "react-icons/pi";
import { useSelector } from "react-redux";

interface MainButtonsProps {
  commentId: string;
  ShowCommentArray: [
    boolean[],
    React.Dispatch<React.SetStateAction<boolean[]>>,
    number,
    number | null
  ];
  Likes?: [];
  isLiked?: boolean;
}

const MainButtons = ({
  commentId,
  ShowCommentArray,
  Likes,
  isLiked,
}: MainButtonsProps) => {
  const [likeColor, setLikeColor] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const [repost, setRepost] = useState(false);
  const [isRotated, setRotate] = useState(false);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const user = useSelector((state: RootState) => state.user);

  async function LikeorDislike() {
    if (!likeColor) {
      setLikeColor((prev) => !prev);
      await updateDoc(doc(db, "posts", commentId), {
        likes: arrayUnion(user.email),
      });
    } else {
      setLikeColor((prev) => !prev);
      await updateDoc(doc(db, "posts", commentId), {
        likes: arrayRemove(user.email),
      });
    }
  }

  useEffect(() => {
    isLiked ? setLikeColor(true) : setLikeColor(false);
  }, []);

  return (
    <>
      <div className="flex justify-evenly items-center mb-5">
        <motion.div
          className="tooltip tooltip-info flex flex-row items-center space-x-1"
          data-tip="Like"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2, rotate: -10 }}
        >
          {Likes !== undefined && Likes !== null && <span>{Likes.length}</span>}
          <AiFillLike
            className={
              likeColor ? "text-blue-600" : "text-black dark:text-white"
            }
            onClick={() => {
              logedIn
                ? LikeorDislike()
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal();
            }}
          />
        </motion.div>
        <motion.div
          className="tooltip tooltip-success flex flex-col items-center"
          data-tip="Repost"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2, translateY: -5 }}
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
        </motion.div>
        <motion.div
          className="tooltip tooltip-info flex flex-col items-center"
          data-tip="Comment"
          whileHover={{ scale: 1.2 }}
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
        </motion.div>
        <motion.div
          className="tooltip tooltip-info flex flex-col items-center"
          data-tip="Views"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2, translateY: -5 }}
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
        </motion.div>
        <motion.div
          className="tooltip tooltip-error flex flex-col items-center"
          data-tip="Bookmark"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.2, translateY: -5 }}
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
        </motion.div>
        <motion.div
          className="tooltip tooltip-info flex flex-col items-center"
          data-tip="Download"
          whileHover={{ scale: 1.2 }}
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
        </motion.div>
      </div>
      <div className="flex justify-center my-6 space-x-2 items-center">
        <motion.p
          className="text-xs hover:text-blue-600 cursor-pointer"
          onClick={() => {
            setRotate(!isRotated);
            ShowCommentArray[1]((prev) =>
              [...prev].map((value, i) =>
                i === ShowCommentArray[2] ? !value : value
              )
            );
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
        >
          {isRotated ? "Hide Comments" : "Show Comments"}
        </motion.p>
        <div className="indicator">
          <span className="indicator-item scale-75 indicator-end badge badge-info font-bold">
            {ShowCommentArray[3] || 0}
          </span>
          <motion.div
            initial={{ textShadow: 0 }}
            whileHover={{ scale: 1.2, textShadow: 100 }}
            animate={{ rotate: isRotated ? 180 : 0 }}
          >
            <IoIosArrowDropdown
              className="w-5 h-5 text-black dark:text-white hover:text-blue-600 cursor-pointer"
              onClick={() => {
                setRotate(!isRotated);
                ShowCommentArray[1]((prev) =>
                  [...prev].map((value, i) =>
                    i === ShowCommentArray[2] ? !value : value
                  )
                );
              }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MainButtons;
