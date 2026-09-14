import { cx } from "@/lib/utils";

export function EditorialDivider({
  label,
  index,
  className,
}: {
  label?: string;
  index?: string;
  className?: string;
}) {
  return (
    <div className={cx("flex items-center gap-4 py-6", className)}>
      <span className="text-taupe">✦</span>
      <div className="h-px flex-1 hairline border-t" />
      {label && <span className="label text-taupe whitespace-nowrap">{label}</span>}
      {index && <span className="label text-taupe whitespace-nowrap">{index}</span>}
    </div>
  );
}
