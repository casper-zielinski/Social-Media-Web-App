"use client";

import React, {  } from "react";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { MdGif, MdEmojiEmotions } from "react-icons/md";
import LoginModal from "./PopUpModals/LoginModal";
import SignUpModal from "./PopUpModals/SignUpModal";

/* All the Pop Up Modules,
  Login, Sign Up, Login Or Sign Up (Choose Modal) and Post Modal, 
  to send a Post */

const PopUpModals = () => {
  {
    /* A Password Shower, to check Password, and email as well as Password Variables that are used in the Sign Up, which are then being sent to the BaaS Firebase */
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
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
            <div className="divider">OR</div>
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
      <dialog
        id="PostModal"
        className="modal modal-middle pb-96"
        data-theme="dark"
      >
        <div className="modal-box w-10/12">
          <form method="dialog" name="Closing Post Modal">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="grid grid-cols-12 justify-center items-baseline">
            <div className="avatar avatar-placeholder m-4 col-span-3">
              <div className="bg-gray-400 text-neutral-content w-12 rounded-full">
                <span>D</span>
              </div>
            </div>
            <textarea
              placeholder="Type here"
              className="textarea textarea-ghost col-span-9"
              name="Post-Desktop"
            />
            <div className="divider col-span-12"></div>
            <div className="col-span-10 flex justify-evenly">
              <AiFillPicture className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
              <MdGif className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
              <MdEmojiEmotions className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
              <GiPositionMarker className="w-6 h-6 hover:scale-105 transition-transform hover:shadow-sm hover:text-sky-500" />
            </div>
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
    </>
  );
};

export default PopUpModals;
