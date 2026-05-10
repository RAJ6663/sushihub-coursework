import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  useEffect(() => { API.get('/api/sushi').then(res => setItems(res.data)).catch(()=>{}); }, []);
  const highest = items.length ? Math.max(...items.map(i => Number(i.price) || 0)) : 0;
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="rounded-3xl bg-gradient-to-r from-slate-950 to-red-800 text-white p-8 shadow-xl">
          <h1 className="text-4xl font-black">Sushi Menu Dashboard</h1>
          <p className="mt-3 text-slate-200 max-w-2xl">Manage restaurant menu items using a secure API with JWT authentication and full CRUD operations.</p>
          <Link to="/sushi" className="inline-block mt-6 bg-white text-slate-950 font-bold rounded-xl px-5 py-3">Open Menu</Link>
        </section>
        <section className="grid md:grid-cols-3 gap-5 mt-6">
          <div className="card p-6"><p className="text-slate-500">Total items</p><h2 className="text-4xl font-black">{items.length}</h2></div>
          <div className="card p-6"><p className="text-slate-500">Highest price</p><h2 className="text-4xl font-black">£{highest.toFixed(2)}</h2></div>
          <div className="card p-6"><p className="text-slate-500">API status</p><h2 className="text-4xl font-black text-green-600">Live</h2></div>
        </section>
      </main>
    </div>
  );
}
