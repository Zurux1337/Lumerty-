import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lumière Playful — салон красоты | Онлайн-запись",
    template: "%s — Lumière Playful",
  },
  description:
    "Lumière Playful — салон красоты в тёплых кремовых тонах. Стрижки, окрашивание, маникюр, макияж и уход. Онлайн-запись за 1 минуту.",
  keywords: ["салон красоты", "запись", "стрижка", "маникюр", "playful", "Lumière"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
