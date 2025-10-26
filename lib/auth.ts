import { loggedInasGuest, logOut, received } from "@/redux/slices/loginSlice";
import { signInUser, signOutUser } from "@/redux/slices/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { AppDispatch } from "@/redux/store";
import { MODAL_IDS } from "@/app/constants/modal";
import { closeModal } from "@/app/hooks/useModal";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface User {
  name: string;
  username: string;
  email: string;
  uid: string;
}

// ============================================================================
// AUTHENTICATION OPERATIONS
// ============================================================================

/**
 * Sign out the current user and clear Redux state
 *
 * @param dispatch - Redux dispatch function to update application state
 * @returns Promise that resolves when sign out is complete
 */
export async function handleSignOut(dispatch: AppDispatch) {
  await signOut(auth);

  dispatch(logOut());
  dispatch(signOutUser());
}

/**
 * Create a new user account with email and password
 *
 * @param username - Display name for the new user
 * @param email - Email address for the new account
 * @param password - Password for the new account
 * @param dispatch - Redux dispatch function to update application state
 * @returns Promise that resolves when sign up is complete
 */
export async function handleSignUp(
  username: string,
  email: string,
  password: string,
  dispatch: AppDispatch
) {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredentials.user, {
    displayName: username,
  });

  if (userCredentials.user.displayName === "Guest ") {
    dispatch(loggedInasGuest());
  } else {
    dispatch(
      signInUser({
        name: userCredentials.user.displayName,
        username: userCredentials.user.email?.split(".")[0],
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      })
    );
  }

  closeModal(MODAL_IDS.SIGNUP);
}

/**
 * Sign in an existing user with email and password
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise that resolves when login is complete
 */
export async function handleLogin(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
  closeModal(MODAL_IDS.LOGIN);
}

/**
 * Sign in as a guest user with predefined credentials
 *
 * @param modalToClose - Whether to close a modal after login
 * @param closingModal - ID of the modal to close
 * @param dispatch - Redux dispatch function to update application state
 * @returns Promise that resolves when guest login is complete
 */
export async function handleGuestLogin(
  modalToClose: boolean,
  closingModal: string,
  dispatch: AppDispatch
) {
  await signInWithEmailAndPassword(
    auth,
    "guest123@gmail.com",
    "MeinPasswort1!"
  );
  if (modalToClose) closeModal(closingModal);

  dispatch(loggedInasGuest());
  dispatch(received());
}

// ============================================================================
// POST OPERATIONS
// ============================================================================

/**
 * Create a new post in Firestore
 *
 * @param text - Content of the post
 * @param user - User object containing name, username, email, and uid
 * @param setText - State setter to clear the text input after posting
 * @param setError - State setter to handle error states (currently unused)
 * @param usingPostModal - Whether the post is being created from a modal
 * @returns Promise that resolves when the post is created
 */
export async function sendPost(
  text: string,
  user: User,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  usingPostModal: boolean
) {
  try {
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      useremail: user.email,
      timeStamp: serverTimestamp(),
      likes: [],
    });

    if (usingPostModal) closeModal(MODAL_IDS.POST);

    setText("");
  } catch {
    // TODO: Add proper error handling
  }
}

/**
 * Subscribe to real-time updates for the posts feed
 * Posts are ordered by timestamp in descending order (newest first)
 *
 * @param setPosts - State setter for the posts array
 * @param setShowComments - State setter for comment visibility array
 * @returns Unsubscribe function to clean up the listener when component unmounts
 *
 * @example
 * useEffect(() => {
 *   const unsubscribe = subscribeToPostsFeed(setPosts, setShowComments);
 *   return unsubscribe; // Cleanup on unmount
 * }, []);
 */
export function subscribeToPostsFeed(
  setPosts: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData>[]>
  >,
  setShowComments: React.Dispatch<React.SetStateAction<boolean[]>>
) {
  const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
  const unsubscribe = onSnapshot(q, (posts) => {
    const { docs } = posts;
    setPosts(docs);
    setShowComments((prev) =>
      prev.length === docs.length ? prev : docs.map(() => false)
    );
  });

  return unsubscribe;
}

/**
 * Toggle like/unlike status on a post
 * Uses arrayUnion/arrayRemove to add or remove user email from likes array
 *
 * @param postId - ID of the post to like/unlike
 * @param userEmail - Email of the user performing the action
 * @param isLiked - Current like status (true if already liked, false otherwise)
 * @returns Promise that resolves when the like operation is complete
 */
export async function toggleLikeOnPost(
  postId: string,
  userEmail: string,
  isLiked: boolean
) {
  if (!isLiked) {
    await updateDoc(doc(db, "posts", postId), {
      likes: arrayUnion(userEmail),
    });
  } else {
    await updateDoc(doc(db, "posts", postId), {
      likes: arrayRemove(userEmail),
    });
  }
}

// ============================================================================
// COMMENT OPERATIONS
// ============================================================================

/**
 * Subscribe to real-time updates for comments on a specific post
 * Comments are ordered by timestamp in descending order (newest first)
 *
 * @param postId - ID of the post to fetch comments for
 * @param setComments - State setter for the comments array
 * @param showReplyArray - State setter for reply visibility array
 * @param setLoading - State setter to indicate loading completion
 * @param onError - Optional callback function to handle errors
 * @returns Unsubscribe function to clean up the listener when component unmounts
 *
 * @example
 * useEffect(() => {
 *   const unsubscribe = subscribeToComments(postId, setComments, showReplyArray, setLoading);
 *   return unsubscribe; // Cleanup on unmount
 * }, [postId]);
 */
