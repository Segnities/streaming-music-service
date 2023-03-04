import React, { ReactNode } from "react";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { RiErrorWarningFill } from "react-icons/ri";

interface Fields {
    email: string,
    password: string,
    username: string,
    confirmPassword: string,
    day: string,
    mounth: string,
    year: string,
    gender: string
}
interface Props {
    onSubmitCallback: (values: Fields) => void;
    isFieldUnique: {
        email: boolean,
        username: boolean
    };
    disabledFields: {
        email: boolean,
        password: boolean,
        username: boolean,
        birthday: boolean,
        gender: boolean,
    },
    labelTextColor?: string;
    children?: ReactNode;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Password is required'),
    confirmPassword: Yup.string().min(8).when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same")
    }).required('Confirm password is required'),
    username: Yup.string().min(4).required('Username is required'),
    day: Yup.string().min(2).max(2).test('day', 'Invalid day', (value) => {
        if (Number(value) < 1 || Number(value) > 31) {
            return false;
        }
        return true
    }).matches(/\d/g, 'Day must contain only numbers!').required('Day of birth is required'),
    mounth: Yup.string().required('Mounth of birth is required'),
    year: Yup.string().min(4).max(4).test('year', 'Invalid year', (value) => {
        if (Number(value) < 1918 || Number(value) > new Date().getFullYear()) {
            return false;
        }
        return true;
    }).matches(/\d/g, 'Year must contain only numbers!').required('Year of birth is required'),
    gender: Yup.string().required('Gender is required')
})

