import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, works, relatedWorks, CATEGORY, SOURCES, buyUrl } from "@/lib/data";
import { Cover, CoverCard, ShelfGrid, ScoreBadge, Stars, CategoryBadge, Section } from "@/components/ui";

// 作品ページを全件SSG（programmatic SEO の面）。
export function generateStaticParams() {
  return works.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const w = getWork(id);
  if (!w) return { title: "見つかりませんでした" };
  return {
    title: `${w.title}の感想・評価`,
    description: `${w.title}（${w.creator}）の平均スコア${w.avgScore}点。みんなの感想・評価・あらすじをチェックして、楽天ブックスで買える。${CATEGORY[w.category].label}の記録ならタナログ。`,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const w = getWork(id);
  if (!w) notFound();

  const reviews = w.reviews ?? [];
  const related = relatedWorks(w);
  const sourceLabel = w.category === "game" ? SOURCES.game : SOURCES.book;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
        ← 棚にもどる
      </Link>

      {/* 書誌ヘッダー */}
      <div className="mt-4 flex gap-5">
        <Cover work={w} className="aspect-[3/4] w-28 shrink-0 shadow-md sm:w-36" />
        <div className="min-w-0">
          <CategoryBadge category={w.category} />
          <h1 className="mt-2 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl">{w.title}</h1>
          <p className="mt-1 text-zinc-600">{w.creator}</p>
          <p className="mt-1 text-sm text-zinc-500">
            {w.year}年{w.publisher ? `・${w.publisher}` : ""}
          </p>
          <div className="mt-3 flex items-end gap-2">
            <ScoreBadge value={w.avgScore} size="lg" />
            <span className="pb-1 text-xs text-zinc-500">
              平均スコア（{reviews.length}件のモック感想）
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 leading-relaxed text-zinc-700">{w.blurb}</p>

      {/* 送客ボタン（スタブ） */}
      <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold text-zinc-900">{w.title}を手に入れる</p>
            <p className="mt-0.5 text-xs text-zinc-500">
              価格は各ストアで変動します。最新は購入先でご確認ください。
            </p>
          </div>
          {/* ★北極星＝送客クリック。いまは楽天の検索結果へ実送客（キー不要・実地で確認済み）。
              本番＝楽天アフィリID取得後に buyUrl をアフィリ・リダイレクトで包む／個別商品URLへ差し替え。
              クリックは click_events で計測する想定。 */}
          <a
            href={buyUrl(w)}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex items-center gap-2 rounded-md bg-[#bf0000] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            {w.category === "game" ? "楽天で探す" : "楽天ブックスで探す"} →
          </a>
        </div>
        <p className="mt-3 text-[11px] text-zinc-400">
          広告（PR）：リンク先は楽天の検索結果です。アフィリエイトID設定後に収益化リンクへ差し替えます。
        </p>
      </div>

      {/* UGC 感想（モック） */}
      <Section kicker="Reviews" title="みんなの感想">
        {reviews.length === 0 ? (
          <p className="text-sm text-zinc-500">まだ感想がありません。</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r, i) => (
              <li key={i} className="rounded-xl border border-zinc-200 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-zinc-700">{r.user}</span>
                  <Stars score={r.score} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">{r.note}</p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[11px] text-zinc-400">※感想・評価はデモ用のモックです。</p>
      </Section>

      {/* 似た作品 */}
      {related.length > 0 && (
        <Section kicker="Related" title={`似た${CATEGORY[w.category].label}`}>
          <ShelfGrid>
            {related.map((rw) => (
              <CoverCard key={rw.id} work={rw} />
            ))}
          </ShelfGrid>
        </Section>
      )}

      <footer className="mt-12 space-y-1 border-t border-zinc-200 pt-6 text-xs text-zinc-400">
        <p>
          ※本ページは<strong>デモ用のモックデータ</strong>です。書誌・スコア・感想は仮置きで、実データではありません。
        </p>
        <p>本番のデータ提供元（予定）：{sourceLabel}／送客＝{SOURCES.affiliate}。書影は提供元URLを直リンク表示します。</p>
      </footer>
    </main>
  );
}
