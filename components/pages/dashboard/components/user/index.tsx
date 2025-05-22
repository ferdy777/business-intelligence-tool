"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Q1", users: 200 },
  { name: "Q2", users: 450 },
  { name: "Q3", users: 700 },
  { name: "Q4", users: 850 },
];

export default function UserGrowthChart() {
  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">User Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#10B981" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
