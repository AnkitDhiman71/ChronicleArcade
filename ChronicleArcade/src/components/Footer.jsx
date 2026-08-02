import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-[#04060f] border-t border-white/10 text-white mt-auto">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xl font-bold text-white tracking-wide">
                        Chronicle <span className="text-cyan-400">Arcade</span>
                    </p>
                    <p className="mt-1.5 max-w-sm text-xs text-slate-400 leading-relaxed">
                        A modern arcade experience with powerful game browsing, user login, and a dynamic UI.
                    </p>
                </div>
                <div className="flex flex-row items-center gap-6 text-sm font-medium">
                    <Link to="/" className="text-slate-300 transition hover:text-cyan-400">Home</Link>
                    <Link to="/explore" className="text-slate-300 transition hover:text-cyan-400">Explore</Link>
                    <Link to="/contactus" className="text-slate-300 transition hover:text-cyan-400">Contact</Link>
                </div>
            </div>
            <div className="border-t border-white/5 bg-[#02030a] px-4 py-4 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} Chronicle Arcade. Built for modern arcade enthusiasts.
            </div>
        </footer>
    );
}