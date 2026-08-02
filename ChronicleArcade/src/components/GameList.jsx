import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export const GameList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("id");
    const [gameDetails, setGameDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGameDetails() {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5174/api/games/${gameId}`);
                if (!response.ok) {
                    throw new Error(`Game not found (Server status: ${response.status})`);
                }
                const data = await response.json();
                setGameDetails(data);
            } catch (err) {
                console.error("Failed to fetch game details:", err);
                setError(err.message || "Failed to load game details");
                setGameDetails(null);
            } finally {
                setIsLoading(false);
            }
        }
        if (gameId) {
            fetchGameDetails();
        } else {
            setIsLoading(false);
            setError("No game ID provided.");
        }
    }, [gameId]);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xx6QvNdPrylMNACGjOu99oQOWpjAkPo8vT80S5n6WA&s=10')` }}
        >
            <div className="min-h-screen bg-black/70 px-4 py-6 flex flex-col">
                <div className="mx-auto mt-5 flex-1 w-full max-w-6xl">
                    {isLoading ? (
                        <div className="animate-pulse rounded-2xl border border-white/10 bg-[#12121f] p-6 shadow-2xl">
                            <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                                <div className="h-64 rounded-xl bg-white/10" />
                                <div className="space-y-3">
                                    <div className="h-6 w-2/3 rounded bg-white/10" />
                                    <div className="h-4 w-full rounded bg-white/10" />
                                    <div className="h-4 w-5/6 rounded bg-white/10" />
                                    <div className="h-10 w-32 rounded-lg bg-cyan-400/20" />
                                </div>
                            </div>
                        </div>
                    ) : error || !gameDetails ? (
                        <div className="rounded-2xl border border-white/10 bg-[#12121f] p-8 text-center text-white shadow-2xl">
                            <h2 className="text-2xl font-bold text-red-400 mb-2">Game Not Found</h2>
                            <p className="text-slate-300 mb-6">{error || "The requested game details could not be found."}</p>
                            <button
                                className="rounded-lg bg-cyan-400 px-6 py-2 font-semibold text-black transition-transform hover:scale-105"
                                onClick={() => navigate('/')}
                            >
                                Back to Home
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            className="rounded-2xl border border-white/10 bg-[#12121f] p-6 shadow-2xl text-white"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                                <img
                                    src={gameDetails.thumbnail}
                                    alt={gameDetails.title}
                                    className="h-64 w-full rounded-xl object-cover shadow-lg"
                                />
                                <div>
                                    <h2 className="mb-4 text-2xl font-bold text-cyan-300">
                                        {gameDetails.title}
                                    </h2>
                                    <div className="mb-4 space-y-1 text-sm text-slate-300">
                                        <p><span className="font-semibold text-white">Genre:</span> {gameDetails.genre}</p>
                                        <p><span className="font-semibold text-white">Platform:</span> {gameDetails.platform || 'Web Browser (Iframe)'}</p>
                                        <p><span className="font-semibold text-white">Publisher:</span> {gameDetails.publisher || gameDetails.developer}</p>
                                        <p><span className="font-semibold text-white">Developer:</span> {gameDetails.developer}</p>
                                        <p><span className="font-semibold text-white">Release Date:</span> {gameDetails.release_date || gameDetails.releaseDate}</p>
                                    </div>

                                    <div className="mb-4 rounded-xl border border-white/10 bg-[#0a0a14] p-4">
                                        <h3 className="mb-2 text-lg font-semibold text-white">Description</h3>
                                        <p className="text-sm leading-6 text-slate-300">{gameDetails.description}</p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-[#0a0a14] p-0 overflow-hidden">
                                        <iframe
                                            title={gameDetails.title || 'Game Player'}
                                            src={gameDetails.iframeUrl || gameDetails.game_url}
                                            width="100%"
                                            height="600"
                                            className="min-h-150 w-full bg-black border-0"
                                            allowFullScreen
                                            allow="autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write; gaming"
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center gap-3">
                                        <a
                                            href={gameDetails.iframeUrl || gameDetails.game_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center rounded-lg bg-cyan-400 px-6 py-2 font-semibold text-black transition-transform hover:scale-105"
                                        >
                                            Open Fullscreen in New Tab 🚀
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="mt-6 mb-2 flex justify-center">
                    <button
                        className="rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
                        onClick={() => navigate('/')}
                    >
                        ⬅️ Back
                    </button>
                </div>
            </div>
        </div>
    );
};