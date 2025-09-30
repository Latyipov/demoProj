export function SkeletonTable({ rows = 8 }: { rows?: number }) {
  return (
    <div
      className="rounded-2xl shadow-lg w-11/12 mx-auto m-4 overflow-hidden"
      style={{ background: "var(--card-bg)", color: "var(--text-secondary)" }}
    >
      <div className="animate-pulse">
        <div className="h-10 w-full border-b border-black/10" />
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-black/10"
          >
            <div className="col-span-2 h-4 rounded bg-black/10" />
            <div className="col-span-4 h-4 rounded bg-black/10" />
            <div className="col-span-6 h-4 rounded bg-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
