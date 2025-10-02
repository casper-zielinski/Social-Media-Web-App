"use client";

import { auth } from "@/firebase";
import { loadingFinished } from "@/redux/slices/loadingSlice";
import {
  loggedInasGuest,
  logIn,
  logOut,
  received,
} from "@/redux/slices/loginSlice";
import { signInUser, signOutUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "motion/react";
import { Root } from "postcss";
import React, { useEffect, useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const UserSettings = () => {
  const dispatch: AppDispatch = useDispatch();
  const [toasterHandler, setToasterHandler] = useState(false);

  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const user = useSelector((state: RootState) => state.user);
  const loading = useSelector((state: RootState) => state.loader);
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isUserDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        dispatch(received());
        dispatch(loadingFinished());
        return;
      }
      if (currentUser.email === "guest123@gmail.com") {
        dispatch(loggedInasGuest());
      }
      dispatch(
        signInUser({
          name: currentUser.displayName,
          username: currentUser.email?.split("@")[0].split(".")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
      dispatch(logIn());
      dispatch(received());
      dispatch(loadingFinished());
      setUserDataLoaded(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isUserDataLoaded && logedIn) {
      setname(user.name || "");
      setUsername(user.username || "");
    }
  }, [isUserDataLoaded, logedIn, user.name, user.username, user.email]);

  async function handleSignOut() {
    await signOut(auth);

    setToasterHandler(true);
    setTimeout(() => setToasterHandler(false), 3000);

    dispatch(logOut());
    dispatch(signOutUser());
  }

  return (
    <>
      <div className="flex flex-row space-x-2 items-center">
        <RxAvatar className="w-10 h-10 text-blue-600" />
        <h3 className="text-lg font-bold text-black dark:text-white">
          Profile
        </h3>
      </div>
      <div className="flex flex-row flex-wrap items-center space-y-3 flex-grow px-1">
        <div className="flex space-x-2 mr-auto">
          <div>
            <div className="avatar avatar-placeholder">
              <div className="bg-gray-400 text-neutral-content w-8 sm:w-12 rounded-full">
                <MdOutlineAddAPhoto className="w-4 sm:w-6 h-4 sm:h-6" />
              </div>
            </div>
          </div>
          <div>
            <p className="font-bold text-xs sm:text-base text-black dark:text-white">
              Profile Picture
            </p>
            <p className="text-gray-500 text-xs sm:text-base pr-5">
              Uploud a Profile Picture
            </p>
          </div>
        </div>
        <div>
          <button className="btn btn-neutral btn-sm sm:btn-md">change</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
            Username
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 rounded-lg border transition-colors ${
              loading.loading && logedIn.loggedIn
                ? "animate-pulse bg-gray-500"
                : ""
            } dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500`}
            value={logedIn.loggedIn ? username : "your_username"}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Display Name
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 rounded-lg border transition-colors ${
              loading.loading && logedIn.loggedIn
                ? "animate-pulse bg-gray-500"
                : ""
            } dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500`}
            value={logedIn.loggedIn ? name : "your_name"}
            onChange={(event) => setname(event.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <textarea
          rows={3}
          placeholder="Tell us about yourself..."
          className="w-full px-3 py-2 rounded-lg border transition-colors bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500"
        />
      </div>

      <button className="btn btn-info" onClick={() => handleSignOut()}>
        Log Out
      </button>
      <div className="toast toast-center">
        {!logedIn && (
          <motion.div
            className="alert alert-soft w-48 mb-32"
            initial={{ translateY: 0 }}
            animate={{ translateY: toasterHandler ? 0 : 100 }}
          >
            <span>Logged Out</span>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default UserSettings;