function UserAuthFields(props: Props) {
    const { onSubmitCallback, isFieldUnique, disabledFields, labelTextColor, children } = props;

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    username: '',
                    confirmPassword: '',
                    day: '',
                    mounth: '',
                    year: '',
                    gender: ''

                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmitCallback(values)
                }}
            >
                {
                    ({ errors, touched, values }) => (
                        <Form autoComplete="off">
                            <div className="flex flex-col">
                                <label htmlFor="email" className={`text-sm font-bold my-1 ${labelTextColor}`}>Enter your email address</label>
                                <Field
                                    type="text"
                                    id="email"
                                    autoComplete="off"
                                    disabled={disabledFields.email}
                                    name="email"
                                    placeholder="Enter your email address"
                                    className={`
                                            text-base normal-case my-1 
                                            outline-none
                                            line tracking-normal p-3 border-[1px] 
                                            focus-visible:border-[3px] 
                                            ${(errors.email || !isFieldUnique.email) && !disabledFields.email ? "border-red-700" : "border-gray-800"}`}
                                />
                                {
                                    errors.email && touched.email && !disabledFields.email ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.email}</span>
                                        </div>
                                    ) : null
                                }
                                {
                                    isFieldUnique.email === false && touched.email && !disabledFields.email ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">This email already exist!</span>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className={`text-sm font-bold my-1 ${labelTextColor}`}>Create a password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    disabled={disabledFields.password}
                                    id="password"
                                    placeholder="Password"
                                    className={`
                                                text-base normal-case line my-1 tracking-normal 
                                                p-3 border-[1px] 
                                                outline-none
                                                focus-visible:border-[3px] 
                                                ${errors.password && !disabledFields.password ? "border-red-700" : "border-gray-800"}`}
                                />
                                {
                                    errors.password && touched.password && !disabledFields.password ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.password}</span>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confirm-password" className={`text-sm font-bold my-1 ${labelTextColor}`}>Confirm password</label>
                                <Field
                                    type="password"
                                    autoComplete="off"
                                    disabled={disabledFields.password}
                                    id="confirm-password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className={`
                                                text-base normal-case line my-1 tracking-normal 
                                                p-3 border-[1px] 
                                                outline-none
                                                focus-visible:border-[3px] 
                                                ${errors.confirmPassword && !disabledFields.password ? "border-red-700" : "border-gray-800"}`}
                                />
                                {
                                    errors.confirmPassword && touched.confirmPassword && !disabledFields.password ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.confirmPassword}</span>
                                        </div>) : null
                                }
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="username" className={`text-sm font-bold my-1 ${labelTextColor}`}>Username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    autoComplete="off"
                                    disabled={disabledFields.username}
                                    id="username"
                                    placeholder="Name of profile"
                                    className={`
                                                text-base normal-case line my-1 tracking-normal 
                                                p-3 border-[1px] 
                                                outline-none
                                                focus-visible:border-[3px] 
                                                ${(errors.username || !isFieldUnique.username) && !disabledFields.username ? "border-red-700" : "border-gray-800"}`}
                                />
                                {
                                    errors.username && !disabledFields.birthday && touched.username ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.username}</span>
                                        </div>) : null
                                }
                                {
                                    isFieldUnique.username === false && touched.username && !disabledFields.birthday ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">This username already exist!</span>
                                        </div>) : null
                                }

                            </div>
                            <div className="flex flex-col justify-between">
                                <p className={`my-3 font-bold text-sm ${labelTextColor}`}>Enter your birthday</p>
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col justify-between w-1/6">
                                        <label htmlFor="day" className={`text-base font-medium mb-2 ${labelTextColor}`}>Day</label>
                                        <Field
                                            type="text"
                                            disabled={disabledFields.birthday}
                                            autoComplete="off"
                                            id="day"
                                            name="day"
                                            maxLength={2}
                                            minLength={2}
                                            placeholder="DD"
                                            className={`
                                                        p-2 outline-none 
                                                        border-[1px] hover:border-2 
                                                        ${errors.day ? "border-red-700" : "border-gray-500"}
                                                        hover:${errors.day ? "border-red-800" : "border-black"}`}
                                        />
                                    </div>
                                    <div className="flex flex-col w-2/3 px-3">
                                        <label htmlFor="mounth" className={`text-base ${labelTextColor} font-medium mb-2`}>Mounth</label>
                                        <Field
                                            as="select"
                                            autoComplete="off"
                                            name="mounth"
                                            id="mounth"
                                            disabled={disabledFields.birthday}
                                            className={`
                                                    p-2 border-[1px] hover:border-2 
                                                    ${errors.mounth ? "border-red-700" : "border-gray-500"} 
                                                    hover:${errors.mounth ? "border-red-700" : "border-black"}`}
                                        >
                                            <option value="" disabled>Mounth</option>
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
                                        <label htmlFor="year" className={`text-base font-medium mb-2 ${labelTextColor}`}>Year</label>
                                        <Field
                                            type="text"
                                            name="year"
                                            autoComplete="off"
                                            id="year"
                                            disabled={disabledFields.birthday}
                                            placeholder="YYYY"
                                            minLength={4}
                                            maxLength={4}
                                            className={`
                                                        p-2 
                                                        border-[1px]  
                                                        ${errors.year ? "border-red-700" : "border-gray-500"} 
                                                        hover:${errors.year ? "border-red-700" : "border-black"} 
                                                        outline-none`}
                                        />
                                    </div>
                                </div>
                                {
                                    errors.day && !disabledFields.birthday && touched.day ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.day}</span>
                                        </div>) : null
                                }
                                {
                                    errors.mounth && !disabledFields.birthday && touched.mounth && values.mounth.length === 0 ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.mounth}</span>
                                        </div>) : null
                                }
                                {
                                    errors.year && !disabledFields.birthday && touched.year ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.year}</span>
                                        </div>) : null
                                }
                            </div>
                            <div className="mt-3">
                                <p className={`text-base my-2 font-bold ${labelTextColor}`}>Enter your gender</p>
                                <div className="flex flex-row flex-wrap">
                                    <div className="flex flex-row-reverse items-center mr-2">
                                        <label htmlFor="male-gender" className={`ml-1 ${labelTextColor}`}>Male</label>
                                        <Field
                                            type="radio"
                                            autoComplete="off"
                                            disabled={disabledFields.gender}
                                            name="gender"
                                            value="Male"
                                            id="male-gender"
                                            className="w-4 h-4"
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse mx-2 items-center">
                                        <label htmlFor="female-gender" className={`ml-1 ${labelTextColor}`}>Female</label>
                                        <Field
                                            type="radio"
                                            autoComplete="off"
                                            name="gender"
                                            disabled={disabledFields.gender}
                                            value="Female"
                                            id="female-gender"
                                            className="w-4 h-4"
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse mx-2 items-center">
                                        <label htmlFor="non-binary-gender" className={`ml-1 ${labelTextColor}`}>Non-binary</label>
                                        <Field
                                            type="radio"
                                            autoComplete="off"
                                            disabled={disabledFields.gender}
                                            name="gender"
                                            value="Non-binary"
                                            id="non-binary-gender"
                                            className="w-4 h-4"
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse mx-0 sm:mx-2 items-center">
                                        <label htmlFor="another-gender" className={`ml-1 ${labelTextColor}`}>Another</label>
                                        <Field
                                            type="radio"
                                            autoComplete="off"
                                            name="gender"
                                            disabled={disabledFields.gender}
                                            value="Another"
                                            id="another-gender"
                                            className="w-4 h-4"
                                        />
                                    </div>
                                    <div className="flex flex-row-reverse mx-0 sm:mx-2 items-center">
                                        <label htmlFor="not-specified-gender" className={`ml-1 ${labelTextColor}`}>I don't want to specify</label>
                                        <Field
                                            type="radio"
                                            name="gender"
                                            autoComplete="off"
                                            disabled={disabledFields.gender}
                                            value="I don't want to specify"
                                            id="not-specified-gender"
                                            className="w-4 h-4"
                                        />
                                    </div>
                                </div>
                                {
                                    errors.gender && !disabledFields.gender && touched.gender ? (
                                        <div className="flex items-center mt-1">
                                            <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                            <span className="text-sm font-semibold text-red-700">{errors.gender}</span>
                                        </div>) : null
                                }
                            </div>
                            {
                                children
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default UserAuthFields;