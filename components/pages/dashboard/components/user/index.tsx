"use client";
import { Api } from "@/types";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  dashboardData: Api.Dashboard.GetAnalytics.Response["data"] | undefined;
  isLoading: boolean;
}

export default function UserGrowthChart({ dashboardData, isLoading }: Props) {
  const growthData = useMemo(() => {
    if (!dashboardData) return [];
    return dashboardData.growthChart;
  }, [dashboardData]);

  return (
    <div className="bg-white dark:bg-grey-dark shadow border border-black/5 rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">User Growth</h2>
      {isLoading && <p>Loading...</p>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={growthData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#10B981" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
