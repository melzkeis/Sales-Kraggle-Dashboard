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
import { SalesTable } from "@/components/molecules/SalesTable";
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
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total sales"
          value={currencyFormatter.format(summary.totalSales)}
          helper={`${filteredData.length} months match the current filter`}
          trend="+12.5%"
        />
        <StatCard
          label="Total profit"
          value={currencyFormatter.format(summary.totalProfit)}
          helper="Mocked profit from monthly sales"
          trend="+8.2%"
        />
        <StatCard
          label="Orders"
          value={summary.totalOrders.toLocaleString("en-US")}
          helper={topMonth ? `Top month: ${topMonth.month}` : "No sales above threshold"}
          trend="+4.5%"
        />
      </div>

      <section className="rounded-xl border border-border bg-card text-card-foreground shadow-xs">
        <div className="flex flex-col gap-1 border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold capitalize">Sales overview</h2>
          <p className="text-sm text-muted-foreground">
            Recharts view for monthly sales and profit by selected year.
          </p>
        </div>

        <ChartControls
          activeYear={activeYear}
          chartType={chartType}
          threshold={threshold}
          onChartTypeChange={setChartType}
          onThresholdChange={setThreshold}
          onResetThreshold={() => setThreshold(0)}
          onYearChange={setActiveYear}
        />

        <div className="h-[420px] px-4 pb-5 pt-4">
          {isLoading ? (
            <div className="flex h-full items-center justify-center rounded-lg bg-muted/50 text-sm text-muted-foreground">
              Loading sales data...
            </div>
          ) : filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={filteredData} margin={{ bottom: 8, left: 8, right: 16, top: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
                  <Legend />
                  <Bar dataKey="sales" fill="var(--primary)" name="Sales" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="var(--muted-foreground)" name="Profit" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : chartType === "line" ? (
                <LineChart data={filteredData} margin={{ bottom: 8, left: 8, right: 16, top: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
                  <Legend />
                  <Line dataKey="sales" name="Sales" stroke="var(--primary)" strokeWidth={3} type="monotone" />
                  <Line dataKey="profit" name="Profit" stroke="var(--muted-foreground)" strokeWidth={3} type="monotone" />
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
            <div className="flex h-full items-center justify-center rounded-lg bg-muted/50 text-sm text-muted-foreground">
              No monthly sales meet that threshold.
            </div>
          )}
        </div>
      </section>

      <SalesTable data={filteredData} formatCurrency={currencyFormatter.format} />
    </div>
  );
}
