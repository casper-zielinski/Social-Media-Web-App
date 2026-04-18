import { UserReduxState } from "@/app/interfaces/User";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTION_PATH } from "@/app/constants/path";
import customToast from "./toast";

export const followUser = async (
  user: UserReduxState,
  toFollowUserId: string,
) => {
  try {
    const followerDoc = await getDoc(
      doc(db, COLLECTION_PATH.USERS, toFollowUserId),
    );
    const userDoc = await getDoc(
      doc(db, COLLECTION_PATH.USERS, user.userTableId),
    );

    const { docs: userFollowingDocs } = await getDocs(
      collection(
        db,
        COLLECTION_PATH.USERS,
        user.userTableId,
        COLLECTION_PATH.FOLLOWING,
      ),
    );

    const { docs: existingPosts } = await getDocs(
      query(
        collection(db, COLLECTION_PATH.POSTS),
        where("userFromUserTableId", "==", toFollowUserId),
      ),
    );

    const alreadyFollowing =
      userFollowingDocs.filter(
        (val) => val.data().email === followerDoc.data()?.email,
      ).length > 0;
    if (alreadyFollowing) {
      //unfollow
      const followingPostFeed = await getDocs(
        query(
          collection(
            db,
            COLLECTION_PATH.USERS,
            user.userTableId,
            COLLECTION_PATH.FOLLOWINGPOSTFEED,
          ),
          where("userFromUserTableId", "==", toFollowUserId),
        ),
      );

      await Promise.all(
        followingPostFeed.docs.map((doc) => deleteDoc(doc.ref)),
      );

      const followerDocs = await getDocs(
        query(
          collection(
            db,
            COLLECTION_PATH.USERS,
            toFollowUserId,
            COLLECTION_PATH.FOLLOWERS,
          ),
          where("userTableId", "==", user.userTableId),
        ),
      );
      followerDocs.forEach((doc) => deleteDoc(doc.ref));

      const followingDocs = userFollowingDocs.filter(
        (data) => data.data().userTableId === toFollowUserId,
      );

      followingDocs.forEach((doc) => deleteDoc(doc.ref));

      customToast.success("Unfollowed!");
      return;
    }

    await addDoc(
      collection(
        db,
        COLLECTION_PATH.USERS,
        toFollowUserId,
        COLLECTION_PATH.FOLLOWERS,
      ),
      { ...userDoc.data(), userTableId: user.userTableId },
    );
    await addDoc(
      collection(
        db,
        COLLECTION_PATH.USERS,
        user.userTableId,
        COLLECTION_PATH.FOLLOWING,
      ),
      { ...followerDoc.data(), userTableId: toFollowUserId },
    );

    // Add all existing posts of the followed user to the current user's followingPostFeed
    await Promise.all(
      existingPosts.map((postDoc) =>
        addDoc(
          collection(
            db,
            COLLECTION_PATH.USERS,
            user.userTableId,
            COLLECTION_PATH.FOLLOWINGPOSTFEED,
          ),
          { ...postDoc.data(), originalPostId: postDoc.id },
        ),
      ),
    );

    customToast.success("Following!");
  } catch (error) {
    console.error(error);
    customToast.error("Following Failed");
  }
};
