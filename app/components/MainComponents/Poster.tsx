"use client";

import React, { useState } from "react";
import Profile from "../Profile";
import { MdEmojiEmotions, MdGif, MdLocalPostOffice } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { db } from "@/firebase";
import { RootState } from "@/redux/store";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

{
  /* Component to send Post's */
}
const Poster = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);

  async function sendPost() {
    try {
      await addDoc(collection(db, "posts"), {
        text: text,
        name: user.name,
        username: user.username,
        useremail: user.email,
        timeStamp: serverTimestamp(),
        likes: [],
        comments: [],
      });

      setText("");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className=" border-b-2 border-blue-400 dark:border-blue-950 p-4 space-y-10">
      <div className="flex items-start space-x-4">
        <Profile classname="mt-2" />
        <textarea
          placeholder="Whats happening..."
          className="textarea textarea-ghost w-full"
          name="Post-Main"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="flex justify-start items-center space-x-4 relative">
        <AiFillPicture className="w-4 h-4 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <MdGif className="w-4 h-4 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <MdEmojiEmotions className="w-4 h-4 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <GiPositionMarker className="w-4 h-4 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <button
          className={`btn btn-info ${
            text.length < 1 ? "btn-disabled" : "btn-soft"
          } btn-sm absolute right-0 sm:w-24`}
          onClick={() => {
            loggedIn
              ? sendPost()
              : (
                  document.getElementById(
                    "LoginOrSignUpModal"
                  ) as HTMLDialogElement
                ).show();
          }}
        >
          <MdLocalPostOffice className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Poster;
