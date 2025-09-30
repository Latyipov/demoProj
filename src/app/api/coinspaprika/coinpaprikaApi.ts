import { CoinPaprikaTickerSchema } from "@/zodSchemas/coins.schema";
import type { CoinPaprikaTicker } from "@/zodSchemas/coins.schema";

export const COINPAPRIKA_TOP10_IDS = [
  "btc-bitcoin",
  "eth-ethereum",
  "usdt-tether",
  "bnb-binance-coin",
  "sol-solana",
  "xrp-xrp",
  "usdc-usd-coin",
  "steth-lido-staked-ether",
  "ada-cardano",
  "doge-dogecoin",
] as const;

async function fetchTicker(
  id: string,
  revalidateSec = 3600
): Promise<CoinPaprikaTicker> {
  const r = await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`, {
    next: { revalidate: revalidateSec },
  });
  if (!r.ok) {
    throw new Error(`CoinPaprika HTTP ${r.status} for ${id}`);
  }
  const json = await r.json();
  return CoinPaprikaTickerSchema.parse(json);
}

export async function getTickers(revalidateSec = 3600) {
  const settled = await Promise.allSettled(
    COINPAPRIKA_TOP10_IDS.map((id) => fetchTicker(id, revalidateSec))
  );

  return settled.map((res, i) => {
    const fallbackId = COINPAPRIKA_TOP10_IDS[i];
    if (res.status === "fulfilled") {
      const t = res.value;
      return {
        id: t.id,
        name: t.name,
        symbol: t.symbol,
        price: t.quotes.USD.price,
        change1h: t.quotes.USD.percent_change_1h,
      };
    }
    return {
      id: fallbackId,
      name: fallbackId,
      symbol: "",
      price: undefined,
      change1h: undefined,
    };
  });
}
