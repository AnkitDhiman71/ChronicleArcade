import { Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('token') || localStorage.getItem('role'));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
