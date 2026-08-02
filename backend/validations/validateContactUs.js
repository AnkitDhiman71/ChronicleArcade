import * as yup from 'yup';
export const validateContactUs = yup.object({
  name: yup.string().trim().required('Name is required').max(100, 'Name is too long'),
  phone: yup.string().trim().required('Phone number is required').max(30, 'Phone number is too long'),
  message: yup.string().trim().required('Message is required').max(1000, 'Message is too long'),
});
