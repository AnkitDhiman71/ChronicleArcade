import { Link } from 'react-router-dom';

export function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 rounded-2xl border border-cyan-400/30 bg-[#12121f] text-white">
      <h1 className="text-3xl font-extrabold mb-2">Admin Dashboard ⚡</h1>
      <p className="text-slate-300 mb-8">Welcome admin. Manage arcade games and catalog from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/add-game"
          className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all hover:scale-[1.02] flex flex-col gap-2 group cursor-pointer"
        >
          <span className="text-3xl">🎮</span>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400">Add New Game</h3>
          <p className="text-sm text-slate-400">Publish a new game title, iframe URL, thumbnail, and details to the arcade catalog.</p>
        </Link>
      </div>
    </div>
  );
}
