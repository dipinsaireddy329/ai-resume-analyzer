import { Download, Eye, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../api/http.js';
import { StatCard } from '../components/StatCard.jsx';

export function DashboardPage() {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    http.get(`/api/resumes?${params}`).then(({ data }) => setResumes(data.resumes));
  }, [search, status]);

  const analyzed = useMemo(() => resumes.filter((resume) => resume.status === 'analyzed').length, [resumes]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total uploads" value={resumes.length} />
        <StatCard label="Analyzed" value={analyzed} />
        <StatCard label="Pending" value={resumes.length - analyzed} />
      </div>
      <section className="panel">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Upload History</h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-steel" size={16} />
              <input className="input pl-9" placeholder="Search resumes" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="input w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All statuses</option>
              <option value="parsed">Parsed</option>
              <option value="analyzed">Analyzed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-steel"><tr><th className="py-3">File</th><th>Status</th><th>Target Role</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {resumes.map((resume) => (
                <tr className="border-b last:border-0" key={resume._id}>
                  <td className="py-3 font-medium">{resume.originalName}</td>
                  <td>{resume.status}</td>
                  <td>{resume.targetRole || 'General'}</td>
                  <td>{new Date(resume.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2 py-2">
                    <Link className="btn-secondary" to={`/resumes/${resume._id}`}><Eye size={15} /> View</Link>
                    {resume.status === 'analyzed' && <a className="btn-secondary" href={`/api/resumes/${resume._id}/report`}><Download size={15} /> PDF</a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!resumes.length && <p className="py-8 text-center text-sm text-steel">No resumes found.</p>}
        </div>
      </section>
    </div>
  );
}
