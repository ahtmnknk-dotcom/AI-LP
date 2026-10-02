# AI-LP — LP制作サービス 公式サイト

「LPって、30万円も必要ですか？」をコンセプトにした、完全オリジナルLP制作サービスの公式LP。
依存パッケージなしの静的ビルド（Node.js 18+）で、`dist/` に1枚の静的HTMLを出力します。

```bash
npm run build     # dist/ を生成
npm run dev       # ビルドして http://localhost:4173 で確認
```

Netlify で公開する前提です（`netlify.toml` 設定済み：ビルドコマンド `npm run build`、公開ディレクトリ `dist`）。
GitHubリポジトリをNetlifyに接続すれば、pushのたびに自動で公開されます。

---

## 公開前に必ず設定する項目

| 項目 | 場所 | 内容 |
| --- | --- | --- |
| 本番URL | `src/data/site.js` → `url` | canonical / OGP / 構造化データ / sitemap に使用。現在は `https://example.com/` |
| 問い合わせの通知先 | Netlify管理画面 → Forms | フォームは Netlify Forms（`form.provider: 'netlify'`）。デプロイ後、Netlify の **Forms → Form notifications** で受信メールを設定。localhost・プレビューでは送信されません |
| 制作事例の画像 | `public/assets/works/` | 現在は仮画像（SVG）。実際のスクリーンショットに差し替え、`src/data/works.js` のパスを変更 |
| 制作事例のURL | `src/data/works.js` → `url` | ひとつめ。は設定済み。MILKUNE STORIES は未設定（空の間は「Coming soon」表示） |
| ブランド名 | `src/data/site.js` → `name` | 仮で `PURPOSE`。OGP画像（`public/assets/ogp.png`）・favicon も合わせて差し替え |
| 価格の税表記 | `src/data/site.js` → `priceNote` | 例：`表示価格はすべて税込です。`（料金欄の注記に表示） |
| X(Twitter) / SNS | `src/data/site.js` → `seo.twitter` / `social` | 任意 |

## 構成

```
src/
  data/            ← 変更が多い内容はすべてここ
    site.js        サイト設定・SEO・CTAリンク・フォーム送信先
    plans.js       料金プラン / 「どこまで考えるか」図 / プラン比較表
    options.js     オプション料金 / 含まれるリンク / 別途見積り / ドメイン
    faq.js         よくある質問
    works.js       制作事例（配列に追加するだけで作品が増えます）
  components/      セクション単位のコンポーネント（header, hero, concept, ...）
  lib/html.js      依存なしのテンプレート関数（自動エスケープ）
  styles/main.css  スタイル（ビルド時にHTMLへインライン化）
  scripts/main.js  スクロール演出・メニュー・比較タブ・フォーム（約8KB）
  page.js          <head>（SEO / OGP / 構造化データ）とセクションの組み立て
public/            favicon / OGP画像 / 制作事例画像（dist/ にそのままコピー）
build.mjs          ビルドスクリプト
```

### 制作事例を追加する

`src/data/works.js` の配列にオブジェクトを追加します。

```js
{
  id: 'new-project',
  title: 'プロジェクト名',
  category: 'Category / Sub',
  description: ['1行目', '2行目'],
  url: 'https://example.com/',
  displayUrl: 'example.com',          // ブラウザ枠に表示する文字
  stage: { bg: '#E8EEF0', ink: '#111' }, // 作品背景色
  images: {
    pc: { src: 'assets/works/new-pc.webp', width: 1600, height: 1000, alt: '…' },
    sp: { src: 'assets/works/new-sp.webp', width: 780, height: 1688, alt: '…' }, // 任意
  },
},
```

`sp` を設定すると、PC画面に重ねてスマートフォン画面が表示されます。
画像は WebP（PC: 1600×1000px 前後、SP: 780×1688px 前後）を推奨。`width` / `height` は実寸を入れてください（レイアウトシフト防止）。

## 実装メモ

- **デザイン**：Off White ベース + Charcoal、アクセントは Ultramarine（`#2437D6`）1色。トークンは `main.css` 冒頭の `:root`。
- **フォント**：Inter Tight（欧文ディスプレイ）+ Noto Sans JP（Google Fonts / `display=swap`）。
- **モーション**：scroll reveal / text reveal / hover のみ。`prefers-reduced-motion` で無効化。JSが無効でも全文表示。
- **モバイル**：比較表はプラン切替タブ（横スクロールなし）、スクロール中は下部に固定CTA（ヒーロー・最終CTA・フォーム表示中は非表示）。
- **アクセシビリティ**：スキップリンク、見出し階層、`details/summary` のFAQ、タブのキーボード操作、フォームのエラー読み上げ・フォーカス移動。
- **SEO**：title / description / canonical / OGP / Twitter Card / favicon / JSON-LD（Organization・WebSite・Service・FAQPage）/ sitemap.xml / robots.txt。
