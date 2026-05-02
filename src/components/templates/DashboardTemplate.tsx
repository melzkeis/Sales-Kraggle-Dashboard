import { SalesChart } from "@/components/organisms/SalesChart";

export function DashboardTemplate() {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-6 text-zinc-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              Sales dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              Yearly Sales Performance
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-zinc-600">
            Compare mocked retail sales for 2024, 2023, and 2022 with a custom
            threshold filter and switchable Recharts visualizations.
          </p>
        </header>

        <SalesChart />
      </div>
    </main>
  );
}

