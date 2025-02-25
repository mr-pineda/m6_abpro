import { Navigate, Outlet } from 'react-router';
const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = token === 'admin' || token === 'doctor';
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};
export default ProtectedRoute;
