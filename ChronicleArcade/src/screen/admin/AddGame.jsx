import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { gameFields } from '../../Formfields/gameFields';
import { addGame } from '../../services/authService';

const gameSchema = yup.object({
    title: yup
        .string()
        .required('Game title is required')
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must be under 100 characters'),
    description: yup
        .string()
        .required('Description is required')
        .min(5, 'Description must be at least 5 characters'),
    genre: yup
        .string()
        .required('Genre is required'),
    thumbnail: yup
        .string()
        .required('Thumbnail URL is required')
        .url('Must be a valid URL'),
    iframeUrl: yup
        .string()
        .required('Game URL is required')
        .url('Must be a valid URL'),
    developer: yup
        .string()
        .notRequired(),
    releaseDate: yup
        .string()
        .notRequired(),
    controls: yup
        .string()
        .notRequired(),
    rating: yup
        .number()
        .typeError('Rating must be a number')
        .min(0, 'Rating cannot be less than 0')
        .max(5, 'Rating cannot be more than 5')
        .notRequired(),
    featured: yup
        .boolean()
        .notRequired(),
});

const initialValues = {
    title: '',
    description: '',
    genre: '',
    thumbnail: '',
    iframeUrl: '',
    developer: '',
    releaseDate: '',
    controls: '',
    rating: '',
    featured: false,
};

const inputStyles = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-400 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)]";

const InputField = ({ field, formik }) => {
    const ErrorMsg = ({ name }) =>
        formik.touched[name] && formik.errors[name] ? (
            <span className="text-xs text-red-400 mt-1 block">{formik.errors[name]}</span>
        ) : null;

    if (field.type === 'textarea') {
        return (
            <div>
                <textarea rows={4} placeholder={field.placeholder} className={inputStyles} {...formik.getFieldProps(field.name)} />
                <ErrorMsg name={field.name} />
            </div>
        );
    }

    if (field.type === 'checkbox') {
        return (
            <div>
                <label className="flex items-center gap-2 text-sm text-slate-200 cursor-pointer">
                    <input type="checkbox" {...formik.getFieldProps(field.name)} checked={formik.values[field.name]} className="w-4 h-4 rounded accent-cyan-400" />
                    {field.label}
                </label>
                <ErrorMsg name={field.name} />
            </div>
        );
    }

    return (
        <div>
            <input type={field.type === 'number' ? 'number' : 'text'} placeholder={field.placeholder} className={inputStyles} {...formik.getFieldProps(field.name)} />
            {field.name === 'thumbnail' && formik.values.thumbnail && formik.values.thumbnail.startsWith('http') && (
                <div className="mt-2 flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-cyan-400/30">
                    <img src={formik.values.thumbnail} alt="Thumbnail preview" className="w-14 h-14 object-cover rounded-lg shadow-md" />
                    <span className="text-xs text-cyan-300 font-medium">✓ Live Thumbnail Preview</span>
                </div>
            )}
            <ErrorMsg name={field.name} />
        </div>
    );
};

export const AddGame = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: gameSchema,
        onSubmit: async (values, { setStatus, resetForm, setSubmitting }) => {
            try {
                const data = await addGame(values);
                setStatus({ success: true, message: data.message || 'Game added successfully' });
                resetForm();
                navigate('/explore');
            } catch (error) {
                setStatus({ success: false, message: error.message });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-[80vh]  flex items-center justify-center py-12 px-4 bg-[#060814]" >
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={formik.handleSubmit}
                className="w-full max-w-4xl p-8 rounded-3xl glass-card shadow-2xl flex flex-col gap-5 border border-white/10"
            >
                <h2 className="text-3xl font-extrabold text-white text-center tracking-wide">
                    Add a <span className="text-cyan-400">Game</span>
                </h2>

                {formik.status?.message && (
                    <div className={`text-sm text-center font-medium p-3 rounded-xl border ${formik.status.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                        {formik.status.message}
                    </div>
                )}

                {gameFields.map((field) => (
                    <div key={field.name}>
                        {field.type !== 'checkbox' && (
                            <label className="text-sm text-slate-300 mb-1 block">
                                {field.label}
                                {field.required && <span className="text-red-400 ml-1">*</span>}
                            </label>
                        )}
                        <InputField field={field} formik={formik} />
                    </div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="mt-3 px-6 py-3.5 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {formik.isSubmitting ? 'Adding...' : 'Add Game 🎮'}
                </motion.button>
            </motion.form>
        </div>
    );
};