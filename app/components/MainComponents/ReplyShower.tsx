import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { subscribeToReplies } from "@/lib/get";
import React, { useEffect, useState } from "react";
import Profile from "../ui/Profile";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import FollowButton from "./FollowButton";
import { motion } from "motion/react";
import Moment from "react-moment";
import CommentModal from "../PopUpModals/CommentModal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { IoMdArrowDropright } from "react-icons/io";
import { commentModal, useModal } from "@/app/hooks/useModal";
import { MODAL_IDS } from "@/app/constants/modal";
import { toggleLikeOnReply } from "@/lib/like";

interface ReplyShowerProps {
  PostId: string;
  CommentId: string;
}

const ReplyShower = ({ CommentId, PostId }: ReplyShowerProps) => {
  const [replies, setReplies] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [loading, setLoading] = useState(false);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const user = useSelector((state: RootState) => state.user);

  // Gets all the Replies of Firestore DB
  useEffect(() => {
    const unsubscribe = subscribeToReplies(
      PostId,
      CommentId,
      setReplies,
      setLoading
    );

    return unsubscribe;
  }, [PostId, CommentId]);

  async function LikeOrDislike(ReplyId: string, Likes: string[]) {
    const isLiked = Likes.includes(user.email);
    await toggleLikeOnReply(PostId, CommentId, ReplyId, user.email, isLiked);
  }

  if (replies.length === 0 && loading) {
    return <div className="m-2 text-gray-500">No Replys</div>;
  }

  return loading ? (
    <div className="flex flex-grow flex-col space-y-6 p-3 text-black dark:text-white mb-2">
      {replies.map((reply, index) => (
        <article key={reply.id} className="space-y-3">
          <CommentModal
            key={commentModal(reply.id)}
            PostId={PostId}
            Posttext={reply.data().text}
            userdata={{
              name: reply.data().name,
              username: reply.data().username,
            }}
            Reply={true}
            commentId={CommentId}
            replyId={reply.id}
          />
          <div
            className={`divider w-full ${
              0 === index ? "divider-primary" : "divider-info"
            }`}
          ></div>
          <div className="flex items-center sm:space-x-2 md:space-x-4 lg:space-x-6">
            <Profile
              userdata={[reply.data().name, reply.data().username]}
              displayUserInfo={true}
              classname="flex flex-row space-x-1 sm:space-x-2 items-center min-w-0 flex-shrink"
            />
            <IoMdArrowDropright className="sm:w-5 sm:h-5 md:w-7 md:h-7" />
            <Profile
              userdata={[
                reply.data().replyTo.userName,
                reply.data().replyTo.userUsername,
              ]}
              displayUserInfo={true}
              classname="flex flex-row space-x-1 sm:space-x-2 items-center min-w-0 flex-shrink"
            />
          </div>
          <p>{reply.data().text}</p>
          <p className=" text-end text-xs text-gray-500">
            {reply.data().timeStamp && (
              <Moment fromNow date={reply.data().timeStamp.toDate()} />
            )}
          </p>
          <div className="flex space-x-4 flex-grow justify-end mt-2 items-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.2, rotate: -10 }}
              className="flex space-x-1 items-center cursor-pointer"
              onClick={() => {
                logedIn.loggedIn && !logedIn.asGuest
                  ? LikeOrDislike(reply.id, reply.data().likes)
                  : useModal(MODAL_IDS.LOGIN_OR_SIGNUP);
              }}
            >
              <span>{reply.data().likes.length}</span>
              <AiFillLike
                className={`h-5 w-5 ${
                  reply.data().likes.includes(user.email) && "text-blue-600"
                }`}
              />
            </motion.div>
            <motion.div className="cursor-pointer" whileHover={{ scale: 1.2 }}>
              <FaCommentAlt
                onClick={() => {
                  logedIn.loggedIn && !logedIn.asGuest
                    ? useModal(commentModal(reply.id))
                    : useModal(MODAL_IDS.LOGIN_OR_SIGNUP);
                }}
              />
            </motion.div>
          </div>
        </article>
      ))}
    </div>
  ) : (
    // Skeleton Loader for Replys
    <article
      className={` border-blue-400 dark:border-blue-950 overflow-hidden mb-5 hover:bg-slate-100 dark:hover:bg-gray-900 p-2`}
    >
      <div className="divider w-full "></div>
      <div className="flex items-center w-full">
        <div className="m-2 flex-1 min-w-0">
          <Profile
            classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
            displayUserInfo={true}
            userdata={["-", "----"]}
            OwnLoader={loading}
          />
        </div>
        <div className="flex flex-shrink-0 justify-end ml-auto mr-2 mt-3">
          <FollowButton
            disabled={loading}
            classNameAdditon={" btn-sm scale-75 "}
          />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2 p-3">
        <div className="col-span-7 animate-pulse bg-gray-500 p-2 "></div>
        <div className="col-span-3 animate-pulse bg-gray-500 p-2 "></div>
        <div className="col-span-2 animate-pulse bg-gray-500 p-2 "></div>
        <div className="col-span-8 animate-pulse bg-gray-500 p-2 "></div>
        <div className="col-span-8 p-2 "></div>
        <div className="mt-3 col-span-2 animate-pulse bg-gray-500 p-2"></div>
      </div>
      <div className="flex space-x-4 flex-grow justify-end mt-2 me-5 items-center">
        <div>
          <AiFillLike className={`h-5 w-5`} />
        </div>
        <div>
          <FaCommentAlt />
        </div>
      </div>
    </article>
  );
};

export default ReplyShower;
