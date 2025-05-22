"use client";
import { useState } from "react";

const mockData = [
  { name: "Alice Johnson", email: "alice@example.com", sales: 1200 },
  { name: "Bob Smith", email: "bob@example.com", sales: 900 },
  { name: "Carol White", email: "carol@example.com", sales: 1500 },
];

export default function DataTable() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredData = mockData
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortAsc ? a.sales - b.sales : b.sales - a.sales));

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-center mb-4 pr-12">
        <h2 className="text-lg font-semibold">Sales Table</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded text-sm"
        />
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Email</th>
            <th
              className="text-left py-2 cursor-pointer"
              onClick={() => setSortAsc(!sortAsc)}
            >
              Sales {sortAsc ? "↑" : "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">${user.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
