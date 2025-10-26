"use client";

import { handleSignOut } from "@/lib/auth";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const UserSettings = () => {
  const dispatch: AppDispatch = useDispatch();

  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const user = useSelector((state: RootState) => state.user);
  const loading = useSelector((state: RootState) => state.loader);
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const change =
    user?.name?.trim() != name.trim() ||
    user?.username?.trim() != username.trim();

  useEffect(() => {
    if (logedIn) {
      setname(user.name || "");
      setUsername(user.username || "");
    }
  }, [logedIn, user.name, user.username, user.email]);

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
        {change && (
          <div className="flex gap-2">
            <button
              className={`btn  ${
                !change
                  ? "btn-neutral [&:disabled]:bg-black [&:disabled]:text-black"
                  : "btn-success"
              } btn-sm sm:btn-md`}
              onClick={() => {
                !change ? console.log("do not change") : console.log("change");
              }}
              disabled={!change}
            >
              change
            </button>
            <button
              className={`btn  ${
                !change
                  ? "btn-neutral [&:disabled]:bg-black [&:disabled]:text-black"
                  : "btn-info"
              } btn-sm sm:btn-md`}
              onClick={() => {
                setname(user.name);
                setUsername(user.username);
                setBio("");
              }}
              disabled={!change}
            >
              revert
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
            Username
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 rounded-lg border transition-colors ${
              loading.loading
                ? "animate-pulse dakr:animate-pulse bg-gray-500 dark:bg-gray-500"
                : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } `}
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
              loading.loading
                ? "animate-pulse dakr:animate-pulse bg-gray-500 dark:bg-gray-500"
                : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } `}
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
          className={`w-full px-3 py-2 rounded-lg border transition-colors ${
            loading.loading
              ? "animate-pulse dakr:animate-pulse bg-gray-500 dark:bg-gray-500"
              : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
          } `}
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </div>

      <button
        className="btn btn-info md:w-1/2 md:translate-x-[50%]"
        onClick={() => handleSignOut(dispatch)}
      >
        Log Out
      </button>
    </>
  );
};

export default UserSettings;
