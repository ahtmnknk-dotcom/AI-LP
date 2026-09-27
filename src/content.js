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
    },

    // Main CTAs used across the page
    ctas: {
      order: "注文する", // Primary → opens the order request form
      dm: "まず相談する", // Secondary → Instagram DM ("PET")
    },

    // Order request form (no payment is taken here)
    orderForm: {
      eyebrow: "ORDER REQUEST",
      titleEn: "Order now",
      title: "注文リクエストフォーム",
      lead:
        "作りたい動画の内容を送るだけで、注文リクエストが完了します。\n写真・動画素材のアップロードは不要です。注文内容を確認後、MILKUNE STORIESから必要素材をご案内します。",
      required: "必須",
      optional: "任意",
      fields: {
        name: { label: "お名前", placeholder: "例：山田 花子" },
        contactMethod: { label: "ご希望の連絡方法", instagram: "Instagram", whatsapp: "WhatsApp" },
        instagram: { label: "Instagramユーザーネーム", placeholder: "@username", hint: "例：@username" },
        whatsapp: {
          label: "WhatsApp番号",
          placeholder: "+81 90 XXXX XXXX",
          hint: "国番号から入力してください（例：+81 90 XXXX XXXX）",
        },
        pet: { label: "ペットの種類", placeholder: "例：犬（トイプードル）、猫（三毛猫）" },
        plan: { label: "希望プラン", unsure: "まだ分からない" },
        request: {
          label: "作りたい動画・希望内容",
          placeholder: "例：うちの子が誕生日ケーキの前で踊る、15秒くらいの明るい雰囲気の動画",
        },
        referenceUrl: { label: "参考動画URL", placeholder: "https://" },
        commercial: {
          label: "商用利用の有無",
          no: "なし（個人利用）",
          yes: "あり（店舗・ブランド・SNS・広告など）",
          businessHint: "商用利用の場合は、BUSINESSプランでのご案内となります。",
        },
      },
      errors: {
        required: "入力してください",
        choose: "選択してください",
        instagram: "Instagramユーザーネームを確認してください（例：@username）",
        whatsapp: "国番号から入力してください（例：+81 90 XXXX XXXX）",
        url: "URLを確認してください（https:// から始まるURL）",
        summary: "未入力または確認が必要な項目があります。",
        network:
          "送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。うまくいかない場合はInstagram DMでご連絡ください。",
      },
      notice:
        "フォーム送信だけでは注文・料金は確定しません。内容確認後、MILKUNE STORIESから最終料金・納期・必要素材をご案内し、お客様の了承・お支払い後に制作開始となります。",
      contactNotice: "ご連絡は、お客様が選択した連絡方法（Instagram または WhatsApp）でお送りします。",
      submit: "注文リクエストを送る",
      sending: "送信中…",
      consult: "まずは相談してから決めたい方はこちら",
      success: {
        title: "ご注文リクエストを受け付けました 🐾",
        body: [
          "内容を確認後、MILKUNE STORIESより最終料金・納期・必要素材をご連絡します。",
          "この時点ではまだ注文確定・お支払いは発生しません。",
        ],
        // {method} and {value} are filled in with what the customer entered
        contactLine: "ご連絡は {method}（{value}）宛にお送りします。",
      },
      previewNote: "プレビュー：送信先が未設定のため、この内容は実際には送信されていません。",
    },

    // CTA sheet (shown when any CTA is tapped)
    sheet: {
      title: "Instagram DMで\nご相談ください 🐾",
      step1: `Instagram で @${config.instagram.username} を開く`,
      step2: `DMで「${kw}」と送る`,
      body: "作りたい動画のイメージが決まっていなくても大丈夫。お気軽にどうぞ。",
      open: "Instagramを開く",
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
      sub: "See your pet the way you’ve always imagined — on video.",
      body:
        "Dance. Talk. Cook. Go on adventures.\nOr become the star of their own movie.\nWe create one-of-a-kind AI videos starring your pet.",
      price: fromPrice("sample"),
    },

    examples: {
      eyebrow: "SEE THE MAGIC ✦",
      title: "Here’s what your pet could star in.",
      items: {
        dance: { label: "DANCE", caption: "What if your pet could dance?" },
        chef: { label: "CHEF", caption: "What if your pet became a little chef?" },
        talking: { label: "TALKING", caption: "What if your pet could finally talk to you?" },
      },
      placeholder: "Sample video coming soon",
      swipeHint: "← swipe →",
      playLabel: "Play video",
      pauseLabel: "Pause video",
    },

    why: {
      eyebrow: "WHY MILKUNE?",
      titleEn: "AI can make videos.\nBut making the right one isn’t always easy.",
      title: "Anyone can make AI videos these days.\nSo let MILKUNE take care of the tricky parts.",
      lead:
        "AI videos are easier to make than ever.\nBut turning *your own pet* into the exact video you pictured often takes more time and effort than you’d expect.",
      cards: [
        { icon: "prompt", title: "PROMPTS", text: "Not sure what prompts to write." },
        { icon: "face", title: "CONSISTENCY", text: "Your pet’s face, coat color or markings can come out looking like a different animal." },
        { icon: "repeat", title: "GENERATIONS", text: "You can generate again and again and still not get the movement you wanted." },
        { icon: "coins", title: "AI COSTS", text: "Paying for several AI tools, and burning credits on generations that don’t work out." },
        { icon: "scissors", title: "EDITING", text: "Editing everything together yourself afterwards is a lot of work." },
      ],
      solveTitle: "You bring the dream.\nWe handle the AI. ✦",
      solveLead: "All you do is tell us, “I’d love to see my pet do this!”",
      solveBody: [
        "Prompt design, AI generation, all the trial and error, scene creation and editing — MILKUNE handles every step for you.",
        "No juggling multiple AI subscriptions, and no worrying about the credits or time lost on failed generations. You simply order the finished video.",
      ],
    },

    whatif: {
      eyebrow: "WHAT IF?",
      titleEn: "What if your pet could do anything?",
      title: "Here are a few ideas to get you dreaming.",
      items: [
        { icon: "dance", en: "DANCE", label: "Show off their moves" },
        { icon: "talk", en: "TALK", label: "Say what they’re thinking" },
        { icon: "cook", en: "COOK", label: "Cook up something tasty" },
        { icon: "adventure", en: "ADVENTURE", label: "Head off on an adventure" },
        { icon: "celebrate", en: "CELEBRATE", label: "Birthdays & anniversaries" },
        { icon: "movie", en: "MOVIE STAR", label: "Star in their own movie" },
        { icon: "message", en: "MESSAGE", label: "Say “I love you”" },
      ],
      closing: "The little dreams that can’t come true in real life —\nMILKUNE turns them into a story.",
    },

    pricing: {
      eyebrow: "PRICING",
      title: "CHOOSE YOUR STORY",
      from: "FROM",
      plans: {
        sample: { spec: "", desc: "Choose from our sample and trending videos, recreated with your pet as the star." },
        custom: { spec: "Up to 15 sec", desc: "Based on a reference video or your own “I’d love to see them do this” idea." },
        original: { spec: "Up to 30 sec", desc: "A completely original video, from the story to the world it’s set in." },
        business: { spec: "Commercial use OK", desc: "For commercial use by shops, brands, social media accounts, ads and more." },
      },
      personalBadge: "Personal use",
      businessBadge: "Commercial use",
      note: "Final pricing may vary depending on video length, content and production complexity.",
      noteSub: "",
      commercial:
        "Personal plans (SAMPLE / TREND, CUSTOM SHORT, ORIGINAL MOVIE) may not be used commercially. If you’d like to use a video commercially, please choose the BUSINESS plan.",
    },

    order: {
      eyebrow: "HOW TO ORDER",
      titleEn: "From your pet to their own little movie.",
      title: "Ordering is easy.",
      steps: [
        `Send us “${kw}” by Instagram DM`,
        "Chat with us about your idea & plan",
        "Get your quote & delivery date",
        "Pay 100% upfront",
        "Send us the materials we need",
        "MILKUNE creates your video",
        "Review the first draft → receive your finished video",
      ],
      note:
        "The photos and videos we need depend on what you’d like to create.\nOnce we’ve heard your idea, we’ll let you know exactly what to send.",
      deliveryLabel: "DELIVERY",
      delivery: "As fast as same day, within 5 days",
    },

    brand: {
      title: "Not just an AI video.\nA little story starring someone you love.",
      body: [
        "It’s about more than making them move with AI.",
        "“I always wished they could do this.”",
        "We turn that little wish into something you can watch.",
        "Videos that make you laugh.\nVideos that melt your heart.\nMessages for someone special.",
        "A little story, made only for your pet.",
      ],
    },

    faq: {
      eyebrow: "BEFORE YOU ORDER",
      title: "FAQ",
      items: [
        {
          q: "How long does delivery take?",
          a: ["As fast as same day, and within 5 days. Timing depends on your video and how many orders we have."],
        },
        {
          q: "What do I need to send?",
          a: ["It depends on the video you’d like. Once we’ve confirmed your request, we’ll tell you which photos and videos we need."],
        },
        {
          q: "Can I ask for changes?",
          a: [
            "Your first revision is free, for up to one scene.",
            "Any further revisions — and any changes you ask for after production has started — are quoted separately, based on the scope of the changes and the length of the video.",
            "If something needs fixing because of us — for example, the video clearly differs from what we agreed on — we handle it separately from regular customer-requested revisions.",
          ],
        },
        { q: "Can I cancel my order?", a: ["Once production has started, cancellations and refunds are not possible."] },
        {
          q: "Will it look exactly like my pet?",
          a: [
            "Because of how AI generation works, your pet’s fur, markings, expressions, body shape and movements may not match them perfectly.",
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
      title: "Next, it’s your pet’s turn to be the star.",
      body: [
        "Maybe they dance.\nMaybe they cook.\nMaybe they finally tell you how much they love you.",
        "What would you love to see them do?\nTell us — we’re all ears.",
      ],
      price: fromPrice("sample"),
    },

    ctas: {
      order: "ORDER NOW",
      dm: "DM US",
    },

    orderForm: {
      eyebrow: "ORDER REQUEST",
      titleEn: "Order now",
      title: "Send us your order request",
      lead:
        "Just tell us about the video you’d like and your order request is done.\nNo need to upload photos or videos now — once we’ve reviewed your request, MILKUNE STORIES will let you know which materials we need.",
      required: "Required",
      optional: "Optional",
      fields: {
        name: { label: "Your name", placeholder: "e.g. Emma Smith" },
        contactMethod: { label: "Preferred contact method", instagram: "Instagram", whatsapp: "WhatsApp" },
        instagram: { label: "Instagram username", placeholder: "@username", hint: "e.g. @username" },
        whatsapp: {
          label: "WhatsApp number",
          placeholder: "+1 555 123 4567",
          hint: "Please include your country code (e.g. +81 90 XXXX XXXX)",
        },
        pet: { label: "Type of pet", placeholder: "e.g. Dog (Toy Poodle), Cat (Calico)" },
        plan: { label: "Plan you’re interested in", unsure: "Not sure yet" },
        request: {
          label: "What would you like us to create?",
          placeholder: "e.g. A fun, upbeat ~15-second video of my dog dancing in front of a birthday cake",
        },
        referenceUrl: { label: "Reference video URL", placeholder: "https://" },
        commercial: {
          label: "Commercial use",
          no: "No — personal use only",
          yes: "Yes — for a shop, brand, social media, ads, etc.",
          businessHint: "Commercial use is covered by the BUSINESS plan, so we’ll quote you on that plan.",
        },
      },
      errors: {
        required: "Please fill this in",
        choose: "Please choose one",
        instagram: "Please check your Instagram username (e.g. @username)",
        whatsapp: "Please include your country code (e.g. +81 90 XXXX XXXX)",
        url: "Please check the URL (it should start with https://)",
        summary: "Some fields are missing or need a quick check.",
        network:
          "We couldn’t send your request. Please check your connection and try again — or reach us by Instagram DM if it still doesn’t work.",
      },
      notice:
        "Submitting this form does not confirm your order or the price. After reviewing your request, MILKUNE STORIES will send you the final price, delivery date and the materials we need. Production starts only after you approve and complete payment.",
      contactNotice: "We’ll get back to you using the contact method you choose (Instagram or WhatsApp).",
      submit: "SEND ORDER REQUEST",
      sending: "Sending…",
      consult: "Want to chat with us before ordering?",
      success: {
        title: "We’ve received your order request 🐾",
        body: [
          "Once we’ve reviewed it, MILKUNE STORIES will contact you with the final price, delivery date and the materials we need.",
          "Your order isn’t confirmed yet, and no payment has been taken.",
        ],
        contactLine: "We’ll contact you on {method} at {value}.",
      },
      previewNote: "Preview: no form destination is set yet, so this request was not actually sent.",
    },

    sheet: {
      title: "Chat with us on\nInstagram DM 🐾",
      step1: `Open @${config.instagram.username} on Instagram`,
      step2: `Send us “${kw}” by DM`,
      body: "No need to have your idea all figured out — feel free to reach out.",
      open: "Open Instagram",
      copy: `Copy “${kw}”`,
      copied: "Copied ✓",
      close: "Close",
    },

    footer: { instagram: "Instagram", copyright: `© ${new Date().getFullYear()} MILKUNE STORIES` },
  },
};
