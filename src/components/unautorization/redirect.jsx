import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ isAuth, path, children }) => {
  if (!isAuth && path !== 'auth') {
    return <Navigate to="/auth" replace />;
  }

  return children;
};