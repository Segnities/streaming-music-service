import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { isUndefined, isNull } from "lodash";

import { updateProfile, getAuth } from "firebase/auth";

import { Dispatch, SetStateAction } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import { isImageFile } from "../utils/isImageFile";


interface UpdateImg {
    setPhotoURL: Dispatch<SetStateAction<string>>;
    profileImage: File | undefined;
}

export const updateProfileImage = async (args: UpdateImg): Promise<void> => {
    const { setPhotoURL, profileImage } = args;

    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);

    const uploadPathRef = ref(storage, `profileImages/${profileImage?.name}`);


    if (
        !isUndefined(profileImage) && 
        (!isUndefined(uploadPathRef) || !isNull(null)) &&
        isImageFile(profileImage?.name)
        ) {
        try {
            await uploadBytes(uploadPathRef, profileImage!)
            console.log('Upload success!');

        } catch (err) {
            console.log('Upload error!')
        }

        const profileImageUrl = await getDownloadURL(ref(storage, `profileImages/${profileImage?.name}`));
        setPhotoURL(profileImageUrl);

        try {
            await updateProfile(auth.currentUser!, {
                photoURL: profileImageUrl
            });
            console.log('Profile image is updated!');

        } catch (err) {
            console.log('Profile image update error!')
        }


    }
};
