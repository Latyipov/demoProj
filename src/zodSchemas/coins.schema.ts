// zodSchemas/coins.schema.ts
import { z } from "zod";

export const CoinPaprikaTickerSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
    quotes: z
      .object({
        USD: z
          .object({
            price: z.coerce.number().optional(),
            percent_change_1h: z.coerce.number().optional(),
          })
          .loose(),
      })
      .loose(),
  })
  .loose();

export type CoinPaprikaTicker = z.infer<typeof CoinPaprikaTickerSchema>;
