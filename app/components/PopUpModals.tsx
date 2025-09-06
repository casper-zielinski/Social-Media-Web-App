"use client";

import React, { useEffect, useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { MdGif, MdEmojiEmotions } from "react-icons/md";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser, signOutUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/loginSlice";

const PopUpModals = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp(email: string, password: string) {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      dispatch(
        signInUser({
          name: "",
          username: "",
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
      dispatch(logIn());
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {/* Login Dialog */}
      <dialog id="LoginDialog" className="modal" data-theme="dark">
        <div className="modal-box w-4/5 sm:w-3/5 max-w-md">
          <form method="dialog" name="Close Login Dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <fieldset className="fieldset rounded-box w-xs flex flex-col items-center">
            <legend className="fieldset-legend mb-5 text-base md:text-lg">
              Login
            </legend>

            <label className="label">Email</label>
            <input
              className="input validator w-11/12 md:w-9/12"
              type="email"
              required
              placeholder="mail@site.com"
            />
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            <label className="label">Password</label>
            <div className="join w-11/12 md:w-9/12">
              <input
                type={showPassword ? "text" : "password"}
                className="input validator join-item"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
              <button
                className="btn btn-info btn-outline rounded-e"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>

            <button className="btn btn-info mt-4">Login</button>
            <div className="w-1/2">
              <div className="divider">OR</div>
            </div>
            <button
              className="btn btn-info btn-soft mt-4"
              onClick={() => {
                (
                  document.getElementById("LoginDialog") as HTMLDialogElement
                ).close();
                (
                  document.getElementById("SignUpDialog") as HTMLDialogElement
                ).show();
              }}
            >
              Sign Up
            </button>
          </fieldset>
        </div>
        <form
          method="dialog"
          className="modal-backdrop cursor-none"
          name="Close Login Dialog From Background"
        >
          <button>close</button>
        </form>
      </dialog>

      {/* Sign Up Dialog*/}
      <dialog
        id="SignUpDialog"
        className="modal modal-middle pt-5"
        data-theme="dark"
      >
        <div className="modal-box">
          <form method="dialog" name="Close Sign Up Dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <fieldset className="fieldset rounded-box w-xs flex flex-col items-center">
            <legend className="fieldset-legend mb-5 text-base md:text-lg">
              Sign Up
            </legend>

            <label className="label">Name</label>
            <input
              type="text"
              className="input w-11/12 md:w-9/12"
              placeholder="Name"
            />

            <label className="label">Email</label>
            <input
              className="input validator w-11/12 md:w-9/12"
              type="email"
              required
              placeholder="mail@site.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            <label className="label">Password</label>
            <div className="join w-11/12 md:w-9/12">
              <input
                type={showPassword ? "text" : "password"}
                className="input validator join-item"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="btn btn-info btn-outline rounded-e"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>

            <button
              className="btn btn-info mt-4"
              onClick={() => handleSignUp(email, password)}
            >
              Sign Up
            </button>
            <div className="w-1/2">
              <div className="divider">OR</div>
            </div>
            <button
              className="btn btn-info btn-soft mt-4"
              onClick={() => {
                (
                  document.getElementById("SignUpDialog") as HTMLDialogElement
                ).close();
                (
                  document.getElementById("LoginDialog") as HTMLDialogElement
                ).show();
              }}
            >
              Log in
            </button>
          </fieldset>
        </div>
        <form
          method="dialog"
          className="modal-backdrop cursor-none"
          name="Close Sign Up Dialog from Background"
        >
          <button>close</button>
        </form>
      </dialog>

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
