import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signupFields } from '../Formfields/signupFields';
import { signupUser } from '../services/authService';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const signupSchema = yup.object({
  username: yup
    .string()
    .required('Please enter username')
    .matches(/^[a-zA-Z0-9_]{3,20}$/, 'Username must be 3-20 characters (letters, numbers, underscores)'),
  email: yup
    .string()
    .required('Please enter email')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/, 'Password must be at least 6 characters with letters and numbers'),
});

export function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signupSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const data = await signupUser(values);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        localStorage.setItem('role', 'user');
        setStatus({ success: true, message: 'Signup successful' });
        console.log('Signup response:', data);
        navigate('/login');
      } catch (error) {
        setStatus({ success: false, message: error.message || 'Signup failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const FormHandler = (field) => {
    return (
      <div key={field.name} className="mb-3">
        <input
          type={field.type}
          {...formik.getFieldProps(field.name)}
          placeholder={field.placeholder}
          className="w-full px-4 py-2 rounded-lg border border-white/10 bg-[#0a0a14] text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
        />
        <div className="text-sm text-red-400 mt-1 min-h-[20px]">
          {formik.touched[field.name] && formik.errors[field.name] ? formik.errors[field.name] : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center mt-5">Create Account</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto p-6 rounded-2xl border border-white/10 bg-[#12121f] shadow-lg flex flex-col gap-4 mt-5"
      >
        {signupFields.map((field) => FormHandler(field))}

        {formik.status && (
          <div className={formik.status.success ? 'text-green-400' : 'text-red-400'}>
            {formik.status.message}
          </div>
        )}

        <input
          type="submit"
          value="Sign Up"
          className="mt-2 px-6 py-2.5 bg-cyan-400 text-black font-bold rounded-lg shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        />
        <p className="text-center text-sm text-slate-300">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-cyan-400 font-semibold hover:underline">
            Login
          </button>
        </p>
      </form>
    </>
  );
}

