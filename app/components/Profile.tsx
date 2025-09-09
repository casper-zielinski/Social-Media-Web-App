"use client";

import React from "react";
import TruncateText from "./TruncateText";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ProfileDisplayer {
  classname: string;
  tooltipDirectionAvatar: string;
  tooltipDirectionEmail: string;
}

const Profile = ({
  classname,
  tooltipDirectionAvatar,
  tooltipDirectionEmail,
}: ProfileDisplayer) => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className={classname}>
      <div
        className={`tooltip ${tooltipDirectionAvatar} tooltip-info flex-shrink-0`}
        data-tip={"Avatar"}
      >
        <div className="avatar avatar-placeholder">
          <div className="bg-gray-400 text-neutral-content w-6 sm:w-12 rounded-full">
            <span>D</span>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-bold text-xs truncate">
          {user.name.length <= 0 ? "name" : user.name}
        </p>
        <div
          className={`tooltip ${tooltipDirectionEmail} tooltip-info min-w-0 flex-1 max-w-full`}
          data-tip={user.email.length <= 0 ? "email" : user.email}
        >
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
