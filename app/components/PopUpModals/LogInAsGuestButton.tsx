import { useModal } from "@/app/hooks/useModal";
import { auth } from "@/firebase";
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
  async function handleGuestLogin() {
    await signInWithEmailAndPassword(
      auth,
      "guest123@gmail.com",
      "MeinPasswort1!"
    );
    if (modalToClose) useModal(closingModal);

    dispatch(loggedInasGuest());
    dispatch(received());
    console.log("klicked");
  }

  return (
    <button className={`btn ${classname}`} onClick={() => handleGuestLogin()}>
      Login as Guest
    </button>
  );
};

export default LogInAsGuestButton;
