import { useState } from "react";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "../firebase/firebaseConfig";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { RiErrorWarningFill } from "react-icons/ri";

interface Props {
    setIsResetEmailSent: React.Dispatch<React.SetStateAction<boolean>>
}

interface Fields {
    email: string;
}
type MyError = { code: number | string, message: string } | null;


const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required')
});


const ResetEmail = (props: Props) => {
    const { setIsResetEmailSent } = props;
    const auth = getAuth(firebaseApp);

    const [resetPasswordError, setResetPasswordError] = useState<MyError>(null);
    const handleOnSubmit = async (values: Fields) => {
        try {
            await sendPasswordResetEmail(auth, values.email);
        } catch (err) {
            setResetPasswordError(err as MyError);
        } finally {
            if (!resetPasswordError) {
                setIsResetEmailSent(true);
            }
        }
    }

    return (
        <div className="w-full flex flex-1 justify-center">
            <div className="w-full md:w-1/3 flex p-3 md:p-0  flex-col text-center items-center">
                {
                    resetPasswordError && (
                        <div className='w-full flex flex-col p-5 rounded-md'>
                            <h4 className='text-red-600 text-2xl font-semibold'>Error!</h4>
                            <p className='text-red-500 text-base font-medium'>{resetPasswordError.code} {resetPasswordError.message}</p>
                        </div>
                    )
                }
                <h2 className="font-black text-2xl sm:text-3xl md:text-[2.9em] lg:text-[3.4em] text-center">Password
                    reset</h2>
                <p className="w-5/6 text-lg mt-10">Enter your or <strong>email address</strong> provided when you signed
                    up.
                    We'll send you an email with your username and a link to reset your password.</p>
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        handleOnSubmit(values);
                    }}>
                    {
                        ({ errors, touched }) => (
                            <Form className="w-full flex flex-col text-start mt-4">
                                <label htmlFor="email-or-username" className="text-sm font-bold my-1">Enter email
                                    address or username</label>
                                <Field
                                    name='email'
                                    type="text" id="email"
                                    placeholder="Enter email address or username"
                                    className={`text-base normal-case my-1 line focus:outline-0 tracking-normal p-3 border-[1px] focus-visible:border-[3px] ${errors.email ? "border-red-700" : "border-gray-800"}`} />
                                {
                                    errors.email && touched.email ?
                                        (<div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" /><span
                                                className="text-sm font-semibold text-red-700">{errors.email}</span>
                                        </div>) : null
                                }
                                <button type="submit"
                                    className="bg-[#1ED760] w-32 text-xl mt-4 self-center p-3 rounded-3xl text-black font-medium hover:scale-105 hover:transition-transform">Send
                                </button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
};

export default ResetEmail;