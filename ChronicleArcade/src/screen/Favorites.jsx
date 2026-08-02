import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { getData } from '../API/GetData';
import { getFavorites, toggleFavorite, isFavorite } from '../utils/favorites';

export function Favorites() {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadFavoriteGames = async () => {
    setLoading(true);
    try {
      const result = await getData();
      const allGames = result.data || [];
      const favIds = getFavorites();
      const filtered = allGames.filter((game) =>
        favIds.includes(String(game.id || game._id))
      );
      setFavoriteGames(filtered);
    } catch (err) {
      console.error('Failed to load favorite games:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavoriteGames();
  }, []);

  const handleRemoveFavorite = (e, gameId) => {
    e.stopPropagation();
    toggleFavorite(gameId);
    setFavoriteGames((prev) =>
      prev.filter((g) => String(g.id || g._id) !== String(gameId))
    );
  };

  return (
    <div className="min-h-screen bg-[#060814] text-white py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            ❤️ MY COLLECTION
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide">
            Favorite <span className="bg-linear-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Games</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">Your bookmarked arcade library</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-16 text-cyan-400 font-semibold text-lg animate-pulse">
            Loading your favorites...
          </div>
        ) : favoriteGames.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto p-8 rounded-3xl border border-white/10 bg-white/5 text-center shadow-xl backdrop-blur-md"
          >
            <div className="text-5xl mb-4">🤍</div>
            <h3 className="text-xl font-bold text-white mb-2">No Favorites Yet</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Explore our arcade collection and click the ❤️ heart icon on any game to bookmark it here!
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-3 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 cursor-pointer transition-transform"
            >
              Browse Explore Page 🚀
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteGames.map((game, i) => (
              <motion.div
                key={game.id || game._id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -7, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/GameDetails/game-list?id=${game.id || game._id}`)}
                className="group glass-card flex flex-col h-full cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-pink-500/20 hover:border-pink-500/50"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#060814] via-transparent to-transparent opacity-80" />
                  <button
                    onClick={(e) => handleRemoveFavorite(e, game.id || game._id)}
                    className="absolute top-2.5 right-2.5 z-20 rounded-full bg-black/60 p-2 text-xs backdrop-blur-md transition-transform hover:scale-125 border border-white/10 cursor-pointer"
                    title="Remove from Favorites"
                  >
                    ❤️
                  </button>
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-pink-300 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                    {game.short_description}
                  </p>
                  {game.genre && (
                    <span className="mt-auto self-start text-[11px] font-semibold text-pink-300 border border-pink-400/30 bg-pink-500/10 px-2.5 py-0.5 rounded-full">
                      {game.genre}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
