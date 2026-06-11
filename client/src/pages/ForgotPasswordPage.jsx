import { useState } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../api/http.js';
import { AuthShell } from '../components/AuthShell.jsx';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');

  async function submit(event) {
    event.preventDefault();
    const { data } = await http.post('/api/auth/forgot-password', { email });
    setResult(data.resetToken ? `Reset token: ${data.resetToken}` : data.message);
  }

  return (
    <AuthShell title="Reset password" subtitle="Generate a secure reset token for your account.">
      <form className="space-y-4" onSubmit={submit}>
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary w-full">Generate Token</button>
      </form>
      {result && <p className="mt-4 break-words rounded-md bg-slate-50 p-3 text-sm text-steel">{result}</p>}
      <Link className="mt-4 inline-block text-sm text-mint" to="/login">Back to login</Link>
    </AuthShell>
  );
}
