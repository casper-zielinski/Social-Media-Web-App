"use client";

import { FaSearch, FaBrain } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { MdHome, MdNotificationsActive, MdPostAdd } from "react-icons/md";
import SignUpOrLoginProp from "../ui/SignUpLoginProp";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/hooks/useModal";
import { MODAL_IDS } from "@/app/constants/modal";

/* The Footer Interface for Smart Phones or, if User not Logged In, Shows Login or Sign Up Prop*/

const Footer = () => {
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  const router = useRouter();

  return (
    <footer
      className={`${
        loggedIn.loggedIn ? "bg-white dark:bg-gray-950" : "bg-blue-500"
      } fixed bottom-0 mt-20 footer footer-horizontal z-10 footer-center border-t-2 border-blue-400 dark:border-blue-950 sm:border-0 col-span-12 text-base-content`}
    >
      {loggedIn.loggedIn ? (
        <div className="flex m-5 space-x-5 sm:hidden">
          {/**
           * Opens the post creation modal dialog for mobile users.
           * @button
           */}
          <button
            className="btn btn-circle btn-info absolute left-0 rounded-cir m-3"
            onClick={() =>
              loggedIn.loggedIn && !loggedIn.asGuest
                ? useModal(MODAL_IDS.POST)
                : useModal(MODAL_IDS.LOGIN_OR_SIGNUP)
            }
          >
            <MdPostAdd className="w-6 h-6 text-black" />
          </button>

          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Home Page"
          >
            <MdHome
              className="w-6 h-6 text-info dark:text-white"
              onClick={() => router.push("/")}
            />
          </div>

          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Search"
          >
            <FaSearch className="w-5 h-5 text-info dark:text-white" />
          </div>

          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Notifications"
          >
            <MdNotificationsActive className="w-5 h-5 text-info dark:text-white" />
          </div>
          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="Messages"
          >
            <LuMessageSquare className="w-5 h-5 text-info dark:text-white" />
          </div>
          <div
            className="tooltip tooltip-info flex flex-col items-center"
            data-tip="AI Chatbot"
          >
            <FaBrain className="w-5 h-5 text-info dark:text-white" />
          </div>
        </div>
      ) : (
        !loggedIn.pending && <SignUpOrLoginProp />
      )}
    </footer>
  );
};

export default Footer;
