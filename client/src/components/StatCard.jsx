export function StatCard({ label, value }) {
  return (
    <div className="panel">
      <p className="text-sm text-steel">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}
