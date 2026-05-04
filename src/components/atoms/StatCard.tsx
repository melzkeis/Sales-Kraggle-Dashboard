type StatCardProps = {
  label: string;
  value: string;
  helper: string;
  trend?: string;
};

export function StatCard({ label, value, helper, trend }: StatCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground capitalize">{label}</p>
        {trend ? (
          <span className="rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {trend}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{helper}</p>
    </article>
  );
}
