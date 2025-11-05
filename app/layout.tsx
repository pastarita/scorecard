import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hyperdimensional Vector Space Golf Scorecard",
  description: "Navigate development through ℝⁿ using golf metaphors and category theory",
  authors: [{ name: "Patrick Astarita" }],
  keywords: [
    "development",
    "golf",
    "scorecard",
    "category theory",
    "vector space",
    "LLM",
    "prompt engineering"
  ],
  // Next.js 16 App Router automatically handles app/icon.svg
  // It will generate favicon.ico, apple-icon.png, etc. automatically
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
