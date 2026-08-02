import { fetchTweets, deleteTweet } from "../../services/authService";
import { useEffect, useState } from 'react';

const SERVER_URL = 'http://localhost:5174';

export function SeeTweets() {
    const [tweets, setTweets] = useState([]);

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

    return (
        <div className="m-auto my-5 w-full md:w-3/5 p-5 bg-[#12121f] rounded-xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Recent Tweets Feed</h3>

            {tweets.length === 0 ? (
                <p className="text-sm text-slate-400">No tweets posted yet.</p>
            ) : (
                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
                    {tweets.map((t) => (
                        <div key={t._id} className="p-4 bg-[#0a0a14] border border-slate-700 rounded-lg flex flex-col gap-3">
                            <div className="flex justify-between items-start gap-4">
                                <p className="text-sm text-slate-200 font-medium break-words flex-1">{t.content}</p>
                                <button
                                    onClick={() => handleDelete(t._id)}
                                    className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded-md text-xs font-semibold hover:bg-red-600 hover:text-white transition-all cursor-pointer shrink-0"
                                    title="Delete Tweet"
                                >
                                    Delete
                                </button>
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
    );
}