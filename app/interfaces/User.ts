import { DocumentReference } from "firebase/firestore";

export interface User {
  Followers: string[];
  Totallikes: number;
  UID: string;
  email: string;
  name: string;
  username: string;
  savedPosts: DocumentReference[];
}

export interface UserReduxState {
  name: string;
  username: string;
  email: string;
  uid: string;
  userTableId: string;
}
