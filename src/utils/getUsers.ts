import { collection, DocumentData, getDocs } from 'firebase/firestore';

import { firebaseDatabase } from '../firebase/firebaseConfig';

export interface UserFields {
    email: string;
    password: string;
    username: string;
    birthday: string;
    gender: string;
}
export interface UserDoc {
    id: string;
    data: UserFields;
}


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
