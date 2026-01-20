import { FirebaseError } from "firebase/app";
import customToast from "@/lib/toast";

export const handleFirebaseError = (
  error: unknown,
  context: string,
  defaultErrorMessage?: string,
) => {
  if (error instanceof FirebaseError) {
    switch (context) {
      case "POST":
        switch (error.code) {
          case "permission-denied":
            customToast.error("You don't have permission to post");
            break;
          case "unavailable":
            customToast.error("Service temporarily unavailable. Try again");
            break;
          case "unauthenticated":
            customToast.error("Please login to post");
            break;
          case "resource-exhausted":
            customToast.error("Too many requests. Please slow down");
            break;
          case "failed-precondition":
            customToast.error("Unable to post. Check your connection");
            break;
          case "no userdata":
            customToast.error(
              "Failed fetching Userdata, Log in again or try again",
            );
            break;
          default:
            customToast.error("Failed to create post. Try again");
            console.error("Firestore error:", error.code);
        }
        break;
      case "SIGN UP":
        switch (error.code) {
          case "auth/email-already-in-use":
            customToast.error("This email is already registered");
            break;
          case "auth/invalid-email":
            customToast.error("Please enter a valid email address");
            break;
          case "auth/operation-not-allowed":
            customToast.error("Email/password accounts are not enabled");
            break;
          case "auth/weak-password":
            customToast.error("Password should be at least 8 characters");
            break;
          default:
            customToast.error("Sign up failed. Please try again");
            console.error("Unhandled signup error:", error.code);
        }
        break;
      case "LOGIN":
        switch (error.code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
            customToast.error("Invalid email or password");
            break;
          case "auth/user-not-found":
            customToast.error("No account found with this email");
            break;
          case "auth/invalid-email":
            customToast.error("Please enter a valid email address");
            break;
          case "auth/too-many-requests":
            customToast.error("Too many failed attempts. Try again later");
            break;
          case "auth/user-disabled":
            customToast.error("This account has been disabled");
            break;
          case "auth/network-request-failed":
            customToast.error("Network error. Check your connection");
            break;
          case "auth/missing-password":
            customToast.error("Please enter your Password");
            break;
          default:
            customToast.error("Login failed. Please try again");
            console.error("Unhandled auth error:", error.code);
        }
        break;
    }
    if (error.code === "network-request-failed") {
      customToast.error("Network error. Check your connection");
    }
  } else {
    customToast.error(defaultErrorMessage || "Something went wrong. Try again");
  }
};
