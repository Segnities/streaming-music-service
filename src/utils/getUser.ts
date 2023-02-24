import { collection, getDocs, DocumentData } from "firebase/firestore";
import { firebaseDatabase } from "../firebase/firebaseConfig";
import { getUsers } from "./getUsers";

interface UserDocList {
  id: string;
  data: DocumentData;
}

export async function getUser(email: string | null | undefined) {
  const userList: UserDocList[] = await getUsers();

  return userList.find((usr: UserDocList) => usr.data.email === email);
}
