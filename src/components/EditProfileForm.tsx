import { Dispatch, SetStateAction } from 'react';

import { useSelector } from 'react-redux';

import { Formik, Form, Field } from 'formik';

import { UserDoc } from '../utils/getUsers';

import { editProfileValidationSchema } from '../utils/validation';

import { ProviderID } from './EditProfileModal';

import { RiErrorWarningFill } from "react-icons/ri"

import LineDivider from './UI/LineDivider';

import { handleSubmit } from '../helpers/submitEditProfileForm';

import { FirebaseUsersSelectorInterface } from '../store/reducers/firebaseUsers';

interface EditProfileFormProps {
    firebaseUser: UserDoc | undefined;
    setFirebaseUser: Dispatch<SetStateAction<UserDoc|undefined>>;
    providerId: string;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function EditProfileForm(props: EditProfileFormProps) {
    const { firebaseUser, providerId, setOpenModal, setFirebaseUser } = props;


    const { firebaseUsers } = useSelector((state: FirebaseUsersSelectorInterface) => state.firebaseUsers);


    const email: string = firebaseUser?.data.email as string;
    const username: string = firebaseUser?.data.username as string;

    return (
        <>
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
                    handleSubmit(values, firebaseUser, firebaseUsers, setFirebaseUser, setOpenModal);
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
                                        onClick={() => setOpenModal(false)}>Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={() => {
                                            handleSubmit(values, firebaseUser, firebaseUsers, setFirebaseUser, setOpenModal)
                                        }}
                                        className="z-40 bg-[#1ED760] disabled:bg-[#7c7272] rounded-3xl w-3/6 md:w-1/6 text-2xl p-2 text-black font-medium">Edit
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}