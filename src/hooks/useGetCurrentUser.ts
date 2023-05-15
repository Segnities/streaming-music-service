import { useState } from "react";
import { useSelector } from "react-redux";

import { User } from "firebase/auth";

import { FirebaseUsersSelectorInterface } from "../store/reducers/firebaseUsers";
import { UserAuthSelector } from "../store/reducers/auth";

import { UserDoc } from "../utils/getUsers";

export function useGetCurrentUser(): { user: User, firebaseUser: UserDoc, setFirebaseUser: React.Dispatch<React.SetStateAction<UserDoc>> } {
    const { firebaseUsers: users } = useSelector((state: FirebaseUsersSelectorInterface) => state.firebaseUsers);

    const { user: userData } = useSelector((state: UserAuthSelector) => state.userAuth);
    const user: User = JSON.parse(userData as string);

    const [firebaseUser, setFirebaseUser] = useState<UserDoc>(users.find(usr => usr.data.email === user?.email));

    return { user, firebaseUser, setFirebaseUser };
}