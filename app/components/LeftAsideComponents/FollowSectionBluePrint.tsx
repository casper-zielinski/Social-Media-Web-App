"use client";

import Image from "next/image";
import TruncateText from "../ui/TruncateText";
import FollowButton from "../MainComponents/FollowButton";
import { User } from "@/app/interfaces/User";
import { useEffect, useState } from "react";

const FollowSectionBluePrint = ({ user }: { user?: User }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-wrap min-w-0 items-center justify-start">
      <div className={`avatar ${!user ? "avatar-placeholder" : ""} mr-3`}>
        <div className="w-10 rounded-full">
          {user ? (
            <Image
              height={100}
              width={100}
              alt={user.name}
              src={
                "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
              }
              className="object-fill"
            />
          ) : (
            <span className="bg-gray-500 animate-pulse w-full h-10 text-xs"></span>
          )}
        </div>
      </div>
      <div className="text-xs text-start lg:text-base min-w-0 mr-3">
        {user && mounted ? (
          <>
            <TruncateText
              maxLength={10}
              text={user.name}
              className="font-bold break-words whitespace-normal text-black dark:text-white"
              widthToShowFull={1200 + 100 * (user.name.length - 10)}
            />
            <TruncateText
              maxLength={10}
              text={user.username}
              className="text-gray-500 break-words whitespace-normal"
              widthToShowFull={1200 + 100 * (user.username.length - 10)}
            />
          </>
        ) : (
          <>
            <div className="w-32 h-5 bg-gray-500 mb-2 animate-pulse" />
            <div className="w-32 h-3 bg-gray-400 animate-pulse mb-3" />
          </>
        )}
      </div>
      <FollowButton classNameAdditon="btn-sm ml-auto" />
    </div>
  );
};

export default FollowSectionBluePrint;
