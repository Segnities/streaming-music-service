
import { useState } from "react";

import { User, getAuth } from "firebase/auth";

import Modal from "./UI/Modal";

import { firebaseApp } from '../firebase/firebaseConfig';
import { UserDoc } from "../utils/getUsers";

import { updateProfileImage } from "../helpers/updateProfileImage";

import EditProfileForm from "./EditProfileForm";

interface Props {
    firebaseUser: UserDoc | undefined;
    openEditModal: boolean;
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    photoURL: string;
    setPhotoURL: React.Dispatch<React.SetStateAction<string>>;
    setFirebaseUser: React.Dispatch<React.SetStateAction<UserDoc | undefined>>;
}

export enum ProviderID {
    email = 'email',
    google = 'google.com'
}

export interface EditProfileFields {
    email: string;
    username: string;
    currentPassword: string;
    password: string;
    confirmPassword: string;
    day: string;
    month: string;
    year: string;
    gender: string;
}

const EditProfileModal = (props: Props) => {
    const {
        photoURL,
        firebaseUser,
        openEditModal,
        setOpenEditModal,
        setFirebaseUser,
        setPhotoURL
    } = props;

    const auth = getAuth(firebaseApp);
    const user: User = auth.currentUser as User;
    const providerId: string = user.providerData[0].providerId;

    const [profileImage, setProfileImage] = useState<File | null | undefined>(undefined);

    return (
        <Modal open={openEditModal} overscroll={true} setOpen={setOpenEditModal}>
            <div className='flex flex-col justify-between'>
                <h3 className='text-3xl text-black font-bold my-5'>Edit user profile</h3>
                <div className="flex flex-col items-center">
                    <img src={photoURL} className='w-36 h-36 rounded-full border-2 border-black' alt="" />
                    <label htmlFor="avatar" className='text-lg font-medium my-3'>Change profile
                        avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={(e) => {
                            setProfileImage(e?.target?.files![0]);
                        }}
                        className="text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"
                    />
                    <button onClick={() => {
                        updateProfileImage({ profileImage, setPhotoURL });
                        console.log('Clicked!');

                    }}
                        className='my-5  self-center bg-[#1ED760] rounded-xl w-3/6 md:w-1/6 text-2xl p-2 text-black font-medium'>Update</button>
                </div>
            </div>
            <EditProfileForm
                providerId={providerId}
                firebaseUser={firebaseUser}
                setFirebaseUser={setFirebaseUser}
                setOpenModal={setOpenEditModal}
            />
        </Modal>
    );
};

export default EditProfileModal;