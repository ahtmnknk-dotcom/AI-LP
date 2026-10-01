/** 追加オプション。price は数値、from: true で「〜」、extra は価格の後ろに付く補足 */
export const options = [
  { id: 'language', name: '追加言語', price: 5000, unit: '1言語' },
  { id: 'page', name: '追加ページ', price: 10000, from: true, unit: '1ページ' },
  { id: 'domain', name: '独自ドメイン取得・接続', price: 5000, extra: 'ドメイン実費' },
  { id: 'revision', name: '追加修正', price: 5000, unit: '1回' },
  { id: 'express', name: '特急制作', price: 10000, from: true },
  { id: 'logo', name: 'ロゴ制作', price: 10000, from: true },
  { id: 'update', name: '公開後の更新', price: 5000, from: true, unit: '回' },
  { id: 'maintenance', name: '保守・管理', price: 5000, from: true, unit: '月' },
];

/** 基本料金に含まれる外部リンク */
export const includedLinks = [
  'LINE',
  'Instagram',
  'その他SNS',
  '予約サイト',
  '既存オンライン決済ページ',
  'その他一般的な外部URL',
];

/** 別途お見積りとなる制作範囲 */
export const customQuote = [
  'ECサイト',
  '複数ページ構成のWebサイト',
  'カート機能',
  '商品管理',
  '在庫管理',
  '会員機能',
  '特殊なシステム開発',
];

/** 公開URL・ドメインについて */
export const domainRules = [
  {
    label: '無料URLで公開',
    target: 'LIGHT / STANDARD',
    value: '追加料金なし',
  },
  {
    label: '独自ドメインで公開',
    target: 'LIGHT / STANDARD',
    value: '＋5,000円（設定費）＋ドメイン実費',
  },
  {
    label: '独自ドメインで公開',
    target: 'PRO',
    value: '初年度のドメイン費用・設定込み',
  },
];
