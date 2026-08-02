import * as yup from 'yup';
export const validateSignupRequest = yup.object({
  username: yup.string().trim().min(2, 'Username must be at least 2 characters').max(50, 'Username must be at most 50 characters').required('Username is required'),
  email: yup.string().trim().email('Email must be a valid email').required('Email is required'),
  password: yup.string().trim().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
