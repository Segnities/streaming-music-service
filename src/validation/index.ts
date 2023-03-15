import * as Yup from 'yup';
const editProfileValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .min(8)
        .when('password', {
            is: (val: any) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref('password')],
                'Both password need to be the same'
            ),
        })
        .required('Confirm password is required'),
    username: Yup.string().min(4).required('Username is required'),
    currentPassword: Yup.string().required('Current password is required!'),
    day: Yup.string()
        .min(2)
        .max(2)
        .test('day', 'Invalid day', (value) => {
            if (Number(value) < 1 || Number(value) > 31) {
                return false;
            }
            return true;
        })
        .matches(/\d/g, 'Day must contain only numbers!')
        .required('Day of birth is required'),
    month: Yup.string().required('Mounth of birth is required'),
    year: Yup.string()
        .min(4)
        .max(4)
        .test('year', 'Invalid year', (value) => {
            if (Number(value) < 1918 || Number(value) > new Date().getFullYear()) {
                return false;
            }
            return true;
        })
        .matches(/\d/g, 'Year must contain only numbers!')
        .required('Year of birth is required'),
    gender: Yup.string().required('Gender is required'),
})

const signUpValidationSchema = Yup.object().shape({
 email: Yup.string().email().required('Email is required'),
 password: Yup.string()
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .required('Password is required'),
 confirmPassword: Yup.string()
  .min(8)
  .when('password', {
   is: (val: any) => (val && val.length > 0 ? true : false),
   then: Yup.string().oneOf(
    [Yup.ref('password')],
    'Both password need to be the same'
   ),
  })
  .required('Confirm password is required'),
 username: Yup.string().min(4).required('Username is required'),
 day: Yup.string()
  .min(2)
  .max(2)
  .test('day', 'Invalid day', (value) => {
   if (Number(value) < 1 || Number(value) > 31) {
    return false;
   }
   return true;
  })
  .matches(/\d/g, 'Day must contain only numbers!')
  .required('Day of birth is required'),
 month: Yup.string().required('Mounth of birth is required'),
 year: Yup.string()
  .min(4)
  .max(4)
  .test('year', 'Invalid year', (value) => {
   if (Number(value) < 1918 || Number(value) > new Date().getFullYear()) {
    return false;
   }
   return true;
  })
  .matches(/\d/g, 'Year must contain only numbers!')
  .required('Year of birth is required'),
 gender: Yup.string().required('Gender is required'),
});

export { signUpValidationSchema, editProfileValidationSchema };
