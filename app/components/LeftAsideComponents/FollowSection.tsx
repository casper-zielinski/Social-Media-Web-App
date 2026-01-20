"use client";

import Image from "next/image";
import FollowButton from "../MainComponents/FollowButton";
import { useEffect, useState } from "react";
import { User } from "@/app/interfaces/User";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTION_PATH } from "@/app/constants/path";

const FollowSection = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const userDocs = await getDocs(collection(db, COLLECTION_PATH.USERS));
      const userData: User[] = userDocs.docs.map((user) => {
        return {
          UID: user.data().UID,
          email: user.data().email,
          Followers: user.data().Followers,
          Totallikes: user.data().Totallikes,
          name: user.data().name,
          savedPosts: user.data().savedPosts,
          username: user.data().username,
        } satisfies User;
      });

      setUsers(userData);
    };
    getUsers();
  }, []);

  return (
    <>
      {users.map((val, index) => (
        <div
          className="flex flex-wrap min-w-0 items-center justify-start"
          key={index}
        >
          <div className="avatar mr-3">
            <div className="w-10 rounded-full">
              <Image
                height={100}
                width={100}
                alt={val.name}
                src={
                  "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                }
                className="object-fill"
              />
            </div>
          </div>
          <div className="text-xs text-start lg:text-base min-w-0 mr-3">
            <p className="font-bold break-words whitespace-normal text-black dark:text-white">
              {val.name}
            </p>
            <p className="text-gray-500 break-words whitespace-normal">
              {val.username}
            </p>
          </div>
          <FollowButton classNameAdditon="btn-sm ml-auto" />
        </div>
      ))}
    </>
  );
};

export default FollowSection;
