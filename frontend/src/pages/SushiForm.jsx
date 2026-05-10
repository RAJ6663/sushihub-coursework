import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import API from '../services/api';

export default function SushiForm({ mode }) {
  const [form, setForm] = useState({ name:'', price:'', category:'Classic', image:'', description:'' });
  const navigate = useNavigate();
  const { id } = useParams();
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (mode === 'edit') API.get(`/api/sushi/${id}`).then(res => setForm(res.data)).catch(()=>toast.error('Could not load item'));
  }, [mode, id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name is required');
    if (!form.price || Number(form.price) <= 0) return toast.error('Price must be above 0');
    try {
      if (mode === 'add') await API.post('/api/sushi', form);
      else await API.put(`/api/sushi/${id}`, form);
      toast.success(mode === 'add' ? 'Sushi added' : 'Sushi updated');
      navigate('/sushi');
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };

  return <div className="min-h-screen bg-slate-100"><Navbar />
    <main className="max-w-3xl mx-auto px-4 py-8">
      <form onSubmit={submit} className="card p-8 space-y-4">
        <h1 className="text-3xl font-black">{mode === 'add' ? 'Add Sushi' : 'Edit Sushi'}</h1>
        <input name="name" className="input" placeholder="Name" value={form.name} onChange={change}/>
        <input name="price" className="input" type="number" step="0.01" placeholder="Price" value={form.price} onChange={change}/>
        <select name="category" className="input" value={form.category} onChange={change}><option>Classic</option><option>Premium</option><option>Vegetarian</option><option>Spicy</option></select>
        <input name="image" className="input" placeholder="Image URL" value={form.image || ''} onChange={change}/>
        <textarea name="description" className="input min-h-32" placeholder="Description" value={form.description || ''} onChange={change}/>
        <button className="btn-primary w-full">{mode === 'add' ? 'Create Sushi' : 'Update Sushi'}</button>
      </form>
    </main>
  </div>;
}
