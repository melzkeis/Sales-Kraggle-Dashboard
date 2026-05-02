"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "@/components/atoms/StatCard";
import { ChartControls } from "@/components/molecules/ChartControls";
import type { SalesRecord } from "@/lib/sales-data";

export type ChartType = "bar" | "line" | "pie";

type SalesApiResponse = {
  source: string;
  data: SalesRecord[];
};

const chartColors = ["#047857", "#2563eb", "#d97706", "#7c3aed", "#db2777", "#0891b2"];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

export function SalesChart() {
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>([]);
  const [activeYear, setActiveYear] = useState(2024);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSales() {
      const response = await fetch("/api/sales");
      const payload = (await response.json()) as SalesApiResponse;
      setSalesRecords(payload.data);
      setIsLoading(false);
    }

    loadSales();
  }, []);

  const filteredData = useMemo(
    () =>
      salesRecords.filter(
        (record) => record.year === activeYear && record.sales >= threshold,
      ),
    [activeYear, salesRecords, threshold],
  );

  const summary = useMemo(() => {
    const totalSales = filteredData.reduce((total, record) => total + record.sales, 0);
    const totalProfit = filteredData.reduce((total, record) => total + record.profit, 0);
    const totalOrders = filteredData.reduce((total, record) => total + record.orders, 0);

    return { totalOrders, totalProfit, totalSales };
  }, [filteredData]);

  const topMonth = filteredData.reduce<SalesRecord | null>(
    (topRecord, record) => (!topRecord || record.sales > topRecord.sales ? record : topRecord),
    null,
  );

  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
      <ChartControls
        activeYear={activeYear}
        chartType={chartType}
        threshold={threshold}
        onChartTypeChange={setChartType}
        onThresholdChange={setThreshold}
        onYearChange={setActiveYear}
      />

      <div className="grid gap-4 p-4 md:grid-cols-3">
        <StatCard
          label="Total sales"
          value={currencyFormatter.format(summary.totalSales)}
          helper={`${filteredData.length} months match the current filter`}
        />
        <StatCard
          label="Total profit"
          value={currencyFormatter.format(summary.totalProfit)}
          helper="Mocked profit from monthly sales"
        />
        <StatCard
          label="Orders"
          value={summary.totalOrders.toLocaleString("en-US")}
          helper={topMonth ? `Top month: ${topMonth.month}` : "No sales above threshold"}
        />
      </div>

      <div className="h-[420px] px-4 pb-5">
        {isLoading ? (
          <div className="flex h-full items-center justify-center rounded-lg bg-zinc-50 text-sm text-zinc-500">
            Loading sales data...
          </div>
        ) : filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={filteredData} margin={{ bottom: 8, left: 8, right: 16, top: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" />
                <YAxis stroke="#71717a" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
                <Legend />
                <Bar dataKey="sales" fill="#047857" name="Sales" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#2563eb" name="Profit" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : chartType === "line" ? (
              <LineChart data={filteredData} margin={{ bottom: 8, left: 8, right: 16, top: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" />
                <YAxis stroke="#71717a" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
                <Legend />
                <Line dataKey="sales" name="Sales" stroke="#047857" strokeWidth={3} type="monotone" />
                <Line dataKey="profit" name="Profit" stroke="#2563eb" strokeWidth={3} type="monotone" />
              </LineChart>
            ) : (
              <PieChart>
                <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
                <Legend />
                <Pie
                  data={filteredData}
                  dataKey="sales"
                  innerRadius={70}
                  nameKey="month"
                  outerRadius={140}
                  paddingAngle={2}
                >
                  {filteredData.map((record, index) => (
                    <Cell key={record.month} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg bg-zinc-50 text-sm text-zinc-500">
            No monthly sales meet that threshold.
          </div>
        )}
      </div>
    </section>
  );
}

