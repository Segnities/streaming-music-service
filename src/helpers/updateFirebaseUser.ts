import { Dispatch, SetStateAction } from "react";

import { UserDoc } from "../utils/getUsers";

import { EditProfileFields } from "../components/EditProfileModal";


export const updateFirebaseUser = (values: EditProfileFields, firebaseUser: UserDoc, setFirebaseUser: Dispatch<SetStateAction<UserDoc>>) => {
    setFirebaseUser({
        id: firebaseUser?.id as string,
        data: {
            ...firebaseUser,
            email: values.email,
            gender: values.gender,
            birthday: `${values.day} ${values.month} ${values.year}`,
            username: values.username,
        }
    });
};