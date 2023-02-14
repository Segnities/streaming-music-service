import { DocumentData, collection, getDocs } from "firebase/firestore";
import { firebaseDatabase } from "../firebase/firebaseConfig";

interface UserDocList {
  id: string;
  data: DocumentData;
}

export const getUsers = async () => {
  const collectionRef = collection(firebaseDatabase, "users");
  const userList: UserDocList[] = [];
  const querySnapshot = await getDocs(collectionRef);

  querySnapshot.forEach((doc) => {
    userList.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return userList;
};
