import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { updateProfile, getAuth } from "firebase/auth";

import { Dispatch, SetStateAction } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";


interface UpdateImg {
    setPhotoURL: Dispatch<SetStateAction<string>>;
    profileImage: File | null | undefined;
}

export const updateProfileImage = async (args: UpdateImg): Promise<void> => {
    const { setPhotoURL, profileImage } = args;

    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);

    const uploadPathRef = ref(storage, `profileImages/${profileImage?.name}`);
    if (profileImage !== undefined && (uploadPathRef !== undefined || uploadPathRef !== null)) {
        uploadBytes(uploadPathRef, profileImage!).then(res => console.log('Uploaded!')).catch(err => console.log('Upload error!')
        );
        const profileImageUrl = await getDownloadURL(ref(storage, `profileImages/${profileImage?.name}`));
        setPhotoURL(profileImageUrl);
        updateProfile(auth.currentUser!, {
            photoURL: profileImageUrl
        }).then(res => console.log('Profile image updated!')).catch(err => console.log('Profile image update error'));
    }
};
