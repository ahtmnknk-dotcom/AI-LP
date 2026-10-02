# 株式会社Next Re.Live 公式サイト

考える → 作る → 届ける → 売る。
Next Re.Live の公式コーポレート兼サービスLP（PURPOSE 制作事例）。

- 依存ライブラリなしの静的サイト（HTML / CSS / JavaScript）
- ビルド不要。リポジトリの中身をそのまま公開すれば動きます

```
index.html            ページ本体
assets/css/style.css  スタイル（デザイントークンは :root）
assets/js/main.js     メニュー・工程の追従・PURPOSEの範囲表示・フォーム送信
assets/img/           OGP画像 / favicon / アイコン
favicon.ico, site.webmanifest, robots.txt, sitemap.xml
```

## アートディレクション

| 要素 | 意味 |
| --- | --- |
| 紙と墨 | 事業の現場の「相談メモ」「工程表」。派手な演出より、仕事の道具の質感 |
| 赤ペン | 「本当に、今それが必要？」と判断する会社であること。いらないものに線を引く |
| 赤い句点 | Re.Live の「.」＝アイデア。THINK. MAKE. DELIVER. SELL. と工程を進んでいく |
| 1本の工程線 | 4事業を一覧にせず、スクロールに合わせてアイデア（赤い点）が進む一本の流れとして表現 |

## 公開方法（GitHub Pages の例）

1. GitHub のリポジトリ → Settings → Pages
2. Source: `Deploy from a branch` / Branch: `main`（または公開したいブランチ）・`/ (root)`
3. 公開URLは `https://ahtmnknk-dotcom.github.io/AI-LP/`

独自ドメインで公開する場合は、次の箇所のURLを書き換えてください。

- `index.html` の `canonical` / `og:url` / `og:image` / JSON-LD の `url`
- `robots.txt` / `sitemap.xml`

Netlify・Cloudflare Pages などでも、そのままアップロードすれば動きます。

## お問い合わせフォームの設定（公開前に必須）

フォームは [FormSubmit](https://formsubmit.co/) 経由で `relivenabi@gmail.com` に届きます。APIキーは不要ですが、最初に1回だけ有効化が必要です。

1. サイト公開後、フォームから1回テスト送信する
2. `relivenabi@gmail.com` に FormSubmit から確認メールが届く →「Activate Form」をクリック
3. 以降の送信はメールで届く（件名：【Next Re.Live サイト】ご相談フォーム）
4. （推奨）有効化後のメールに記載されるランダムな文字列のエンドポイントに置き換えると、HTML上にメールアドレスを出さずに済む
   - `index.html` の `<form action="https://formsubmit.co/relivenabi@gmail.com">` の部分を置き換え

動作の仕様:

- JavaScript有効時は非同期送信（ページ遷移なし）。入力チェック、送信中表示、完了メッセージあり
- 送信に失敗した場合は入力内容を残したまま、内容入りの `mailto:` リンクを表示
- JavaScript無効時は通常のフォーム送信として動作
- スパム対策としてハニーポット欄（`_honey`）あり

他のサービスに切り替える場合は、`form` の `action` を変更してください（Formspree、Netlify Forms など）。`main.js` は `formsubmit.co/` を `formsubmit.co/ajax/` に置き換えて送信するので、別サービスに切り替えるときは `initForm()` の `endpoint` も合わせて変更します。

## 公開前に差し替える素材

現在は、実素材がない箇所にタイポグラフィで作ったキービジュアルを仮に置いています。架空の実績・写真・数値は使っていません。

| 場所 | 現状 | 差し替えたい素材 |
| --- | --- | --- |
| ロゴ（ヘッダー・フッター） | テキストのワードマーク | 正式ロゴ（SVG推奨） |
| favicon / アイコン / OGP | ワードマークをもとに作った仮デザイン | 正式ロゴ版（`assets/img/`） |
| WORK 01 PURPOSE | タイポグラフィのキービジュアル | PURPOSE LP の実スクリーンショット（PC / スマホ） |
| WORK 02 ひとつめ。 | タイポグラフィのキービジュアル | ひとつめ。のロゴ・ページ画像 |
| WORK 03 AI AD STUDIO | 縦型のストーリーボード風アニメーション | 実際のAI広告動画（縦型 mp4/webm、10〜15秒、1MB程度、poster 画像つき） |
| WORK 04 LIVE COMMERCE | タイポグラフィのキービジュアル | 関連する実素材があれば |
| MILKUNE STORIES など他のWeb制作事例 | 未掲載（素材なし） | 実際のLPのスクリーンショット + 概要 |

`index.html` の該当箇所に `<!-- REPLACE: ... -->` コメントを入れています。
動画を入れる場合の例:

```html
<video src="assets/video/ad-01.mp4" poster="assets/video/ad-01.jpg"
       muted playsinline loop autoplay preload="none"></video>
```

## 掲載していない情報（意図的）

代表者名、電話番号、番地、設立年、資本金、従業員数、実績数値、お客様の声は、確認できた情報がないため掲載していません。追加する場合は「会社概要」の `dl` に行を足してください。
