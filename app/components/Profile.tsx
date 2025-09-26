"use client";

import React from "react";
import TruncateText from "./TruncateText";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ProfileDisplayer {
  classname?: string;
  tooltipDirectionEmail?: string;
  displayUserInfo?: boolean;
  userdata?: [string, string];
  OwnLoader?: boolean;
}

const Profile = ({
  classname,
  tooltipDirectionEmail,
  displayUserInfo,
  userdata,
  OwnLoader,
}: ProfileDisplayer) => {
  {
    /* own loader to use in comments or replys for example */
  }
  const loader =
    OwnLoader === undefined
      ? useSelector((state: RootState) => state.loader.loaded)
      : OwnLoader;

  const displayer = () => {
    if (!userdata) {
      const user = useSelector((state: RootState) => state.user);
      return [
        user.name?.charAt(0),
        !user.name || user.name.length <= 0 ? "name" : user.name,
        user.username?.length <= 0 ? "username" : user.username,
      ];
    } else return [userdata.at(0)?.charAt(0), ...userdata];
  };

  return (
    <div
      className={!loader ? `${classname} max-w-32 sm:max-w-48` : `${classname}`}
    >
      <div className="avatar avatar-placeholder">
        <div
          className={`bg-gray-400 text-neutral-content w-6 sm:w-12 rounded-full ${
            !loader && "animate-pulse text-gray-400"
          }`}
        >
          <span className={!loader ? "hidden" : ""}>{displayer()?.at(0)}</span>
        </div>
      </div>

      {displayUserInfo && (
        <div className="min-w-0 flex-1">
          <p
            className={`font-bold text-xs ${
              !loader && "bg-gray-600 text-gray-600 animate-pulse rounded"
            }`}
          >
            {displayer()?.at(1)}
          </p>
          <div
            className={` ${
              tooltipDirectionEmail && "tooltip tooltip-info"
            } ${tooltipDirectionEmail} min-w-0 flex-1 max-w-full`}
            data-tip={displayer()?.at(2)}
          >
            <TruncateText
              maxLength={15}
              text={displayer()?.at(2) ?? "username"}
              widthToShowFull={600}
              className={`text-gray-500 text-xs ${
                !loader &&
                "bg-gray-600 text-gray-600 animate-pulse rounded mt-2"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
