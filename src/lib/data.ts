// タナログ — データ層（型の正本）
// ⚠️ 現在は MOCK（デモ用の仮データ）。本番は openBD / 国立国会図書館サーチ（書誌・書影）、
//    楽天市場API・IGDB（ゲーム書誌）から取得して Supabase に正規化・キャッシュし、
//    作品ページを programmatic SEO で大量生成する想定（README参照）。出典は必ず明記すること。

import type { CSSProperties } from "react";

export const MOCK = true;

// 本番のデータ供給元（作品ページに出典として明示する）
export const SOURCES = {
  book: "openBD（版元ドットコム）／国立国会図書館サーチ",
  game: "IGDB／楽天市場API",
  affiliate: "楽天ブックス（楽天アフィリエイト）",
} as const;

export type Category = "book" | "manga" | "game";

// UGC感想（モック）。本番は ratings テーブル（user_id / work_id / score 1-5 / note）から。
export type Review = {
  user: string;
  score: number; // 1〜5（絵文字5段階評価）
  note: string;
};

export type Work = {
  id: string; // URLスラッグ（/w/[id]）
  title: string;
  creator: string; // 著者 / 作者 / 開発・発売元
  category: Category;
  year: number;
  avgScore: number; // 0〜100（平均スコア＝みんなの評価の集計値）
  blurb: string; // 紹介・あらすじ（自前テキスト。本番も要約は自前 or 提供元の範囲で）
  rakutenUrl: string; // 送客リンク。★現状はダミー "#"（本番は楽天ブックスのアフィリURL）
  // --- 以下はモック用の付加情報 ---
  publisher?: string; // 出版社 / 発売元
  reviews?: Review[]; // UGC感想（モック）
};

// カテゴリのメタ情報（ラベル・絵文字・書影プレースホルダの系統色相）
export const CATEGORY: Record<Category, { label: string; emoji: string; hue: number }> = {
  book: { label: "本", emoji: "📖", hue: 158 }, // emerald/teal 系
  manga: { label: "マンガ", emoji: "📚", hue: 332 }, // rose/pink 系
  game: { label: "ゲーム", emoji: "🎮", hue: 258 }, // indigo/violet 系
};

