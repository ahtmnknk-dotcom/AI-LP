/**
 * 料金プラン。
 * - price は税込/税抜の扱いを site.priceNote と揃えてください。
 * - from: true で「〜」表記になります。
 * - inherits に指定したプランの内容は「◯◯の内容すべてに加えて」と表示されます。
 */
export const plans = [
  {
    id: 'light',
    name: 'LIGHT',
    price: 29800,
    from: false,
    copy: ['内容は決まっている。', 'LPにしてほしい。'],
    summary: ['内容は決まっている。', '制作を任せたい。'],
    useCases: ['イベント', '新サービス', '店舗紹介', 'キャンペーン', '簡単なサービス紹介'],
    inherits: null,
    includes: [
      '完全オリジナルデザイン',
      '1ページ縦長LP',
      'PC対応',
      'スマートフォン対応',
      '基本構成',
      '支給原稿の文章調整',
      'CTAボタン設置',
      'LINE等へのリンク',
      'Instagram等へのリンク',
      '予約サイトへのリンク',
      '既存オンライン決済ページへのリンク',
      '基本問い合わせフォーム',
      'Googleマップ',
      '無料URLでの公開',
      '公開作業',
    ],
    revisions: 1,
    leadDays: 3,
  },
  {
    id: 'standard',
    name: 'STANDARD',
    price: 69800,
    from: false,
    copy: ['どう見せれば問い合わせにつながるかも', '考えてほしい。'],
    summary: ['何をどう見せるかから', '一緒に考えてほしい。'],
    useCases: [],
    inherits: 'light',
    includes: ['コピーライティング', 'ターゲット整理', '訴求内容の設計', 'CVを意識した導線設計', 'CTA設計'],
    revisions: 2,
    leadDays: 5,
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 149800,
    from: true,
    copy: ['LPを、', '本格的な集客ツールとして使いたい。'],
    summary: ['市場・集客戦略まで含めて', '本格的に設計したい。'],
    useCases: [],
    inherits: 'standard',
    includes: [
      '競合調査',
      '市場調査',
      'キーワード調査',
      'SEOを考慮した設計',
      '広告流入を想定した構成',
      'アクセス解析・計測設定',
      '公開後の改善提案',
      '独自ドメイン初年度費用',
      '独自ドメイン設定',
    ],
    revisions: 3,
    leadDays: 7,
  },
];

/**
 * 「どこまで私たちが考えるか」の図。
 * plans: その層を担当するプランID
 */
export const thinkingLayers = [
  { id: 'design', en: 'Original Design', ja: 'デザイン・実装', plans: ['light', 'standard', 'pro'] },
  { id: 'message', en: 'Message & Conversion', ja: '伝え方・訴求・導線', plans: ['standard', 'pro'] },
  { id: 'strategy', en: 'Market & Growth', ja: '市場・集客戦略', plans: ['pro'] },
];

/** プラン比較表。plans に含まれるプランに ✓ が付きます */
export const comparison = [
  {
    group: '全プラン共通',
    rows: [
      { label: '完全オリジナルデザイン', plans: ['light', 'standard', 'pro'] },
      { label: '1ページ縦長LP', plans: ['light', 'standard', 'pro'] },
      { label: 'PC対応', plans: ['light', 'standard', 'pro'] },
      { label: 'スマートフォン対応', plans: ['light', 'standard', 'pro'] },
      { label: 'CTA', plans: ['light', 'standard', 'pro'] },
      { label: '外部リンク', plans: ['light', 'standard', 'pro'] },
      { label: '基本問い合わせフォーム', plans: ['light', 'standard', 'pro'] },
      { label: 'Googleマップ', plans: ['light', 'standard', 'pro'] },
      { label: '公開作業', plans: ['light', 'standard', 'pro'] },
    ],
  },
  {
    group: '原稿',
    rows: [{ label: '支給原稿の文章調整', plans: ['light', 'standard', 'pro'] }],
  },
  {
    group: '伝え方の設計',
    rows: [
      { label: 'コピーライティング', plans: ['standard', 'pro'] },
      { label: 'ターゲット整理', plans: ['standard', 'pro'] },
      { label: '訴求設計', plans: ['standard', 'pro'] },
      { label: 'CV導線設計', plans: ['standard', 'pro'] },
    ],
  },
  {
    group: '市場・集客戦略',
    rows: [
      { label: '競合調査', plans: ['pro'] },
      { label: '市場調査', plans: ['pro'] },
      { label: 'キーワード調査', plans: ['pro'] },
      { label: 'SEO設計', plans: ['pro'] },
      { label: '広告流入設計', plans: ['pro'] },
      { label: 'アクセス解析・計測', plans: ['pro'] },
      { label: '公開後改善提案', plans: ['pro'] },
      { label: '独自ドメイン初年度', plans: ['pro'] },
    ],
  },
];
