import { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postTweet, fetchTweets, deleteTweet } from '../services/authService';

const SERVER_URL = 'http://localhost:5174';

export function GameTweets() {
  const fileInputRef = useRef(null);
  const [tweets, setTweets] = useState([]);
  const isAdmin = localStorage.getItem('role') === 'admin';

  const loadTweets = async () => {
    try {
      const data = await fetchTweets();
      if (data.tweets) {
        setTweets(data.tweets);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tweet?')) {
      try {
        await deleteTweet(id);
        loadTweets();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      content: '',
      image: null,
    },
    validationSchema: yup.object({
      content: yup.string().required('Please enter text'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await postTweet(values.content, values.image);
        resetForm();
        if (fileInputRef.current) fileInputRef.current.value = '';
        loadTweets();
      } catch (err) {
        alert(err.message);
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-4 my-8">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Game Tweets</h2>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-2/5 p-5 bg-[#12121f] rounded-xl border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Post Tweet</h3>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
              <textarea
                name="content"
                rows="4"
                placeholder="Write your game tweet here..."
                value={formik.values.content}
                onChange={formik.handleChange}
                className="w-full p-3 bg-[#0a0a14] border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-400 resize-none"
              />
              {formik.touched.content && formik.errors.content && (
                <p className="text-xs text-red-400 mt-1">{formik.errors.content}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-lg text-xs text-white cursor-pointer hover:border-cyan-400"
                >
                  📷 Upload Image
                </button>

                {formik.values.image && (
                  <span className="text-xs text-cyan-400 truncate max-w-[100px]">
                    {formik.values.image.name}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="px-4 py-2 bg-cyan-400 text-black font-bold text-sm rounded-lg hover:bg-cyan-300 disabled:opacity-50 cursor-pointer"
              >
                {formik.isSubmitting ? 'Posting...' : 'Tweet'}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-3/5 p-5 bg-[#12121f] rounded-xl border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Recent Tweets Feed</h3>

          {tweets.length === 0 ? (
            <p className="text-sm text-slate-400">No tweets posted yet.</p>
          ) : (
            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
              {tweets.map((t) => (
                <div key={t._id} className="p-4 bg-[#0a0a14] border border-slate-700 rounded-lg flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm text-slate-200 font-medium break-words flex-1">{t.content}</p>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded-md text-xs font-semibold hover:bg-red-600 hover:text-white transition-all cursor-pointer shrink-0"
                        title="Delete Tweet"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {t.image && (
                    <img
                      src={`${SERVER_URL}${t.image}`}
                      alt="Tweet attachment"
                      className="w-full max-h-60 object-contain rounded-md border border-slate-800 bg-black/40"
                    />
                  )}

                  <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-white/5">
                    <span>{new Date(t.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}