export const works: Work[] = [
  {
    id: "1q84",
    title: "1Q84",
    creator: "村上春樹",
    category: "book",
    year: 2009,
    avgScore: 84,
    publisher: "新潮社",
    blurb:
      "もう一つの「1Q84」年へと迷い込んだ二人の物語が、章ごとに交互に進む長編。静かな緊張感と幻想が積み重なる。",
    rakutenUrl: "#", // 差し替え：楽天ブックスのアフィリリンク
    reviews: [
      { user: "@yomu_neko", score: 4, note: "世界に引き込まれて止まらなかった。長いけど一気読み。" },
      { user: "積読くずし中", score: 4, note: "青豆と天吾、二人の視点が交わる瞬間が好き。" },
      { user: "@booklog_mai", score: 5, note: "再読するたび発見がある。冬の夜にぴったり。" },
    ],
  },
  {
    id: "konbini-ningen",
    title: "コンビニ人間",
    creator: "村田沙耶香",
    category: "book",
    year: 2016,
    avgScore: 81,
    publisher: "文藝春秋",
    blurb:
      "「普通」とは何かを、コンビニという舞台から鋭く問う中編。軽やかな読み心地と、ひやりとする読後感。",
    rakutenUrl: "#",
    reviews: [
      { user: "@shoten_log", score: 5, note: "短いのに刺さる。価値観を揺さぶられた。" },
      { user: "読書メモ＿k", score: 4, note: "主人公の感覚が妙にリアルで怖い。考えさせられる。" },
    ],
  },
  {
    id: "santai",
    title: "三体",
    creator: "劉慈欣",
    category: "book",
    year: 2019,
    avgScore: 90,
    publisher: "早川書房",
    blurb:
      "文化大革命から宇宙文明との接触へ——スケールの大きさで世界中を席巻した中国SFの金字塔。続編へ一気に進みたくなる。",
    rakutenUrl: "#",
    reviews: [
      { user: "@sf_daisuki", score: 5, note: "理系ロマンの塊。三部作まとめて読むべき。" },
      { user: "宇宙好きの人", score: 5, note: "発想の規模が桁違い。SF初心者にもおすすめ。" },
      { user: "@yonda_kiroku", score: 4, note: "序盤は難しいけど中盤からノンストップ。" },
    ],
  },
  {
    id: "frieren",
    title: "葬送のフリーレン",
    creator: "山田鐘人・アベツカサ",
    category: "manga",
    year: 2020,
    avgScore: 93,
    publisher: "小学館",
    blurb:
      "勇者一行の「その後」を、長命なエルフの視点で描くファンタジー。時間と記憶の余韻が静かに残る一作。",
    rakutenUrl: "#",
    reviews: [
      { user: "@manga_tana", score: 5, note: "読むたびに泣ける。余韻がすごい。" },
      { user: "積みマンガ族", score: 5, note: "戦闘も人間ドラマも丁寧。全巻揃えたい。" },
    ],
  },
  {
    id: "chainsaw-man",
    title: "チェンソーマン",
    creator: "藤本タツキ",
    category: "manga",
    year: 2018,
    avgScore: 88,
    publisher: "集英社",
    blurb:
      "予測不能な展開と勢いで読ませるダークアクション。荒削りな衝動と切なさが同居する。",
    rakutenUrl: "#",
    reviews: [
      { user: "@yomu_neko", score: 4, note: "テンポと画の勢いが最高。続きが気になる。" },
      { user: "深夜の読書垢", score: 5, note: "感情の振れ幅が激しくて中毒になる。" },
    ],
  },
  {
    id: "houseki-no-kuni",
    title: "宝石の国",
    creator: "市川春子",
    category: "manga",
    year: 2012,
    avgScore: 86,
    publisher: "講談社",
    blurb:
      "宝石でできた不老の存在たちの物語。透明感のある絵と、哲学的な問いが静かに胸に残る。",
    rakutenUrl: "#",
    reviews: [
      { user: "@art_to_manga", score: 5, note: "コマ割りと白の使い方が美しい。芸術。" },
      { user: "読書メモ＿k", score: 4, note: "切なさと不穏さが癖になる。" },
    ],
  },
  {
    id: "dungeon-meshi",
    title: "ダンジョン飯",
    creator: "九井諒子",
    category: "manga",
    year: 2014,
    avgScore: 89,
    publisher: "KADOKAWA",
    blurb:
      "魔物を「食べる」発想が光るダンジョン冒険譚。緻密な設定とユーモア、そして温かさが詰まっている。",
    rakutenUrl: "#",
    reviews: [
      { user: "@gohan_log", score: 5, note: "メシ描写が最高。設定の作り込みに脱帽。" },
      { user: "積みマンガ族", score: 4, note: "笑えるのに伏線が効いてる。完結まで面白い。" },
    ],
  },
  {
    id: "zelda-totk",
    title: "ゼルダの伝説 ティアーズ オブ ザ キングダム",
    creator: "任天堂",
    category: "game",
    year: 2023,
    avgScore: 95,
    publisher: "任天堂（Nintendo Switch）",
    blurb:
      "空・地上・地底を自由に行き来し、創意工夫で攻略するオープンエア。遊びの自由度がとにかく広い。",
    rakutenUrl: "#",
    reviews: [
      { user: "@asobi_kiroku", score: 5, note: "やれることが多すぎて時間が溶ける。神ゲー。" },
      { user: "積みゲー崩し", score: 5, note: "ウルトラハンドで遊びが無限に広がる。" },
      { user: "@switch_life", score: 4, note: "広大すぎて寄り道が止まらない。最高。" },
    ],
  },
  {
    id: "elden-ring",
    title: "ELDEN RING",
    creator: "フロム・ソフトウェア",
    category: "game",
    year: 2022,
    avgScore: 94,
    publisher: "フロム・ソフトウェア／バンダイナムコ",
    blurb:
      "広大な世界「狭間の地」を探索するアクションRPG。歯ごたえのある戦闘と、自分のペースで進む自由が魅力。",
    rakutenUrl: "#",
    reviews: [
      { user: "@soulslike_fan", score: 5, note: "死にながら強くなる達成感が最高。探索が楽しい。" },
      { user: "ゲーム積み族", score: 4, note: "難しいけど理不尽じゃない。地形を見るだけで楽しい。" },
    ],
  },
  {
    id: "hades",
    title: "Hades",
    creator: "Supergiant Games",
    category: "game",
    year: 2020,
    avgScore: 91,
    publisher: "Supergiant Games",
    blurb:
      "冥界からの脱出に何度も挑むローグライト。繰り返すほど物語が進む構造と、軽快な戦闘が中毒性抜群。",
    rakutenUrl: "#",
    reviews: [
      { user: "@indie_suki", score: 5, note: "負けても物語が進むのが新鮮。一戦が軽くて何周もできる。" },
      { user: "深夜のゲーマー", score: 5, note: "テンポ・音楽・キャラ全部好き。やめ時を見失う。" },
    ],
  },
];

