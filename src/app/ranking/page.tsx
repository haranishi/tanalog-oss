import Link from "next/link";
import { ranking, CATEGORY } from "@/lib/data";
import { Cover, ScoreBadge } from "@/components/ui";

export const metadata = {
  title: "スコアランキング",
  description:
    "本・マンガ・ゲームを横断した、みんなのスコアが高い作品ランキング。気になる作品の感想を読んで楽天ブックスで買える（デモ）。",
};

const medal = (rank: number) =>
  rank === 1 ? "text-amber-500" : rank === 2 ? "text-zinc-400" : rank === 3 ? "text-amber-700" : "text-zinc-300";

export default function RankingPage() {
  const list = ranking();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Ranking</p>
      <h1 className="mt-1 text-3xl font-bold text-zinc-900">スコアランキング</h1>
      <p className="mt-2 max-w-xl text-zinc-600">
        本・マンガ・ゲームを横断した、平均スコアの高い順。気になった作品はタップして感想をチェック。
      </p>
      <p className="mt-3 inline-block rounded bg-zinc-100 px-2 py-1 text-[11px] text-zinc-500">
        ※スコアはデモ用のモックです。
      </p>

      <ol className="mt-8 divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {list.map((w, i) => (
          <li key={w.id}>
            <Link href={`/w/${w.id}`} className="flex items-center gap-4 p-4 hover:bg-zinc-50">
              <span className={`w-7 shrink-0 text-center text-2xl font-black tabular-nums ${medal(i + 1)}`}>
                {i + 1}
              </span>
              <Cover work={w} className="aspect-[3/4] w-12 shrink-0 shadow-sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-zinc-900">{w.title}</p>
                <p className="truncate text-xs text-zinc-500">
                  {w.creator}・{CATEGORY[w.category].label}・{w.year}
                </p>
              </div>
              <ScoreBadge value={w.avgScore} />
            </Link>
          </li>
        ))}
      </ol>

      <footer className="mt-12 border-t border-zinc-200 pt-6 text-xs text-zinc-400">
        タナログ（デモ）｜スコアはモックです。本番の出典（予定）：openBD／国立国会図書館サーチ／楽天ブックス。
      </footer>
    </main>
  );
}
