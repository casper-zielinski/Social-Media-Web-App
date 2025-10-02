import { auth } from "@/firebase";
import { loggedInasGuest, received } from "@/redux/slices/loginSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
  async function handleGuestLogin() {
    await signInWithEmailAndPassword(
      auth,
      "guest123@gmail.com",
      "MeinPasswort1!"
    );
    if (modalToClose)
      (document.getElementById(closingModal) as HTMLDialogElement).close();

    dispatch(loggedInasGuest());
    dispatch(received());
    console.log("klicked")
  }

  return (
    <button className={`btn ${classname}`} onClick={() => handleGuestLogin()}>
      Login as Guest
    </button>
  );
};

export default LogInAsGuestButton;
