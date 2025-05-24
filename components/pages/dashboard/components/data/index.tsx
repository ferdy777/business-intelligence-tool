"use client";

import FormInput from "@/components/common/formInput";
import { Api } from "@/types";
import { useMemo, useState } from "react";

interface Props {
  dashboardData: Api.Dashboard.GetAnalytics.Response["data"] | undefined;
  isLoading: boolean;
}

export default function DataTable({ dashboardData, isLoading }: Props) {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const salesData = useMemo(() => {
    if (!dashboardData) return [];
    return dashboardData.salesTable;
  }, [dashboardData]);

  const filteredData = salesData
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortAsc ? a.sales - b.sales : b.sales - a.sales));

  return (
    <div className="bg-white dark:bg-grey-dark shadow rounded px-4 py-7 border border-black/5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sales Table</h2>
        {isLoading && <p>Loading...</p>}
        <div className="w-full md:w-auto md:flex-1 md:max-w-[400px]">
          <FormInput
            name="search"
            type="search"
            placeholder="Search by name..."
            showMargin={false}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/20">
            <th className="text-left py-4 px-2">Name</th>
            <th className="text-left py-4 px-2">Email</th>
            <th
              className="text-left py-4 px-2 cursor-pointer"
              onClick={() => setSortAsc(!sortAsc)}
            >
              Sales {sortAsc ? "↑" : "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, i) => (
            <tr
              key={i}
              className="border-b border-black/10 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/10"
            >
              <td className="py-4 px-2">{user.name}</td>
              <td className="py-4 px-2">{user.email}</td>
              <td className="py-4 px-2">${user.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
