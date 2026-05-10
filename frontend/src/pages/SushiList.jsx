import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import SushiCard from '../components/SushiCard';
import API from '../services/api';

export default function SushiList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try { const res = await API.get('/api/sushi'); setItems(res.data); }
    catch { toast.error('Could not load sushi items'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const deleteItem = async (id) => {
    if (!confirm('Delete this sushi item?')) return;
    try { await API.delete(`/api/sushi/${id}`); toast.success('Item deleted'); fetchItems(); }
    catch { toast.error('Delete failed'); }
  };
  const filtered = items.filter(i => i.name?.toLowerCase().includes(search.toLowerCase()) || i.category?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-100"><Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div><h1 className="text-3xl font-black">Sushi Menu</h1><p className="text-slate-500">Read, update and delete menu records from the backend API.</p></div>
          <input className="input md:w-80" placeholder="Search by name/category..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        {loading ? <p className="card p-8">Loading menu...</p> :
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(item => <SushiCard key={item._id} item={item} onDelete={deleteItem} />)}</div>}
      </main>
    </div>
  );
}
