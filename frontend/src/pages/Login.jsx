import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('admin@sushi.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) return toast.error('Enter a valid email and password');
    try {
      setLoading(true);
      const res = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 flex items-center justify-center p-4">
      <form onSubmit={submit} className="card w-full max-w-md p-8">
        <h1 className="text-4xl font-black text-slate-900">SushiHub</h1>
        <p className="text-slate-500 mt-2">Secure admin login for sushi menu management.</p>
        <div className="mt-8 space-y-4">
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
        <p className="text-xs text-slate-400 mt-5">Demo login: admin@sushi.com / password123</p>
      </form>
    </div>
  );
}
