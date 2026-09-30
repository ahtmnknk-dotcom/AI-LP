/**
 * ひとつめ。LP 設定ファイル
 * ------------------------------------------------------------
 * 問い合わせ先・フォーム送信先・計測は、このファイルだけ変更すれば
 * ページ内のすべてのリンク／フォームに反映されます。
 */
window.HITOTSUME_CONFIG = {
  // ▼ Instagram の URL（ページ内のすべての Instagram リンクに反映）
  //   プロフィール: "https://www.instagram.com/アカウント名/"
  //   DM を直接開く: "https://ig.me/m/アカウント名"
  instagramUrl: "https://www.instagram.com/hitotsume_marketing/",

  // ▼ 問い合わせフォームの送信先
  //   provider を設定するまでは、送信時に「送信できませんでした」と表示されます。
  //   詳しい設定方法は README.md「問い合わせフォームの送信先」を参照。
  form: {
    // "web3forms" | "formspree" | "gas"（Google Apps Script）
    provider: "web3forms",

    // provider: "web3forms" のとき：https://web3forms.com で発行した Access Key
    web3formsAccessKey: "caee9eb0-053e-4496-abbf-e4e34af38398",

    // provider: "formspree" のとき：https://formspree.io/f/xxxxxxx
    // provider: "gas" のとき：Apps Script ウェブアプリの URL（https://script.google.com/macros/s/.../exec）
    endpoint: "",

    // 通知メールの件名
    subject: "【ひとつめ。】LPから新しい相談が届きました",
  },

  // ▼ Google Analytics 4 の測定ID（例: "G-XXXXXXXXXX"）。空なら読み込みません。
  ga4Id: "",
};
