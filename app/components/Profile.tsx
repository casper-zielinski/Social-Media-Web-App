"use client";

import React from "react";
import TruncateText from "./TruncateText";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ProfileDisplayer {
      classname: string;
}

const Profile = ({classname} : ProfileDisplayer) => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className={classname}>
      <div
        className="tooltip tooltip-right lg:tooltip-top tooltip-info"
        data-tip={"Avatar"}
      >
        <div className="avatar avatar-placeholder">
          <div className="bg-gray-400 text-neutral-content w-6 sm:w-12 rounded-full">
            <span>D</span>
          </div>
        </div>
      </div>
      <div
        className="tooltip tooltip-right tooltip-info"
        data-tip={user.email.length <= 0 ? "email" : user.email}
      >
        <div>
          <p className="font-bold text-xs">
            {user.name.length <= 0 ? "name" : user.name}
          </p>
          <TruncateText
            maxLength={15}
            text={user.email.length <= 0 ? "email" : user.email}
            widthToShowFull={600}
            className="text-gray-500 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
