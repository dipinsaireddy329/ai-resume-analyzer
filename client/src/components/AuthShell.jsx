import { BrainCircuit } from 'lucide-react';

export function AuthShell({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud px-4">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-mint text-white"><BrainCircuit size={22} /></div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-sm text-steel">{subtitle}</p>
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
