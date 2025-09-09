"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";

const FollowButton = () => {
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  return (
    <button
      className="btn btn-info col-span-8"
      onClick={() =>
        logedIn
          ? ""
          : (
              document.getElementById("LoginOrSignUpModal") as HTMLDialogElement
            )?.showModal()
      }
    >
      <IoMdPersonAdd className="w-4 h-4" />
    </button>
  );
};

export default FollowButton;
