"use client";

import { auth } from "@/lib/firebase";
import { loadingFinished } from "@/redux/slices/loadingSlice";
import { received, loggedInasGuest, logIn } from "@/redux/slices/loginSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch: AppDispatch = useDispatch();
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
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
