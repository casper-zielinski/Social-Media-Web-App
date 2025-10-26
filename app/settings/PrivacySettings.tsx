"use client";

import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineShield } from "react-icons/md";
import { useSelector } from "react-redux";

const PrivacySettings = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [disableEmail, setdisableEmail] = useState(true);
  const [disablePassword, setdisablePassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const user = useSelector((state: RootState) => state.user);
  const loading = useSelector((state: RootState) => state.loader);
  const changeButton = user.email.trim() !== email.trim();
  const notAllowedChange = !logedIn.loggedIn || logedIn.asGuest;

  useEffect(() => {
    if (logedIn.loggedIn) {
      setemail(user.email || "your_email");
    } else {
      setemail("your_email");
    }
  }, [logedIn.loggedIn, user.email]);

  return (
    <>
      <div className="flex flex-row space-x-2 items-center">
        <MdOutlineShield className="w-10 h-10 text-green-600" />
        <h3 className="text-lg font-bold text-black dark:text-white">
          Account & Security
        </h3>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div className="flex items-baseline flex-grow flex-wrap space-y-2">
          <input
            id="emailSetter"
            type="text"
            className={`w-full px-3 py-2 text-xs md:text-base rounded-lg border transition-colors ${
              loading.loading
                ? "animate-pulse dakr:animate-pulse bg-gray-500 dark:bg-gray-500"
                : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } ${
              disableEmail
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-default"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500`}
            value={email}
            onChange={(event) => setemail(event.target.value)}
            disabled={disableEmail || notAllowedChange}
          />
          <button
            className={`btn ${
              disableEmail ? "btn-neutral" : "btn-success"
            } btn-neutral btn-xs`}
            onClick={() => {
              setdisableEmail((prev) => !prev);
              if (disableEmail) document.getElementById("emailSetter")?.focus();
            }}
            disabled={notAllowedChange}
          >
            Change
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="flex items-baseline flex-grow flex-wrap space-y-2">
          <div className="w-full join">
            <input
              id="passwordSetter"
              type={showPassword ? "text" : "password"}
              className={`w-full join-item text-xs md:text-base  px-2 py-1 rounded-lg border transition-colors ${
                loading.loading
                  ? "animate-pulse dakr:animate-pulse bg-gray-500 dark:bg-gray-500"
                  : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              } ${
                disablePassword
                  ? "text-gray-400 cursor-not-allowed"
                  : "cursor-default"
              } dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-500 bg-white border-gray-300 text-gray-900 focus:border-blue-500`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={disablePassword}
            />
            <button
              className={`btn ${
                showPassword ? "btn-accent" : "btn-error"
              }  py-3 px-3 join-item`}
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={notAllowedChange}
            >
              <FaEye />
            </button>
          </div>
          <button
            className={`btn ${
              disablePassword ? "btn-neutral" : "btn-success"
            } btn-neutral btn-xs`}
            onClick={() => {
              setdisablePassword((prev) => !prev);
              setShowPassword(disablePassword);
              if (disableEmail)
                document.getElementById("passwordSetter")?.focus();
            }}
            disabled={notAllowedChange}
          >
            Change
          </button>
        </div>
      </div>
      {changeButton && !notAllowedChange && (
        <div className="flex gap-4 justify-evenly md:flex-col md:justify-center md:w-1/2 translate-x-[50%]">
          <button className="btn btn-success"> Change </button>
          <button className="btn btn-info" onClick={() => setemail(user.email)}>
            Revert
          </button>
        </div>
      )}
    </>
  );
};

export default PrivacySettings;
