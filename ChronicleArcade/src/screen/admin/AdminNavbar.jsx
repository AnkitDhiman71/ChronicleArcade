import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import { logoutUser } from '../../services/authService';

export function AdminNavbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const loginTime = Number(localStorage.getItem('loginTime')) || Date.now();
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - loginTime) / 1000));

    await logoutUser(elapsedSeconds).catch((err) => console.error('Logout error:', err));
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    navigate('/');
  };


  const isActive = (path) => location.pathname === path ? 'text-cyan-400 font-bold' : 'text-slate-300';

  return (
    <nav className="bg-[#0f172a] border-b border-cyan-400/20 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/admin" className="text-xl font-bold text-cyan-400">
          ⚡ Admin Panel
        </Link>

        <div className="hidden md:flex gap-5 text-sm font-medium">
          <Link to="/admin" className={`hover:text-cyan-400 transition-colors ${isActive('/admin')}`}>
            Dashboard
          </Link>
          <Link to="/admin/add-game" className={`hover:text-cyan-400 transition-colors ${isActive('/admin/add-game')}`}>
            Add Game 🎮
          </Link>
          <Link to="/admin/games-list" className={`hover:text-cyan-400 transition-colors ${isActive('/admin/games-list')}`}>
            Games List
          </Link>
          <Link to="/admin/see-tweets" className={`hover:text-cyan-400 transition-colors ${isActive('/admin/games-list')}`}>
            See Tweets
          </Link>
          <Link to="/" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Site Home
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full border border-red-500/40 bg-linear-to-r from-red-600 to-pink-600 px-6 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
            >
              Logout
            </button>
          </motion.div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-cyan-400 text-2xl">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 pt-4 border-t border-cyan-400/20 mt-4">
          <Link to="/admin" onClick={() => setIsOpen(false)} className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isActive('/admin')}`}>
            Dashboard
          </Link>
          <Link to="/admin/add-game" onClick={() => setIsOpen(false)} className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isActive('/admin/add-game')}`}>
            Add Game 🎮
          </Link>
          <Link to="/admin/games-list" onClick={() => setIsOpen(false)} className={`text-sm font-medium hover:text-cyan-400 transition-colors ${isActive('/admin/games-list')}`}>
            Games List
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
            Site Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full border border-red-500/40 bg-linear-to-r from-red-600 to-pink-600 px-6 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}