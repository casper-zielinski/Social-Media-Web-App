"use client";

import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { MdGif, MdEmojiEmotions, MdLocalPostOffice } from "react-icons/md";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import Profile from "../Profile";
import { db } from "@/firebase";
import { RootState } from "@/redux/store";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

/* All the Pop Up Modules,
  Login, Sign Up, Login Or Sign Up (Choose Modal) and Post Modal, 
  to send a Post */

const PopUpModals = () => {
  {
    /* A Password Shower, to check Password, and email as well as Password Variables that are used in the Sign Up, which are then being sent to the BaaS Firebase */
  }
  const [text, setText] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn.loggedIn);

  async function sendPost() {
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      useremail: user.email,
      timeStamp: serverTimestamp(),
      likes: [],
    });

    setText("");
  }

  return (
    <>
      {/* Login Dialog */}
      <LoginModal />

      {/* Sign Up Dialog*/}
      <SignUpModal />

      {/* Login or Sign Up Dialog */}
      <dialog id="LoginOrSignUpModal" className="modal" data-theme="dark">
        <div className="modal-box w-3/5 max-w-md">
          <form method="dialog" name="Login or Sign Up Dialog Closer">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          <div className="grid grid-cols-1 gap-4 justify-center items-center p-4">
            {" "}
            {/* grid-cols-1 */}
            <div className="flex justify-center">
              <button
                className="btn btn-info w-full"
                onClick={() => {
                  (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  ).close();
                  (
                    document.getElementById("SignUpDialog") as HTMLDialogElement
                  ).show();
                }}
              >
                Sign Up
              </button>
            </div>
            <div className="divider text-white">OR</div>
            <div className="flex justify-center">
              <button
                className="btn btn-soft btn-info w-full"
                onClick={() => {
                  (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  ).close();
                  (
                    document.getElementById("LoginDialog") as HTMLDialogElement
                  ).show();
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop cursor-none"
          name="Login or Sign Up Dialog Closer from Backgound"
        >
          <button>close</button>
        </form>
      </dialog>

      {/* Post Modal for creating and sending Posts*/}
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
    </>
  );
};

export default PopUpModals;
