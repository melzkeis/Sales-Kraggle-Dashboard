import { SalesChart } from "@/components/organisms/SalesChart";

export function DashboardTemplate() {
  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-zinc-200 bg-white lg:block">
          <div className="flex h-16 items-center border-b border-zinc-200 px-6">
            <div>
              <p className="text-sm font-semibold">Kaggle Sales</p>
              <p className="text-xs text-zinc-500">Revenue workspace</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1 p-4 text-sm">
            {["Dashboard", "Sales", "Customers", "Reports", "Settings"].map((item) => (
              <a
                key={item}
                className={[
                  "rounded-md px-3 py-2 font-medium transition",
                  item === "Dashboard"
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                ].join(" ")}
                href={item === "Dashboard" ? "/dashboard" : "#"}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/95 px-5 backdrop-blur sm:px-6">
            <div>
              <p className="text-sm font-medium text-zinc-500">Dashboard</p>
              <h1 className="text-lg font-semibold tracking-tight">Sales Overview</h1>
            </div>
            <div className="hidden rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-500 sm:block">
              Mock Kaggle-style data
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Sales dashboard</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                    Yearly Sales Performance
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-zinc-500">
                  Compare mocked retail sales for 2024, 2023, and 2022 with a
                  threshold filter and switchable Recharts visualizations.
                </p>
              </div>
            </div>

            <SalesChart />
          </div>
        </section>
      </div>
    </main>
  );
}
