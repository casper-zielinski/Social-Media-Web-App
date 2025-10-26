import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTION_PATH } from "@/app/constants/path";

// ============================================================================
// REUSABLE FUNCTIONS
// ============================================================================

/**
 * toggleLike Function to declare once and use more often
 * @param isLiked the Variable that returns if the Post is liked or not
 * @param userEmail the Email of the User liking it
 * @param pathSegments the path to the correct post
 */
const toggleLike = async (
  isLiked: boolean,
  userEmail: string,
  ...pathSegments: string[]
) => {
  const docRef = doc(db, ...(pathSegments as [string, ...string[]]));

  if (!isLiked) {
    await updateDoc(docRef, {
      likes: arrayUnion(userEmail),
    });
  } else {
    await updateDoc(docRef, {
      likes: arrayRemove(userEmail),
    });
  }
};

// ============================================================================
// LIKE FUNCTIONS
// ============================================================================

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
  toggleLike(isLiked, userEmail, COLLECTION_PATH.POSTS, postId);
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
  toggleLike(
    isLiked,
    userEmail,
    COLLECTION_PATH.POSTS,
    postId,
    COLLECTION_PATH.COMMENTS,
    commentId
  );
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
  toggleLike(
    isLiked,
    userEmail,
    COLLECTION_PATH.POSTS,
    postId,
    COLLECTION_PATH.COMMENTS,
    commentId,
    COLLECTION_PATH.REPLYS,
    replyId
  );
}
