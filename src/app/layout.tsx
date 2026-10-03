import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "タナログ — 本・マンガ・ゲームを映える棚に記録",
    template: "%s｜タナログ",
  },
  description:
    "読んだ本・マンガ、遊んだゲームを1か所に記録してスコア化。カバーが並ぶ“映える棚”で共有し、作品ページから感想を読んで買える。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/85 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
            <Link href="/" className="flex items-center gap-1.5 text-sm font-bold tracking-wide text-zinc-900">
              <span aria-hidden className="text-base">📚</span>
              タナログ
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link href="/" className="text-zinc-500 hover:text-zinc-900">
                棚
              </Link>
              <Link
                href="/ranking"
                className="rounded-md bg-violet-600 px-3 py-1.5 font-semibold text-white hover:bg-violet-700"
              >
                ランキング
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
