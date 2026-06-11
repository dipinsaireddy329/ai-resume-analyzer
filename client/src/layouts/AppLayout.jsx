import { BarChart3, LogOut, Shield, Upload } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export function AppLayout() {
  const { user, isAdmin, logout } = useAuth();
  const navClass = ({ isActive }) => `btn-secondary ${isActive ? 'border-mint text-mint' : ''}`;

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link to="/dashboard" className="text-xl font-bold text-ink">AI Resume Analyzer</Link>
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink className={navClass} to="/dashboard"><BarChart3 size={16} /> Dashboard</NavLink>
            <NavLink className={navClass} to="/upload"><Upload size={16} /> Upload</NavLink>
            {isAdmin && <NavLink className={navClass} to="/admin"><Shield size={16} /> Admin</NavLink>}
            <span className="hidden text-sm text-steel md:inline">{user?.name}</span>
            <button className="btn-secondary" onClick={logout}><LogOut size={16} /> Logout</button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
