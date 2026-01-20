import { MODAL_IDS } from "@/app/constants/modal";
import { closeModal } from "@/app/hooks/useModal";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import customToast from "@/lib/toast";
import { handleFirebaseError } from "./errorHandler";
import { ERROR_AREA_TYPES } from "@/app/constants/errorAreaTypes";
import { CommentDTO, PostDTO, ReplyDTO } from "@/app/interfaces/Post";
import { User, UserReduxState } from "@/app/interfaces/User";
import { COLLECTION_PATH } from "@/app/constants/path";
import { FirebaseError } from "firebase/app";

/**
 * Create a new post in Firestore
 *
 * @param text - Content of the post
 * @param user - User object containing name, username, email, and uid
 * @param setText - State setter to clear the text input after posting
 * @param setError - State setter to handle error states
 * @param usingPostModal - Whether the post is being created from a modal
 * @returns Promise that resolves when the post is created
 */
export async function sendPost(
  text: string,
  user: UserReduxState,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  usingPostModal: boolean,
) {
  if (!text.trim()) {
    customToast.error("Post can't be empty!");
    return;
  }

  if (text.length > 780) {
    customToast.error("Post is too long! Keep it under 780 characters");
    return;
  }

  try {
    const newPost: PostDTO = {
      userId: user.uid,
      text: text,
      name: user.name,
      username: user.username,
      useremail: user.email,
      timeStamp: serverTimestamp(),
      likes: [],
      NumberOfComments: 0,
    };
    await addDoc(collection(db, "posts"), { ...newPost });

    const userDocs = await getDoc(
      doc(db, COLLECTION_PATH.USERS, user.userTableId),
    );

    const userdata = userDocs.data();

    if (!userdata) {
      throw new FirebaseError("no userdata", "Userdata does not exsist");
    }

    const userFollowers = userdata.Followers as string[];

    userFollowers.forEach((follower) => {
      addDoc(
        collection(db, COLLECTION_PATH.USERS, follower, "followingPostFeed"),
        { ...newPost },
      );
    });

    if (usingPostModal) closeModal(MODAL_IDS.POST);
    setError(false);
    setText("");
  } catch (error) {
    console.error(error);
    setError(true);
    handleFirebaseError(error, ERROR_AREA_TYPES.POST);
  }
}

/**
 * Create a new comment on a post OR create a reply to a comment
 * Also increments the parent's comment/reply counter
 *
 * @param postId - ID of the post being commented on
 * @param user - User object containing name, username, email, and uid
 * @param text - Content of the comment or reply
 * @param isReply - Whether this is a reply to a comment (true) or a comment on a post (false)
 * @param commentId - ID of the comment being replied to (required if isReply is true)
 * @param _replyId - ID of the reply being responded to (reserved for future use, currently unused)
 * @param userdata - Object containing name and username of the user being replied to
 * @param postText - Text of the post/comment being replied to
 * @param setError - State setter to handle error states
 * @param getCorrectResponseToID - Function that returns the correct ID for the modal to close
 * @returns Promise that resolves when the comment/reply is created
 *
 * @example
 * // Creating a comment on a post
 * await sendCommentOrReply(postId, user, text, false, undefined, undefined, userdata, postText, setError, getID);
 *
 * // Creating a reply to a comment
 * await sendCommentOrReply(postId, user, text, true, commentId, undefined, userdata, postText, setError, getID);
 */
export async function sendCommentOrReply(
  postId: string,
  user: UserReduxState,
  text: string,
  isReply: boolean,
  commentId: string | undefined,
  _replyId: string | undefined,
  userdata: { name: string; username: string },
  postText: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  getCorrectResponseToID: () => string,
) {
  try {
    if (isReply && commentId) {
      // Create a reply to a comment
      await addDoc(
        collection(db, "posts", postId, "comments", commentId, "replys"),
        {
          userId: user.uid,
          name: user.name,
          username: user.username,
          useremail: user.email,
          text: text,
          timeStamp: serverTimestamp(),
          likes: [],
          replyTo: {
            userId: getCorrectResponseToID(),
            userName: userdata.name,
            userUsername: userdata.username,
            textToReplyTo: postText,
          },
          NumberOfReplys: 0,
        } satisfies ReplyDTO,
      );

      // Increment the reply count on the parent comment
      await updateDoc(doc(db, "posts", postId, "comments", commentId), {
        NumberOfReplys: increment(1),
      });
    } else {
      // Create a comment on a post
      await addDoc(collection(db, "posts", postId, "comments"), {
        userId: user.uid,
        name: user.name,
        username: user.username,
        useremail: user.email,
        text: text,
        timeStamp: serverTimestamp(),
        likes: [],
        NumberOfComments: 0,
      } satisfies CommentDTO);

      // Increment the comment count on the parent post
      await updateDoc(doc(db, "posts", postId), {
        NumberOfComments: increment(1),
      });
    }

    // Close the modal if no error occurred
    closeModal(`CommentModal${getCorrectResponseToID()}`);
    setText("");
    customToast.success(isReply ? "Reply sent!" : "Comment posted!", {
      duration: 1500,
    });
  } catch (error) {
    setError(true);
    handleFirebaseError(error, ERROR_AREA_TYPES.POST);
  }
}
