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

const PostFeed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [showComments, setShowComments] = useState<boolean[]>([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    const unsubsribe = onSnapshot(q, (posts) => {
      const { docs } = posts;
      setPosts(docs);
      setShowComments(
        docs.map((value) => {
          return false;
        })
      );
      console.log(docs.at(0)?.data);
    });

    return unsubsribe;
  }, []);

  interface Comment {
    name: string;
    text: string;
    username: string;
  }

  return (
    <>
      {posts.map((post, index) => (
        <article
          className={`${
            posts.length === index + 1 ? "mb-16 sm:mb-0" : "border-b-2"
          } border-blue-400 dark:border-blue-950 overflow-hidden hover:bg-gray-900`}
          key={post.id}
          onClick={() => {
            setShowComments((prev) =>
              [...prev].map((value, i) => (i === index ? !value : false))
            );
            console.log(showComments);
          }}
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
          <div className="flex justify-evenly items-baseline mb-5">
            <MainButtons commentId={post.id} />
          </div>
          {showComments.at(index) && (
            <div>
              {post.data().comments.map((value: Comment) => value.text)}
            </div>
          )}
        </article>
      ))}
    </>
  );
};

export default PostFeed;
