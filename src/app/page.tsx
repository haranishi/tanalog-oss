import Link from "next/link";
import { works, byCategory, ranking, type Category } from "@/lib/data";
import { CoverCard, ShelfGrid, ScoreBadge, Section } from "@/components/ui";

// カテゴリ絞り（searchParams ?cat=book|manga|game）。Next 16 では searchParams は Promise。
const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "book", label: "📖 本" },
  { key: "manga", label: "📚 マンガ" },
  { key: "game", label: "🎮 ゲーム" },
];

const isCategory = (v: string | undefined): v is Category =>
  v === "book" || v === "manga" || v === "game";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const active = isCategory(cat) ? cat : "all";
  const list = active === "all" ? works : byCategory(active);
  const top3 = ranking(3);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">タナログ</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl">
          あなたの“好き”を、映える棚に。
        </h1>
        <p className="mt-3 max-w-xl text-zinc-600">
          読んだ本・マンガ、遊んだゲームを記録してスコア化。カバーが並ぶ本棚で共有して、作品ページから感想を読んで買える。
        </p>
        <p className="mt-3 inline-block rounded bg-zinc-100 px-2 py-1 text-[11px] text-zinc-500">
          ※現在はデモ用のモックデータ（本番は openBD／国立国会図書館サーチ／楽天ブックスから取り込み予定）
        </p>
      </header>

      {/* カテゴリ絞り */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = f.key === active;
          const href = f.key === "all" ? "/" : `/?cat=${f.key}`;
          return (
            <Link
              key={f.key}
              href={href}
              className={
                isActive
                  ? "rounded-full bg-zinc-900 px-3.5 py-1.5 text-sm font-semibold text-white"
                  : "rounded-full border border-zinc-300 px-3.5 py-1.5 text-sm text-zinc-700 hover:border-violet-400 hover:bg-violet-50"
              }
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {/* 映える棚 */}
      <Section
        kicker="Shelf"
        title="みんなの棚"
        action={
          <Link href="/ranking" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
            ランキングを見る ▶
          </Link>
        }
      >
        <ShelfGrid>
          {list.map((w) => (
            <CoverCard key={w.id} work={w} />
          ))}
        </ShelfGrid>
      </Section>

      {/* ランキング導線（上位3件のプレビュー） */}
      <Section kicker="Ranking" title="スコアの高い作品">
        <ol className="divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {top3.map((w, i) => (
            <li key={w.id}>
              <Link href={`/w/${w.id}`} className="flex items-center gap-4 p-4 hover:bg-zinc-50">
                <span className="w-6 shrink-0 text-center text-lg font-bold text-violet-600 tabular-nums">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-zinc-900">{w.title}</p>
                  <p className="truncate text-xs text-zinc-500">{w.creator}</p>
                </div>
                <ScoreBadge value={w.avgScore} size="sm" />
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <footer className="mt-14 border-t border-zinc-200 pt-6 text-xs text-zinc-400">
        タナログ（デモ）｜スコア・感想はモックです。本番の出典（予定）：openBD／国立国会図書館サーチ／楽天ブックス。
      </footer>
    </main>
  );
}
