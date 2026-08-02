import { useState, useEffect } from "react";
import { getData } from '../API/GetData';
import { useNavigate } from "react-router-dom";
import { motion } from 'motion/react';
import { GameRoulette } from "../components/GameRoulette";
import { toggleFavorite, isFavorite, getFavorites } from "../utils/favorites";

export function Explore() {
    const [games, setGames] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showOnlyFavs, setShowOnlyFavs] = useState(false);
    const [favs, setFavs] = useState(getFavorites());
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

    const searchGames = (filterFavs = showOnlyFavs) => {
        const search = query.trim().toLowerCase();
        let filtered = games.filter((game) =>
            !search ||
            `${game.title || ""} ${game.short_description || ""}`
                .toLowerCase()
                .includes(search)
        );

        if (filterFavs) {
            filtered = filtered.filter((game) => isFavorite(game.id || game._id));
        }

        setResults(filtered);
    };

    const handleFavClick = (e, gameId) => {
        e.stopPropagation();
        toggleFavorite(gameId);
        const currentFavs = getFavorites();
        setFavs(currentFavs);
        
        if (showOnlyFavs) {
            setResults(games.filter((game) => currentFavs.includes(String(game.id || game._id))));
        }
    };

    const toggleFavFilter = () => {
        const nextFavState = !showOnlyFavs;
        setShowOnlyFavs(nextFavState);
        searchGames(nextFavState);
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

                {/* Search Bar & Favorites Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto mb-8"
                >
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchGames()}
                        className="flex-1 w-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3.5 text-sm text-white placeholder:text-slate-400 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    />
                    
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => searchGames()}
                            className="rounded-full bg-linear-to-r from-cyan-400 to-blue-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
                        >
                            Search
                        </motion.button>

                        <button
                            type="button"
                            onClick={toggleFavFilter}
                            className={`rounded-full px-5 py-3.5 text-sm font-extrabold transition-all cursor-pointer border ${
                                showOnlyFavs
                                    ? 'bg-pink-600/30 border-pink-500 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                                    : 'bg-white/5 border-white/15 text-slate-300 hover:border-pink-400/40 hover:text-white'
                            }`}
                        >
                            {showOnlyFavs ? '❤️ Favorites' : '🤍 Favorites'}
                        </button>
                    </div>
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
                                <button
                                    onClick={(e) => handleFavClick(e, game.id || game._id)}
                                    className="absolute top-2.5 right-2.5 z-20 rounded-full bg-black/60 p-2 text-xs backdrop-blur-md transition-transform hover:scale-125 border border-white/10 cursor-pointer"
                                    title={isFavorite(game.id || game._id) ? "Remove from Favorites" : "Add to Favorites"}
                                >
                                    {isFavorite(game.id || game._id) ? '❤️' : '🤍'}
                                </button>
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