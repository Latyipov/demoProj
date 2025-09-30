import type { Metadata } from "next";

import { Providers } from "./providers";
import { Header } from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Example app",
  description:
    "This app shows Server-Side Rendering, Static Site Generation, Incremental Static Regeneration, Client-Side Rendering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
