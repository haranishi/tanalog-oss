import Link from "next/link";
import type { ReactNode } from "react";
import { CATEGORY, coverStyle, type Work } from "@/lib/data";

// スコア(0-100)の色分け。表示の数値はモック。
const scoreText = (v: number) =>
  v >= 85 ? "text-emerald-600" : v >= 70 ? "text-amber-600" : "text-rose-600";

export function ScoreBadge({ value, size = "md" }: { value: number; size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "text-5xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <span className={`font-bold tabular-nums ${cls} ${scoreText(value)}`}>
      {value}
      {size === "lg" && <span className="ml-1 align-baseline text-lg font-medium text-zinc-400">/100</span>}
    </span>
  );
}

// 5段階（絵文字）評価。score は 1〜5。
export function Stars({ score }: { score: number }) {
  const full = Math.max(0, Math.min(5, Math.round(score)));
  return (
    <span aria-label={`5段階評価で${full}`} className="select-none">
      <span className="text-amber-500">{"★".repeat(full)}</span>
      <span className="text-zinc-300">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export function CategoryBadge({ category }: { category: Work["category"] }) {
  const c = CATEGORY[category];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
      <span aria-hidden>{c.emoji}</span>
      {c.label}
    </span>
  );
}

// 書影プレースホルダ（CSS）。実画像は持たず、カテゴリ系統色のグラデ＋タイトル文字で代用。
// ⚠️ 差し替え：本番は openBD / 楽天ブックス等の書影URLを next/image で直リンク表示する。
export function Cover({ work, className = "" }: { work: Work; className?: string }) {
  const c = CATEGORY[work.category];
  return (
    <div
      className={`relative overflow-hidden rounded-xl ring-1 ring-black/10 ${className}`}
      style={coverStyle(work)}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-3 text-white">
        <span className="self-start rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium backdrop-blur">
          {c.emoji} {c.label}
        </span>
        <div>
          <p className="line-clamp-4 text-sm font-bold leading-snug drop-shadow">{work.title}</p>
          <p className="mt-1 line-clamp-1 text-[11px] text-white/85">{work.creator}</p>
        </div>
      </div>
    </div>
  );
}

// 棚に並ぶ1枚（カバー＋スコア＋カテゴリ/年）。トップやランキング、似た作品で再利用。
export function CoverCard({ work }: { work: Work }) {
  return (
    <Link href={`/w/${work.id}`} className="group block">
      <Cover
        work={work}
        className="aspect-[3/4] shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg"
      />
      <div className="mt-2 flex items-center justify-between gap-2">
        <ScoreBadge value={work.avgScore} size="sm" />
        <span className="text-[11px] text-zinc-400">
          {CATEGORY[work.category].label}・{work.year}
        </span>
      </div>
    </Link>
  );
}

// 棚グリッド（映える本棚のレイアウト）。
export function ShelfGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {children}
    </div>
  );
}

export function Section({
  kicker,
  title,
  action,
  children,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-3">
        <div>
          {kicker && (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">{kicker}</p>
          )}
          <h2 className="mt-1 text-xl font-bold text-zinc-900">{title}</h2>
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
