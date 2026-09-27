// ============================================================
// MILKUNE STORIES — all page copy (JP / EN)
// Prices come from config.js — do not hardcode them here.
// Line breaks: use "\n" inside a string to force a line break.
// ============================================================

import { config, fromPrice } from "./config.js";

const kw = config.instagram.dmKeyword;
const tagline = "Your pet. Your little dream, brought to life.";

const shared = {
  tagline,
  dmHint: `DM “${kw}” to start 🐾`,
  footerTagline: tagline,
};

export const content = {
  // ----------------------------------------------------------
  ja: {
    ...shared,
    lang: "ja",
    htmlLang: "ja",
    ogLocale: "ja_JP",
    path: "", // root
    meta: {
      title: "MILKUNE STORIES｜うちの子が主役のAI動画制作",
      description:
        "踊ったり、話したり、料理をしたり、冒険に出たり。あなたのペットが主役の、世界にひとつだけのAI動画を制作します。" +
        `${fromPrice("sample")}。Instagram DMで「${kw}」と送るだけ。`,
    },
    nav: { langLabel: "言語", skip: "本文へスキップ" },

    hero: {
      titleLines: ["Your pet.", "Your little dream,", "brought to life."],
      sub: "うちの子の「こんな姿を見てみたい」を、動画に。",
      body: "踊ったり、話したり、料理をしたり、冒険に出たり。\nあなたのペットが主役の、世界にひとつだけのAI動画を制作します。",
      price: fromPrice("sample"),
      cta: "うちの子の動画を作る",
    },

    examples: {
      eyebrow: "SEE THE MAGIC ✦",
      title: "こんな“うちの子”が見られます。",
      items: {
        dance: { label: "DANCE", caption: "What if your pet could dance?" },
        chef: { label: "CHEF", caption: "What if your pet became a little chef?" },
        talking: { label: "TALKING", caption: "What if your pet could finally talk to you?" },
      },
      placeholder: "サンプル動画 準備中",
      swipeHint: "← スワイプ →",
      cta: "MAKE ONE WITH MY PET",
      playLabel: "動画を再生",
      pauseLabel: "動画を一時停止",
    },

    why: {
      eyebrow: "WHY MILKUNE?",
      titleEn: "AI can make videos.\nBut making the right one isn’t always easy.",
      title: "AIで動画を作れる時代。\nだからこそ、面倒なところはMILKUNEにおまかせ。",
      lead:
        "AI動画は以前より気軽に作れるようになりました。\nでも実際に「自分のペットで、思い描いた通りの動画」を完成させようとすると、意外と時間も手間もかかります。",
      cards: [
        { icon: "prompt", title: "PROMPTS", text: "どんなプロンプトを書けばいいかわからない。" },
        { icon: "face", title: "CONSISTENCY", text: "顔・毛色・模様が違う子になってしまうことがある。" },
        { icon: "repeat", title: "GENERATIONS", text: "何度生成しても、思った動きにならないことがある。" },
        { icon: "coins", title: "AI COSTS", text: "複数のAIサービスへの課金や、失敗生成でクレジットを消費することも。" },
        { icon: "scissors", title: "EDITING", text: "生成後の編集まで自分でするのは大変。" },
      ],
      solveTitle: "You bring the dream.\nWe handle the AI. ✦",
      solveLead: "あなたは「こんなうちの子が見たい！」と伝えるだけ。",
      solveBody: [
        "プロンプト設計、AI生成、試行錯誤、シーン制作、編集までMILKUNEが担当します。",
        "複数のAIサービスへの課金や失敗生成にかかるクレジット・時間を気にせず、完成した動画をご注文いただけます。",
      ],
      cta: "TELL US YOUR IDEA →",
    },

    whatif: {
      eyebrow: "WHAT IF?",
      titleEn: "What if your pet could do anything?",
      title: "もし、うちの子が何でもできるとしたら？",
      items: [
        { icon: "dance", en: "DANCE", label: "踊る" },
        { icon: "talk", en: "TALK", label: "話す" },
        { icon: "cook", en: "COOK", label: "料理する" },
        { icon: "adventure", en: "ADVENTURE", label: "冒険する" },
        { icon: "celebrate", en: "CELEBRATE", label: "誕生日・記念日" },
        { icon: "movie", en: "MOVIE STAR", label: "映画の主人公になる" },
        { icon: "message", en: "MESSAGE", label: "「大好き」を伝える" },
      ],
      closing: "現実ではできない“小さな夢”を、\nMILKUNEがひとつの物語にします。",
    },

    pricing: {
      eyebrow: "PRICING",
      title: "CHOOSE YOUR STORY",
      from: "FROM",
      plans: {
        sample: { spec: "", desc: "既存のサンプル・トレンド動画から選び、あなたのペットを主役に制作。" },
        custom: { spec: "最大15秒", desc: "参考動画や「こんなことをしてほしい」というアイデアをもとに制作。" },
        original: { spec: "最大30秒", desc: "ストーリーや世界観から完全オリジナルで制作。" },
        business: { spec: "商用利用OK", desc: "店舗・ブランド・SNS・広告など、商用利用向け。" },
      },
      personalBadge: "個人利用",
      businessBadge: "商用利用",
      note: "動画の長さ・内容・制作難易度によって最終料金が異なる場合があります。",
      noteSub: "Final pricing may vary depending on length, complexity and production requirements.",
      commercial:
        "個人向けプラン（SAMPLE / TREND・CUSTOM SHORT・ORIGINAL MOVIE）は商用利用不可です。商用利用をご希望の場合はBUSINESSプランをご利用ください。",
      cta: "相談してみる",
    },

    order: {
      eyebrow: "HOW TO ORDER",
      titleEn: "From your pet to their own little movie.",
      title: "ご注文は簡単です。",
      steps: [
        `DMで「${kw}」と送る`,
        "作りたい動画・プランを相談",
        "お見積もり＆納期をご案内",
        "100%前払い",
        "必要な素材を送付",
        "MILKUNEが制作",
        "初稿確認 → 完成動画を納品",
      ],
      note:
        "必要な写真・動画などの素材は、制作内容によって異なります。\n希望内容を確認後、MILKUNEから必要素材をご案内します。",
      deliveryLabel: "DELIVERY",
      delivery: "最短即日〜5日以内",
      cta: `DM “${kw}” TO START`,
    },

    brand: {
      title: "Not just an AI video.\nA little story starring someone you love.",
      body: [
        "ただAIで動かすだけではなく、",
        "「この子にこんなことをしてほしかった。」",
        "そんな小さな願いを形にします。",
        "笑える動画も。\nかわいい動画も。\n大切な人へのメッセージも。",
        "あなたの“うちの子”だけの、小さな物語を。",
      ],
    },

    faq: {
      eyebrow: "BEFORE YOU ORDER",
      title: "よくあるご質問",
      items: [
        { q: "納期は？", a: ["最短即日〜5日以内です。制作内容や注文状況によって異なります。"] },
        {
          q: "何を送ればいいですか？",
          a: ["必要な写真・動画などは制作内容によって異なります。ご希望を確認後、必要な素材をご案内します。"],
        },
        {
          q: "修正できますか？",
          a: [
            "初回修正は1シーンまで無料です。",
            "2回目以降の修正、および制作開始後のお客様都合による内容変更は、修正範囲・動画の長さなどに応じて別途お見積もりとなります。",
            "合意した制作内容と明らかに異なるなど、制作側に起因する修正については通常のお客様都合の修正とは別に対応します。",
          ],
        },
        { q: "キャンセルできますか？", a: ["制作開始後のキャンセル・返金はできません。"] },
        {
          q: "本物のペットと完全に同じになりますか？",
          a: ["AI生成の特性上、毛並み・模様・表情・体型・動きなどが元のペットと完全に一致しない場合があります。"],
        },
        {
          q: "商用利用できますか？",
          a: [
            "個人向けプランは個人利用を前提としています。",
            "店舗・ブランド・広告・その他商用目的の場合はBUSINESSプランをご利用ください。",
          ],
        },
      ],
    },

    final: {
      titleEn: "What’s your pet’s little dream? ✦",
      title: "次は、あなたの子が主役。",
      body: [
        "踊ってほしい？\n料理してほしい？\nそれとも、一度だけでも話してほしい？",
        "あなたが見てみたい“うちの子”を教えてください。",
      ],
      // Shown as soft secondary English text on the JP page (set "" to hide)
      bodyEn:
        "Maybe they dance. Maybe they cook.\nMaybe they finally tell you how much they love you.\nWhat would you love to see them do?",
      price: fromPrice("sample"),
      cta: `💌 DM “${kw}” TO START`,
    },

    stickyCta: "🐾 うちの子の動画を作る",

    // CTA sheet (shown when any CTA is tapped)
    sheet: {
      title: "Instagram DMで\nご相談ください 🐾",
      step1: `Instagram で @${config.instagram.username} を開く`,
      step2: `DMで「${kw}」と送る`,
      body: "作りたい動画のイメージが決まっていなくても大丈夫。お気軽にどうぞ。",
      open: "Instagram DMを開く",
      copy: `「${kw}」をコピー`,
      copied: "コピーしました ✓",
      close: "閉じる",
    },

    footer: { instagram: "Instagram", copyright: `© ${new Date().getFullYear()} MILKUNE STORIES` },
  },

  // ----------------------------------------------------------
  en: {
    ...shared,
    lang: "en",
    htmlLang: "en",
    ogLocale: "en_US",
    path: "en/",
    meta: {
      title: "MILKUNE STORIES | Custom AI movies starring your pet",
      description:
        "Dance. Talk. Cook. Go on adventures. We create one-of-a-kind AI videos starring your pet. " +
        `${fromPrice("sample")}. Just DM “${kw}” on Instagram.`,
    },
    nav: { langLabel: "Language", skip: "Skip to content" },

    hero: {
      titleLines: ["Your pet.", "Your little dream,", "brought to life."],
      sub: "The video of your pet you’ve always wanted to see.",
      body: "Dance. Talk. Cook. Go on adventures.\nOr become the star of their own movie.",
      price: fromPrice("sample"),
      cta: "CREATE MY PET MOVIE",
    },

    examples: {
      eyebrow: "SEE THE MAGIC ✦",
      title: "Imagine your pet like this.",
      items: {
        dance: { label: "DANCE", caption: "What if your pet could dance?" },
        chef: { label: "CHEF", caption: "What if your pet became a little chef?" },
        talking: { label: "TALKING", caption: "What if your pet could finally talk to you?" },
      },
      placeholder: "Sample video coming soon",
      swipeHint: "← swipe →",
      cta: "MAKE ONE WITH MY PET",
      playLabel: "Play video",
      pauseLabel: "Pause video",
    },

    why: {
      eyebrow: "WHY MILKUNE?",
      titleEn: "AI can make videos.\nBut making the right one isn’t always easy.",
      title: "",
      lead:
        "Making AI videos is easier than ever.\nBut getting a video of *your* pet that looks exactly the way you imagined can take a surprising amount of time and effort.",
      cards: [
        { icon: "prompt", title: "PROMPTS", text: "Not sure what prompts to write." },
        { icon: "face", title: "CONSISTENCY", text: "The face, coat color or markings can end up looking like a different pet." },
        { icon: "repeat", title: "GENERATIONS", text: "Even after many tries, the motion may not turn out the way you wanted." },
        { icon: "coins", title: "AI COSTS", text: "Paying for multiple AI tools, and burning credits on failed generations." },
        { icon: "scissors", title: "EDITING", text: "Editing everything yourself afterwards is a lot of work." },
      ],
      solveTitle: "You bring the dream.\nWe handle the AI. ✦",
      solveLead: "Just tell us what you’d love to see your pet do.",
      solveBody: [
        "Prompt design, AI generation, trial and error, scene creation and editing — MILKUNE takes care of it all.",
        "Order a finished video without worrying about multiple AI subscriptions, or the credits and time lost on failed generations.",
      ],
      cta: "TELL US YOUR IDEA →",
    },

    whatif: {
      eyebrow: "WHAT IF?",
      titleEn: "What if your pet could do anything?",
      title: "",
      items: [
        { icon: "dance", en: "DANCE", label: "Show off their moves" },
        { icon: "talk", en: "TALK", label: "Say what they’re thinking" },
        { icon: "cook", en: "COOK", label: "Whip up a little meal" },
        { icon: "adventure", en: "ADVENTURE", label: "Set off on a journey" },
        { icon: "celebrate", en: "CELEBRATE", label: "Birthdays & anniversaries" },
        { icon: "movie", en: "MOVIE STAR", label: "Star in their own movie" },
        { icon: "message", en: "MESSAGE", label: "Say “I love you”" },
      ],
      closing: "The little dreams that can’t happen in real life —\nMILKUNE turns them into a story.",
    },

    pricing: {
      eyebrow: "PRICING",
      title: "CHOOSE YOUR STORY",
      from: "FROM",
      plans: {
        sample: { spec: "", desc: "Pick from our sample & trending videos, remade with your pet as the star." },
        custom: { spec: "Up to 15 sec", desc: "Made from a reference video or your own “I’d love to see them do this” idea." },
        original: { spec: "Up to 30 sec", desc: "A fully original story and world, created from scratch." },
        business: { spec: "Commercial use", desc: "For shops, brands, social media, ads and other commercial use." },
      },
      personalBadge: "Personal use",
      businessBadge: "Commercial",
      note: "Final pricing may vary depending on length, complexity and production requirements.",
      noteSub: "",
      commercial:
        "Personal plans (SAMPLE / TREND, CUSTOM SHORT, ORIGINAL MOVIE) are not licensed for commercial use. For commercial use, please choose the BUSINESS plan.",
      cta: "ASK ABOUT A PLAN",
    },

    order: {
      eyebrow: "HOW TO ORDER",
      titleEn: "From your pet to their own little movie.",
      title: "Ordering is easy.",
      steps: [
        `DM “${kw}” on Instagram`,
        "Tell us your idea & choose a plan",
        "Receive your quote & delivery date",
        "100% prepayment",
        "Send us the materials we need",
        "MILKUNE creates your video",
        "Review the first draft → final delivery",
      ],
      note:
        "The photos and videos we need depend on what you’d like to create.\nOnce we understand your idea, we’ll let you know exactly what to send.",
      deliveryLabel: "DELIVERY",
      delivery: "Same day to within 5 days",
      cta: `DM “${kw}” TO START`,
    },

    brand: {
      title: "Not just an AI video.\nA little story starring someone you love.",
      body: [
        "It’s not just about making them move with AI.",
        "“I always wished they could do this.”",
        "We bring that little wish to life.",
        "Videos that make you laugh.\nVideos that melt your heart.\nMessages for someone special.",
        "A little story, only for your pet.",
      ],
    },

    faq: {
      eyebrow: "BEFORE YOU ORDER",
      title: "FAQ",
      items: [
        {
          q: "How long does it take?",
          a: ["Same day at the earliest, and within 5 days. Timing depends on the content and current orders."],
        },
        {
          q: "What do I need to send?",
          a: ["It depends on your video. Once we understand your idea, we’ll tell you which photos and videos we need."],
        },
        {
          q: "Can I request revisions?",
          a: [
            "Your first revision is free, for up to one scene.",
            "Further revisions, and changes to the content requested after production has started, are quoted separately depending on the scope and video length.",
            "If the result clearly differs from what we agreed on, we handle that separately from regular customer-requested revisions.",
          ],
        },
        { q: "Can I cancel?", a: ["Cancellations and refunds are not possible once production has started."] },
        {
          q: "Will it look exactly like my pet?",
          a: [
            "Due to the nature of AI generation, fur, markings, expressions, body shape and movement may not perfectly match your pet.",
          ],
        },
        {
          q: "Can I use the video commercially?",
          a: [
            "Personal plans are for personal use only.",
            "For shops, brands, advertising or any other commercial purpose, please choose the BUSINESS plan.",
          ],
        },
      ],
    },

    final: {
      titleEn: "What’s your pet’s little dream? ✦",
      title: "Next, your pet takes the lead.",
      body: [
        "Maybe they dance.\nMaybe they cook.\nMaybe they finally tell you how much they love you.",
        "What would you love to see them do?",
      ],
      price: fromPrice("sample"),
      cta: `💌 DM “${kw}” TO START`,
    },

    stickyCta: "🐾 Create My Pet Movie",

    sheet: {
      title: "Let’s talk on\nInstagram DM 🐾",
      step1: `Open @${config.instagram.username} on Instagram`,
      step2: `Send us “${kw}” by DM`,
      body: "No need to have your idea figured out yet — just say hi.",
      open: "Open Instagram DM",
      copy: `Copy “${kw}”`,
      copied: "Copied ✓",
      close: "Close",
    },

    footer: { instagram: "Instagram", copyright: `© ${new Date().getFullYear()} MILKUNE STORIES` },
  },
};
