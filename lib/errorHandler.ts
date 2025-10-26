import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

export const handleFirebaseError = (
  error: unknown,
  context: string,
  defaultErrorMessage?: string
) => {
  if (error instanceof FirebaseError) {
    switch (context) {
      case "POST":
        switch (error.code) {
          case "permission-denied":
            toast.error("You don't have permission to post");
            break;
          case "unavailable":
            toast.error("Service temporarily unavailable. Try again");
            break;
          case "unauthenticated":
            toast.error("Please login to post");
            break;
          case "resource-exhausted":
            toast.error("Too many requests. Please slow down");
            break;
          case "failed-precondition":
            toast.error("Unable to post. Check your connection");
            break;
          default:
            toast.error("Failed to create post. Try again");
            console.error("Firestore error:", error.code);
        }
        break;
      case "SIGN UP":
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("This email is already registered");
            break;
          case "auth/invalid-email":
            toast.error("Please enter a valid email address");
            break;
          case "auth/operation-not-allowed":
            toast.error("Email/password accounts are not enabled");
            break;
          case "auth/weak-password":
            toast.error("Password should be at least 8 characters");
            break;
          default:
            toast.error("Sign up failed. Please try again");
            console.error("Unhandled signup error:", error.code);
        }
        break;
      case "LOGIN":
        switch (error.code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
            toast.error("Invalid email or password");
            break;
          case "auth/user-not-found":
            toast.error("No account found with this email");
            break;
          case "auth/invalid-email":
            toast.error("Please enter a valid email address");
            break;
          case "auth/too-many-requests":
            toast.error("Too many failed attempts. Try again later");
            break;
          case "auth/user-disabled":
            toast.error("This account has been disabled");
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Check your connection");
            break;
          case "auth/missing-password":
            toast.error("Please enter your Password");
            break;
          default:
            toast.error("Login failed. Please try again");
            console.error("Unhandled auth error:", error.code);
        }
        break;
    }
    if (error.code === "network-request-failed") {
      toast.error("Network error. Check your connection");
    }
  } else {
    toast.error(defaultErrorMessage || "Something went wrong. Try again");
  }
};
