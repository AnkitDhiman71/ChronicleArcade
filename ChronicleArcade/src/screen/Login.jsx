import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { fields } from '../Formfields/loginFields';
import { loginUser } from '../services/authService';

const initialState = {
    email: '',
    password: '',
};

const loginSchema = yup.object({
    email: yup
        .string()
        .required('Please enter email')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'),
    password: yup
        .string()
        .required('Please enter password')
        .matches(/^.{6,}$/, 'Password must be at least 6 characters'),
});

export function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: loginSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const data = await loginUser(values);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }

                localStorage.setItem('lastSyncTime', Date.now().toString());

                const isAdmin = values.email === 'ankitdhiman@gmail.com' && values.password === 'Ankit@123';
                if (isAdmin) {
                    localStorage.setItem('role', 'admin');
                    setStatus({ success: true, message: 'Admin login successful' });
                    navigate('/admin');
                } else {
                    localStorage.setItem('role', 'user');
                    setStatus({ success: true, message: 'Login successful' });
                    navigate('/');
                }
            } catch (error) {
                setStatus({ success: false, message: error.message });
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
                <div className="text-sm text-red-400 mt-1 min-h-5">
                    {formik.touched[field.name] && formik.errors[field.name] ? formik.errors[field.name] : null}
                </div>
            </div>
        );
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-white text-center mt-5">User Login</h1>
            <form
                onSubmit={formik.handleSubmit}
                className="max-w-md mx-auto p-6 rounded-2xl border border-white/10 bg-[#12121f] shadow-lg flex flex-col gap-4 mt-5"
            >
                {fields.map((field) => FormHandler(field))}
                {formik.status && (
                    <div className={formik.status.success ? 'text-green-400' : 'text-red-400'}>
                        {formik.status.message}
                    </div>
                )}
                <input
                    type="submit"
                    value="Login"
                    className="mt-2 px-6 py-2.5 bg-cyan-400 text-black font-bold rounded-lg shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                />

                <p className="text-center text-sm text-slate-300">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="text-cyan-400 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    );
}

