import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-5 text-zinc-950">
      <section className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
          Next.js sales app
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Simple Sales Dashboard
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          View mocked 2022-2024 retail sales data with filters and multiple chart
          types powered by Recharts.
        </p>
        <Link
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800"
          href="/dashboard"
        >
          Open dashboard
        </Link>
      </section>
    </main>
  );
}
