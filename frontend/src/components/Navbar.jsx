import { Link, useNavigate } from 'react-router-dom';
import { FaFish } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('token'); navigate('/login'); };
  return (
    <nav className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-black text-2xl text-slate-900"><FaFish className="text-red-600"/> SushiHub</Link>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link className="hover:text-red-600" to="/">Dashboard</Link>
          <Link className="hover:text-red-600" to="/sushi">Menu</Link>
          <Link className="bg-red-600 text-white rounded-xl px-4 py-2 hover:bg-red-700" to="/add">Add Sushi</Link>
          <button onClick={logout} className="text-slate-600 hover:text-red-600">Logout</button>
        </div>
      </div>
    </nav>
  );
}
