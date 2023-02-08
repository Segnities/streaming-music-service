import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { RiErrorWarningFill } from "react-icons/ri";

const forgotPasswordSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required('Required')
})

function ForgotPassword() {
    return (
        <div className="w-full flex flex-1 justify-center">
            <div className="w-full md:w-1/3 flex p-3 md:p-0  flex-col items-center text-center">
                <h2 className="font-black text-2xl sm:text-3xl md:text-[2.9em] lg:text-[3.4em] text-center">Password reset</h2>
                <p className="w-5/6 text-lg mt-10">Enter your <b>Vite username</b> or <strong>email address</strong> provided when you signed up.
                    We'll send you an email with your username and a link to reset your password.</p>
                <Formik
                    initialValues={{ emailOrUsername: "" }}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={values => {
                        console.log(values);
                    }}>
                    {
                        ({ errors, touched }) => (
                            <Form className="w-full flex flex-col text-start mt-4">
                                <label htmlFor="email-or-username" className="text-sm font-bold my-1">Enter email address or username</label>
                                <Field name='emailOrUsername' type="text" id="email-or-username" placeholder="Enter email address or username" className="text-base normal-case my-1 line tracking-normal p-3 border-[1px] focus-visible:border-[3px] border-gray-800" />
                                {
                                    errors.emailOrUsername && touched.emailOrUsername ?
                                        (<div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" /><span className="text-sm text-red-700">{errors.emailOrUsername}</span>
                                        </div>) : null
                                }
                                <button type="submit" className="bg-[#1ED760] w-32 text-base mt-4 self-center p-3 rounded-3xl text-black font-medium hover:scale-105 hover:transition-transform">Send</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default ForgotPassword;