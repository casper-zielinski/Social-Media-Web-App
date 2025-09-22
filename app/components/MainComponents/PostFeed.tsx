"use client";

import React, { useEffect, useState } from "react";
import Profile from "../Profile";
import FollowButton from "../MainComponents/FollowButton";
import MainButtons from "../MainComponents/MainButtons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import Moment from "react-moment";
import CommentModal from "./CommentModal";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadingFinished } from "@/redux/slices/loadingSlice";

const PostFeed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [showComments, setShowComments] = useState<boolean[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const loaded = useSelector((state: RootState) => state.loader.loaded);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    const unsubsribe = onSnapshot(q, (posts) => {
      const { docs } = posts;
      setPosts(docs);
      setShowComments(
        docs.map(() => {
          return false;
        })
      );
    });
    dispatch(loadingFinished());
    return unsubsribe;
  }, []);

  interface Comment {
    name: string;
    text: string;
    username: string;
  }

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
                userdata={[post.data().name, post.data().username]}
                Posttext={post.data().text}
                Id={post.id}
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
              <p className="m-2 break-words">{post.data().text}</p>
              <p className="m-2 text-end text-xs text-gray-500">
                {post.data().timeStamp && (
                  <Moment fromNow date={post.data().timeStamp.toDate()} />
                )}
              </p>
              <div className="divider"></div>

              <MainButtons
                commentId={post.id}
                ShowCommentArray={[showComments, setShowComments, index]}
              />

              {showComments.at(index) &&
                (post.data().comments <= 0 ? (
                  <div className="flex flex-grow p-2 text-gray-400">
                    {" "}
                    No Comments
                  </div>
                ) : (
                  <div className="flex flex-grow flex-col space-y-6 p-2 text-black dark:text-white mb-7">
                    {post
                      .data()
                      .comments.map((comment: Comment, index: number) => (
                        <article key={index} className="space-y-3">
                          <Profile
                            userdata={[comment.name, comment.username]}
                            displayUserInfo={true}
                            classname="flex flex-row space-x-2 sm:space-x-3 items-center min-w-0 flex-shrink"
                            tooltipDirectionEmail="tooltip-right"
                          />
                          <p>{comment.text}</p>
                          {!(post.data().comments.length - 1 === index) && (
                            <div className="divider w-full"></div>
                          )}
                        </article>
                      ))}
                  </div>
                ))}
            </article>
          ))
        : Array.from({ length: 4 }, (_, index) => (
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
                  <FollowButton />
                </div>
              </div>
              <div className="flex-col p-3">
                <div className="m-2 break-words animate-pulse ml-auto bg-gray-500 text-gray-500 p-2 w-11/12"></div>
                <div className="m-2 text-end text-xs ml-auto animate-pulse bg-gray-500 text-gray-500 p-2 w-1/6"></div>
              </div>
              <div className="divider"></div>

              <MainButtons
                commentId={""}
                ShowCommentArray={[showComments, setShowComments, index]}
              />
            </article>
          ))}
    </>
  );
};

export default PostFeed;
