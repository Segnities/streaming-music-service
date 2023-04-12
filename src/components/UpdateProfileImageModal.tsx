import React, { useState } from "react";

import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

import Modal from "./UI/Modal";

import { getAuth, updateProfile } from "firebase/auth";
import { firebaseApp } from "../firebase/firebaseConfig";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    photoURL: string;
    setPhotoURL: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateProfileImageModal = (props: Props) => {
    const { open, setOpen, photoURL, setPhotoURL } = props;

    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);

    const [profileImage, setProfileImage] = useState<File | null | undefined>(undefined);
    const updateProfileImage = async () => {
        const uploadPathRef = ref(storage, `profileImages/${profileImage?.name}`);

        if (uploadPathRef !== undefined || uploadPathRef !== null) {
            uploadBytes(uploadPathRef, profileImage!).then(res => console.log('Uploaded!')).catch(err => console.log('Upload error!')
            );
            const profileImageUrl = await getDownloadURL(ref(storage, `profileImages/${profileImage?.name}`));
            setPhotoURL(profileImageUrl);
            updateProfile(auth.currentUser!, {
                photoURL: profileImageUrl
            }).then(res => console.log('Profile image updated!')).catch(err => console.log('Profile image update error'));
            setOpen(false);

        }
    };

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center">
                <img src={photoURL} className='w-48 h-48 rounded-full border-4 border-black' alt="" />
                <label htmlFor="avatar" className='text-lg font-medium my-3'>Change profile
                    avatar</label>
                <input type="file" id="avatar"
                    onChange={(e) => {
                        setProfileImage(e?.target?.files![0])
                    }}
                    className="text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                <button onClick={updateProfileImage} className='my-5  self-center bg-[#1ED760] rounded-xl w-3/6 md:w-1/6 text-2xl p-2 text-black font-medium'>Update</button>
            </div>

        </Modal>
    );
};

export default UpdateProfileImageModal;