"use client";

import { UserReduxState } from "@/app/interfaces/User";
import { followUser } from "@/lib/follow";
import { RootState } from "@/redux/store";
import { IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";

export interface FollowActionParameters {
  currentuser: UserReduxState;
  toFollowUserId: string;
}

interface FollowButtonProps {
  disabled?: boolean;
  classNameAdditon?: string;
  followActionParameters?: FollowActionParameters;
}

const FollowButton = ({
  disabled,
  classNameAdditon,
  followActionParameters,
}: FollowButtonProps) => {
  const logedIn = useSelector((state: RootState) => state.loggingIn.loggedIn);
  return (
    <button
      className={`btn btn-info ${classNameAdditon ? classNameAdditon : ""} col-span-8 ${disabled ? "btn-disabled " : ""}`}
      onClick={() =>
        logedIn.loggedIn
          ? followActionParameters
            ? followUser(
                followActionParameters.currentuser,
                followActionParameters.toFollowUserId,
              )
            : ""
          : (
              document.getElementById("LoginOrSignUpModal") as HTMLDialogElement
            )?.showModal()
      }
    >
      <IoMdPersonAdd className="w-4 h-4" />
    </button>
  );
};

export default FollowButton;
