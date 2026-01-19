"use client";

import { auth } from "@/lib/firebase";
import { loadingFinished } from "@/redux/slices/loadingSlice";
import { received, loggedInasGuest, logIn } from "@/redux/slices/loginSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import customToast from "@/lib/toast";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [showonce, setShowonce] = useState(true);
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        dispatch(received());
        dispatch(loadingFinished());
        if (showonce) {
          customToast.info(
            "Welcome to ChatAI - Login, Sign Up or start as a Guest to experience ChatAI"
          );
          setShowonce(false);
        }

        return;
      }
      if (currentUser.email === "guest123@gmail.com") {
        dispatch(loggedInasGuest());
        if (showonce) {
          customToast.info("Welcome back Guest!");
          setShowonce(false);
        }
      } else if (showonce) {
        customToast.info(`Welcome back ${currentUser.displayName}`);
        setShowonce(false);
      }
      console.log(currentUser);

      dispatch(
        signInUser({
          name: currentUser.displayName,
          username:
            currentUser.email?.split(".")[0] ||
            currentUser.email?.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
      dispatch(logIn());
      dispatch(received());
      dispatch(loadingFinished());
    });

    return unsubscribe;
  }, [logedIn]);

  return <>{children}</>;
};

export default AuthProvider;
