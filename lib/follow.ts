import { UserReduxState } from "@/app/interfaces/User";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
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

    //finding out if the user already follows this person
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
  } catch (error) {
    console.error(error);
    customToast.error("Following Failed");
  }
};
