# ひとつめ。 LP

Next Re が運営するマーケティング支援ブランド「ひとつめ。」の公式LP（静的サイト / ビルド不要）。

## 構成

```
index.html              LP本体（SEO・OGP・構造化データ含む）
assets/css/style.css    スタイル（スマホファースト）
assets/js/config.js     ★ 問い合わせ先・GA4 の設定はここだけ
assets/js/main.js       CTAリンク反映 / クリック計測 / フェード / 下部固定CTA
assets/img/             favicon.svg, favicon-32.png, apple-touch-icon.png, ogp.png
robots.txt
```

## よく変更する項目

| 変更したいもの | 場所 |
| --- | --- |
| Instagram URL（全CTAに反映） | `assets/js/config.js` の `instagramUrl` |
| 問い合わせフォーム URL | `assets/js/config.js` の `formUrl`（空ならボタン非表示） |
| メインCTAの遷移先 | `assets/js/config.js` の `primaryCta`（`"instagram"` / `"form"`） |
| Google Analytics 4 | `assets/js/config.js` の `ga4Id` |
| 公開URL（canonical / OGP） | `index.html` の `https://example.com/` を置換 |
| favicon / OGP画像 | `assets/img/` のファイルを同名で差し替え |

## 計測

- `data-track` 属性を持つ要素のクリックで `cta_click` イベントを送信（`dataLayer` と `gtag` の両方）。
  パラメータ: `cta_id`（設置場所）, `cta_type`, `link_url`
- GTM を使う場合は `index.html` の `<head>` 内コメント位置にタグを追加し、`dataLayer` の `cta_click` をトリガーにしてください。

## ローカル確認

```
npx http-server .
```
