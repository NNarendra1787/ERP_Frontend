import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';

export default function ProtectedRoute({ children }) {
  const token = useSelector(s => s.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}
