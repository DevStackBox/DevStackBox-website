import type { ReactNode } from "react";

const styles = {
  tip: "border-emerald-500/40 bg-emerald-500/10",
  note: "border-blue-500/40 bg-blue-500/10",
  warning: "border-amber-500/40 bg-amber-500/10",
  important: "border-violet-500/40 bg-violet-500/10",
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof styles;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={`my-4 rounded-lg border-l-4 px-4 py-3 text-sm ${styles[type] ?? styles.note}`}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div>{children}</div>
    </aside>
  );
}
