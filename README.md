# ひとつめ。 LP

Next Re が運営するマーケティング支援ブランド「ひとつめ。」の公式LP（静的サイト / ビルド不要）。

## 構成

```
index.html                 LP本体（SEO・OGP・構造化データ・問い合わせフォーム含む）
assets/css/style.css       スタイル（スマホファースト）
assets/js/config.js        ★ Instagram URL・フォーム送信先・GA4 の設定はここだけ
assets/js/main.js          Instagramリンク反映 / 計測 / フォーム送信 / STEP開閉 / 固定CTA
assets/img/                favicon.svg, favicon-32.png, apple-touch-icon.png, ogp.png
tools/google-apps-script.gs  （任意）Googleスプレッドシートで受信する場合のスクリプト
robots.txt
```

## よく変更する項目

| 変更したいもの | 場所 |
| --- | --- |
| Instagram URL（全Instagramリンクに反映） | `assets/js/config.js` の `instagramUrl` |
| フォームの送信先 | `assets/js/config.js` の `form` |
| Google Analytics 4 | `assets/js/config.js` の `ga4Id` |
| 公開URL（canonical / OGP） | `index.html` の `https://hitotsume-marketing.netlify.app/` を置換 |
| favicon / OGP画像 | `assets/img/` のファイルを同名で差し替え |

メインCTA（「まずは相談してみる」「30日間、試してみる」など）は、すべてページ内のフォーム（`#contact`）へスクロールします。

## 問い合わせフォームの送信先

`config.js` の `form.provider` で選びます。未設定のまま送信すると「送信できませんでした」と表示されます。

### A. Web3Forms（おすすめ・最も簡単）
- 無料（月250件まで）。アカウント登録不要。
1. https://web3forms.com で通知を受け取りたいメールアドレスを入力 → Access Key がメールで届く
2. `config.js` を次のようにする
   ```js
   form: { provider: "web3forms", web3formsAccessKey: "届いたキー", ... }
   ```
- Access Key はブラウザに公開される前提のキーです（通知先アドレスは公開されません）。

### B. Formspree
- 無料（月50件まで）。アカウント登録が必要。
1. https://formspree.io でフォームを作成 → `https://formspree.io/f/xxxx` をコピー
2. `form: { provider: "formspree", endpoint: "https://formspree.io/f/xxxx", ... }`

### C. Google Apps Script（スプレッドシートにも記録したい場合）
- 無料。Googleアカウントが必要。
- 手順は `tools/google-apps-script.gs` 冒頭のコメント参照。
- `form: { provider: "gas", endpoint: "https://script.google.com/macros/s/.../exec", ... }`

## 計測

すべて `dataLayer.push({ event: ... })` と、GA4設定時は `gtag("event", ...)` の両方に送られます。

| イベント | タイミング | 主なパラメータ |
| --- | --- | --- |
| `cta_click` | `data-track` を持つ要素のクリック | `cta_id`（設置場所）, `cta_type`（primary / instagram）, `link_url` |
| `instagram_click` | Instagramリンクのクリック | `cta_id` |
| `form_view` | フォームが画面に表示された（1回のみ） | `form_id` |
| `form_start` | フォームの入力を開始した（1回のみ） | `form_id` |
| `form_submit` | 送信成功 | `form_id`, `provider` |
| `form_submit_error` | 送信失敗 | `form_id`, `reason` |

主なCTAの `cta_id`：`header` / `hero_primary` / `hero_trial` / `trial` / `price` / `final_primary` / `sticky` / `final_instagram` / `contact_instagram` / `form_done_instagram`

GA4 では `form_submit` を「キーイベント（コンバージョン）」に設定してください。

## ローカル確認

```
npx http-server .
```
