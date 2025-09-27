"use client";

import { auth } from "@/firebase";
import { logOut } from "@/redux/slices/loginSlice";
import { signOutUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import { motion } from "motion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ButtonProps {
  classname: string;
  text?: string;
  children?: React.ReactNode;
}

const Button = ({ classname, text, children }: ButtonProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [toasterHandler, setToasterHandler] = useState(false);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);

  async function handleSignOut() {
    await signOut(auth);

    setToasterHandler(true);
    setTimeout(() => setToasterHandler(false), 3000);

    dispatch(logOut());
    dispatch(signOutUser());
  }

  return (
    <>
      <button className={classname} onClick={() => handleSignOut()}>
        {text ? text : children}
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

export default Button;
