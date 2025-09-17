import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { MdGif, MdEmojiEmotions, MdLocalPostOffice } from "react-icons/md";
import Profile from "../Profile";

interface CommentModalProps {
  userdata: [string, string];
  Posttext: string;
  Id: string;
}

const CommentModal = ({ userdata, Posttext, Id }: CommentModalProps) => {
  const [text, setText] = useState("");
  return (
    <dialog
      id={`CommentModal${Id}`}
      className="modal modal-middle"
      data-theme="dark"
    >
      <div className="modal-box w-10/12">
        <form method="dialog" name="Closing Post Modal">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <span className="text-white">✕</span>
          </button>
        </form>
        <div className="flex items-baseline min-w-0">
          <div className="flex flex-col items-center">
            <Profile classname="mt-2" userdata={userdata} />
            <div className="w-0.5 min-h-16 h-auto bg-gray-500 m-0" />
            <Profile />
          </div>
          <div className="flex-col space-y-3 sm:space-y-5 flex-grow">
            <div className="ml-2 flex space-x-4 items-center">
              <p className="text-sm font-bold text-white">{userdata[0]}</p>
              <p className="text-xs text-gray-500">{userdata[1]}</p>
            </div>
            <div className="ml-4">
              <p className="text-white text-xs mb-1">{Posttext} </p>
              <p className="text-gray-400 text-xs">
                <span className="text-gray-500">Replying to</span> {userdata[1]}
              </p>
            </div>
            <div className="px-3">
              <textarea
                placeholder="Whats happening..."
                className="textarea textarea-ghost w-full"
                name="Post-Main"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="flex justify-start items-center space-x-4 relative">
          <AiFillPicture className="w-6 h-6 hover:scale-105  transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <MdGif className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <MdEmojiEmotions className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <GiPositionMarker className="w-6 h-6 hover:scale-105 transition-transform text-white hover:shadow-sm hover:text-sky-500" />
          <button
            className={`btn btn-info ${
              text.length < 1 ? "btn-disabled" : "btn-soft"
            } btn-sm absolute right-0 sm:w-24`}
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
      {/*  Toast animation, has to be implemeted*/}
      <div className="toast toast-center hidden">
        <div className="alert alert-error w-[200px] sm:w-[320px]">
          <span>Error sending Post</span>
        </div>
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      </div>
    </dialog>
  );
};

export default CommentModal;
