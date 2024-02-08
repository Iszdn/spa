import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  username: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.number().positive('Password must be positive').required('Required'),
  number: Yup.number().positive('Password must be positive').required('Required'),
  confirmpassword: Yup.number().positive('Password must be positive').required('Required'),
});