import {
  QueryDocumentSnapshot,
  DocumentData,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

// ============================================================================
// GETTING ALL POSTS
// ============================================================================

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
  setShowComments: React.Dispatch<React.SetStateAction<boolean[]>>,
  setHideFullText: React.Dispatch<React.SetStateAction<boolean[]>>
) {
  const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
  const unsubscribe = onSnapshot(q, (posts) => {
    const { docs } = posts;
    setPosts(docs);
    setShowComments((prev) =>
      prev.length === docs.length ? prev : docs.map(() => false)
    );
    setHideFullText((prev) =>
      prev.length === docs.length ? prev : docs.map(() => true)
    );
  });

  return unsubscribe;
}

// ============================================================================
// GETTING ALL COMMENTS
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
      console.error("Error fetching comments:", error);
      setLoading(false);
      if (onError) onError();
    }
  );

  return unsubscribe;
}

// ============================================================================
// GET ALL REPLYIES
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
