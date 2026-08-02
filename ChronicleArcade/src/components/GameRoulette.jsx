import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../API/GetData';

export function GameRoulette({ gamesList = [] }) {
  const [games, setGames] = useState(gamesList);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gamesList.length > 0) {
      setGames(gamesList);
    } else {
      getData().then((res) => setGames(res?.data || []));
    }
  }, [gamesList]);

  const spin = () => {
    if (!games.length) return;
    setIsSpinning(true);

    let count = 0;
    const timer = setInterval(() => {
      setWinner(games[Math.floor(Math.random() * games.length)]);
      count++;
      if (count >= 12) {
        clearInterval(timer);
        setIsSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="my-10 max-w-3xl mx-auto p-6 md:p-8 rounded-3xl border border-cyan-400/30 bg-[#0c1024] text-center shadow-[0_0_30px_rgba(0,240,255,0.15)]">
      <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
        🎰 ARCADE ROULETTE
      </span>
      <h3 className="text-2xl md:text-3xl font-extrabold text-white">Can't Decide What to Play?</h3>
      <p className="text-sm text-slate-300 mb-6 mt-1">Spin the reel to let the Arcade pick a random game for you!</p>

      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-8 py-3.5 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 text-slate-950 font-extrabold text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] disabled:opacity-50 cursor-pointer transition-all scale-105"
      >
        {isSpinning ? '🎰 SPINNING...' : '🎲 SPIN ROULETTE NOW'}
      </button>

      {winner && (
        <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-left transition-all">
          <img src={winner.thumbnail} alt={winner.title} className="w-36 h-24 object-cover rounded-xl border border-white/10 shadow-md" />
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-extrabold text-lg text-white line-clamp-1">{winner.title}</h4>
            <p className="text-xs text-slate-300 line-clamp-2 mt-1 mb-2">{winner.short_description}</p>
            <span className="text-xs text-cyan-300 font-semibold bg-cyan-500/10 border border-cyan-400/30 px-3 py-0.5 rounded-full">
              {winner.genre || 'Arcade'}
            </span>
          </div>
          <button
            onClick={() => navigate(`/GameDetails/game-list?id=${winner.id || winner._id}`)}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-extrabold text-sm hover:bg-cyan-300 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
          >
            PLAY NOW 🚀
          </button>
        </div>
      )}
    </div>
  );
}