// --- ヘルパー ---

export function getWork(id: string): Work | undefined {
  return works.find((w) => w.id === id);
}

/** カテゴリで絞り込み。 */
export function byCategory(category: Category): Work[] {
  return works.filter((w) => w.category === category);
}

/** スコアの高い順。limit を渡すと上位 N 件。 */
export function ranking(limit?: number): Work[] {
  const sorted = [...works].sort((a, b) => b.avgScore - a.avgScore);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/** 同カテゴリの「似た作品」（自分自身を除く）。 */
export function relatedWorks(work: Work, limit = 4): Work[] {
  return works
    .filter((w) => w.category === work.category && w.id !== work.id)
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, limit);
}

// --- 送客（北極星＝送客クリック）---
// ⚠️ キー不要で「いま動く」楽天の検索URLを生成（実地で 200/301 を確認済み）。
//    本/マンガ → 楽天ブックス、ゲーム → 楽天市場（上の SOURCES と対応）。
//    ★収益化（本番）：楽天アフィリエイトID取得後に buyUrl をアフィリ・リダイレクトで包むか、
//      楽天ブックスAPIで引いた「特定商品」のアフィリURLを各 work.rakutenUrl に格納して差し替える。
export function rakutenSearchUrl(work: Work): string {
  const q = encodeURIComponent(work.title);
  return work.category === "game"
    ? `https://search.rakuten.co.jp/search/mall/${q}/`
    : `https://books.rakuten.co.jp/search?sitem=${q}`;
}

/** 送客ボタンが使うURL。個別アフィリURL(rakutenUrl)があれば優先、無ければ検索URLにフォールバック。 */
export function buyUrl(work: Work): string {
  return work.rakutenUrl && work.rakutenUrl !== "#" ? work.rakutenUrl : rakutenSearchUrl(work);
}

// --- 書影プレースホルダ（CSS）---
// ⚠️ 本番は openBD / 楽天ブックス等が提供する書影URLを next/image で直リンク表示する
//    （規約上、再ホスト・改変・文字焼き込みは不可）。下記は実画像が無いデモ用のCSS背景。

// 作品IDから決定的なハッシュ（FNV-1a 風）。SSGで安定するよう乱数は使わない。
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** カテゴリの系統色をベースに、作品ごとに少しずらした決定的グラデーションを返す。 */
export function coverStyle(work: Work): CSSProperties {
  const base = CATEGORY[work.category].hue;
  const offset = (hashStr(work.id) % 36) - 18; // -18〜+17 のばらつき
  const h1 = (base + offset + 360) % 360;
  const h2 = (h1 + 24) % 360;
  return {
    backgroundImage: `linear-gradient(150deg, hsl(${h1} 62% 52%), hsl(${h2} 55% 30%))`,
  };
}
