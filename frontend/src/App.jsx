import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SushiList from './pages/SushiList.jsx';
import AddSushi from './pages/AddSushi.jsx';
import EditSushi from './pages/EditSushi.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/sushi" element={<ProtectedRoute><SushiList /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddSushi /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditSushi /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
