import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  confirmpassword: Yup.string().required('Required'),
});