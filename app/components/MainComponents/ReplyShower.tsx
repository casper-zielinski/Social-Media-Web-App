import { db } from "@/firebase";
import {
  arrayUnion,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  doc as Doc,
  arrayRemove,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Profile from "../Profile";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import FollowButton from "./FollowButton";
import { motion } from "motion/react";
import Moment from "react-moment";
import CommentModal from "../PopUpModals/CommentModal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { IoMdArrowDropright } from "react-icons/io";

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

  useEffect(() => {
    if (PostId === undefined || CommentId === undefined) return;

    console.log("use effect started");
    const q = query(
      collection(db, "posts", PostId, "comments", CommentId, "replys"),
      orderBy("timeStamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (replies) => {
      const { docs } = replies;
      setReplies(docs);
      setLoading(true);
    });

    return unsubscribe;
  }, []);

  async function LikeOrDislike(ReplyId: string, Likes: string[]) {
    if (!Likes.includes(user.email)) {
      await updateDoc(
        Doc(db, "posts", PostId, "comments", CommentId, "replys", ReplyId),
        {
          likes: arrayUnion(user.email),
        }
      );
    } else {
      await updateDoc(
        Doc(db, "posts", PostId, "comments", CommentId, "replys", ReplyId),
        {
          likes: arrayRemove(user.email),
        }
      );
    }
  }

  if (!loading)
    return (
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

  return (
    <div className="flex flex-grow flex-col space-y-6 p-3 text-black dark:text-white mb-2">
      {replies.map((reply, index) => (
        <article key={reply.id} className="space-y-3">
          <div
            className={`divider w-full ${0 === index && "divider-primary"}`}
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
              className="flex space-x-1 items-center"
            >
              <span>{reply.data().likes.length}</span>
              <AiFillLike
                className={`h-5 w-5 ${
                  reply.data().likes.includes(user.email) && "text-blue-600"
                }`}
                onClick={() => {
                  LikeOrDislike(reply.id, reply.data().likes);
                }}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaCommentAlt
                onClick={() => {
                  logedIn
                    ? (
                        document.getElementById(
                          `CommentModal${reply.id}`
                        ) as HTMLDialogElement
                      )?.showModal()
                    : (
                        document.getElementById(
                          "LoginOrSignUpModal"
                        ) as HTMLDialogElement
                      )?.showModal();
                }}
              />
            </motion.div>
            <CommentModal
              Id={reply.id}
              Posttext={reply.data().text}
              userdata={[reply.data().name, reply.data().username]}
              Reply={true}
              postIdforReply={PostId}
              commentId={CommentId}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

export default ReplyShower;
function doc(
  arg0: string,
  PostId: string,
  arg2: string,
  CommentId: string,
  arg4: string,
  ReplyId: string
): import("@firebase/firestore").DocumentReference<unknown, DocumentData> {
  throw new Error("Function not implemented.");
}