export function subscribeToComments(
  postId: string,
  setComments: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData>[]>
  >,
  showReplyArray: React.Dispatch<React.SetStateAction<boolean[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onError?: () => void
) {
  if (!postId) {
    return () => {};
  }

  const commentsRef = collection(db, "posts", postId, "comments");
  const q = query(commentsRef, orderBy("timeStamp", "desc"));
  const unsubscribe = onSnapshot(
    q,
    (snapShot) => {
      const { docs } = snapShot;
      setComments(docs);
      showReplyArray((prev) =>
        docs.length === prev.length ? prev : docs.map(() => false)
      );
      setLoading(true);
    },
    (error) => {
      setLoading(false);
      if (onError) onError();
    }
  );

  return unsubscribe;
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
 * @param replyId - ID of the reply being responded to (optional, currently unused)
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
  user: User,
  text: string,
  isReply: boolean,
  commentId: string | undefined,
  replyId: string | undefined,
  userdata: { name: string; username: string },
  postText: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  getCorrectResponseToID: () => string
) {
  try {
    if (isReply && commentId) {
      // Create a reply to a comment
      await addDoc(
        collection(db, "posts", postId, "comments", commentId, "replys"),
        {
          name: user.name,
          username: user.username,
          text: text,
          timeStamp: new Date(),
          likes: [],
          replyTo: {
            userId: getCorrectResponseToID(),
            userName: userdata.name,
            userUsername: userdata.username,
            textToReplyTo: postText,
          },
          NumberOfReplys: 0,
        }
      );

      // Increment the reply count on the parent comment
      await updateDoc(doc(db, "posts", postId, "comments", commentId), {
        NumberOfReplys: increment(1),
      });
    } else {
      // Create a comment on a post
      await addDoc(collection(db, "posts", postId, "comments"), {
        name: user.name,
        username: user.username,
        text: text,
        timeStamp: new Date(),
        likes: [],
        NumberOfComments: 0,
      });

      // Increment the comment count on the parent post
      await updateDoc(doc(db, "posts", postId), {
        NumberOfComments: increment(1),
      });
    }

    // Close the modal if no error occurred
    closeModal(`CommentModal${getCorrectResponseToID()}`);
  } catch (error) {
    setError(true);
    console.log("error: ", error);
  }
}

/**
 * Toggle like/unlike status on a comment
 * Uses arrayUnion/arrayRemove to add or remove user email from likes array
 *
 * @param postId - ID of the post containing the comment
 * @param commentId - ID of the comment to like/unlike
 * @param userEmail - Email of the user performing the action
 * @param isLiked - Current like status (true if already liked, false otherwise)
 * @returns Promise that resolves when the like operation is complete
 */
export async function toggleLikeOnComment(
  postId: string,
  commentId: string,
  userEmail: string,
  isLiked: boolean
) {
  if (!isLiked) {
    await updateDoc(doc(db, "posts", postId, "comments", commentId), {
      likes: arrayUnion(userEmail),
    });
  } else {
    await updateDoc(doc(db, "posts", postId, "comments", commentId), {
      likes: arrayRemove(userEmail),
    });
  }
}

// ============================================================================
// REPLY OPERATIONS
// ============================================================================

/**
 * Subscribe to real-time updates for replies on a specific comment
 * Replies are ordered by timestamp in ascending order (oldest first)
 *
 * @param postId - ID of the post containing the comment
 * @param commentId - ID of the comment to fetch replies for
 * @param setReplies - State setter for the replies array
 * @param setLoading - State setter to indicate loading completion
 * @returns Unsubscribe function to clean up the listener when component unmounts
 *
 * @example
 * useEffect(() => {
 *   const unsubscribe = subscribeToReplies(postId, commentId, setReplies, setLoading);
 *   return unsubscribe; // Cleanup on unmount
 * }, [postId, commentId]);
 */
export function subscribeToReplies(
  postId: string,
  commentId: string,
  setReplies: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData>[]>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (postId === undefined || commentId === undefined) {
    return () => {};
  }

  const q = query(
    collection(db, "posts", postId, "comments", commentId, "replys"),
    orderBy("timeStamp", "asc")
  );
  const unsubscribe = onSnapshot(q, (replies) => {
    const { docs } = replies;
    setReplies(docs);
    setLoading(true);
  });

  return unsubscribe;
}

/**
 * Toggle like/unlike status on a reply
 * Uses arrayUnion/arrayRemove to add or remove user email from likes array
 *
 * @param postId - ID of the post containing the comment
 * @param commentId - ID of the comment containing the reply
 * @param replyId - ID of the reply to like/unlike
 * @param userEmail - Email of the user performing the action
 * @param isLiked - Current like status (true if already liked, false otherwise)
 * @returns Promise that resolves when the like operation is complete
 */
export async function toggleLikeOnReply(
  postId: string,
  commentId: string,
  replyId: string,
  userEmail: string,
  isLiked: boolean
) {
  if (!isLiked) {
    await updateDoc(
      doc(db, "posts", postId, "comments", commentId, "replys", replyId),
      {
        likes: arrayUnion(userEmail),
      }
    );
  } else {
    await updateDoc(
      doc(db, "posts", postId, "comments", commentId, "replys", replyId),
      {
        likes: arrayRemove(userEmail),
      }
    );
  }
}
