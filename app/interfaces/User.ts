import { DocumentReference } from "firebase/firestore";

export interface User {
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
  bio: string;
}
