export default function MetricsSummary() {
  const metrics = [
    { label: "Total Users", value: 1820 },
    { label: "Active Sessions", value: 240 },
    { label: "Sales Revenue", value: "$21,480" },
  ];

  return (
    <div className="flex flex-row gap-6 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex-1 bg-white shadow rounded p-4 text-center"
        >
          <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
          <p className="text-2xl font-semibold mt-2">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
