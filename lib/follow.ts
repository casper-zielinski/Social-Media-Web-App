import { UserReduxState } from "@/app/interfaces/User";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

    if (
      userFollowingDocs.filter(
        (val) => val.data().email === followerDoc.data()?.email,
      ).length > 0
    ) {
      customToast.info("Already following this person");
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
    const { docs: existingPosts } = await getDocs(
      query(
        collection(db, COLLECTION_PATH.POSTS),
        where("userFromUserTableId", "==", toFollowUserId),
      ),
    );
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
