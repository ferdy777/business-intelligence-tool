import { Api } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { useMemo } from "react";

interface Props {
  dashboardData: Api.Dashboard.GetAnalytics.Response["data"] | undefined;
  isLoading: boolean;
}

const MetricsSummary = ({ dashboardData, isLoading }: Props) => {
  const metrics = useMemo(() => {
    const dashboardCardData = dashboardData?.cards;
    return [
      { label: "Total Users", value: dashboardCardData?.totalUsers || 0 },
      {
        label: "Active Sessions",
        value: dashboardCardData?.activeSessions || 0,
      },
      {
        label: "Sales Revenue",
        value: formatCurrency(dashboardCardData?.salesRevenue || 0),
      },
    ];
  }, [dashboardData]);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex-1 bg-white dark:bg-grey-dark shadow border border-black/5 rounded px-4 py-7 text-center"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-white">
            {metric.label}
          </h3>
          <p className="text-3xl font-semibold mt-2">
            {isLoading ? "Loading..." : metric.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricsSummary;
