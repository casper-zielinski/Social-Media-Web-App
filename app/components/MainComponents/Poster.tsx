"use client";

import React, { useState } from "react";
import Profile from "../ui/Profile";
import { MdEmojiEmotions, MdGif, MdLocalPostOffice } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useModal } from "@/app/hooks/useModal";
import { MODAL_IDS } from "@/app/constants/modal";
import { sendPost } from "@/lib/post";
import customToast from "@/lib/toast";

{
  /* Component to send Post's */
}
const Poster = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);

  async function handlePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    loggedIn.loggedIn && !loggedIn.asGuest
      ? sendPost(text, user, setText, setError, false)
      : useModal(MODAL_IDS.LOGIN_OR_SIGNUP);
    if (!error) {
      customToast.success("Your thoughts are now live!");
    }
  }

  return (
    <form
      className=" border-b-2 border-blue-400 dark:border-blue-950 p-4 space-y-10"
      onSubmit={(e) => handlePost(e)}
    >
      <div className="flex items-start space-x-4">
        <Profile classname="mt-2" />
        <textarea
          placeholder="Whats happening..."
          className="p-2 min-h-16 max-h-[30vh] lg:max-h-[50vh] focus:ring-1 dark:bg-gray-800 focus:shadow w-full text-black dark:text-white rounded"
          name="Post-Main"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
          minLength={1}
        />
      </div>
      <div className="flex justify-start items-center space-x-4 relative">
        <AiFillPicture className="w-4 h-4 text-black dark:text-white hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <MdGif className="w-4 h-4 text-black dark:text-white hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <MdEmojiEmotions className="w-4 h-4 text-black dark:text-white hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <GiPositionMarker className="w-4 h-4 text-black dark:text-white hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
        <button
          className={`btn ${
            text.length === 0 ? "border-2 border-error" : "btn-info"
          } btn-sm absolute right-0 sm:w-24`}
          type="submit"
          disabled={text.length === 0}
        >
          <MdLocalPostOffice className="w-4 h-4 text-black dark:text-white" />
        </button>
      </div>
    </form>
  );
};

export default Poster;
