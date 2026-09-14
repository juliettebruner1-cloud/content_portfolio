import { metrics as allMetrics } from "@/data/metrics";
import { MetricNumber } from "./MetricNumber";

export function MetricsStrip() {
  const visible = allMetrics.filter((m) => m.visible);

  if (visible.length === 0) {
    return (
      <div className="border-y hairline py-16 text-center">
        <p className="label text-taupe">
          Performance metrics — development placeholder. Add real numbers in{" "}
          <code className="text-stone">data/metrics.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-y hairline py-16 sm:grid-cols-4">
      {visible.map((metric) => (
        <div key={metric.id} className="text-center sm:text-left">
          <MetricNumber
            value={metric.value}
            className="block font-serif text-4xl text-ivory sm:text-6xl"
          />
          <p className="label mt-3 text-taupe">{metric.label}</p>
          {metric.detail && <p className="mt-1 text-xs text-taupe">{metric.detail}</p>}
        </div>
      ))}
    </div>
  );
}
