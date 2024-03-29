import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { User } from "firebase/auth";

import { FirebaseUsersSelectorInterface } from "../store/reducers/firebaseUsers";
import { UserAuthSelector } from "../store/reducers/auth";

import { UserDoc } from "../utils/getUsers";

export function useGetCurrentUser(): { user: User, firebaseUser: UserDoc | undefined, setFirebaseUser: React.Dispatch<React.SetStateAction<UserDoc | undefined>> } {
    const { firebaseUsers: users } = useSelector((state: FirebaseUsersSelectorInterface) => state.firebaseUsers);

    const { user: userData } = useSelector((state: UserAuthSelector) => state.userAuth);
    const user: User = JSON.parse(userData as string);

    const fUser = users.find(usr => usr.data.email === user?.email);

    const [firebaseUser, setFirebaseUser] = useState<UserDoc | undefined>(fUser);

    return { user, firebaseUser, setFirebaseUser };
}