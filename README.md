# MILKUNE STORIES — Landing Page

ペット向けAI動画制作サービス「MILKUNE STORIES」のLP（日本語／英語）。
依存パッケージなしの静的サイトです。`src/` を編集 → `npm run build` → `docs/` に出力されます。

| URL | 言語 |
| --- | --- |
| `/` | 日本語（初期表示） |
| `/en/` | English（海外営業ではこのURLをそのまま共有） |
| `/?lang=en` | `/en/` へリダイレクト（utm等のパラメータは保持） |

## 編集する場所

| 変えたいもの | ファイル |
| --- | --- |
| Instagramアカウント・DMキーワード（`PET`） | `src/config.js` → `instagram` |
| 料金（全セクション共通で反映） | `src/config.js` → `plans` |
| サンプル動画・ポスター画像 | `src/config.js` → `videos`（`src` が空ならプレースホルダー表示） |
| ロゴ画像 | `src/config.js` → `logo`（空ならテキストロゴ） |
| 公開URL（canonical / OGP / hreflang） | `src/config.js` → `siteUrl` **※公開前に必ず変更** |
| アナリティクスタグ（GA4 / Meta Pixel等） | `src/config.js` → `analytics.headHtml` / `bodyEndHtml` |
| 文言（JP / EN） | `src/content.js` |
| デザイン | `src/assets/css/style.css`（色は先頭の `:root` 変数） |

編集後：

```bash
npm run build     # docs/ を再生成
npm run dev       # ビルドして http://localhost:4173 でプレビュー
```

### 動画の差し替え

1. 9:16 の mp4 を `src/assets/videos/` に置く（目安：720×1280、数MB以内、音声なし推奨）
2. `src/config.js` の `videos` に `src: "assets/videos/dance.mp4"` のように指定（任意で `poster` も）
3. `npm run build`

動画は `muted` + `playsinline` + `preload="none"`。画面に近づいてから読み込み、表示中だけ自動再生します。
「視差効果を減らす」設定のユーザーには自動再生せず、再生ボタンで再生します。

## CTAの動き

すべてのCTAは Instagram DM（`https://ig.me/m/<username>`）へのリンクです。
JSが有効な場合は、タップ時に「DMで“PET”と送ってください」の案内シートを表示し、
そこから Instagram DM を開く／「PET」をコピーできます（JSなしでも直接DMへ遷移）。

## 計測（クリックトラッキング）

CTAクリック等は常に `window.dataLayer` に push されます（GTM / GA4 でそのまま拾えます）。

| event | タイミング |
| --- | --- |
| `cta_click` | いずれかのCTAをタップ（`cta`: hero / examples / why / pricing / order / final / sticky / footer_instagram） |
| `cta_sheet_open` | 案内シート表示 |
| `cta_instagram_open` | シートから Instagram を開いた |
| `cta_copy_keyword` | 「PET」をコピー |
| `video_play` / `faq_open` | 動画再生 / FAQ展開 |

GTMを使わず直接送る場合は `window.MILKUNE_TRACK = (name, params) => { /* gtag / fbq など */ }` を定義してください。

## 画像

- `src/assets/img/og-image.png`（1200×630）と `apple-touch-icon.png` は `tools/og-image.html` と `favicon.svg` から生成しています。
  再生成：`node tools/make-images.cjs`（Playwrightが必要）。本番用の画像ができたら同名で差し替えてもOK。

## 公開（GitHub Pages の例）

Settings → Pages → Branch: `main` / Folder: `/docs`。
Netlify / Vercel / Cloudflare Pages の場合は公開ディレクトリを `docs` に設定（ビルドコマンド `npm run build`）。
