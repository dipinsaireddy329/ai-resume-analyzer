import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Analyze resumes with ATS and role-fit intelligence.">
      <form className="space-y-4" onSubmit={submit}>
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-coral">{error}</p>}
        <button className="btn-primary w-full">Login</button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link className="text-mint" to="/register">Create account</Link>
        <Link className="text-mint" to="/forgot-password">Forgot password</Link>
      </div>
    </AuthShell>
  );
}
