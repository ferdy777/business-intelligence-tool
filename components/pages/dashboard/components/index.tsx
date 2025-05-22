import MetricsSummary from "@/components/pages/dashboard/components/metrics";
import SalesChart from "@/components/pages/dashboard/components/sales";
import UserGrowthChart from "@/components/pages/dashboard/components/user";
import CategoryChart from "@/components/pages/dashboard/components/category";
import DataTable from "@/components/pages/dashboard/components/data";

const Dashboard = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 ">
        <MetricsSummary />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-4">Sales Trends</h2>
          <SalesChart />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-4">User Growth</h2>
          <UserGrowthChart />
        </div>
        <div className=" rounded shadow p-4 bg-white">
          <h2 className="font-semibold mb-4">Category Distribution</h2>
          <CategoryChart />
        </div>
      </section>

      <section className="bg-white rounded shadow p-4">
        <DataTable />
      </section>
    </main>
  );
};

export default Dashboard;
