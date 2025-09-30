import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  return (
    <div className="w-full max-w-4xl space-y-6">
      <nav className="flex items-center justify-between">
        <Link
          aria-disabled={!hasPrev}
          className={`px-4 py-2 rounded-xl shadow ${
            hasPrev ? "hover:shadow-md" : "opacity-40 pointer-events-none"
          }`}
          href={`/ssr?page=${currentPage - 1}`}
          style={{ background: "var(--card-bg)", color: "var(--text-main)" }}
          prefetch={false}
        >
          ← Prev
        </Link>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={`/ssr?page=${n}`}
              prefetch={false}
              className={`px-3 py-1 rounded-lg shadow ${
                n === currentPage
                  ? "pointer-events-none opacity-60"
                  : "hover:shadow-md"
              }`}
              style={{
                background: "var(--card-bg)",
                color: "var(--text-main)",
              }}
              aria-current={n === currentPage ? "page" : undefined}
            >
              {n}
            </Link>
          ))}
        </div>

        <Link
          aria-disabled={!hasNext}
          className={`px-4 py-2 rounded-xl shadow ${
            hasNext ? "hover:shadow-md" : "opacity-40 pointer-events-none"
          }`}
          href={`/ssr?page=${currentPage + 1}`}
          style={{ background: "var(--card-bg)", color: "var(--text-main)" }}
          prefetch={false}
        >
          Next →
        </Link>
      </nav>
    </div>
  );
}
