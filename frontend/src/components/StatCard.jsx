export default function StatCard({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
    </div>
  );
}
