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

## 公開方法（Netlify）

ビルドは不要です。設定は `netlify.toml` に入っています。

1. Netlify にログイン →「Add new site」→「Import an existing project」→ GitHub →
   リポジトリ `ahtmnknk-dotcom/AI-LP` を選ぶ
2. Branch to deploy：このサイトのブランチ（`claude/modest-goodall-0619uj`、または main に取り込んだ後なら `main`）
3. Build command：空欄 / Publish directory：`.`（`netlify.toml` から自動で入ります）→「Deploy」
4. Site configuration →「Change site name」で **`next-relive`** にする
   → 公開URLが `https://next-relive.netlify.app/` になります

サイト内のURL（canonical / OGP / sitemap / robots / 構造化データ）は `https://next-relive.netlify.app/` で設定済みです。
`next-relive` が使えなかった場合や独自ドメインにする場合は、次の箇所をまとめて書き換えてください。

- `index.html` の `canonical` / `og:url` / `og:image` / JSON-LD の `url`
- `robots.txt` / `sitemap.xml`

GitHub Pages は MILKUNE STORIES のLPが使う想定なので、このサイトでは使いません。

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

## 制作事例（PROJECTS）の素材

`assets/work/` に実素材を置いています（WebP＋JPEGフォールバック、動画は360×640・音声なし・約570KB）。

| 事例 | 素材の出どころ |
| --- | --- |
| 01 PURPOSE | `claude/wonderful-bohr-snqej1` ブランチのPURPOSE LPをビルドしてPC / スマホ表示を撮影 |
| 02 ひとつめ。 | 同ブランチの `public/assets/works/hitotsume-*.jpg` |
| 03 MILKUNE STORIES | 同ブランチの `milkune-*.jpg`、動画は `claude/milkune-stories-lp-r1c23f` の `dance.mp4` を軽量化 |

「サイトを見る」のリンク先は `https://lpstudio298.netlify.app/`（PURPOSE）と、その配下の `works/hitotsume/`・`works/milkune/` です。
**この開発環境からは外部サイトに接続できないため、リンク先は公開後に開けるか確認してください。**

画像を差し替えるときは同じファイル名・同じ縦横比（PC 1600×1000 / スマホ 480×1038）で上書きすれば、レイアウトは崩れません。

## 公開前に差し替える素材

架空の実績・写真・数値は使っていません。

| 場所 | 現状 | 差し替えたい素材 |
| --- | --- | --- |
| ロゴ（ヘッダー・フッター） | テキストのワードマーク | 正式ロゴ（SVG推奨） |
| favicon / アイコン / OGP | ワードマークをもとに作った仮デザイン | 正式ロゴ版（`assets/img/`） |
| 04 AI AD STUDIO | 縦型のストーリーボード風アニメーション | 実際のAI広告動画（縦型 mp4、10〜15秒、1MB程度、poster 画像つき） |
| 05 LIVE COMMERCE | タイポグラフィのキービジュアル | 関連する実素材があれば |

`index.html` の該当箇所に `<!-- REPLACE: ... -->` コメントを入れています。
動画は MILKUNE STORIES の `<video data-autoplay>` と同じ書き方にすると、画面に入ったときだけ再生され、動きを減らす設定の閲覧者には自動再生されません。

## 掲載していない情報（意図的）

代表者名、電話番号、番地、設立年、資本金、従業員数、実績数値、お客様の声は、確認できた情報がないため掲載していません。追加する場合は「会社概要」の `dl` に行を足してください。
