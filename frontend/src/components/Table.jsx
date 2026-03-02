export default function Table({ columns, data }) {
  return (
    <div className="overflow-auto rounded-lg bg-white shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>{columns.map((c) => <th className="p-2 text-left" key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr className="border-t" key={idx}>
              {columns.map((c) => <td className="p-2" key={c.key}>{row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
