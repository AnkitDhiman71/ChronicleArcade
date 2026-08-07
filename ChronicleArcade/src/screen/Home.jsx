import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../API/GetData";
import { motion } from 'motion/react';
import { Slider } from '../components/Slider1';
import { Slider2 } from "../components/Slider2";
import { GameRoulette } from '../components/GameRoulette';
import { toggleFavorite, isFavorite, getFavorites } from '../utils/favorites';
import Tilt from 'react-parallax-tilt';

export function Home() {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favs, setFavs] = useState(getFavorites());
  const navigate = useNavigate();

  const sendData = (gameId) => {
    navigate(`/GameDetails/game-list?id=${gameId}`);
  };

  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        const allGames = result.data || [];
        setGameData(allGames);
      } catch (err) {
        console.error("Failed to fetch game data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, []);

  const handleFavClick = (e, gameId) => {
    e.stopPropagation();
    toggleFavorite(gameId);
    setFavs(getFavorites());
  };


  return (
    <div className="relative bg-[#060814] min-h-screen overflow-hidden text-white">
      <div className="absolute -top-25 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-aura" />
      <div className="relative z-10">
        <div className="relative h-[65vh] min-h-105 w-full overflow-hidden">
          <img
            src='https://images.unsplash.com/photo-1631896928983-2c94ea6f97e8?w=1200&auto=format&fit=crop&q=80'
            alt="Latest Games"
            className="w-full h-full object-cover scale-105 filter brightness-75 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#060814]/70 via-[#060814]/50 to-[#060814]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-wider text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              🎮 NEXT-GEN ARCADE PLATFORM 
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white font-extrabold tracking-tight leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}
            >
              Latest <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">Games</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Explore high-octane gaming experiences, leaderboard action, and vibrant titles in the arcade universe.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(0, 240, 255, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3.5 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 text-base font-extrabold rounded-full shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              onClick={() => navigate('/explore')}
            >
              Browse All Games 🚀
            </motion.button>
          </div>
        </div>

        <div className="py-4">
          <Slider />
          <Slider2 />
        </div>

        <GameRoulette gamesList={gameData} />



        <div className="mx-auto max-w-6xl px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 border-b border-white/10 pb-4"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              Popular <span className="text-cyan-400">Titles</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">
              Updated Live
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="h-44 w-full bg-white/10" />
                  <div className="flex flex-col flex-1 p-4 gap-2.5">
                    <div className="h-4 w-2/3 rounded bg-white/10" />
                    <div className="h-3 w-full rounded bg-white/10" />
                    <div className="h-3 w-4/5 rounded bg-white/10" />
                    <div className="mt-auto h-5 w-16 rounded-full bg-white/10" />
                  </div>
                </div>
              ))
            ) : gameData.length === 0 ? (
              <p className="col-span-full text-center text-slate-400 py-12 text-lg">
                No games found right now. Check back soon!
              </p>
            ) : (
              gameData.map((game, i) => (
                <motion.div
                  key={game.id || game._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="h-full"
                >
                  <Tilt
                    tiltMaxAngleX={25}
                    tiltMaxAngleY={25}
                    perspective={600}
                    scale={1.06}
                    glareEnable={true}
                    glareMaxOpacity={0.4}
                    glareColor="#00f0ff"
                    glarePosition="all"
                    glareBorderRadius="1rem"
                    className="h-full rounded-2xl overflow-hidden"
                  >
                    <div
                      onClick={() => sendData(game.id || game._id)}
                      className="group glass-card flex flex-col h-full cursor-pointer rounded-2xl overflow-hidden shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-44 w-full overflow-hidden">
                        <img
                          src={game.thumbnail}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={game.title}
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
                        <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                          {game.short_description}
                        </p>
                        <span className="mt-auto self-start text-[11px] font-semibold text-cyan-300 border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                          {game.genre || 'Arcade'}
                        </span>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}