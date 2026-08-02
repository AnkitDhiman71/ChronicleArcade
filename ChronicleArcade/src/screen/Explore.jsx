import { useState, useEffect } from "react";
import { getData } from '../API/GetData';
import { useNavigate } from "react-router-dom";
import { motion } from 'motion/react';
import { GameRoulette } from "../components/GameRoulette";

export function Explore() {
    const [games, setGames] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            const allGames = result.data || [];
            setGames(allGames);
            setResults(allGames);
        };
        fetchData();
    }, []);

    const searchGames = () => {
        const search = query.trim().toLowerCase();
        setResults(
            games.filter((game) =>
                !search ||
                `${game.title || ""} ${game.short_description || ""}`
                    .toLowerCase()
                    .includes(search)
            )
        );
    };

    return (
        <div className="min-h-screen bg-[#060814] text-white py-10 px-4">
            <div className="mx-auto max-w-6xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center text-3xl font-extrabold text-white md:text-5xl tracking-wide"
                >
                    Explore <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Games</span>
                </motion.h1>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center gap-3 max-w-xl mx-auto mb-8"
                >
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchGames()}
                        className="flex-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3.5 text-sm text-white placeholder:text-slate-400 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={searchGames}
                        className="rounded-full bg-linear-to-r from-cyan-400 to-blue-500 px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
                    >
                        Search
                    </motion.button>
                </motion.div>

                {/* Roulette Random Game Spinner */}
                <GameRoulette gamesList={games} />


                {/* Game Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((game, i) => (
                        <motion.div
                            key={game.id || game._id || i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                            whileHover={{ y: -7, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(`/GameDetails/game-list?id=${game.id || game._id}`)}
                            className="group glass-card flex flex-col h-full cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                        >
                            <div className="relative h-44 w-full overflow-hidden">
                                <img
                                    src={game.thumbnail}
                                    alt={game.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#060814] via-transparent to-transparent opacity-80" />
                            </div>

                            <div className="flex flex-col flex-1 p-4">
                                <h2 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                                    {game.title}
                                </h2>
                                <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                                    {game.short_description}
                                </p>
                                {game.genre && (
                                    <span className="mt-auto self-start text-[11px] font-semibold text-cyan-300 border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 rounded-full">
                                        {game.genre}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}