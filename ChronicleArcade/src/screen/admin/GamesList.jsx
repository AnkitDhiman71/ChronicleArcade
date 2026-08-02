import { getData } from "../../API/GetData";
import { useEffect, useState } from "react";
import { deleteGame } from "../../services/authService";

export function GamesList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData().then((res) => {
            if (res.success && Array.isArray(res.data)) {
                setData(res.data);
            }
            setLoading(false);
        });
    }, []);
    const handleDelete = async (gameId) => {
    if (!window.confirm('Are you sure you want to delete this game?')) return;
    try {
      await deleteGame(gameId);
      setData(data.filter(g => (g.id || g._id) !== gameId));
    } catch (error) {
      console.error('Error deleting game:', error);
      alert('Failed to delete game');
    }
  };

    return (
        <div className="max-w-5xl mx-auto p-6 text-white">
            <h1 className="text-3xl font-extrabold mb-6 text-cyan-400">Games List</h1>

            {loading ? (
                <p className="text-slate-400">Loading games...</p>
            ) : data.length === 0 ? (
                <p className="text-slate-400">No games found in the database.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((game, index) => (
                        <div key={game.id || game._id || index} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
                            {game.thumbnail && (
                                <img src={game.thumbnail} alt={game.title} className="w-full h-36 object-cover rounded-xl" />
                            )}
                            <h3 className="text-xl font-bold text-white">{game.title}</h3>
                            <p className="text-sm text-slate-300 line-clamp-2">{game.description}</p>
                            <span className="text-xs text-cyan-400 font-semibold px-2.5 py-1 rounded-full bg-cyan-400/10 w-fit">
                                {game.genre}
                            </span>
                            <button
                                type="button"
                                className="bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500 hover:text-white transition-all px-4 py-1.5 rounded-xl font-bold text-xs cursor-pointer w-fit mt-auto"
                                onClick={() => handleDelete(game.id || game._id)}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
    