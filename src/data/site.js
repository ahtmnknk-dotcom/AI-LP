/**
 * サイト全体の設定。
 * 公開前に `url` / `form.endpoint` / `social` を必ず実際の値に変更してください。
 */
export const site = {
  /** ブランド名（ロゴ・フッター・構造化データに使用） */
  name: 'PURPOSE',
  tagline: 'Original LP Design Studio',

  /** 本番URL（末尾スラッシュあり）。canonical / OGP / 構造化データに使用 */
  url: 'https://example.com/',

  lang: 'ja',
  locale: 'ja_JP',
  themeColor: '#F5F4F0',

  seo: {
    title: 'LPって、30万円も必要ですか？｜完全オリジナルLP制作 29,800円〜｜PURPOSE',
    description:
      'テンプレートを使わない、完全オリジナルのLP制作。イベント・新サービス・店舗紹介など、目的に合わせて選べる3つのプラン。29,800円〜、最短3営業日、スマホ・多言語対応。保守契約の縛りなし。',
    ogImage: 'assets/ogp.png',
    ogImageAlt: 'PURPOSE — 完全オリジナルLP 29,800円〜',
    /** 例: '@purpose_lp'（未設定なら twitter:site を出力しません） */
    twitter: '',
  },

  /** 料金表示に付ける注記（例: '表示価格はすべて税込です。'） */
  priceNote: '',

  /** CTAリンク。外部フォームやLINEに差し替える場合はここを変更 */
  cta: {
    primary: { label: '無料で相談する', href: '#contact' },
    works: { label: '制作事例を見る', href: '#works' },
  },

  /** グローバルナビゲーション */
  nav: [
    { label: 'Works', href: '#works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Flow', href: '#flow' },
    { label: 'FAQ', href: '#faq' },
  ],

  /**
   * お問い合わせフォームの送信先。
   * Formspree / Getform / 自前API など、FormData を POST で受け取れるエンドポイントを指定。
   * 空文字のままだとデモモード（送信せず完了画面のみ表示）で動作します。
   *
   * Web3Forms（https://web3forms.com）を使う場合：
   *   endpoint を 'https://api.web3forms.com/submit' にし、fields.access_key に Access Key を入れてください。
   *   Access Key に登録したメールアドレスへ届きます。
   * fields はフォームに hidden で一緒に送る値です（空の値は送りません）。
   */
  form: {
    endpoint: '',
    fields: {
      access_key: '',
      subject: '【PURPOSE】LPから新しいお問い合わせが届きました',
      from_name: 'PURPOSE 公式LP',
    },
  },

  /** SNSなど（フッター・構造化データ sameAs に使用） */
  social: [
    // { label: 'Instagram', href: 'https://www.instagram.com/xxxx/' },
  ],

  copyrightSince: 2026,
};
