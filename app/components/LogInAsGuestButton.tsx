"use client";

import { closeModal, useModal } from "@/app/hooks/useModal";
import { handleGuestLogin } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { loggedInasGuest, received } from "@/redux/slices/loginSlice";
import { AppDispatch } from "@/redux/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";

interface GuestLoginButton {
  classname?: string;
  closingModal: string;
  modalToClose: boolean;
}

const LogInAsGuestButton = ({
  classname,
  closingModal,
  modalToClose,
}: GuestLoginButton) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <button
      className={`btn ${classname}`}
      onClick={() =>
        handleGuestLogin(modalToClose, closingModal, dispatch)
      }
    >
      Login as Guest
    </button>
  );
};

export default LogInAsGuestButton;
