"use client";

import React, { useEffect, useState } from "react";
import Profile from "../Profile";
import FollowButton from "../MainComponents/FollowButton";
import MainButtons from "../MainComponents/MainButtons";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { subscribeToPostsFeed } from "@/lib/get";
import Moment from "react-moment";
import CommentModal from "../PopUpModals/CommentModal";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadingFinished } from "@/redux/slices/loadingSlice";
import CommentShower from "./CommentShower";
import TruncateText from "../TruncateText";

const PostFeed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [showComments, setShowComments] = useState<boolean[]>([]);
  const [hideFullText, setHideFullText] = useState<boolean[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const loaded = useSelector((state: RootState) => state.loader.loaded);
  const user = useSelector((state: RootState) => state.user);

  //Gets all the Posts from the Firestore DB
  useEffect(() => {
    const unsubsribe = subscribeToPostsFeed(
      setPosts,
      setShowComments,
      setHideFullText
    );
    dispatch(loadingFinished());

    return unsubsribe;
  }, []);

  return (
    <>
      {loaded
        ? posts.map((post, index) => (
            <article
              className={`${
                posts.length === index + 1 ? "mb-16 sm:mb-0" : "border-b-2"
              } border-blue-400 dark:border-blue-950 overflow-hidden hover:bg-slate-100 dark:hover:bg-gray-900`}
              key={post.id}
            >
              <CommentModal
                userdata={{
                  name: post.data().name,
                  username: post.data().username,
                }}
                Posttext={post.data().text}
                PostId={post.id}
              />
              <div className="flex items-center w-full">
                <div className="m-2 flex-1 min-w-0">
                  <Profile
                    classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
                    tooltipDirectionEmail="tooltip-bottom"
                    displayUserInfo={true}
                    userdata={[post.data().name, post.data().username]}
                  />
                </div>
                <div className="flex flex-shrink-0 justify-end ml-auto mr-2 mt-3">
                  <FollowButton />
                </div>
              </div>
              {post.data().text.length > 500 && hideFullText[index] ? (
                <TruncateText
                  maxLength={500}
                  text={post.data().text}
                  widthToShowFull={Infinity}
                  className="m-2 break-words text-black dark:text-white"
                />
              ) : (
                <p className="m-2 break-words text-black dark:text-white">
                  {post.data().text}
                </p>
              )}

              {post.data().text.length > 500 && (
                <button
                  className="p-2 "
                  onClick={() =>
                    setHideFullText((prev) =>
                      [...prev].map((p, i) => (i === index ? !p : p))
                    )
                  }
                >
                  {hideFullText[index] ? (
                    <span className="text-sm text-gray-600 hover:text-gray-500">
                      Show Full Text
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600 hover:text-gray-500">
                      Hide Text
                    </span>
                  )}
                </button>
              )}

              <p className="m-2 text-end text-xs text-gray-500">
                {post.data().timeStamp && (
                  <Moment fromNow date={post.data().timeStamp.toDate()} />
                )}
              </p>
              <div className="divider"></div>

              <MainButtons
                commentId={post.id}
                ShowCommentObject={{
                  showComments: showComments,
                  setShowComments: setShowComments,
                  index: index,
                  commentamout: post.data().NumberOfComments,
                }}
                Likes={post.data().likes}
                isLiked={post.data().likes.includes(user.email)}
              />

              {showComments[index] && (
                <CommentShower post={post} postId={post.id} />
              )}
            </article>
          ))
        : //Skeleton Loader for Posts
          Array.from({ length: 4 }, (_, index) => (
            <article
              className={`${
                posts.length === index + 1 ? "mb-16 sm:mb-0" : "border-b-2"
              } border-blue-400 dark:border-blue-950 overflow-hidden hover:bg-slate-100 dark:hover:bg-gray-900`}
              key={index}
            >
              <div className="flex items-center w-full">
                <div className="m-2 flex-1 min-w-0">
                  <Profile
                    classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
                    displayUserInfo={true}
                    userdata={["-", "----"]}
                  />
                </div>
                <div className="flex flex-shrink-0 justify-end ml-auto mr-2 mt-3">
                  <FollowButton disabled={!loaded} />
                </div>
              </div>
              <div className="grid grid-cols-10 gap-2 p-3">
                <div className="col-span-7 animate-pulse bg-gray-500 p-2 "></div>
                <div className="col-span-3 animate-pulse bg-gray-500 p-2 "></div>
                <div className="col-span-4 animate-pulse bg-gray-500 p-2 "></div>
                <div className="col-span-6 animate-pulse bg-gray-500 p-2 "></div>
                <div className="col-span-2 animate-pulse bg-gray-500 p-2 "></div>
                <div className="col-span-4 animate-pulse bg-gray-500 p-2 "></div>
                <div className="col-span-4 animate-pulse bg-gray-500 p-2 "></div>
                <div className="col-span-8 p-2 "></div>
                <div className="mt-3 col-span-2 animate-pulse bg-gray-500 p-2"></div>
              </div>
              <div className="divider"></div>

              <MainButtons
                commentId={""}
                ShowCommentObject={{
                  showComments: [],
                  setShowComments: setShowComments,
                  index: index,
                  commentamout: null,
                }}
              />
            </article>
          ))}
    </>
  );
};

export default PostFeed;
