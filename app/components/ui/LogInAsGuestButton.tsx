"use client";

import { handleGuestLogin } from "@/lib/auth";
import { AppDispatch } from "@/redux/store";
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
