"use client";

import { MODAL_IDS } from "@/app/constants/modal";
import { useModal } from "@/app/hooks/useModal";
import { db } from "@/firebase";
import { loggedInasGuest } from "@/redux/slices/loginSlice";
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

interface ShowComments {
  showComments: boolean[];
  setShowComments: React.Dispatch<React.SetStateAction<boolean[]>>;
  index: number;
  commentamout: number | null;
}

interface MainButtonsProps {
  commentId: string;
  ShowCommentObject: ShowComments;
  Likes?: [];
  isLiked?: boolean;
}

const MainButtons = ({
  commentId,
  ShowCommentObject,
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
          {Likes !== undefined && Likes !== null && (
            <span className="text-black dark:text-white">{Likes.length}</span>
          )}
          <AiFillLike
            className={
              likeColor ? "text-blue-600 cursor-pointer" : "text-black dark:text-white cursor-pointer"
            }
            onClick={(e) => {
              e.stopPropagation();
              logedIn.loggedIn && !logedIn.asGuest
                ? LikeorDislike()
                : useModal(MODAL_IDS.LOGIN_OR_SIGNUP);
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
            className={repost ? "text-green-600 cursor-pointer" : "text-black dark:text-white cursor-pointer"}
            onClick={() =>
              logedIn.loggedIn && !logedIn.asGuest
                ? setRepost((prev) => !prev)
                : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
            }
          />
        </motion.div>
        <motion.div
          className="tooltip tooltip-info flex flex-col items-center"
          data-tip="Comment"
          whileHover={{ scale: 1.2 }}
        >
          <FaCommentAlt
            className="text-black dark:text-white cursor-pointer"
            onClick={() =>
              logedIn.loggedIn && !logedIn.asGuest
                ? useModal(`CommentModal${commentId}`)
                : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
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
            className="text-black dark:text-white cursor-pointer"
            onClick={() =>
              logedIn.loggedIn && !logedIn.asGuest
                ? ""
                : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
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
              className="text-red-600 cursor-pointer"
            />
          ) : (
            <CiBookmark
              className="text-black dark:text-white cursor-pointer"
              onClick={() =>
                logedIn.loggedIn && !logedIn.asGuest
                  ? setBookMark((prev) => !prev)
                  : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
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
            className="text-black dark:text-white cursor-pointer"
            onClick={() =>
              logedIn.loggedIn && !logedIn.asGuest
                ? ""
                : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
            }
          />
        </motion.div>
      </div>
      <div
        className={`flex justify-center mt-6 ${
          ShowCommentObject.showComments[ShowCommentObject.index] ? "" : "mb-3"
        } space-x-2 items-center`}
      >
        <motion.p
          className="text-xs hover:text-blue-600 cursor-pointer text-black dark:text-white"
          onClick={() => {
            ShowCommentObject.setShowComments((prev) =>
              [...prev].map((value, i) =>
                i === ShowCommentObject.index ? !value : value
              )
            );
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
        >
          {ShowCommentObject.showComments[ShowCommentObject.index] ? "Hide Comments" : "Show Comments"}
        </motion.p>
        <div className="indicator">
          <span className="indicator-item scale-75 indicator-end badge badge-info font-bold">
            {ShowCommentObject.commentamout || 0}
          </span>
          <motion.div
            initial={{ textShadow: 0 }}
            whileHover={{ scale: 1.2, textShadow: 100 }}
            animate={{ rotate: ShowCommentObject.showComments[ShowCommentObject.index] ? 180 : 0 }}
          >
            <IoIosArrowDropdown
              className="w-5 h-5 text-black dark:text-white hover:text-blue-600 cursor-pointer"
              onClick={() => {
                ShowCommentObject.setShowComments((prev) =>
                  [...prev].map((value, i) =>
                    i === ShowCommentObject.index ? !value : value
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
