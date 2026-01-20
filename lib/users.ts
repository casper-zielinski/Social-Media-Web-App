import { COLLECTION_PATH } from "@/app/constants/path";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getUsers() {
      return getDocs(collection(db, COLLECTION_PATH.USERS))
}