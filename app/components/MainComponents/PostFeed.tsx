"use client";

import React, { useEffect, useState } from "react";
import Profile from "../Profile";
import FollowButton from "../MainComponents/FollowButton";
import MainButtons from "../MainComponents/MainButtons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import Moment from "react-moment";

const PostFeed = () => {
  const [post, setPost] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    const unsubsribe = onSnapshot(q, (posts) => {
      const { docs } = posts;
      setPost(docs);
      console.log(docs.at(0)?.data);
    });

    return unsubsribe;
  }, []);

  const posttext = "Hello World";
  return (
    <>
      {post.map((post) => (
        <article
          className="border-b-2 border-blue-950 overflow-hidden"
          key={post.id}
        >
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
            <MainButtons />
          </div>
        </article>
      ))}
    </>
  );
};

export default PostFeed;
