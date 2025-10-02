"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";

interface FollowButtonProps {
  disabled?: boolean;
  classNameAdditon?: string;
}

const FollowButton = ({ disabled, classNameAdditon }: FollowButtonProps) => {
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  return (
    <button
      className={`btn btn-info ${classNameAdditon ? classNameAdditon : ""} col-span-8 ${disabled ? "btn-disabled " : ""}`}
      onClick={() =>
        logedIn.loggedIn
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
