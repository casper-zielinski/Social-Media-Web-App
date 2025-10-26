import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { MdGif, MdEmojiEmotions, MdLocalPostOffice } from "react-icons/md";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import Profile from "../Profile";
import { db } from "@/lib/firebase";
import { RootState } from "@/redux/store";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useModal } from "@/app/hooks/useModal";
import { MODAL_IDS } from "@/app/constants/modal";
import LogInOrSignUpModal from "./LogInOrSignUpModal";
import PostModal from "./PostModal";

/* All the Pop Up Modules,
  Login, Sign Up, Login Or Sign Up (Choose Modal) and Post Modal, 
  to send a Post */

const PopUpModals = () => {
  
  return (
    <>
      {/* Login Dialog */}
      <LoginModal />

      {/* Sign Up Dialog*/}
      <SignUpModal />

      {/* Login or Sign Up Dialog */}
      <LogInOrSignUpModal />

      {/* Post Modal for creating and sending Posts*/}
      <PostModal />
    </>
  );
};

export default PopUpModals;
