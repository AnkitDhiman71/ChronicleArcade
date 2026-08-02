import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { fields } from '../Formfields/fields';
import { contactUs } from '../services/authService';

const contactSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .matches(/^[a-zA-Z\s]{2,50}$/, 'Name must contain only letters (2-50 characters)'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    message: yup
        .string()
        .required('Message is required')
        .matches(/^.{5,1000}$/, 'Message must be at least 5 characters long'),
});

export function Contactus() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            message: ''
        },
        validationSchema: contactSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const data = await contactUs(values);
                setStatus({ success: true, message: data.message || 'Message sent successfully' });
                navigate('/');
            } catch (error) {
                setStatus({ success: false, message: error.message || 'Unable to send message' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    function handleInput(field) {
        const inputStyles = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-400 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)]";

        if (field.type === 'textarea') {
            return (
                <div className="flex flex-col gap-1">
                    <textarea
                        rows={4}
                        placeholder={field.placeholder}
                        className={inputStyles}
                        {...formik.getFieldProps(field.name)}
                    />
                    <div className="min-h-5">
                        {formik.touched[field.name] && formik.errors[field.name] && (
                            <span className="text-xs text-red-400">{formik.errors[field.name]}</span>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-1">
                <input
                    type={field.type === 'phone' ? 'tel' : 'text'}
                    placeholder={field.placeholder}
                    className={inputStyles}
                    {...formik.getFieldProps(field.name)}
                />
                <div className="min-h-5">
                    {formik.touched[field.name] && formik.errors[field.name] && (
                        <span className="text-xs text-red-400">{formik.errors[field.name]}</span>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-[#060814]">
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={formik.handleSubmit}
                className="w-full max-w-lg p-8 rounded-3xl glass-card shadow-2xl flex flex-col gap-5 border border-white/10"
            >
                <h2 className="text-3xl font-extrabold text-white text-center tracking-wide">
                    Send a <span className="text-cyan-400">Suggestion</span>
                </h2>

                {formik.status?.message && (
                    <div className={`text-sm text-center font-medium p-3 rounded-xl border ${formik.status.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                        {formik.status.message}
                    </div>
                )}

                {fields.map((field) => (
                    <div key={field.name}>{handleInput(field)}</div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="mt-3 px-6 py-3.5 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer"
                >
                    Send Message 🚀
                </motion.button>
            </motion.form>
        </div>
    );
}
