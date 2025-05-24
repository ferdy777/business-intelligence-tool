"use client";

import { Api } from "@/types";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  dashboardData: Api.Dashboard.GetAnalytics.Response["data"] | undefined;
  isLoading: boolean;
}

export default function SalesChart({ dashboardData, isLoading }: Props) {
  const salesData = useMemo(() => {
    if (!dashboardData) return [];
    return dashboardData.salesChart;
  }, [dashboardData]);

  return (
    <div className="bg-white dark:bg-grey-dark shadow border border-black/5 rounded px-4 py-7 mb-6">
      <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
      {isLoading && <p>Loading...</p>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
