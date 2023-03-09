import { collection, DocumentData, getDocs } from 'firebase/firestore';

import { firebaseDatabase } from '../firebase/firebaseConfig';

export const getUsers = async () => {
 const collectionRef = collection(firebaseDatabase, 'users');
 const userList: DocumentData[] = [];

 const querySnapshot = await getDocs(collectionRef);

 querySnapshot.forEach((doc) => {
  userList.push({
   id: doc.id,
   data: doc.data(),
  });
 });
 return userList;
};
