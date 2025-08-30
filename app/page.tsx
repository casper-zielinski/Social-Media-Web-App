"use client";

import Main from "./components/Main";
import PopUpModals from "./components/PopUpModals";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import RightAside from "./components/RightAside";
import LeftAside from "./components/LeftAside";
import Footer from "./components/Footer";

{
  /**
   * Home page component for the social media app.
   *
   * Layout:
   * - Left sidebar (desktop): Navigation, post button, user avatar.
   * - Main section: Displays either "For you" or "Following" feed, controlled by navigationPagerForYou state.
   * - Right sidebar (desktop): Search input and premium subscription prompt.
   * - Footer (mobile): Navigation and post button.
   *
   * @component
   */
}

export default function Home() {
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);

  return (
    <>
      {/* Modals for Login & Posting */}
      <PopUpModals />

      {/* 
      Right Side Bar with Buttons for Navigation like Home, Search, AI-Tools etc. 
      both visible on Mobile and on Desktop, but without Text on Mobile (only Button Icons)
      */}
      <RightAside loggedIn={loggedIn} />

      {/* Main content section displaying the feed based on navigationPagerForYou state */}
      <Main logedIn={loggedIn} />

      {/* Left Side Bar, only for bigger Phones and bigger, search bar and Subscribtion Tab*/}
      <LeftAside loggedIn={loggedIn} />

      {/* The Footer Interface for Smart Phones or, if User not Logged In, Shows Login or Sign Up Prop*/}
      <Footer loggedIn={loggedIn} />
    </>
  );
}
