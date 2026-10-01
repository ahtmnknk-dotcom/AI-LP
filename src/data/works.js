/**
 * 制作事例。配列に追加するだけで作品が増えます（3作品目以降も同じ形式）。
 *
 * images.pc : PC表示のスクリーンショット（必須）。推奨 1600×1000px 以上、WebP/JPEG
 * images.sp : スマートフォン表示のスクリーンショット（任意）。推奨 780×1688px 前後
 *             設定するとPC画面に重ねてスマホ画面を表示します。
 * url       : 「VIEW PROJECT」のリンク先。空文字の間はリンクを出さず「Coming soon」表示
 * stage     : 作品背景の色。作品ごとに世界観に合わせて変更してください
 *
 * 画像パスは public/ 以下からの相対パスです。
 */
export const works = [
  {
    id: 'hitotsume',
    title: 'ひとつめ。',
    category: 'Marketing Support / Business',
    description: [
      'ミニマルな構成と大胆なタイポグラフィで、',
      'サービスの考え方をシンプルかつ印象的に伝えるLP。',
    ],
    url: '',
    displayUrl: 'hitotsume',
    stage: { bg: '#E6E5E0', ink: '#111110' },
    images: {
      pc: {
        src: 'assets/works/hitotsume-pc.svg',
        width: 1600,
        height: 1000,
        alt: '「ひとつめ。」LPのPC表示。白を基調に大きな文字で構成されたファーストビュー',
      },
      sp: null,
      // sp: { src: 'assets/works/hitotsume-sp.webp', width: 780, height: 1688, alt: '「ひとつめ。」LPのスマートフォン表示' },
    },
  },
  {
    id: 'milkune',
    title: 'MILKUNE STORIES',
    category: 'Pet × AI Video / Global',
    description: [
      'ブランドの世界観そのものを体験できる、',
      '柔らかく遊び心のあるデザイン。',
      '海外ユーザーも想定した多言語LP。',
    ],
    url: '',
    displayUrl: 'milkune-stories',
    stage: { bg: '#F2E3D5', ink: '#2A1D14' },
    images: {
      pc: {
        src: 'assets/works/milkune-pc.svg',
        width: 1600,
        height: 1000,
        alt: 'MILKUNE STORIESのLPのPC表示。柔らかな色使いと丸みのある形で構成されたファーストビュー',
      },
      sp: null,
    },
  },
];
