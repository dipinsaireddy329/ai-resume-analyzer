import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../api/http.js';

export function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!file) return setError('Choose a PDF resume first');
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('targetRole', targetRole);
      const { data } = await http.post('/api/resumes', formData);
      await http.post(`/api/resumes/${data.resume._id}/analyze`);
      navigate(`/resumes/${data.resume._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Upload Resume</h1>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <input className="input" placeholder="Target role, e.g. Frontend Engineer" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
        <label className="grid cursor-pointer place-items-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center hover:border-mint">
          <UploadCloud className="mb-3 text-mint" size={36} />
          <span className="font-semibold">{file?.name || 'Select PDF resume'}</span>
          <span className="text-sm text-steel">PDF only, up to the configured server limit</span>
          <input className="hidden" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0])} />
        </label>
        {error && <p className="text-sm text-coral">{error}</p>}
        <button className="btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Upload and Analyze'}</button>
      </form>
    </section>
  );
}
