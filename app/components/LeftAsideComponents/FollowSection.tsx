"use server";

import { User } from "@/app/interfaces/User";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import FollowSectionBluePrint from "./FollowSectionBluePrint";
import { db } from "@/lib/firebase";
import { COLLECTION_PATH } from "@/app/constants/path";

const FollowSection = async () => {
  const userDocs = await getDocs(collection(db, COLLECTION_PATH.USERS));
  const users: User[] = userDocs.docs.map((user) => {
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

  return (
    <>
      {users.map((user, index) => (
        <FollowSectionBluePrint key={index} user={user} />
      ))}
    </>
  );
};

export default FollowSection;
