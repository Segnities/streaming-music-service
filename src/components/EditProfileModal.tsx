
import { useSelector } from "react-redux";

import { getAuth, updateProfile, updateEmail, updatePassword, User, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { Field, Form, Formik } from "formik";

import { editProfileValidationSchema } from "../validation";

import LineDivider from "./UI/LineDivider";
import Modal from "./UI/Modal";

import { UserDoc } from "../utils/getUsers";
import { FirebaseUsersSelectorInterface } from "../store/reducers/firebaseUsers";
import { firebaseApp, firebaseDatabase } from '../firebase/firebaseConfig';
import firebase from "firebase/compat";

import { RiErrorWarningFill } from "react-icons/ri";


import EmailAuthProvider = firebase.auth.EmailAuthProvider;

interface Props {
    firebaseUser: UserDoc;
    openEditModal: boolean;
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    photoURL: string;
    setUpdateImageModal: React.Dispatch<React.SetStateAction<boolean>>

    setFirebaseUser: React.Dispatch<React.SetStateAction<UserDoc>>;
}

enum ProviderID {
    email = 'email',
    google = 'google.com'
}

interface Fields {
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
        setUpdateImageModal,
        setFirebaseUser,
    } = props;


    const auth = getAuth(firebaseApp);
    const user: User = auth.currentUser as User;
    const providerId: string = user.providerData[0].providerId;

    const { firebaseUsers } = useSelector((state: FirebaseUsersSelectorInterface) => state.firebaseUsers);

    const userDocRef = doc(firebaseDatabase, 'users', firebaseUser.id);

    const email: string = firebaseUser?.data.email as string;
    const username: string = firebaseUser?.data.username as string;

    const updateFirebaseUser = (values: Fields) => {
        setFirebaseUser({
            id: firebaseUser?.id as string,
            data: {
                ...firebaseUser,
                email: values.email,
                gender: values.gender,
                birthday: `${values.day} ${values.month} ${values.year}`,
                username: values.username,
                password: values.password
            }
        });
    };

    const handleSubmit = (values: Fields): void => {

        const isEmailUnique: boolean = firebaseUsers.find((usr) => {
            if (usr.data.email !== firebaseUser?.data.email && usr.data.email === values.email) {
                return usr.data.email;
            }
        }) === undefined;

        const isUsernameUnique: boolean = firebaseUsers.find((usr) => {
            if (usr.data.email !== firebaseUser?.data.username && usr.data.username === values.username) {
                return usr.data.username;
            }
        }) === undefined;
        const isCurrentPasswordCorrect: boolean = firebaseUser?.data?.password ? true : firebaseUser?.data.password === values.currentPassword;

        if (isEmailUnique) {
            updateFirebaseUser(values);
            updateEmail(auth.currentUser!, values.email).then(res => console.log('Email updated!')).catch(err => console.log('Email error'));
            updateDoc(userDocRef, {
                email: values.email,
                gender: values.gender,
                birthday: `${values.day} ${values.month} ${values.year}`,
            });
        }

        if (isUsernameUnique) {
            updateFirebaseUser(values);
            updateProfile(auth.currentUser!, {
                displayName: values.username,
            }).then(res => console.log('Display name updated!')).catch(err => console.log('Username error'));
            updateDoc(userDocRef, {
                username: values.username,
                gender: values.gender,
                birthday: `${values.day} ${values.month} ${values.year}`,
            });

        }

        if (isCurrentPasswordCorrect) {
            const credential = EmailAuthProvider.credential(user.email as string, values.currentPassword);
            reauthenticateWithCredential(user, credential).then((res) => {
                console.log('Reauthenticate...');
                updateFirebaseUser(values);
                updatePassword(res.user as User, values.password)
                    .then(res => console.log('Password updated!'))
                    .catch(err => console.log(err));
                updateDoc(userDocRef, {
                    password: values.password
                });

            }).catch(err => console.log('Update password error'));
        }

        setOpenEditModal(false);
    };

    return (
        <Modal open={openEditModal} setOpen={setOpenEditModal}>
            <div className='flex flex-row justify-between'>
                <h3 className='text-3xl text-black font-bold my-5'>Edit user profile</h3>
                <img
                    src={photoURL}
                    alt="avatar"
                    className='rounded-full cursor-pointer w-20 h-20 border-2 border-black'
                    title='Change avatar'
                    onClick={() => {
                        setOpenEditModal(false);
                        setUpdateImageModal(true);
                    }}
                />
            </div>
            <Formik
                initialValues={{
                    email: email,
                    username: username,
                    currentPassword: '',
                    password: '',
                    confirmPassword: '',
                    day: firebaseUser?.data?.birthday?.split(" ")[0] ?? "",
                    month: firebaseUser?.data?.birthday?.split(" ")[1] ?? "",
                    year: firebaseUser?.data?.birthday?.split(" ")[2] ?? "",
                    gender: firebaseUser?.data?.gender ?? "I don't want to specify"
                }}
                validationSchema={editProfileValidationSchema}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
            >
                {
                    ({ errors, touched, values }) => (
                        <Form autoComplete="off">
                            <div className="w-full flex flex-col my-3">

                                <label htmlFor="email" className='text-base font-medium mb-2'>Email</label>
                                <div className="flex flex-col">
                                    <Field type="email" name="email" id='email'
                                        className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                    {
                                        errors.email && touched.email ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.email}</span>
                                            </div>
                                        ) : null
                                    }
                                </div>
                                {
                                    providerId === ProviderID.email && (
                                        <>
                                            <div className="flex flex-col my-3">
                                                <label htmlFor="currentPassword" className='text-base font-medium mb-2'>Current
                                                    password</label>
                                                <Field type="password" name="currentPassword" id='currentPassword'
                                                    className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                                {
                                                    errors.currentPassword && touched.currentPassword ? (
                                                        <div className="flex items-center mt-1">
                                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                            <span className="text-sm font-semibold text-red-700">{errors.currentPassword}</span>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>

                                            <div className="flex flex-col my-2">
                                                <label htmlFor="password" className='text-base font-medium mb-2'>New
                                                    Password</label>
                                                <Field type="password" name="password" id='password'
                                                    className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                                {
                                                    errors.password && touched.password ? (
                                                        <div className="flex items-center mt-1">
                                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                            <span className="text-sm font-semibold text-red-700">{errors.password}</span>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="confirmPassword" className='text-base font-medium mb-2'>Repeat
                                                    new
                                                    password</label>
                                                <Field type="password" name="confirmPassword" id='confirmPassword'
                                                    className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                                {
                                                    errors.confirmPassword && touched.confirmPassword ? (
                                                        <div className="flex items-center mt-1">
                                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                            <span className="text-sm font-semibold text-red-700">{errors.confirmPassword}</span>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>

                                        </>
                                    )
                                }

                                <div className="flex flex-col">
                                    <label htmlFor="username" className='text-base font-medium mb-2'>Username</label>
                                    <Field type="text" name="username" id='username'
                                        className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                    {
                                        errors.username && touched.username ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.username}</span>
                                            </div>
                                        ) : null
                                    }

                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="birthday" className='text-base font-medium'>Date of birth</label>
                                    <div id='birthday' className='w-full flex flex-row items-center'>
                                        <div className="flex flex-col justify-between w-1/6">
                                            <Field type="text" name="day" maxLength={2}
                                                minLength={2}
                                                placeholder="DD"
                                                className='p-2 outline-none border-[1px] hover:border-2' />
                                            {
                                                errors.day && touched.day ? (
                                                    <div className="flex items-center mt-1">
                                                        <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                        <span className="text-sm font-semibold text-red-700">{errors.day}</span>
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                        <div className="flex flex-col w-2/3 px-3">
                                            <Field
                                                as="select"
                                                name="month"
                                                className="text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]">
                                                <option value="" disabled>Month</option>
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </Field>
                                            {
                                                errors.month && touched.month ? (
                                                    <div className="flex items-center mt-1">
                                                        <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                        <span className="text-sm font-semibold text-red-700">{errors.month}</span>
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                        <div className="flex flex-col w-1/5">
                                            <Field
                                                type="text"
                                                name="year"
                                                className="text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"
                                            />
                                            {
                                                errors.year && touched.year ? (
                                                    <div className="flex items-center mt-1">
                                                        <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                        <span className="text-sm font-semibold text-red-700">{errors.year}</span>
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col my-4">
                                    <Field as="select" name="gender"
                                        className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-binary">Non-binary</option>
                                        <option value="Another">Another</option>
                                        <option value="I don't want to specify">I don&apos;t want to specify</option>

                                    </Field>
                                    {
                                        errors.gender && touched.gender ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.gender}</span>
                                            </div>
                                        ) : null
                                    }
                                </div>
                                <LineDivider />
                                <div className="flex justify-end items-center my-4">
                                    <button type="button"
                                        className='text-lg text-gray-500 hover:text-black font-semibold mx-8'
                                        onClick={() => setOpenEditModal(false)}>Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={(errors.email || errors.username || errors.password || errors.currentPassword || errors.confirmPassword) ? true : false}
                                        onClick={() => handleSubmit(values)}
                                        className="z-40 bg-[#1ED760] disabled:bg-[#7c7272] rounded-3xl w-3/6 md:w-1/6 text-2xl p-2 text-black font-medium">Edit
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </Modal>
    );
};

export default EditProfileModal;