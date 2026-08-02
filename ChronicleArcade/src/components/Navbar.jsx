import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { logoutUser } from '../services/authService';

export function MainNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const currentlyLoggedIn = Boolean(localStorage.getItem('token'));
            setIsLoggedIn((prev) => (prev !== currentlyLoggedIn ? currentlyLoggedIn : prev));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        const loginTime = Number(localStorage.getItem('loginTime')) || Date.now();
        const elapsedSeconds = Math.max(0, Math.floor((Date.now() - loginTime) / 1000));

        await logoutUser(elapsedSeconds).catch((err) => console.error('Logout error:', err));
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('loginTime');
        setIsLoggedIn(false);
        navigate("/")
    };

    return (
        <nav className="sticky top-0 z-50 bg-[#060814]/80 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all duration-300">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.img
                        whileHover={{ rotate: 720, scale: 1.1, transition: { duration: 2 } }}
                        transition={{ type: "spring" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JFEkck4EmVmFReUngP5Z8c8niK416pwmfiCiAsGa6w&s=10"
                        width="42"
                        height="42"
                        alt="Arcade logo"
                        className="rounded-full drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                    />
                    <span className="text-xl font-extrabold tracking-wide text-white">
                        Chronicle <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">Arcade</span>
                    </span>
                </Link>

                <input type="checkbox" id="nav-toggle" className="peer hidden" />
                <label
                    htmlFor="nav-toggle"
                    className="flex h-9 w-9 cursor-pointer flex-col justify-center items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 md:hidden hover:border-cyan-400/40">
                    <span className="block h-0.5 w-5 bg-white transition-all"></span>
                    <span className="block h-0.5 w-5 bg-white transition-all"></span>
                    <span className="block h-0.5 w-5 bg-white transition-all"></span>
                </label>

                <div className="absolute left-0 top-full hidden w-full flex-col gap-4 border-t border-white/10 bg-[#0a0a16] px-6 py-5 peer-checked:flex md:static md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0">
                    <Link to="/" className="font-semibold text-slate-300 transition-all duration-200 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">Home</Link>
                    <Link to="/explore" className="font-semibold text-slate-300 transition-all duration-200 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">Explore</Link>
                    <Link to="/leaderboard" className="font-semibold text-slate-300 transition-all duration-200 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">Leaderboard</Link>
                    <Link to="/tweet" className="font-semibold text-slate-300 transition-all duration-200 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">Post Tweet</Link>
                    <Link to="/contactus" className="font-semibold text-slate-300 transition-all duration-200 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">Contact Us</Link>
                    {!isLoggedIn ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/login"
                                className="inline-flex items-center justify-center rounded-full border border-cyan-400/40 bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]">
                                Login
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center rounded-full border border-red-500/40 bg-linear-to-r from-red-600 to-pink-600 px-6 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
                            >
                                Logout
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </nav>
    );
}