import Link from "next/link";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";

const navItems = [
  { href: "/", label: "SSG" },
  { href: "/ssr", label: "SSR" },
  { href: "/csr", label: "CSR" },
  { href: "/isr", label: "ISR" },
];

export function Header() {
  return (
    <header
      className="w-full shadow-md"
      style={{ background: "var(--card-bg)" }}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1
          className="text-xl font-bold tracking-wide"
          style={{ color: "var(--text-main)" }}
        >
          Demo
        </h1>
        <ul className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:underline"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
