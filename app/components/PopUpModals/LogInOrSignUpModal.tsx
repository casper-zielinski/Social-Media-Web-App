import { RootState } from "@/redux/store";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import { FaComments, FaShare, FaBrain } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { TbUsersPlus } from "react-icons/tb";
import { useSelector } from "react-redux";
{
  /* Login or Sign Up Dialog */
}

const LogInOrSignUpModal = () => {
  const loggedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);

  const features = [
    { icon: <IoMdHeart className="w-5 h-5" />, text: "Like posts" },
    { icon: <FaComments className="w-5 h-5" />, text: "Write comments" },
    { icon: <FaShare className="w-5 h-5" />, text: "Repost content" },
    { icon: <CiBookmark className="w-5 h-5" />, text: "Save favorites" },
    { icon: <TbUsersPlus className="w-5 h-5" />, text: "Follow users" },
    { icon: <FaBrain className="w-5 h-5" />, text: "Use AI features" },
  ];
  return (
    <dialog id="LoginOrSignUpModal" className="modal" data-theme="dark">
      <div className="modal-box w-3/5 max-w-md">
        <form method="dialog" name="Login or Sign Up Dialog Closer">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
            ✕
          </button>
        </form>
        <div className="flex flex-col justify-center items-center p-4">
          {loggedIn.asGuest && (
            <>
              <div>
                <p className="font-bold text-lg text-white">
                  Join the conversation
                </p>
                <p className="font-semibold text-gray-300 my-3 text-center sm:text-start">
                  You're browsing as a guest. Sign up to unlock all features!
                </p>
              </div>
              <div className="px-6 pb-6 hidden sm:block">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Create an account to:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 col-span-2 md:col-span-1 text-gray-300"
                      >
                        <div className="text-blue-400">{feature.icon}</div>
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-center">
            <button
              className="btn btn-info w-full"
              onClick={() => {
                (
                  document.getElementById(
                    "LoginOrSignUpModal"
                  ) as HTMLDialogElement
                ).close();
                (
                  document.getElementById("SignUpDialog") as HTMLDialogElement
                ).show();
              }}
            >
              Sign Up
            </button>
          </div>
          <div className="divider text-white">OR</div>
          <div className="flex justify-center">
            <button
              className="btn btn-soft btn-info w-full"
              onClick={() => {
                (
                  document.getElementById(
                    "LoginOrSignUpModal"
                  ) as HTMLDialogElement
                ).close();
                (
                  document.getElementById("LoginDialog") as HTMLDialogElement
                ).show();
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop cursor-none"
        name="Login or Sign Up Dialog Closer from Backgound"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default LogInOrSignUpModal;
