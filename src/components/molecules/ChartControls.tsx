"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import type { ChartType } from "@/components/organisms/SalesChart";
import { years } from "@/lib/sales-data";

type ChartControlsProps = {
  activeYear: number;
  chartType: ChartType;
  threshold: number;
  onYearChange: (year: number) => void;
  onChartTypeChange: (chartType: ChartType) => void;
  onThresholdChange: (threshold: number) => void;
};

const chartTypes: ChartType[] = ["bar", "line", "pie"];

export function ChartControls({
  activeYear,
  chartType,
  threshold,
  onYearChange,
  onChartTypeChange,
  onThresholdChange,
}: ChartControlsProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-zinc-200 p-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Sales year</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {years.map((year) => (
            <Button key={year} isActive={activeYear === year} onClick={() => onYearChange(year)}>
              {year}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Chart type</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {chartTypes.map((type) => (
            <Button
              key={type}
              isActive={chartType === type}
              onClick={() => onChartTypeChange(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Sales threshold
        </span>
        <Input
          min={0}
          step={1000}
          type="number"
          value={threshold}
          onChange={(event) => onThresholdChange(Number(event.target.value))}
        />
      </label>
    </div>
  );
}

