import { getTickers } from "@/app/api/coinspaprika/coinpaprikaApi";

export const revalidate = 3600;

function formatUSD(n?: number) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 1 ? 6 : 2,
  }).format(n);
}

function formatPct(n?: number) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

export default async function CryptoISR() {
  const coins = await getTickers(3600);

  return (
    <main
      className="min-h-screen flex flex-col items-center py-12 px-4 gap-8"
      style={{ background: "var(--bg-gradient)" }}
    >
      <h1
        className="text-4xl font-extrabold drop-shadow-lg text-center"
        style={{ color: "var(--text-main)" }}
      >
        Crypto — ISR, update every hour
      </h1>

      <div
        className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg overflow-hidden"
        style={{ background: "var(--card-bg)", color: "var(--text-secondary)" }}
      >
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[var(--card-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--card-bg)]/75">
            <tr className="text-left" style={{ color: "var(--text-main)" }}>
              <th className="px-4 py-3 border-b border-black/10 text-sm font-semibold">
                #
              </th>
              <th className="px-4 py-3 border-b border-black/10 text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-3 border-b border-black/10 text-sm font-semibold">
                Price (USD)
              </th>
              <th className="px-4 py-3 border-b border-black/10 text-sm font-semibold">
                1h
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, i) => {
              const pos =
                typeof coin.change1h === "number" && coin.change1h > 0;
              const neg =
                typeof coin.change1h === "number" && coin.change1h < 0;

              return (
                <tr
                  key={coin.id}
                  className={`transition-colors hover:bg-black/5 ${
                    i % 2 ? "bg-black/[0.025]" : ""
                  }`}
                >
                  <td className="px-4 py-3 border-b border-black/10 font-medium whitespace-nowrap align-top">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 border-b border-black/10 align-top">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--text-main)" }}
                    >
                      {coin.name}
                    </span>
                    {coin.symbol && (
                      <span className="opacity-70 ml-2">({coin.symbol})</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b border-black/10 align-top whitespace-nowrap">
                    {formatUSD(coin.price)}
                  </td>
                  <td className="px-4 py-3 border-b border-black/10 align-top whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-lg text-sm font-medium shadow"
                      style={{
                        background: neg
                          ? "rgba(239,68,68,0.15)"
                          : pos
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(0,0,0,0.1)",
                        color: neg
                          ? "#dc2626"
                          : pos
                          ? "#16a34a"
                          : "var(--text-secondary)",
                      }}
                      title="Change (1h)"
                    >
                      {formatPct(coin.change1h)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
