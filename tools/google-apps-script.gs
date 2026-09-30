/**
 * ひとつめ。LP 問い合わせ受信用 Google Apps Script（任意）
 * ------------------------------------------------------------
 * 使い方（config.js で form.provider = "gas" にする場合）
 *  1. Googleスプレッドシートを新規作成 → 拡張機能 → Apps Script
 *  2. このファイルの内容を貼り付けて保存
 *  3. デプロイ → 新しいデプロイ → 種類「ウェブアプリ」
 *       実行ユーザー: 自分 / アクセスできるユーザー: 全員
 *  4. 発行された URL（.../exec）を config.js の form.endpoint に貼る
 *
 * 通知先は、スクリプトを実行する Google アカウントのメールアドレス。
 * 別のアドレスに送りたい場合は NOTIFY_TO に設定してください。
 */
var NOTIFY_TO = ""; // 空ならスクリプト所有者のアドレスへ送信

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var fields = data.fields || {};
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  var keys = Object.keys(fields);
  if (sheet.getLastRow() === 0) sheet.appendRow(["受信日時"].concat(keys));
  sheet.appendRow([new Date()].concat(keys.map(function (k) { return fields[k]; })));

  var body = keys.map(function (k) { return "■ " + k + "\n" + fields[k]; }).join("\n\n");
  MailApp.sendEmail({
    to: NOTIFY_TO || Session.getEffectiveUser().getEmail(),
    subject: data.subject || "LPから新しい相談が届きました",
    body: body + "\n\n---\n送信元: " + (data.page || ""),
    replyTo: data.email || undefined,
  });

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
