import React, {FormEvent} from 'react';
import {Field, Form, Formik} from "formik";
import {editProfileValidationSchema} from "../validation";
import LineDivider from "./UI/LineDivider";
import Modal from "./UI/Modal";
import {UserDoc} from "../utils/@types";

interface Props {
    firebaseUser: UserDoc | undefined | null;
    openModal: boolean;
    setOpenModal: (visibility: boolean) => void;
    avatar: string;
}


const EditProfileModal = (props: Props) => {
    const {avatar, firebaseUser, openModal, setOpenModal} = props;

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <Modal open={openModal} setOpen={setOpenModal}>
            <div className='flex flex-row justify-between'>
                <h3 className='text-3xl text-black font-bold my-5'>Edit user profile</h3>
                <img src={avatar} alt="avatar" className='rounded-full cursor-pointer' title='Change avatar'/>
            </div>
            <Formik
                initialValues={{
                    email: firebaseUser?.data.email,
                    username: firebaseUser?.data.username,
                    currentPassword: '',
                    password: '',
                    confirmPassword: '',
                    day: firebaseUser?.data?.birthday?.split(" ")[0] ?? "",
                    month: firebaseUser?.data?.birthday?.split(" ")[1] ?? "",
                    year: firebaseUser?.data?.birthday?.split(" ")[2] ?? "",
                    gender: "I don't want to specify"
                }}
                validationSchema={editProfileValidationSchema}
                onSubmit={() => console.log('Send it!')}
            >
                {
                    ({errors, touched, values}) => (
                        <Form autoComplete="off">
                            <div className="w-full flex flex-col my-3">
                                <div className="flex flex-col">
                                    <label htmlFor="email" className='text-base font-medium mb-2'>Email</label>
                                    <Field type="email" name="email" id='email'
                                           className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"/>
                                </div>

                                <div className="flex flex-col my-3">
                                    <label htmlFor="currentPassword" className='text-base font-medium mb-2'>Current
                                        password</label>
                                    <Field type="password" name="currentPassword" id='currentPassword'
                                           className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"/>
                                </div>

                                <div className="flex flex-col my-2">
                                    <label htmlFor="password" className='text-base font-medium mb-2'>New
                                        Password</label>
                                    <Field type="password" name="password" id='password'
                                           className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"/>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="confirmPassword" className='text-base font-medium mb-2'>Repeat new
                                        password</label>
                                    <Field type="password" name="confirmPassword" id='confirmPassword'
                                           className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"/>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="username" className='text-base font-medium mb-2'>Username</label>
                                    <Field type="text" name="username" id='username'
                                           className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"/>
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="birthday" className='text-base font-medium'>Date of birth</label>
                                    <div id='birthday' className='w-full flex flex-row items-center'>
                                        <div className="flex flex-col justify-between w-1/6">
                                            <Field type="text" name="day" maxLength={2}
                                                   minLength={2}
                                                   placeholder="DD"
                                                   className='p-2 outline-none border-[1px] hover:border-2'/>
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
                                        </div>
                                        <div className="flex flex-col w-1/5">
                                            <Field
                                                type="text"
                                                name="year"
                                                className="text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"
                                            />
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
                                        <option value="I don't want to specify">I don't want to specify</option>
                                    </Field>
                                </div>

                                <LineDivider/>
                                <div className="flex justify-end items-center my-4">
                                    <button className='text-lg text-gray-500 hover:text-black font-semibold mx-8'
                                            onClick={() => setOpenModal(false)}>Cancel
                                    </button>
                                    <button type="submit"
                                            className="bg-[#1ED760] rounded-3xl w-3/6 md:w-1/6 text-2xl p-2 text-black font-medium">Edit
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