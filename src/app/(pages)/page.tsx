import Link from "next/link";

export const revalidate = false;

export default function HomePageSSG() {
  const pages = [
    { href: "/ssr", title: "SSR", desc: "Server-Side Rendering" },
    { href: "/csr", title: "CSR", desc: "Client-Side Rendering" },
    { href: "/isr", title: "ISR", desc: "Incremental Static Regeneration" },
  ];

  return (
    <main
      className="min-h-screen flex flex-col items-center py-12 px-4"
      style={{ background: "var(--bg-gradient)" }}
    >
      <h1
        className="text-4xl font-extrabold mb-10 drop-shadow-lg text-center"
        style={{ color: "var(--text-main)" }}
      >
        Home page - Static Site Generation
      </h1>
      <div className="grid grid-cols-1  gap-8 w-full max-w-xl">
        {pages.map((page) => (
          <Link key={page.href} href={page.href}>
            <div
              className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
              style={{
                background: "var(--card-bg)",
                color: "var(--text-secondary)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--text-main)" }}
              >
                {page.title}
              </h2>
              <p>{page.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
