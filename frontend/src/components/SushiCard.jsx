import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function SushiCard({ item, onDelete }) {
  return (
    <div className="card overflow-hidden hover:-translate-y-1 transition duration-200">
      <img src={item.image || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800'} alt={item.name} className="h-44 w-full object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="font-black text-xl text-slate-900">{item.name}</h3>
            <p className="text-sm text-slate-500">{item.category || 'Classic'}</p>
          </div>
          <span className="bg-red-50 text-red-700 font-black rounded-xl px-3 py-1">£{Number(item.price).toFixed(2)}</span>
        </div>
        <p className="text-slate-600 text-sm mt-3 min-h-[40px]">{item.description || 'Fresh sushi item prepared for the menu.'}</p>
        <div className="flex gap-2 mt-5">
          <Link to={`/edit/${item._id}`} className="flex-1 btn-dark text-center flex items-center justify-center gap-2"><FaEdit/> Edit</Link>
          <button onClick={() => onDelete(item._id)} className="flex-1 btn-primary flex items-center justify-center gap-2"><FaTrash/> Delete</button>
        </div>
      </div>
    </div>
  );
}
