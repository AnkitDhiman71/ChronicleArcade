import { Navigate, useLocation } from 'react-router-dom';

export function AdminRoute({ children }) {
  const location = useLocation();
  const isAdmin = localStorage.getItem('role') === 'admin';

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
