import { Home } from './screen/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainNavbar } from './components/Navbar';
import { GameList } from './components/GameList';
import { Explore } from './screen/Explore';
import { Contactus } from './screen/Contactus';
import { Signup } from './screen/Signup';
import { Login } from './screen/Login';
import { Slider } from './components/Slider1';
import { Slider2 } from './components/Slider2';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import { AdminPage } from './screen/admin/AdminPage';
import { AdminNavbar } from './screen/admin/AdminNavbar';
import { Footer } from './components/Footer';
import { Leaderboard } from './components/Leaderboard';
import { AddGame } from './screen/admin/AddGame';
import { GamesList } from './screen/admin/GamesList';
import { GameTweets } from './components/GameTweets';
import { SeeTweets } from './screen/admin/SeeTweets';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#060814] text-white">
      {isAdminRoute ? <AdminNavbar /> : <MainNavbar />}
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path='/admin/add-game' element={<AdminRoute><AddGame /></AdminRoute>} />
          <Route path='/admin/games-list' element={<AdminRoute><GamesList /></AdminRoute>} />
          <Route path='/admin/see-tweets' element={<AdminRoute><SeeTweets /></AdminRoute>} />
          <Route path='/GameDetails' element={<PrivateRoute><GameList /></PrivateRoute>} />
          <Route path='/GameDetails/game-list' element={<PrivateRoute><GameList /></PrivateRoute>} />
          <Route path='/GameDetails/:gameId' element={<PrivateRoute><GameList /></PrivateRoute>} />
          <Route path='/GameDetails/slider1' element={<PrivateRoute><Slider /></PrivateRoute>} />
          <Route path='/GameDetails/slider2' element={<PrivateRoute><Slider2 /></PrivateRoute>} />
          <Route path='/tweet' element={<PrivateRoute><GameTweets /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;