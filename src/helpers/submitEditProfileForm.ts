import { Dispatch, SetStateAction } from "react";


import { User, getAuth, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import firebase from "firebase/compat";
import { doc, updateDoc } from "firebase/firestore";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

import { EditProfileFields } from "../components/EditProfileModal";

import { UserDoc } from "../utils/getUsers";

import { firebaseApp, firebaseDatabase } from "../firebase/firebaseConfig";

import { updateFirebaseUser } from "./updateFirebaseUser";

import { isUndefined } from "lodash";



export const handleSubmit = (
    values: EditProfileFields,
    firebaseUser: UserDoc | undefined,
    firebaseUsers: UserDoc[],
    setFirebaseUser: Dispatch<SetStateAction<UserDoc | undefined>>,
    setOpenEditModal: Dispatch<SetStateAction<boolean>>
): void => {

    checkAndUpdateEmail(values, firebaseUsers, firebaseUser, setFirebaseUser);
    checkAndUpdateUsername(values, firebaseUsers, firebaseUser, setFirebaseUser);
    //changePassword(values);

    setOpenEditModal(false);
};


export const checkAndUpdateEmail = (
    values: EditProfileFields,
    firebaseUsers: UserDoc[],
    firebaseUser:  UserDoc | undefined,
    setFirebaseUser: Dispatch<SetStateAction<UserDoc | undefined>>,
): void => {
    const auth = getAuth(firebaseApp);
    const userDocRef = doc(firebaseDatabase, 'users', firebaseUser?.id as string);

    const isEmailUnique: boolean = isUndefined(firebaseUsers.find((usr) => {
        if (usr.data.email !== firebaseUser?.data.email && usr.data.email === values.email) {
            return usr.data.email;
        }
    }));

    if (isEmailUnique) {
        updateFirebaseUser(values, firebaseUser, setFirebaseUser);
        updateEmail(auth.currentUser!, values.email).then(res => console.log('Email updated!')).catch(err => console.log('Email error'));
        updateDoc(userDocRef, {
            email: values.email,
            gender: values.gender,
            birthday: `${values.day} ${values.month} ${values.year}`,
        });
    }

}

export const changePassword = (values: EditProfileFields): void => {
    const auth = getAuth(firebaseApp);
    const user: User = auth.currentUser as User;

    const credential = EmailAuthProvider.credential(user.email as string, values.currentPassword);
    reauthenticateWithCredential(user, credential).then((res) => {
        console.log('Reauthenticate...');
        updatePassword(res.user as User, values.password)
            .then(res => console.log('Password updated!'))
            .catch(err => console.log(err));

    }).catch(err => console.log('Update password error'));

}

export const checkAndUpdateUsername = (
    values: EditProfileFields,
    firebaseUsers: UserDoc[],
    firebaseUser: UserDoc | undefined,
    setFirebaseUser: Dispatch<SetStateAction<UserDoc | undefined>>,
): void => {

    const auth = getAuth(firebaseApp);
    const userDocRef = doc(firebaseDatabase, 'users', firebaseUser?.id as string);

    const isUsernameUnique: boolean = isUndefined(firebaseUsers.find((usr) => {
        if (usr.data.email !== firebaseUser?.data.username && usr.data.username === values.username) {
            return usr.data.username;
        }
    }));

    if (isUsernameUnique) {
        updateFirebaseUser(values, firebaseUser, setFirebaseUser);
        updateProfile(auth.currentUser!, {
            displayName: values.username,
        }).then(res => console.log('Display name updated!')).catch(err => console.log('Username error'));
        updateDoc(userDocRef, {
            username: values.username,
            gender: values.gender,
            birthday: `${values.day} ${values.month} ${values.year}`,
        });
    }

}