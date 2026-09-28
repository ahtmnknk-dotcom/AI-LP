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
| InstagramのURL（全CTAのリンク先）・DMキーワード（`PET`） | `src/config.js` → `instagram.url` / `dmKeyword` |
| 注文フォームの送信先 | `src/config.js` → `order.endpoint` **※公開前に必ず設定**（下記） |
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

主要CTAは2種類です。

| 種類 | 表示（JP / EN） | 動作 |
| --- | --- | --- |
| Primary | 注文する / ORDER NOW | ページ内の注文リクエストフォーム（`#order-form`）へ移動 |
| Secondary | まず相談する / DM US | `config.instagram.url` へのリンク。タップ時に「DMで“PET”と送る」案内シートを表示 |

InstagramのURLを変えると、全CTA・フッター・表示される @ユーザー名 がまとめて変わります。
注文フォームへの直リンク（Instagramのプロフィール等に使えます）：`https://<公開URL>/#order-form`（英語版は `/en/#order-form`）

## 注文リクエストフォーム

決済は行わず、注文リクエストのみ受け付けます。素材のアップロード欄はありません。

- 入力項目：お名前／ご希望の連絡方法（Instagram または WhatsApp）＋選んだ方の連絡先（必須）／ペットの種類／希望プラン（4プラン＋まだ分からない）／作りたい動画・希望内容／参考動画URL（任意）／商用利用の有無
- 送信データ（項目名）：`name` `contact_method` `contact` `instagram` `whatsapp` `pet` `plan` `request` `reference_url` `commercial_use` `lang` `page` `submitted_at`
- 文言は `src/content.js` の `orderForm`（JP / EN）
- claude.ai のプレビュー（`tools/build-preview.mjs`）は外部へ送信できないため、常にプレビューモード（送信しない）で生成されます

### 送信先の設定（公開前に必須）

`src/config.js` の `order.endpoint` にフォームの受け取り先URLを入れて `npm run build` してください。
（現在の設定：`https://formspree.io/f/xbglpvll`）

**空のままだとプレビューモード**になり、完了画面に「実際には送信されていません」と表示され、内容はどこにも届きません。

- **Formspree**（一番かんたん）：formspree.io でフォームを作成 → `https://formspree.io/f/xxxxxxx` を設定。届いた内容はメールと管理画面で確認できます。
- **Google スプレッドシート**：スプレッドシートの「拡張機能 → Apps Script」で `doPost(e)` を作成し、ウェブアプリとして公開 → `https://script.google.com/macros/s/xxxx/exec` を設定。
- そのほか、フォーム項目をPOSTで受け取れるサービスならそのまま使えます。

## 計測（クリックトラッキング）

CTAクリック等は常に `window.dataLayer` に push されます（GTM / GA4 でそのまま拾えます）。

| event | タイミング |
| --- | --- |
| `cta_click` | いずれかのCTAをタップ（`cta`: `<場所>_order` / `<場所>_dm`。場所 = hero / examples / why / pricing / order / order_form / final / sticky、ほか footer_instagram） |
| `order_form_start` / `order_form_invalid` | フォーム入力開始 / 入力エラーで送信できなかった |
| `order_form_success` / `order_form_error` | 注文リクエスト送信完了 / 送信失敗 |
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
