import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "John K Johansen — Software Architect & AI Agent Builder",
  description:
    "Seasoned software architect, tech executive, and AI agent builder helping startups stretch funding through intelligent automation. 20+ years building scalable systems.",
  metadataBase: new URL("https://johnkjohansen.com"),
  openGraph: {
    title: "John K Johansen — Software Architect & AI Agent Builder",
    description:
      "Seasoned software architect, tech executive, and AI agent builder helping startups stretch funding through intelligent automation.",
    url: "https://johnkjohansen.com",
    siteName: "John K Johansen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "John K Johansen — Software Architect & AI Agent Builder",
    description:
      "Seasoned software architect, tech executive, and AI agent builder helping startups stretch funding through intelligent automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
