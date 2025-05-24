"use client";

import MetricsSummary from "@/components/pages/dashboard/components/metrics";
import SalesChart from "@/components/pages/dashboard/components/sales";
import UserGrowthChart from "@/components/pages/dashboard/components/user";
import CategoryChart from "@/components/pages/dashboard/components/category";
import DataTable from "@/components/pages/dashboard/components/data";
import Container from "@/components/common/container";
import { useEffect, useState } from "react";
import { getAnalyticsService } from "@/services/dashboard";
import { Api } from "@/types";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] =
    useState<Api.Dashboard.GetAnalytics.Response["data"]>();

  useEffect(() => {
    handleFetchAnalytics();
  }, []);

  const handleFetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const res = await getAnalyticsService();

      setDashboardData(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Container>
        <MetricsSummary dashboardData={dashboardData} isLoading={isLoading} />

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <SalesChart dashboardData={dashboardData} isLoading={isLoading} />
          <UserGrowthChart
            dashboardData={dashboardData}
            isLoading={isLoading}
          />
          <CategoryChart dashboardData={dashboardData} isLoading={isLoading} />
        </section>

        <DataTable dashboardData={dashboardData} isLoading={isLoading} />
      </Container>
    </main>
  );
};

export default Dashboard;
