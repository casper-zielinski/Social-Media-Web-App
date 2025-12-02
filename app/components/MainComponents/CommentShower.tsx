import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import CommentModal from "../PopUpModals/CommentModal";
import Profile from "../ui/Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { subscribeToComments } from "@/lib/get";
import Moment from "react-moment";
import FollowButton from "./FollowButton";
import { IoIosArrowDropdown } from "react-icons/io";
import ReplyShower from "./ReplyShower";
import { commentModal, useModal } from "@/app/hooks/useModal";
import { MODAL_IDS } from "@/app/constants/modal";
import { toggleLikeOnComment } from "@/lib/like";

interface CommentShowerProps {
  post: QueryDocumentSnapshot<DocumentData, DocumentData>;
  postId: string;
}

const CommentShower = ({ post, postId }: CommentShowerProps) => {
  const [comments, setcomments] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [replys, showReplyArray] = useState<boolean[]>([]);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const user = useSelector((state: RootState) => state.user);

  //Gets all the Comments of Firestore DB
  useEffect(() => {
    const unsubscribe = subscribeToComments(
      postId,
      setcomments,
      showReplyArray,
      setLoading
    );

    return unsubscribe;
  }, [postId]);

  async function LikeorDislike(CommentId: string, Likes: string[]) {
    const isLiked = Likes.includes(user.email);
    await toggleLikeOnComment(postId, CommentId, user.email, isLiked);
  }

  if (comments.length === 0 && loading) {
    return <div className="m-2 text-gray-500">No Comments</div>;
  }

  //Shows all Comments of the Post
  return loading ? (
    <section className="flex flex-grow flex-col space-y-6 p-2 text-black dark:text-white mb-2">
      {comments.map((comment, index) => (
        <article key={comment.id} className={`space-y-3 px-1.5`}>
          <CommentModal
            key={commentModal(comment.id)}
            PostId={postId}
            commentId={comment.id}
            Posttext={comment.data().text}
            userdata={{
              name: comment.data().name,
              username: comment.data().username,
            }}
            Reply={true}
          />
          <div
            className={`divider w-full ${
              index === 0
                ? "divider-primary dark:divider-primary"
                : "divider-neutral dark:divider-info"
            } `}
          ></div>
          <div className="flex">
            <Profile
              userdata={[comment.data().name, comment.data().username]}
              displayUserInfo={true}
              classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
              tooltipDirectionEmail="tooltip-right"
            />
            <div className="ml-auto">
              <FollowButton />
            </div>
          </div>
          <p>{comment.data().text}</p>
          <p className=" text-end text-xs text-gray-500">
            {post.data().timeStamp && (
              <Moment fromNow date={post.data().timeStamp.toDate()} />
            )}
          </p>
          <div className="flex space-x-4 flex-grow justify-end mt-2 items-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.2 }}
              className="flex space-x-1 items-center cursor-pointer"
              onClick={() => {
                logedIn.loggedIn && !logedIn.asGuest
                  ? LikeorDislike(comment.id, comment.data().likes)
                  : useModal(MODAL_IDS.LOGIN_OR_SIGNUP);
              }}
            >
              <span>{comment.data().likes.length}</span>
              <motion.div whileTap={{ rotate: -10, translateY: -4.2 }}>
                <AiFillLike
                  className={`h-5 w-5 ${
                    comment.data().likes.includes(user.email) && "text-blue-600"
                  }`}
                />
              </motion.div>
            </motion.div>
            <motion.div className="cursor-pointer" whileHover={{ scale: 1.2 }}>
              <FaCommentAlt
                onClick={() => {
                  logedIn.loggedIn && !logedIn.asGuest
                    ? useModal(commentModal(comment.id))
                    : useModal(MODAL_IDS.LOGIN_OR_SIGNUP);
                }}
              />
            </motion.div>
            <div className="flex justify-center my-6 space-x-2 items-center">
              <motion.p
                className="text-xs hover:text-blue-600 cursor-pointer"
                onClick={() =>
                  showReplyArray((prev) =>
                    [...prev].map((value, i) => (index === i ? !value : value))
                  )
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.2 }}
              >
                {replys[index] ? "Hide Replyies" : "Show Replyies"}
              </motion.p>
              <div className="indicator">
                <span className="indicator-item scale-75 indicator-end badge badge-info font-bold">
                  {comment.data().NumberOfReplys || 0}
                </span>
                <motion.div
                  initial={{ textShadow: 0 }}
                  whileHover={{ scale: 1.2, textShadow: 100 }}
                  animate={{ rotate: replys[index] ? 180 : 0 }}
                >
                  <IoIosArrowDropdown
                    className="w-5 h-5 text-black dark:text-white hover:text-blue-600 cursor-pointer"
                    onClick={() => {
                      showReplyArray((prev) =>
                        [...prev].map((value, i) =>
                          index === i ? !value : value
                        )
                      );
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          {replys[index] && (
            <ReplyShower CommentId={comment.id} PostId={postId} />
          )}
        </article>
      ))}
    </section>
  ) : (
    // skeleton loader for all the posts
    <article
      className={` border-blue-400 dark:border-blue-950 overflow-hidden mb-5 hover:bg-slate-100 dark:hover:bg-gray-900`}
    >
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
          <FollowButton disabled={loading} />
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
        <div className="flex justify-center my-6 space-x-2 items-center">
          <p className="text-xs hover:text-blue-600 cursor-pointer">
            Show Replyies
          </p>
          <div className="indicator">
            <span className="indicator-item scale-75 indicator-end badge badge-info font-bold">
              0
            </span>
            <div>
              <IoIosArrowDropdown className="w-5 h-5 text-black dark:text-white hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommentShower;
