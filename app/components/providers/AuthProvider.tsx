"use client";

import { auth, db } from "@/lib/firebase";
import { loadingFinished } from "@/redux/slices/loadingSlice";
import { received, loggedInasGuest, logIn } from "@/redux/slices/loginSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import customToast from "@/lib/toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { COLLECTION_PATH } from "@/app/constants/path";
import { UserReduxState } from "@/app/interfaces/User";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [showonce, setShowonce] = useState(true);
  const logedIn = useSelector(
    (state: RootState) => state.loggingIn.loggedIn.loggedIn,
  );

  useEffect(() => {
    const AuthorizeUser = async () => {
      try {
        onAuthStateChanged(auth, async (currentUser) => {
          if (!currentUser || !currentUser.displayName || !currentUser.email) {
            dispatch(received());
            dispatch(loadingFinished());
            if (showonce) {
              customToast.info(
                "Welcome to ChatAI - Login, Sign Up or start as a Guest to experience ChatAI",
              );
              setShowonce(false);
            }

            return;
          }

          let userTableId = "Guest";
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

          const userFromUserTable = await getDocs(
            query(
              collection(db, COLLECTION_PATH.USERS),
              where("email", "==", currentUser.email),
            ),
          );

          userTableId = userFromUserTable?.docs[0]?.id || "Guest";

          dispatch(
            signInUser({
              name: currentUser.displayName,
              username:
                currentUser.email?.split(".")[0] ||
                currentUser.email?.split("@")[0],
              email: currentUser.email,
              uid: currentUser.uid,
              userTableId: userTableId,
            } satisfies UserReduxState),
          );
          dispatch(logIn());
          dispatch(received());
          dispatch(loadingFinished());
        });
      } catch (error) {
        console.error(error);
        customToast.error(
          "Authentication Failed - try again or try logging in",
        );
      }
    };

    AuthorizeUser();
  }, [logedIn]);

  return <>{children}</>;
};

export default AuthProvider;
