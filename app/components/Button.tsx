"use client";

import { auth } from "@/firebase";
import { logOut } from "@/redux/slices/loginSlice";
import { signOutUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";

interface ButtonProps {
  classname: string;
  text?: string;
  children?: React.ReactNode;
}

const Button = ({ classname, text, children }: ButtonProps) => {
  const dispatch: AppDispatch = useDispatch();

  async function handleSignOut() {
    await signOut(auth);
    dispatch(logOut());
    dispatch(signOutUser());
  }

  return (
    <button className={classname} onClick={() => handleSignOut()}>
      {text ? text : children}
    </button>
  );
};

export default Button;
