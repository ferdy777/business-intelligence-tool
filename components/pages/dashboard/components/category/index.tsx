"use client";

import { Api } from "@/types";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  dashboardData: Api.Dashboard.GetAnalytics.Response["data"] | undefined;
  isLoading: boolean;
}

const data = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 300 },
];
const COLORS = ["#6366F1", "#10B981", "#F59E0B"];

export default function CategoryChart({ dashboardData, isLoading }: Props) {
  const categoryData = useMemo(() => {
    if (!dashboardData) return [];
    return dashboardData.categoryChart;
  }, [dashboardData]);

  return (
    <div className="bg-white dark:bg-grey-dark shadow border border-black/5 rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
      {isLoading && <p>Loading...</p>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
