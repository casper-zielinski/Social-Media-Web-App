"use client";

import { MODAL_IDS } from "@/app/constants/modal";
import { useModal } from "@/app/hooks/useModal";
import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { MdGif, MdEmojiEmotions, MdLocalPostOffice } from "react-icons/md";
import Profile from "../Profile";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { sendPost } from "@/lib/auth";

{
  /* Post Modal for creating and sending Posts*/
}
const PostModal = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const loggedIn = useSelector(
    (state: RootState) => state.loggingIn.loggedIn.loggedIn
  );

  return (
    <dialog id="PostModal" className="modal modal-middle" data-theme="dark">
      <div className="modal-box w-10/12">
        <form method="dialog" name="Closing Post Modal">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
            ✕
          </button>
        </form>
        <div className="flex items-start space-x-4 mt-5">
          <Profile classname="mt-2" />
          <textarea
            placeholder="Whats happening..."
            className="textarea textarea-ghost w-full"
            name="Post-Main"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className="divider col-span-12"></div>
        <div className="flex justify-start items-center space-x-4 relative">
          <AiFillPicture className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <MdGif className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <MdEmojiEmotions className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <GiPositionMarker className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <button
            className={`btn btn-info ${
              text.length < 1 ? "btn-disabled" : "btn-soft"
            } btn-sm absolute right-0 sm:w-24`}
            onClick={() => {
              loggedIn
                ? sendPost(text, user, setText, setError, true)
                : useModal(MODAL_IDS.LOGIN_OR_SIGNUP, MODAL_IDS.POST);
            }}
          >
            <MdLocalPostOffice className="w-4 h-4" />
          </button>
        </div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop cursor-none"
        name="Closing Post Modal from Backgound"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default PostModal;
