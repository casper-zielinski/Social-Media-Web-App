"use client";

import { User } from "@/app/interfaces/User";
import { collection, getDocs } from "firebase/firestore";
import FollowSectionBluePrint from "./FollowSectionBluePrint";
import { db } from "@/lib/firebase";
import { COLLECTION_PATH } from "@/app/constants/path";
import { useEffect, useState } from "react";

const FollowSection = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getDocs(collection(db, COLLECTION_PATH.USERS)).then((userDocs) => {
      setUsers(
        userDocs.docs.map((user) => ({
          UID: user.data().UID,
          email: user.data().email,
          Totallikes: user.data().Totallikes,
          name: user.data().name,
          savedPosts: user.data().savedPosts,
          username: user.data().username,
        })),
      );
    });
  }, []);

  return (
    <>
      {users.map((user, index) => (
        <FollowSectionBluePrint key={index} user={user} />
      ))}
    </>
  );
};

export default FollowSection;
