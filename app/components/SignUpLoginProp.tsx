"use client";

import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import LogInAsGuestButton from "./PopUpModals/LogInAsGuestButton";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const SignUpLoginProp = () => {

  return (
    <>
      <div className="grid grid-cols-12 p-4 md:p-3 lg:p-2 gap-4">
        <div className="col-span-12 sm:col-span-6 flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 text-start">
          <p className="font-bold text-cyan-200">
            Don't miss out on Chating with your Brain
          </p>
          <p>People on ChatAI are the first to know</p>
        </div>
        <div className="col-span-12 sm:col-span-6 flex space-x-4 sm:justify-end">
          <button
            className="btn btn-soft btn-info btn-sm sm:btn-md"
            onClick={() =>
              (
                document.getElementById("LoginDialog") as HTMLDialogElement
              )?.showModal()
            }
          >
            Log In
          </button>
          <button
            className="btn btn-info btn-sm sm:btn-md"
            onClick={() =>
              (
                document.getElementById("SignUpDialog") as HTMLDialogElement
              )?.showModal()
            }
          >
            Sign Up
          </button>
          <LogInAsGuestButton
            classname="btn-sm sm:btn-md btn-accent"
            closingModal=""
            modalToClose={false}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpLoginProp;
