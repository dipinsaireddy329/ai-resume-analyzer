import { Download, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { http } from '../api/http.js';

function List({ title, items }) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <ul className="space-y-2 text-sm text-steel">
        {(items?.length ? items : ['No data available']).map((item) => <li className="rounded-md bg-slate-50 p-2" key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function ResumeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const response = await http.get(`/api/resumes/${id}`);
    setData(response.data);
  }

  useEffect(() => {
    load();
  }, [id]);

  async function analyze() {
    setLoading(true);
    await http.post(`/api/resumes/${id}/analyze`);
    await load();
    setLoading(false);
  }

  async function remove() {
    await http.delete(`/api/resumes/${id}`);
    navigate('/dashboard');
  }

  if (!data) return <div className="text-sm text-steel">Loading...</div>;
  const { resume, analysis } = data;

  return (
    <div className="space-y-6">
      <section className="panel flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{resume.originalName}</h1>
          <p className="text-sm text-steel">Status: {resume.status} · Target role: {resume.targetRole || 'General'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary" onClick={analyze} disabled={loading}><RefreshCw size={16} /> {loading ? 'Analyzing' : 'Analyze'}</button>
          {analysis && <a className="btn-primary" href={`/api/resumes/${id}/report`}><Download size={16} /> Download PDF</a>}
          <button className="btn-secondary text-coral" onClick={remove}><Trash2 size={16} /> Delete</button>
        </div>
      </section>
      {analysis ? (
        <>
          <section className="grid gap-4 md:grid-cols-[220px_1fr]">
            <div className="panel text-center">
              <p className="text-sm text-steel">ATS Score</p>
              <p className="mt-3 text-5xl font-bold text-mint">{analysis.atsScore}</p>
              <p className="text-sm text-steel">out of 100</p>
            </div>
            <div className="panel">
              <h2 className="mb-4 text-lg font-bold">Role Predictions</h2>
              <div className="space-y-3">
                {analysis.rolePredictions.map((prediction) => (
                  <div key={prediction.role}>
                    <div className="flex justify-between text-sm font-semibold"><span>{prediction.role}</span><span>{prediction.matchPercentage}%</span></div>
                    <div className="mt-1 h-2 rounded bg-slate-100"><div className="h-2 rounded bg-mint" style={{ width: `${prediction.matchPercentage}%` }} /></div>
                    <p className="mt-1 text-sm text-steel">{prediction.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="panel grid gap-6 md:grid-cols-2">
            <List title="Extracted Skills" items={analysis.skills} />
            <List title="Missing Skills" items={analysis.missingSkills} />
            <List title="Strengths" items={analysis.strengths} />
            <List title="Weaknesses" items={analysis.weaknesses} />
            <div className="md:col-span-2"><List title="Recommendations" items={analysis.recommendations} /></div>
          </section>
        </>
      ) : (
        <section className="panel text-center">
          <p className="text-steel">No analysis yet.</p>
          <button className="btn-primary mt-4" onClick={analyze}>Run Analysis</button>
        </section>
      )}
      <Link className="text-sm text-mint" to="/dashboard">Back to dashboard</Link>
    </div>
  );
}
