import { useEffect, useState } from 'react';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:5174/api/auth/leaderboard');
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
      } else {
        setError('Failed to load leaderboard data');
      }
    } catch (err) {
      setError('Error connecting to backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return '0s';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(' ');
  };

  const MEDALS = ['🥇', '🥈', '🥉'];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Leaderboard 🏆
        </h1>
        <p className="text-slate-400 text-sm mt-1">Top players ranked by total active time</p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-cyan-400 font-semibold">Loading leaderboard...</div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center text-red-400 text-sm">
          {error}
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
          No players recorded yet. Log in and stay active to claim the top spot!
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div
              key={user._id || index}
              className="flex items-center justify-between p-4 bg-slate-900/60 border border-white/10 rounded-xl hover:border-cyan-400/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl w-8 text-center">
                  {MEDALS[index] || <span className="text-base text-slate-400 font-bold">#{index + 1}</span>}
                </span>
                <span className="font-bold text-white text-base md:text-lg">{user.username}</span>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-sm font-bold px-3 py-1.5 rounded-lg">
                {formatTime(user.loggedInTime)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
