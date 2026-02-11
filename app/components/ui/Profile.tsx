"use client";

import TruncateText from "./TruncateText";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface ProfileDisplayer {
  classname?: string;
  tooltipDirectionEmail?: string;
  displayUserInfo?: boolean;
  userdata?: [string, string];
  OwnLoader?: boolean;
  route?: {
    Userprofile?: boolean;
    DifferentUserProfile?: boolean;
    IdFromDifUser?: string;
  };
}

const Profile = ({
  classname,
  tooltipDirectionEmail,
  displayUserInfo,
  userdata,
  OwnLoader,
  route,
}: ProfileDisplayer) => {
  {
    /* own loader to use in comments or replys for example */
  }
  const loader =
    OwnLoader === undefined
      ? useSelector((state: RootState) => state.loader.loaded)
      : OwnLoader;

  const router = useRouter();

  const displayer = () => {
    if (!userdata) {
      const user = useSelector((state: RootState) => state.user);
      return [
        user.name?.charAt(0),
        !user.name || user.name.length <= 0 ? "your_name" : user.name,
        user.username?.length <= 0 ? "your_username" : user.username,
      ];
    } else return [userdata.at(0)?.charAt(0), ...userdata];
  };

  return (
    <div
      className={!loader ? `${classname} max-w-32 sm:max-w-48` : `${classname}`}
      onClick={() => route?.Userprofile && router.push("/settings")}
    >
      <div className="avatar avatar-placeholder">
        <div
          className={`bg-gray-400 text-neutral-content w-6 sm:w-12 rounded-full ${
            !loader && "animate-pulse"
          }`}
        >
          <span className={!loader ? "hidden" : ""}>{displayer()?.at(0)}</span>
        </div>
      </div>

      {displayUserInfo && (
        <div className="min-w-0 flex-1">
          <TruncateText
            maxLength={15}
            text={displayer()?.at(1) ?? "your_name"}
            widthToShowFull={600}
            className={
              !loader
                ? "bg-gray-600 text-gray-600 dark:text-gray-600 animate-pulse rounded"
                : "font-bold text-xs break-words text-black dark:text-white"
            }
          />
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
                "bg-gray-600 text-gray-600 animate-pulse rounded mt-2 px-1"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
