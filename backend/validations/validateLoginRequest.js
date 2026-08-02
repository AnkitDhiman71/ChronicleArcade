import * as yup from 'yup';
export const validateLoginRequest = yup.object({
  email: yup.string().trim().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,'Enter a valid email address').required('Email is required'),
  password: yup.string().trim().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    ).required('Password is required'),
});