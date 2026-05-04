import type { SalesRecord } from "@/lib/sales-data";

type SalesTableProps = {
  data: SalesRecord[];
  formatCurrency: (value: number) => string;
};

export function SalesTable({ data, formatCurrency }: SalesTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xs">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold capitalize">Monthly sales records</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Filtered rows from the same data powering the chart.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-muted/50 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Month</th>
              <th className="px-5 py-3">Region</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3 text-right">Orders</th>
              <th className="px-5 py-3 text-right">Sales</th>
              <th className="px-5 py-3 text-right">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((record) => (
              <tr key={`${record.year}-${record.month}`} className="hover:bg-muted/50">
                <td className="px-5 py-3 font-medium">{record.month}</td>
                <td className="px-5 py-3 text-muted-foreground">{record.region}</td>
                <td className="px-5 py-3 text-muted-foreground">{record.category}</td>
                <td className="px-5 py-3 text-right text-muted-foreground">{record.orders}</td>
                <td className="px-5 py-3 text-right font-medium">
                  {formatCurrency(record.sales)}
                </td>
                <td className="px-5 py-3 text-right text-muted-foreground">
                  {formatCurrency(record.profit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
