/**
 * ひとつめ。LP 設定ファイル
 * ------------------------------------------------------------
 * 問い合わせ先・計測まわりはこのファイルだけ変更すれば
 * ページ内のすべてのCTAに反映されます。
 */
window.HITOTSUME_CONFIG = {
  // Instagram プロフィール or DM の URL（全CTAに反映）
  // 例: "https://www.instagram.com/hitotsume_marketing/"  /  DM直リンク: "https://ig.me/m/hitotsume_marketing"
  instagramUrl: "https://www.instagram.com/REPLACE_ME/",

  // 問い合わせフォーム URL（Googleフォーム等）。空文字にするとフォームボタンは非表示になります。
  formUrl: "",

  // メインCTA（「まずは相談してみる」等）の遷移先: "instagram" または "form"
  primaryCta: "instagram",

  // Google Analytics 4 の測定ID（例: "G-XXXXXXXXXX"）。空なら読み込みません。
  ga4Id: "",
};
