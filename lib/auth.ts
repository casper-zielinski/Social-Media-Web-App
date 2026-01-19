import {
  loggedInasGuest,
  logIn,
  logOut,
  received,
} from "@/redux/slices/loginSlice";
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
import customToast from "@/lib/toast";
import { handleFirebaseError } from "./errorHandler";
import { ERROR_AREA_TYPES } from "@/app/constants/errorAreaTypes";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { COLLECTION_PATH } from "@/app/constants/path";
import { User, UserReduxState } from "@/app/interfaces/User";

// ============================================================================
// SIGN OUT FUNCTION
// ============================================================================

/**
 * Sign out the current user and clear Redux state
 *
 * @param dispatch - Redux dispatch function to update application state
 * @returns Promise that resolves when sign out is complete
 */
export async function handleSignOut(
  dispatch: AppDispatch,
  userIdFromTable: string,
) {
  try {
    await signOut(auth);
    if (userIdFromTable) {
      await deleteDoc(doc(db, COLLECTION_PATH.USERS, userIdFromTable));
    }

    customToast.success("Signed out successfully");
    dispatch(logOut());
    dispatch(signOutUser());
  } catch {
    customToast.error("Failed signing out - try again");
  }
}

// ============================================================================
// SIGN UP FUNCTION
// ============================================================================

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
  dispatch: AppDispatch,
) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredentials.user, {
      displayName: username,
    });

    const { id } = await addDoc(collection(db, COLLECTION_PATH.USERS), {
      email: email,
      name: username,
      username: email?.split(".")[0],
      Followers: [],
      Totallikes: 0,
      savedPosts: [],
      UID: userCredentials.user.uid,
    } satisfies User);

    const newUserRedxuState: UserReduxState = {
      name: username,
      username: email?.split(".")[0],
      email: email,
      uid: userCredentials.user.uid,
      userTableId: id,
    };

    dispatch(signInUser(newUserRedxuState));
    dispatch(logIn())

    closeModal(MODAL_IDS.SIGNUP);
    customToast.success(`Profile created - Welcome ${username}`);
  } catch (error) {
    handleFirebaseError(error, ERROR_AREA_TYPES.SIGN_UP);
  }
}

// ============================================================================
// LOG IN FUNCTION
// ============================================================================

/**
 * Sign in an existing user with email and password
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise that resolves when login is complete
 */
export async function handleLogin(
  email: string,
  password: string,
  dispatch: AppDispatch,
) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    closeModal(MODAL_IDS.LOGIN);
    dispatch(logIn());
    customToast.success(
      `Logged in successfully - Hello ${email?.split(".")[0].toUpperCase()}`,
    );
  } catch (error) {
    handleFirebaseError(error, ERROR_AREA_TYPES.LOGIN);
  }
}

// ============================================================================
// LOG IN AS GUEST FUNCTION
// ============================================================================

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
  dispatch: AppDispatch,
) {
  try {
    await signInWithEmailAndPassword(
      auth,
      "guest123@gmail.com",
      "MeinPasswort1!",
    );
    if (modalToClose) closeModal(closingModal);
    customToast.success("Logged in as Guest - Hello Guest!");
    dispatch(loggedInasGuest());
    dispatch(received());
  } catch {
    customToast.error("Failed guest login - Try again");
  }
}
