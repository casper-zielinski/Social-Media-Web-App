import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";

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
  async function handleGuestLogin() {
    await signInWithEmailAndPassword(
      auth,
      "guest123@gmail.com",
      "MeinPasswort1!"
    );
    if (modalToClose)
      (document.getElementById(closingModal) as HTMLDialogElement).close();
  }

  return (
    <button className={`btn ${classname}`} onClick={() => handleGuestLogin()}>
      Login as Guest
    </button>
  );
};

export default LogInAsGuestButton;
