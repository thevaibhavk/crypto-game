import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { displayFont, bodyFont, monoFont } from "@/styles/fonts";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "CRED: The Darkware Fidelity",
  description:
    "Neon-dark P2E strategy interface. Trust the shadows, capture the packets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
