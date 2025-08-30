import React from "react";
import {
  FaCreativeCommonsSamplingPlus,
  FaSearch,
  FaBrain,
} from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { MdHome, MdNotificationsActive } from "react-icons/md";
import SignUpOrLoginProp from "../components/SignUpLoginProp";

interface FooterProps {
  loggedIn: boolean;
}

/* The Footer Interface for Smart Phones or, if User not Logged In, Shows Login or Sign Up Prop*/

const Footer = ({ loggedIn }: FooterProps) => {
  return (
    <footer
      className={`${
        loggedIn ? "" : "bg-blue-500"
      } absolute bottom-0 footer footer-horizontal z-10 footer-center border-t-2 border-blue-950 col-span-full text-base-content`}
    >
      {loggedIn ? (
        <div className="flex m-5  space-x-5 col-span-1 sm:hidden">
          {/**
           * Opens the post creation modal dialog for mobile users.
           * @button
           */}
          <button
            className="btn btn-circle btn-info absolute left-0 rounded-cir m-3"
            onClick={() =>
              loggedIn
                ? (
                    document.getElementById("PostModal") as HTMLDialogElement
                  )?.showModal()
                : (
                    document.getElementById(
                      "LoginOrSignUpModal"
                    ) as HTMLDialogElement
                  )?.showModal()
            }
          >
            <FaCreativeCommonsSamplingPlus className="w-11 h-11" />
          </button>

          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Home Page"
          >
            <MdHome className="w-6 h-6" />
          </div>

          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Search"
          >
            <FaSearch className="w-5 h-5" />
          </div>

          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Notifications"
          >
            <MdNotificationsActive className="w-5 h-5" />
          </div>
          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Messages"
          >
            <LuMessageSquare className="w-5 h-5" />
          </div>
          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="AI Chatbot"
          >
            <FaBrain className="w-5 h-5" />
          </div>
        </div>
      ) : (
        <SignUpOrLoginProp />
      )}
    </footer>
  );
};

export default Footer;
