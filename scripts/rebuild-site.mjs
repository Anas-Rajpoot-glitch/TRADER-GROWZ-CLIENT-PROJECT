import fs from "fs";
import path from "path";

const root = process.cwd();
const version = "20260513-catalog-update1";
const logoFile = "trader-growz-logo-icon-20260424.png";
const siteOrigin = (process.env.SITE_ORIGIN || "https://tradergrowz.ca").replace(/\/+$/, "");
const siteDomain = new URL(siteOrigin).hostname;
const logoUrlPath = `images/${logoFile}?v=${version}`;
const defaultSeoImage = "images/trader-growz-logo-glow-20260424.png";
const sitemapDate = new Date().toISOString().slice(0, 10);
const siteName = "Trader Growz";
const siteLocale = "en_US";
const siteLanguage = "en-US";
const siteAuthor = "Trader Growz";
const sitePublisher = "Trader Growz";
const siteThemeColor = "#db0111";
const siteRegion = "US-CA";
const siteStateName = "California";
const siteStateCode = "CA";
const siteCountryName = "United States";
const siteCountryCode = "US";
const sitePlacename = `${siteStateName}, ${siteCountryName}`;
const siteCoordinates = "36.7783;-119.4179";
const siteCoordinatesComma = "36.7783, -119.4179";
const siteCurrency = "USD";
const formerCountryName = ["Can", "ada"].join("");
const baseSeoKeywords = [
  "THCA flower",
  "THCA rosin",
  "THCA bud",
  "THCA Live resin",
  "THCA badder",
  "THCA online",
  "THCA Free Shipping",
  "Exotic THCA",
  "Indoor THCA",
  "THCA California",
  "THCA Cali",
  "THCA Coldfire",
  "THCA Dispos",
  "THCA Edibles & Prerolls",
  "THCA Carts",
  "Fire THCA bud",
  "Bulk THCA Flower",
  "THCA Indica",
  "THCA Sativa",
  "OG Kush THCA",
  "Runtz THCA",
  "Blue Dream THCA",
  "Sour Diesel THCA",
  "Toad Venom THCA"
];

const cacheHome = "C:\\Users\\anasr\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cache\\Cache_Data\\f_00143b";
const cacheFlower = "C:\\Users\\anasr\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cache\\Cache_Data\\f_00144e";
const cacheData3 = "C:\\Users\\anasr\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cache\\Cache_Data\\data_3";

const topLevelPages = {
  flower: "flower.html",
  concentrates: "concentrates.html",
  edibles: "edibles.html",
  mushies: "mushies.html",
  "dispos-carts": "dispos.html",
  "pre-rolls": "prerolls.html",
  vapes: "vapes.html"
};

const categoryMeta = {
  flower: ["Flower", "Flower Menu", "Fresh flower products", "Add products to your cart, then send the full order through Telegram at checkout.", "Premium flower picks"],
  concentrates: ["Concentrates", "Concentrate Menu", "Clean concentrate lineup", "Hash, rosin, badder, and concentrate picks ready for cart checkout and Telegram ordering.", "Concentrate drops worth holding onto"],
  edibles: ["Edibles & Prerolls", "Edibles & Prerolls Menu", "Edibles and preroll drops", "Measured treats, gummies, and preroll picks arranged for easy shopping and a smooth Telegram order flow.", "Edibles and prerolls with a clean lineup"],
  mushies: ["Mushies", "Mushies Menu", "Curated mushies selection", "Three simple mushroom drops, each ready to add to cart and send through Telegram.", "Mushies on the current menu"],
  "dispos-carts": ["Dispos/Carts", "Dispos/Carts Menu", "Fast, easy draws", "Disposable and cartridge options for shoppers who want a quick add-to-cart flow.", "Dispos and carts ready to go"]
};

const categorySeo = {
  flower: {
    title: "Flower Menu | Trader Growz",
    description: "Browse the Trader Growz flower menu with current premium flower drops, pricing, product details, and a simple cart flow for adult customers."
  },
  concentrates: {
    title: "Concentrates Menu | Trader Growz",
    description: "Explore Trader Growz concentrates, including rosin, hash, badder, sauce, and current concentrate drops with product details and menu pricing."
  },
  edibles: {
    title: "Edibles & Prerolls Menu | Trader Growz",
    description: "Browse Trader Growz edibles, prerolls, gummies, bars, cookies, and current measured drops with easy menu details for adult customers."
  },
  mushies: {
    title: "Mushies Menu | Trader Growz",
    description: "View the current Trader Growz mushies menu with available drops, product details, and cart-ready ordering information for adults."
  },
  "dispos-carts": {
    title: "Disposables and Carts Menu | Trader Growz",
    description: "Shop Trader Growz disposables and carts with current devices, cartridge options, product details, and menu pricing in one place."
  }
};

const pageSeo = {
  home: {
    title: "Trader Growz | Adult Hemp Menu and Current Drops",
    description: "Browse Trader Growz current adult hemp menu, compare flower, concentrates, edibles and prerolls, mushies, disposables, and carts, then build a clean cart."
  },
  cart: {
    title: "Cart | Trader Growz",
    description: "Review your Trader Growz cart, adjust quantities, and prepare your order details before checkout."
  },
  order: {
    title: "How to Order | Trader Growz",
    description: "Learn how to browse the Trader Growz menu, add products to cart, and send the finished order details through the checkout flow."
  },
  faqs: {
    title: "FAQs | Trader Growz",
    description: "Read Trader Growz answers about THCA, hemp compliance, product basics, ordering, shipping, and adult-use requirements."
  },
  contact: {
    title: "Contact Trader Growz",
    description: "Contact Trader Growz through Telegram, Instagram, or Luffa for menu questions, order follow-up, and current updates."
  },
  privacy: {
    title: "Privacy Policy | Trader Growz",
    description: "Read the Trader Growz privacy policy for how customer information may be collected, used, and protected."
  },
  terms: {
    title: "Terms and Conditions | Trader Growz",
    description: "Read the Trader Growz terms and conditions for adult-use site access, menu information, and customer responsibilities."
  },
  shipping: {
    title: "Shipping Disclaimer | Trader Growz",
    description: "Review the Trader Growz shipping disclaimer, destination restrictions, timelines, and customer responsibility details."
  },
  returns: {
    title: "Return Policy | Trader Growz",
    description: "Read the Trader Growz return policy for product concerns, final sale expectations, and case-by-case resolution details."
  },
  password: {
    title: "Trader Growz | Private THCA Menu Access California",
    description: "Trader Growz is a private adult access page for a California-based THCA menu featuring flower, rosin, live resin, badder, edibles and prerolls, disposables, and carts."
  },
  age: {
    title: "Age Verification | Trader Growz",
    description: "Trader Growz age verification page for adults 21 and over."
  },
  redirect: {
    title: "Redirecting | Trader Growz",
    description: "This legacy Trader Growz link redirects to the current menu."
  }
};

const faqItems = [
  ["Are THCA Products Legal?", "Hemp-derived THCA products are federally permitted when they comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC by dry weight. Local laws can vary, so always check your state before purchasing."],
  ["What is THCA?", "THCA is tetrahydrocannabinolic acid, a naturally occurring cannabinoid found in raw cannabis and hemp. It becomes THC through heat, a process known as decarboxylation."],
  ["Is THCA Flower Natural?", "Yes. THCA occurs naturally in the plant before it is heated. Quality THCA flower should be properly cultivated, tested, and handled with care."],
  ["Will THCA Get Me High?", "Raw THCA is not the same as active THC. When THCA is heated, it can convert into THC and may produce intoxicating effects."],
  ["What is Delta 9?", "Delta-9 THC is the primary psychoactive cannabinoid in cannabis. Hemp products must remain within applicable Delta-9 THC limits to comply with federal hemp rules."]
];

const categoryProductOrder = {
  flower: [
    "greenline-premium-indoor-flower-eighths",
    "soma-rosa-sun-grown-flower-oz",
    "brainbow-exotic-indoor-flower",
    "animal-sherbet-exotic-indoor-flower",
    "cherry-on-top-exotic-indoor-flower",
    "3bros-premium-flower-half-oz-jar",
    "white-cherries-boutique-indoor",
    "orange-fanta-boutique-indoor",
    "lucky-charms-boutique-indoor",
    "killer-og-boutique-indoor",
    "green-gumbo-boutique-indoor",
    "cheesecake-boutique-indoor",
    "starburst-top-shelf",
    "confetti-cake-top-shelf"
  ],
  concentrates: [
    "amarelo-mountain-man-melts-cold-cured-live-resin-2g",
    "banana-punch-4-strawberry-guava-9-persy-thumbprint-2g",
    "blackwater-og-nasha-extracts-green-unpressed-hash-1-2g",
    "blue-zina-punch-live-rosin-badder-tier-3-1g",
    "blueberry-muffin-nasha-extracts-green-unpressed-hash-1-2g",
    "butterscotch-frostee-the-bryantist-live-rosin-badder-2g",
    "champaya-mountain-man-melts-cold-cured-live-resin-2g",
    "creme-de-luna-nasha-extracts-green-unpressed-hash-1-2g",
    "creme-de-luna-nasha-extracts-red-pressed-hash-1-2g",
    "diamond-hash-nasha-extracts-topper-thc-a-diamonds-cold-water-hashish-1g",
    "do-lato-10-cereal-star-5-persy-thumbprint-2g"
  ],
  edibles: [
    "blueberry-x-blue-dream-10pk-100mg-live-resin-chews-100mg",
    "cherry-lime-x-gmo-10pk-100mg-live-resin-chews-100mg",
    "chocolate-chip-dr-norms-mini-cookies-100mg",
    "chocolate-crispy-rice-bar-dr-norms-rice-krispy-treat-100mg",
    "clockwork-lemon-infused-gummies-10pk-100mg",
    "cookies-n-cream-dr-norms-mini-cookies-100mg",
    "crunchy-toasted-cinnamon-dr-norms-crispy-rice-bar-100mg-nano",
    "dark-chocolate-raspberry-punch-solventless-punch-bar-100mg",
    "jefferey-single-infused-joint",
    "710-labs-hash-rosin-gummy-authentic",
    "haze-main-thc-chocolate"
  ],
  "dispos-carts": [
    "coldfire-cart-1g-authentic",
    "fuel-half-g-rosin-dispo",
    "high-standards-2g-dispo-authentic",
    "blueberry-freezer-stky-disposable-2g",
    "candy-apple-muha-meds-cartridge-2g",
    "coldfire-juice-cannabis-oil-cartridge-1g",
    "fuel-disposable-1g",
    "grape-god-cbd-vape-disposable-1-gram",
    "grape-soda-gelato-vape-cartridge-1g",
    "krypto-chronic-alien-labs-live-resin-disposable-1g",
    "orange-elixir-cbd-vape-disposable-1-gram",
    "papaya-cbd-vape-disposable-1-gram",
    "smarties-cali-thc-cartridge-1g",
    "strawberry-banana-cbd-vape-disposable-1-gram",
    "2g-hitz-infinity-aio-disposable",
    "2g-ace-ultra-aio-disposable",
    "2g-blinkers-double-chamber-aio-disposable",
    "2g-sluggers-hit-switch-aio-disposable",
    "in-house-live-rosin-cart-1g",
    "caliplug-cart-1g",
    "tier-1-rosin-dispos"
    ]
  };

const inactiveProductSlugs = {
  flower: new Set([
    "apple-mac-awesome-dope-indoor-flower-7g",
    "lucky-ztrike-flower-7g",
    "mambaz-milk-flower-7g",
    "one-og-west-coast-x-bomb-redstash-indoor-flower-3-5g",
    "orange-apricot-awesome-dope-indoor-flower-3-5g",
    "peanut-butter-glue-awesome-dope-indoor-flower-3-5g",
    "peanut-butter-glue-awesome-dope-indoor-flower-7g",
    "rail-up-blem-flower-3-5g",
    "red-hotz-flower-7g"
  ]),
  "dispos-carts": new Set([
    "muha-meds-gen-3-2g-dispo-authentic"
  ])
};

const ozMinimumFlowerSlugs = new Set([
  "fiyah-blem-flower-3-5g",
  "golden-trio-goti-flower-3-5g",
  "government-oasis-clubhouse-drops-flower-7g",
  "grape-ape-skunk-clubhouse-drops-flower-7g",
  "graype-blem-flower-3-5g",
  "grumpy-tiger-wood-wide-high-craft-indoor-flower-3-5g",
  "ice-cream-pie-clubhouse-drops-flower-7g",
  "jelly-benz-clubhouse-drops-flower-7g",
  "lozer-flower-7g"
]);

const tenMinimumDispoPrices = new Map([
  ["blueberry-freezer-stky-disposable-2g", "$500.00"],
  ["candy-apple-muha-meds-cartridge-2g", "$250.00"],
  ["coldfire-juice-cannabis-oil-cartridge-1g", "$500.00"],
  ["fuel-disposable-1g", "$375.00"],
  ["grape-god-cbd-vape-disposable-1-gram", "$370.00"],
  ["grape-soda-gelato-vape-cartridge-1g", "$325.00"],
  ["krypto-chronic-alien-labs-live-resin-disposable-1g", "$325.00"],
  ["orange-elixir-cbd-vape-disposable-1-gram", "$325.00"],
  ["papaya-cbd-vape-disposable-1-gram", "$325.00"],
  ["smarties-cali-thc-cartridge-1g", "$360.00"],
  ["strawberry-banana-cbd-vape-disposable-1-gram", "$325.00"]
]);

const productOverrides = {
  flower: {
    "greenline-premium-indoor-flower-eighths": {
      title: "Greenline Premium Indoor Flower Eighths",
      brand: "Greenline",
      price: "$55.00",
      compareAt: null,
      image: "images/uploads/greenline-premium-indoor-flower-eighths.png",
      alt: "Greenline Premium Indoor Flower Eighths",
      description: "Authentic CA licensed Greenline premium indoor flower eighths with current strain options including Blockberry, Dosi-Orange #9, Papaya x 33, Pink Certz, and Shake Shack.",
      facts: [
        ["Brand", "Greenline"],
        ["License", "Authentic CA licensed"],
        ["Type", "Premium indoor flower"],
        ["Format", "Eighths"],
        ["Strains", "Blockberry, Dosi-Orange #9, Papaya x 33, Pink Certz, Shake Shack"],
        ["1 Unit", "$55"],
        ["2 Units", "$95"],
        ["3 Units", "$135"],
        ["4 Units", "$165"],
        ["5 Units", "$200"],
        ["5+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "soma-rosa-sun-grown-flower-oz": {
      title: "Soma Rosa Sun Grown Flower Oz",
      brand: "Soma Rosa Farms",
      price: "$160.00",
      compareAt: null,
      image: "images/uploads/soma-rosa-sun-grown-flower-oz.png",
      alt: "Soma Rosa Sun Grown Flower Oz",
      description: "Authentic Soma Rosa Farms sun grown flower oz grown with organic, sustainable practices and a hands-on approach. The farm's curated indica, sativa, and hybrid strains are grown under full sun and slow-cured for clean potency, vibrant flavor, smoothness, and environmental responsibility.",
      facts: [
        ["Brand", "Soma Rosa Farms"],
        ["Authenticity", "Authentic"],
        ["Type", "Sun grown flower"],
        ["Format", "1 oz"],
        ["Farm Style", "Organic, sustainable practices"],
        ["Cure", "Slow-cured"],
        ["Strains", "Joker's Candy, Lemon Thai x OG Kush, Lemon Snow Leopard, Govt Oasis, Banana Punch"],
        ["1 Oz", "$160"],
        ["2 Oz", "$300"],
        ["3 Oz", "$420"],
        ["4 Oz", "$520"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "brainbow-exotic-indoor-flower": {
      title: "Brainbow Exotic Indoor",
      brand: "Exotic Indoor",
      price: "$140.00",
      compareAt: null,
      image: "images/uploads/brainbow-exotic-indoor-flower.png",
      gallery: [
        "images/uploads/brainbow-exotic-indoor-flower-closeup.png"
      ],
      alt: "Brainbow Exotic Indoor",
      description: "Brainbow is an exotic indoor strain from Brain Freeze x Zkittles with an interesting nose that is slightly gassy while carrying sweetness from the Z. The purple and green nuggets deliver a relaxing, slightly sedating high for a sweet boost of power.",
      facts: [
        ["Tier", "Exotic Indoor"],
        ["Strain", "Brainbow"],
        ["Cross", "Brain Freeze x Zkittles"],
        ["Nose", "Slightly gassy with sweet Z notes"],
        ["Buds", "Purple and green nuggets"],
        ["Effect", "Relaxing and slightly sedating"],
        ["1 Oz", "$140"],
        ["2 Oz", "$250"],
        ["4 Oz", "$450"],
        ["8 Oz", "$750"],
        ["1 Lb", "$1350"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "animal-sherbet-exotic-indoor-flower": {
      title: "Animal Sherbet Exotic Indoor",
      brand: "Exotic Indoor",
      price: "$140.00",
      compareAt: null,
      image: "images/uploads/animal-sherbet-exotic-indoor-flower.png",
      gallery: [
        "images/uploads/animal-sherbet-exotic-indoor-flower-closeup.png"
      ],
      alt: "Animal Sherbet Exotic Indoor",
      description: "Animal Sherbet is an exotic indoor strain with notes similar to Wedding Cake and Runtz. It leans into a sweet coating of hot gas that stays on the tongue, with a heavy exhale, relaxing feel, a bit of head stimulation, and oversized nuggets.",
      facts: [
        ["Tier", "Exotic Indoor"],
        ["Strain", "Animal Sherbet"],
        ["Notes", "Wedding Cake and Runtz style notes"],
        ["Terps", "Sweet hot gas"],
        ["Exhale", "Heavy"],
        ["Effect", "Relaxing with light head stimulation"],
        ["Buds", "Oversized nuggets"],
        ["1 Oz", "$140"],
        ["2 Oz", "$250"],
        ["4 Oz", "$450"],
        ["8 Oz", "$750"],
        ["1 Lb", "$1350"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "cherry-on-top-exotic-indoor-flower": {
      title: "CHERRY ON TOP Exotic Indoor",
      brand: "Exotic Indoor",
      price: "$150.00",
      compareAt: null,
      image: "images/uploads/cherry-on-top-exotic-indoor-flower.png",
      gallery: [
        "images/uploads/cherry-on-top-exotic-indoor-flower-closeup.png"
      ],
      alt: "CHERRY ON TOP Exotic Indoor",
      description: "CHERRY ON TOP is an exotic indoor pick made for anyone after terpy candies, with a sweet candy-forward profile and bulk pricing through the Flower menu.",
      facts: [
        ["Tier", "Exotic Indoor"],
        ["Strain", "CHERRY ON TOP"],
        ["Profile", "Terpy candies"],
        ["1 Oz", "$150"],
        ["2 Oz", "$260"],
        ["4 Oz", "$460"],
        ["8 Oz", "$760"],
        ["1 Lb", "$1360"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "apple-mac-awesome-dope-indoor-flower-3-5g": {
      title: "Cherry Zushimi",
      brand: "Traditional",
      price: "$120.00",
      compareAt: null,
      image: "images/uploads/cherry-zushimi-wizard-tier-2.png",
      alt: "Cherry Zushimi",
      description: "\"Cherry Zushimi\" is a wizard tier strain grown by Traditional. This strain is one of their main starters in their lineup, meaning it has its own jar. \"Cherry Zushimi\" is an indica-dominant hybrid strain that comes from crossing Zkittles and OG. It has a sugary, sweet cherry and berry flavor with a touch of gassiness, while the aroma carries a gassy overtone accented by sugary cherries and fresh berries. The nugs are beautiful.",
      facts: [
        ["Tier", "Wizard"],
        ["Grower", "Traditional"],
        ["Type", "Indica-dominant hybrid"],
        ["Cross", "Zkittles x OG"],
        ["Flavor", "Sweet cherry, berry, and gas"],
        ["Aroma", "Gassy cherries and fresh berries"],
        ["1 Unit", "$120"],
        ["2 Units", "$210"],
        ["3 Units", "$300"],
        ["4 Units", "$380"],
        ["5 Units", "$470"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "apple-mac-awesome-dope-indoor-flower-7g": {
      title: "3Bros Premium Flower Half Oz Jar",
      brand: "3Bros",
      price: "$120.00",
      compareAt: null,
      image: "images/uploads/3bros-premium-flower-half-oz-jar.png",
      alt: "3Bros Premium Flower Half Oz Jar",
      description: "Authentic 3Bros premium flower half ounce jar available in Frosted Trufflez, Sunset Sorbet, and Mandarin Zest. Pricing: 1 for $120, 2 for $210, 3 for $300, 4 for $380, and 5 for $470.",
      facts: [
        ["Product", "Half oz jar"],
        ["Authentic", "Yes"],
        ["Weight", "14g"],
        ["Strains", "Frosted Trufflez, Sunset Sorbet, Mandarin Zest"],
        ["1 Unit", "$120"],
        ["2 Units", "$210"],
        ["3 Units", "$300"],
        ["4 Units", "$380"],
        ["5 Units", "$470"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "appie-ting-blem-flower-3-5g": {
      title: "Knockout OG",
      brand: "Wizard Tier",
      price: "$120.00",
      compareAt: null,
      image: "images/uploads/knockout-og-wizard-tier.png",
      alt: "Knockout OG",
      description: "Wizard tier Knockout OG is an indica bred from Khalifa Kush x The Menthol. Available at 14g for $120 or an ounce for $225.",
      facts: [
        ["Tier", "Wizard"],
        ["Type", "Indica"],
        ["Cross", "Khalifa Kush x The Menthol"],
        ["14g", "$120"],
        ["Oz", "$225"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "baby-rattler-wood-wide-high-craft-indoor-flower-3-5g": {
      title: "Super Sauce",
      brand: "Connoisseur Tier",
      price: "$130.00",
      compareAt: null,
      image: "images/uploads/super-sauce-connoisseur-tier.png",
      alt: "Super Sauce",
      description: "Connoisseur tier Super Sauce is a hybrid bred from LCG x Nor Cal Runtz. Available at 14g for $130 or an ounce for $245.",
      facts: [
        ["Tier", "Connoisseur"],
        ["Type", "Hybrid"],
        ["Cross", "LCG x Nor Cal Runtz"],
        ["14g", "$130"],
        ["Oz", "$245"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "cobblerz-flower-7g": {
      title: "Nuclear Slurpee",
      brand: "Wizard Tier",
      price: "$120.00",
      compareAt: null,
      image: "images/uploads/nuclear-slurpee-wizard-tier.png",
      alt: "Nuclear Slurpee",
      description: "Wizard tier Nuclear Slurpee is smokinggg and bred from Galactic Warheads x Kut Throat Kandy. Available at 14g for $120 or an ounce for $200.",
      facts: [
        ["Tier", "Wizard"],
        ["Note", "This stuff is smokinggg"],
        ["Cross", "Galactic Warheads x Kut Throat Kandy"],
        ["14g", "$120"],
        ["Oz", "$200"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "fiyah-blem-flower-3-5g": {
      title: "OG Kush",
      brand: "OG Cut",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/og-kush.png",
      video: "media/uploads/og-kush.mp4",
      alt: "OG Kush",
      description: "This is the real real OG Cut. Super loud, gassy, skunky OG goodness. This is perfection.",
      facts: [
        ["Cut", "Real OG Cut"],
        ["Profile", "Super loud gas and skunk"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "golden-trio-goti-flower-3-5g": {
      title: "Super Boof",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/super-boof-wizard-tier.png",
      video: "media/uploads/super-boof-wizard-tier.mp4",
      alt: "Super Boof",
      description: "Wizard tier Super Boof is a sativa-leaning hybrid that tastes amazing, with notes of citrus, grapefruit, and orange.",
      facts: [
        ["Tier", "Wizard"],
        ["Type", "Sativa-leaning hybrid"],
        ["Notes", "Citrus, grapefruit, and orange"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "government-oasis-clubhouse-drops-flower-7g": {
      title: "Pink Zushi",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/pink-zushi-wizard-tier.png",
      video: "media/uploads/pink-zushi-wizard-tier.mp4",
      alt: "Pink Zushi",
      description: "Wizard tier Pink Zushi brings sweet berry candy with tropical notes, a super impressive frosty look, and a perfectly squishy, scrumptious finish.",
      facts: [
        ["Tier", "Wizard"],
        ["Profile", "Sweet berry candy and tropical notes"],
        ["Look", "Super impressive frost"],
        ["Texture", "Perfectly squishy"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "grape-ape-skunk-clubhouse-drops-flower-7g": {
      title: "Blue Claw",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/blue-claw-wizard-tier.png",
      video: "media/uploads/blue-claw-wizard-tier.mp4",
      alt: "Blue Claw",
      description: "Wizard tier Blue Claw is another pheno of Purple Lobster, and if Purple Lobster was good, this one is even better.",
      facts: [
        ["Tier", "Wizard"],
        ["Lineage Note", "Another pheno of Purple Lobster"],
        ["Quality", "Even better than Purple Lobster"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "graype-blem-flower-3-5g": {
      title: "Rapper Weed",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/rapper-weed-wizard-tier.png",
      video: "media/uploads/rapper-weed-wizard-tier.mp4",
      alt: "Rapper Weed",
      description: "Wizard tier Rapper Weed is bred from RS11 x Lemon Cherry Gelato and tastes like moscato, raspberry sherbert, and garage fumes. Straight gasss.",
      facts: [
        ["Tier", "Wizard"],
        ["Cross", "RS11 x Lemon Cherry Gelato"],
        ["Taste", "Moscato, raspberry sherbert, and garage fumes"],
        ["Note", "Straight gasss"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "grumpy-tiger-wood-wide-high-craft-indoor-flower-3-5g": {
      title: "Jelly Donutz",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/jelly-donutz-wizard-tier.png",
      video: "media/uploads/jelly-donutz-wizard-tier.mp4",
      alt: "Jelly Donutz",
      description: "Wizard tier Jelly Donutz brings doughie, candy, sugar-coated goodness. It was grown by an award-winning licensed retail brand and renamed by yours truly.",
      facts: [
        ["Tier", "Wizard"],
        ["Profile", "Doughie, candy, and sugar-coated goodness"],
        ["Grower", "Award-winning licensed retail brand"],
        ["Note", "Renamed by yours truly"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "ice-cream-pie-clubhouse-drops-flower-7g": {
      title: "Fear of God",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/fear-of-god-wizard-tier.png",
      video: "media/uploads/fear-of-god-wizard-tier.mp4",
      alt: "Fear of God",
      description: "Wizard tier Fear of God is Fig OG, bred from Lemon Cherry Gelato x (Blue Face x Figment #8). The trimmers put FOG on the turkey bags, so it got renamed Fear of God. It hits like a fruity OG with a sweet, almost tropical front end and a well-defined base of pine, fresh lumber, and cleaner from the undeniable OG terps in its genetics. Very incredible nose to say the least.",
      facts: [
        ["Tier", "Wizard"],
        ["Original Name", "Fig OG"],
        ["Cross", "Lemon Cherry Gelato x (Blue Face x Figment #8)"],
        ["Nickname", "FOG turned into Fear of God"],
        ["Profile", "Fruity OG with tropical sweetness, pine, fresh lumber, and cleaner"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "jelly-benz-clubhouse-drops-flower-7g": {
      title: "Deep Blue Dream",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/deep-blue-dream-wizard-tier.png",
      video: "media/uploads/deep-blue-dream-wizard-tier.mp4",
      alt: "Deep Blue Dream",
      description: "Wizard tier Deep Blue Dream is Fig Farm's Lucid Blue, but to us it hits like a beautiful Blue Dream straight up. Fire sativa.",
      facts: [
        ["Tier", "Wizard"],
        ["Original Name", "Fig Farm's Lucid Blue"],
        ["Style", "Beautiful Blue Dream straight up"],
        ["Type", "Fire sativa"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "lozer-flower-7g": {
      title: "Tropic Thunder",
      brand: "Wizard Tier",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/tropic-thunder-wizard-tier.png",
      video: "media/uploads/tropic-thunder-wizard-tier.mp4",
      alt: "Tropic Thunder",
      description: "Wizard tier Tropic Thunder is an Apples & Bananas x Jokerz cross that gives off tropic cherry, citrus candy, and gas greatness, bursting with a sparkle that embodies the magic of marijuana. Proprietary genetics plus craft equals greatness.",
      facts: [
        ["Tier", "Wizard"],
        ["Cross", "Apples & Bananas x Jokerz"],
        ["Profile", "Tropic cherry, citrus candy, and gas"],
        ["Note", "Proprietary genetics + craft = greatness"],
        ["14g", "$115"],
        ["Oz", "$195"],
        ["2 Oz", "$360"],
        ["QP", "$600"],
        ["HP", "$1000"],
        ["LB", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "lucky-ztrike-flower-7g": {
      title: "White Cherries",
      brand: "Boutique Indoor",
      price: "$165.00",
      compareAt: null,
      image: "images/uploads/white-cherries-boutique-indoor-1.png",
      gallery: [
        "images/uploads/white-cherries-boutique-indoor-2.png",
        "images/uploads/white-cherries-boutique-indoor-3.png"
      ],
      alt: "White Cherries",
      description: "\"White Cherries\" is an indoor-grown indica created through crossing Ken's OG x Grand Daddy Purple. The buds carry an aroma of sweet and spicy berry with a taste of sweet berry tea and a hint of blueberry spice. Relaxing full-body effects take over, helping with pain and insomnia while lifting the mood once smoked.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "Indica"],
        ["Cross", "Ken's OG x Grand Daddy Purple"],
        ["Aroma", "Sweet and spicy berry"],
        ["Taste", "Sweet berry tea with blueberry spice"],
        ["Effects", "Relaxing body effects with mood lift"],
        ["Oz", "$165"],
        ["2 Oz", "$300"],
        ["QP", "$490"],
        ["HP", "$800"],
        ["LB", "$1325"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "mambaz-milk-flower-7g": {
      title: "Orange Fanta",
      brand: "Boutique Indoor",
      price: "$155.00",
      compareAt: null,
      image: "images/uploads/orange-fanta-boutique-indoor-1.png",
      gallery: [
        "images/uploads/orange-fanta-boutique-indoor-2.png"
      ],
      alt: "Orange Fanta",
      description: "\"Orange Fanta\" is an indoor-grown indica-dominant hybrid strain (70% indica / 30% sativa) created through crossing Runtz x Agent Orange. It has a sweet and sugary citrus orange candy flavor with hints of fresh bananas and sweet fruits. The aroma follows the same profile with a sour orange candy overtone accented by fresh fruits and sweet bananas. Orange Fanta leaves you relaxed and euphoric while still sociable and in a great mood.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "Indica-dominant hybrid"],
        ["Ratio", "70% indica / 30% sativa"],
        ["Cross", "Runtz x Agent Orange"],
        ["Flavor", "Sugary citrus orange candy, bananas, and sweet fruit"],
        ["Aroma", "Sour orange candy, fresh fruit, and sweet bananas"],
        ["Effects", "Relaxed, euphoric, sociable, and upbeat"],
        ["Oz", "$155"],
        ["2 Oz", "$290"],
        ["QP", "$450"],
        ["HP", "$725"],
        ["LB", "$1275"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "one-og-west-coast-x-bomb-redstash-indoor-flower-3-5g": {
      title: "Lucky Charms",
      brand: "Boutique Indoor",
      price: "$165.00",
      compareAt: null,
      image: "images/uploads/lucky-charms-boutique-indoor-1.png",
      gallery: [
        "images/uploads/lucky-charms-boutique-indoor-2.png",
        "images/uploads/lucky-charms-boutique-indoor-3.png"
      ],
      alt: "Lucky Charms",
      description: "\"Lucky Charms\" is an indoor-grown hybrid strain made from The White x Appalachia. Much like its namesake, it has a super sweet and sugary fruity berry flavor with a lightly sour citrusy exhale. The aroma follows with a fruity cherry berry overtone accented by hints of sour citrus and earthy fruits.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "Hybrid"],
        ["Ratio", "50% indica / 50% sativa"],
        ["Cross", "The White x Appalachia"],
        ["Flavor", "Sugary fruity berry with a lightly sour citrus exhale"],
        ["Aroma", "Cherry berry, sour citrus, and earthy fruit"],
        ["Oz", "$165"],
        ["2 Oz", "$300"],
        ["QP", "$490"],
        ["HP", "$800"],
        ["LB", "$1325"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "orange-apricot-awesome-dope-indoor-flower-3-5g": {
      title: "Killer OG",
      brand: "Boutique Indoor",
      price: "$155.00",
      compareAt: null,
      image: "images/uploads/killer-og-boutique-indoor-1.png",
      gallery: [
        "images/uploads/killer-og-boutique-indoor-2.png"
      ],
      alt: "Killer OG",
      description: "\"Killer OG\" is an indoor-grown indica-dominant hybrid strain (70% indica / 30% sativa) created through crossing White Fire OG x King Kush. It has a sweet and sour citrusy flavor with a gassy OG-like exhale. The aroma is gassy and herbal with a sweet citrus overtone that intensifies as you continue to smoke. The high fills your brain with happy euphoria while your body settles into a buzzy, fully relaxed state.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "Indica-dominant hybrid"],
        ["Ratio", "70% indica / 30% sativa"],
        ["Cross", "White Fire OG x King Kush"],
        ["Flavor", "Sweet, sour citrus, and gassy OG exhale"],
        ["Aroma", "Gassy, herbal, and sweet citrus"],
        ["Effects", "Happy euphoria with buzzy full-body relaxation"],
        ["Oz", "$155"],
        ["2 Oz", "$290"],
        ["QP", "$450"],
        ["HP", "$725"],
        ["LB", "$1275"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "peanut-butter-glue-awesome-dope-indoor-flower-3-5g": {
      title: "Green Gumbo",
      brand: "Boutique Indoor",
      price: "$165.00",
      compareAt: null,
      image: "images/uploads/green-gumbo-boutique-indoor-1.png",
      gallery: [
        "images/uploads/green-gumbo-boutique-indoor-2.png",
        "images/uploads/green-gumbo-boutique-indoor-3.png"
      ],
      alt: "Green Gumbo",
      description: "\"Green Gumbo\" is an indoor-grown indica made by crossing Gumbo with an unknown strain. It is named for its signature bubblegum flavor while also carrying sour, gassy undertones. This strain produces relaxing indica effects and features a piney aroma with a smooth diesel-like finish. It has a reputation for making you want to kick back and watch a movie without necessarily knocking you out.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "Indica"],
        ["Cross", "Gumbo x unknown strain"],
        ["Flavor", "Bubblegum with sour gassy undertones"],
        ["Aroma", "Piney with a smooth diesel-like finish"],
        ["Effects", "Relaxed, kicked-back, and movie-ready"],
        ["Oz", "$165"],
        ["2 Oz", "$300"],
        ["QP", "$490"],
        ["HP", "$800"],
        ["LB", "$1325"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "peanut-butter-glue-awesome-dope-indoor-flower-7g": {
      title: "CheeseCake",
      brand: "Boutique Indoor",
      price: "$165.00",
      compareAt: null,
      image: "images/uploads/cheesecake-boutique-indoor-1.png",
      gallery: [
        "images/uploads/cheesecake-boutique-indoor-2.png",
        "images/uploads/cheesecake-boutique-indoor-3.png"
      ],
      alt: "CheeseCake",
      description: "\"CheeseCake\" is an indoor-grown true hybrid strain created through crossing Confidential Cheese x Cake Badder. This powerhouse combination resulted in a strain that is cheesy, earthy, and extremely sweet. CheeseCake produces sleepy effects that leave you relaxed and ready for a long night of sleep.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "True hybrid"],
        ["Ratio", "50% indica / 50% sativa"],
        ["Cross", "Confidential Cheese x Cake Badder"],
        ["Profile", "Cheesy, earthy, and extremely sweet"],
        ["Effects", "Relaxed, sleepy, and ready for bed"],
        ["Oz", "$165"],
        ["2 Oz", "$300"],
        ["QP", "$490"],
        ["HP", "$800"],
        ["LB", "$1325"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "piecream-wood-wide-high-craft-indoor-flower-3-5g": {
      title: "Bacio Gelato",
      brand: "Top Shelf Smalls",
      price: "$90.00",
      compareAt: null,
      image: "images/uploads/bacio-gelato-top-shelf-smalls.png",
      video: "media/uploads/bacio-gelato-top-shelf-smalls.mp4",
      alt: "Bacio Gelato",
      description: "Top Shelf Smalls Bacio Gelato is a nice hybrid with a creamy, sweet, gassy nose. These are always a killer value.",
      facts: [
        ["Tier", "Top Shelf Smalls"],
        ["Type", "Hybrid"],
        ["Nose", "Creamy, sweet, and gassy"],
        ["Value", "Always a killer value"],
        ["Oz", "$90"],
        ["2 Oz", "$160"],
        ["QP", "$250"],
        ["HP", "$350"],
        ["LB", "$500"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "pink-runtz-awesome-dope-indoor-flower-3-5g": {
      title: "Candy Shop",
      brand: "Top Shelf Smalls",
      price: "$90.00",
      compareAt: null,
      image: "images/uploads/candy-shop-top-shelf-smalls.png",
      video: "media/uploads/candy-shop-top-shelf-smalls.mp4",
      alt: "Candy Shop",
      description: "Top Shelf Smalls Candy Shop is a nice indica with a candy nose. These are always a killer value.",
      facts: [
        ["Tier", "Top Shelf Smalls"],
        ["Type", "Indica"],
        ["Nose", "Candy"],
        ["Value", "Always a killer value"],
        ["Oz", "$90"],
        ["2 Oz", "$160"],
        ["QP", "$250"],
        ["HP", "$350"],
        ["LB", "$500"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "point-break-awesome-dope-indoor-flower-3-5g": {
      title: "Zombie Kush",
      brand: "Mids",
      price: "$90.00",
      compareAt: null,
      image: "images/uploads/zombie-kush-mids-1.png",
      gallery: [
        "images/uploads/zombie-kush-mids-2.png"
      ],
      alt: "Zombie Kush",
      description: "\"Zombie Kush\" is a light dep grown indica created by crossing Alien Cookies with Khalifa Kush. It brings creative, happy, uplifting effects with a smooth orange flavor balanced by floral accents on a sweet, earthy finish.",
      facts: [
        ["Tier", "Mids"],
        ["Grow", "Light dep"],
        ["Type", "Indica"],
        ["Cross", "Alien Cookies x Khalifa Kush"],
        ["Flavor", "Smooth orange with floral accents and a sweet earthy finish"],
        ["Effects", "Creative, happy, and uplifting"],
        ["Relief", "Stress and depression"],
        ["Oz", "$90"],
        ["2 Oz", "$160"],
        ["QP", "$230"],
        ["HP", "$390"],
        ["LB", "$570"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "rail-up-blem-flower-3-5g": {
      title: "Starburst",
      brand: "Top Shelf",
      price: "$130.00",
      compareAt: null,
      image: "images/uploads/starburst-top-shelf-1.png",
      gallery: [
        "images/uploads/starburst-top-shelf-2.png",
        "images/uploads/starburst-top-shelf-3.png"
      ],
      alt: "Starburst",
      description: "\"Starburst\" is a sativa-dominant hybrid created by crossing Pre-98 Bubba Kush with Fire OG. It carries a fruity, sweet, gassy, tropical scent, tastes like strawberry, tree fruit, and peach, and brings an upbeat buzzy high that feels happy and a bit giggly.",
      facts: [
        ["Tier", "Top Shelf"],
        ["Type", "Sativa-dominant hybrid"],
        ["Cross", "Pre-98 Bubba Kush x Fire OG"],
        ["Scent", "Fruity, sweet, gassy, and tropical"],
        ["Taste", "Strawberry, tree fruit, and peach"],
        ["Effects", "Upbeat, buzzy, happy, and a bit giggly"],
        ["Oz", "$130"],
        ["2 Oz", "$230"],
        ["QP", "$350"],
        ["HP", "$600"],
        ["LB", "$950"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "rainbow-sherbert-clubhouse-drops-flower-7g": {
      title: "Sour Toad",
      brand: "Top Shelf",
      price: "$130.00",
      compareAt: null,
      image: "images/uploads/sour-toad-top-shelf-1.png",
      gallery: [
        "images/uploads/sour-toad-top-shelf-2.png",
        "images/uploads/sour-toad-top-shelf-3.png"
      ],
      alt: "Sour Toad",
      description: "\"Sour Toad\" is an indica-dominant hybrid created by crossing Sour OG with Girl Scout Cookies. It has a sour yet sweet cinnamon orange flavor with a light touch of diesel on the exhale, a spicy diesel aroma accented by sweet and sour orange with touches of cinnamon, and a heady euphoric high that hits with happiness.",
      facts: [
        ["Tier", "Top Shelf"],
        ["Type", "Indica-dominant hybrid"],
        ["Cross", "Sour OG x Girl Scout Cookies"],
        ["Flavor", "Sour sweet cinnamon orange with light diesel"],
        ["Aroma", "Spicy diesel with sweet and sour orange"],
        ["Effects", "Heady, euphoric, and happy"],
        ["Oz", "$130"],
        ["2 Oz", "$230"],
        ["QP", "$350"],
        ["HP", "$600"],
        ["LB", "$950"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "red-citron-preferred-gardens-indoor-flower-3-5g": {
      title: "Jelly Runtz",
      brand: "Top Shelf",
      price: "$135.00",
      compareAt: null,
      image: "images/uploads/jelly-runtz-top-shelf-1.png",
      gallery: [
        "images/uploads/jelly-runtz-top-shelf-2.png",
        "images/uploads/jelly-runtz-top-shelf-3.png"
      ],
      alt: "Jelly Runtz",
      description: "\"Jelly Runtz\" is a heavy indica created by crossing White Runtz with Hella Jelly. It leans into candy-heavy terps without being as stupefying as straight Runtz, bringing a heady euphoria with sugary notes on the inhale and floral, earthy accents behind it.",
      facts: [
        ["Tier", "Top Shelf"],
        ["Type", "Heavy indica"],
        ["Cross", "White Runtz x Hella Jelly"],
        ["Terps", "Candy-forward with floral and earthy notes"],
        ["Effects", "Heady euphoria"],
        ["Oz", "$135"],
        ["2 Oz", "$235"],
        ["QP", "$375"],
        ["HP", "$625"],
        ["LB", "$950"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "red-hotz-flower-7g": {
      title: "Confetti Cake",
      brand: "Top Shelf",
      price: "$130.00",
      compareAt: null,
      image: "images/uploads/confetti-cake-top-shelf-1.png",
      gallery: [
        "images/uploads/confetti-cake-top-shelf-2.png",
        "images/uploads/confetti-cake-top-shelf-3.png"
      ],
      alt: "Confetti Cake",
      description: "\"Confetti Cake\" is an indica-dominant hybrid created by crossing Frozen Milk with Birthday Cake. It packs a super sweet nutty vanilla flavor with hints of creamy, cakey gas, and the nug structure is fluffy, light, and fresh.",
      facts: [
        ["Tier", "Top Shelf"],
        ["Type", "Indica-dominant hybrid"],
        ["Cross", "Frozen Milk x Birthday Cake"],
        ["Flavor", "Sweet nutty vanilla with creamy cakey gas"],
        ["Structure", "Fluffy, light, and fresh"],
        ["Oz", "$130"],
        ["2 Oz", "$230"],
        ["QP", "$350"],
        ["HP", "$600"],
        ["LB", "$950"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "rs-z-flower-7g": {
      title: "Candy's | The Force (7g)",
      brand: "Wizard Tier",
      price: "$130.00",
      compareAt: null,
      image: "images/uploads/candys-the-force-wizard-tier.png",
      video: "media/uploads/candys-the-force-wizard-tier.mp4",
      alt: "Candy's The Force 7g",
      description: "Wizard tier Candy's The Force is Lemon Up x Sherbanger #4, another incredible Candy's offering. TLDR: lemon funk with power.",
      facts: [
        ["Tier", "Wizard"],
        ["Brand", "Candy's"],
        ["Size", "7g"],
        ["Cross", "Lemon Up x Sherbanger #4"],
        ["Profile", "Lemon funk with power"],
        ["1 Unit", "$130"],
        ["2 Units", "$210"],
        ["3 Units", "$300"],
        ["4 Units", "$350"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "sherbanger-awesome-dope-indoor-flower-7g": {
      title: "Candy's | Maple Zyrup (7g)",
      brand: "Wizard Tier",
      price: "$130.00",
      compareAt: null,
      image: "images/uploads/candys-maple-zyrup-wizard-tier.png",
      video: "media/uploads/candys-maple-zyrup-wizard-tier.mp4",
      alt: "Candy's Maple Zyrup 7g",
      description: "Wizard tier Candy's Maple Zyrup is OG x GSC x Z crossed back to Z three times. It brings mouth-staining syrup-sweet candy pine terps with power, another incredible Candy's banger. TLDR: multiple bracket winner in Proper Doinks.",
      facts: [
        ["Tier", "Wizard"],
        ["Brand", "Candy's"],
        ["Size", "7g"],
        ["Cross", "OG x GSC x Z backcrossed to Z three times"],
        ["Profile", "Syrup-sweet candy pine terps with power"],
        ["Note", "Multiple bracket winner in Proper Doinks"],
        ["1 Unit", "$130"],
        ["2 Units", "$210"],
        ["3 Units", "$300"],
        ["4 Units", "$350"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "strawberries-and-cream-awesome-dope-indoor-flower-3-5g": {
      title: "Candy's | Clockwork Zorange (7g)",
      brand: "Wizard Tier",
      price: "$130.00",
      compareAt: null,
      image: "images/uploads/candys-clockwork-zorange-wizard-tier.png",
      video: "media/uploads/candys-clockwork-zorange-wizard-tier.mp4",
      alt: "Candy's Clockwork Zorange 7g",
      description: "Wizard tier Candy's Clockwork Zorange is a 7g jar bred from Bubblegum Runtz x Zamosa. It hits with Gelonade-on-crack energy and some of the strongest orange terps on the menu, grown by the current Zalympics overall champion grower from the same line as Zalympic best strain Zamosa. This batch is insane and likely Zalympics material.",
      facts: [
        ["Tier", "Wizard"],
        ["Brand", "Candy's"],
        ["Size", "7g Jar"],
        ["Cross", "Bubblegum Runtz x Zamosa"],
        ["Profile", "Explosive orange terps with Gelonade-like power"],
        ["Grower", "Current Zalympics overall champion"],
        ["Note", "Bred from Zalympic best strain Zamosa"],
        ["Batch", "This batch is insane and likely Zalympics-bound"],
        ["1 Unit", "$130"],
        ["2 Units", "$210"],
        ["3 Units", "$300"],
        ["4 Units", "$350"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "cherry-pie-zkittles-boutique-indoor": {
      title: "Cherry Pie Zkittles",
      brand: "Boutique Indoor",
      price: "$165.00",
      compareAt: null,
      image: "images/uploads/cherry-pie-zkittles-boutique-indoor-1.png",
      alt: "Cherry Pie Zkittles",
      description: "\"Cherry Pie Zkittles\" is a boutique indoor strain bred from Cherry Pie x Zkittles. This indica-leaning hybrid brings sweet cherry pastry flavor layered with fruity candy notes, dense frosty buds, and a relaxing, mood-lifting high.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Cross", "Cherry Pie x Zkittles"],
        ["Profile", "Sweet cherry pastry with fruity candy notes"],
        ["Oz", "$165"],
        ["2 Oz", "$290"],
        ["4 Oz", "$500"],
        ["8 Oz", "$800"],
        ["1 Lb", "$1,500"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "crunchberries-x-dlish-exotic-indoor": {
      title: "Crunchberries X Dlish",
      brand: "Exotic Indoor",
      price: "$150.00",
      compareAt: null,
      image: "images/uploads/crunchberries-x-dlish-exotic-indoor-1.png",
      gallery: ["images/uploads/crunchberries-x-dlish-exotic-indoor-2.png"],
      alt: "Crunchberries X Dlish",
      description: "Crunchberries X Dlish is an exotic indoor cross of Crunchberries x D Lish. Expect a sweet berry cereal nose with creamy candy notes, frosty exotic buds, and an uplifting, well-rounded high.",
      facts: [
        ["Tier", "Exotic Indoor"],
        ["Cross", "Crunchberries x D Lish"],
        ["Profile", "Sweet berry cereal with creamy candy notes"],
        ["1 Oz", "$150"],
        ["2 Oz", "$260"],
        ["4 Oz", "$460"],
        ["8 Oz", "$760"],
        ["1 Lb", "$1,360"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "sugar-cakes-exotic-indoor": {
      title: "Sugar Cakes",
      brand: "Exotic Indoor",
      price: "$120.00",
      compareAt: null,
      image: "images/uploads/sugar-cakes-exotic-indoor-1.png",
      gallery: ["images/uploads/sugar-cakes-exotic-indoor-2.png"],
      alt: "Sugar Cakes",
      description: "Sugar Cakes is an exotic indoor strain with a sweet creamy pastry aroma layered with rich vanilla notes. Dense, frosty buds deliver a smooth, relaxing high with an approachable price point and full bulk pricing through the flower menu.",
      facts: [
        ["Tier", "Exotic Indoor"],
        ["Aroma", "Sweet creamy pastry and vanilla"],
        ["1 Oz", "$120"],
        ["2 Oz", "$220"],
        ["4 Oz", "$380"],
        ["8 Oz", "$600"],
        ["1 Lb", "$1,000"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "wedding-pie-wizard-tier": {
      title: "Wedding Pie",
      brand: "Wizard Tier",
      price: "$110.00",
      compareAt: null,
      image: "images/uploads/wedding-pie-wizard-tier-1.png",
      gallery: ["images/uploads/wedding-pie-wizard-tier-2.png"],
      alt: "Wedding Pie",
      description: "Wizard tier Wedding Pie is an 80/20 indica bred from Wedding Cake x Grape Pie. Potent and delicious.",
      facts: [
        ["Tier", "Wizard"],
        ["Type", "80/20 Indica"],
        ["Cross", "Wedding Cake x Grape Pie"],
        ["14g", "$110"],
        ["Oz", "$200"],
        ["2 Oz", "$350"],
        ["QP", "$550"],
        ["HP", "$875"],
        ["LB", "$1,600"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "gg4-wizard-tier": {
      title: "GG 4",
      brand: "Wizard Tier",
      price: "$60.00",
      compareAt: null,
      image: "images/uploads/gg4-wizard-tier-1.png",
      alt: "GG 4",
      description: "Wizard tier GG 4 is an indica-dominant strain bred from Chem's Sister x Sour Dubb x Chocolate Diesel. Fire ass GG4.",
      facts: [
        ["Tier", "Wizard"],
        ["Type", "Indica Dominant"],
        ["Cross", "Chem's Sister x Sour Dubb x Chocolate Diesel"],
        ["7g", "$60"],
        ["14g", "$110"],
        ["Oz", "$200"],
        ["2 Oz", "$350"],
        ["QP", "$550"],
        ["HP", "$875"],
        ["LB", "$1,600"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "madman-og-2-wizard-tier": {
      title: "Madman OG 2",
      brand: "Wizard Tier",
      price: "$110.00",
      compareAt: null,
      image: "images/uploads/madman-og-2-wizard-tier-1.png",
      alt: "Madman OG 2",
      description: "Wizard tier Madman OG 2 is a 60/40 indica bred from LA Confidential x OG Kush. We have the best OG's.",
      facts: [
        ["Tier", "Wizard"],
        ["Type", "60/40 Indica"],
        ["Cross", "LA Confidential x OG Kush"],
        ["14g", "$110"],
        ["Oz", "$200"],
        ["2 Oz", "$350"],
        ["QP", "$550"],
        ["HP", "$875"],
        ["LB", "$1,600"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "peach-cobbler-boutique-indoor": {
      title: "Peach Cobbler",
      brand: "Boutique Indoor",
      price: "$165.00",
      compareAt: null,
      image: "images/uploads/peach-cobbler-boutique-indoor-1.png",
      gallery: [
        "images/uploads/peach-cobbler-boutique-indoor-2.png",
        "images/uploads/peach-cobbler-boutique-indoor-3.png"
      ],
      alt: "Peach Cobbler",
      description: "Peach Cobbler is a boutique indoor strain bred from Peach Kush x Apricot Papaya. This 55% sativa / 45% indica hybrid delivers a sweet ripe peach aroma with warm pastry and vanilla notes, dense frosty buds, and a balanced uplifting high.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "55% Sativa / 45% Indica"],
        ["Cross", "Peach Kush x Apricot Papaya"],
        ["Aroma", "Sweet ripe peach with warm pastry and vanilla"],
        ["Oz", "$165"],
        ["2 Oz", "$290"],
        ["4 Oz", "$500"],
        ["8 Oz", "$800"],
        ["1 Lb", "$1,500"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "sunkist-boutique-indoor": {
      title: "Sunkist",
      brand: "Boutique Indoor",
      price: "$165.00",
      compareAt: null,
      image: "images/uploads/sunkist-boutique-indoor-1.png",
      alt: "Sunkist",
      description: "Sunkist is a boutique indoor hybrid bred from Platinum Tangie x Agent Orange. It delivers a sweet citrus and banana aroma with uplifting, energetic effects.",
      facts: [
        ["Style", "Boutique indoor"],
        ["Type", "Hybrid"],
        ["Cross", "Platinum Tangie x Agent Orange"],
        ["Aroma", "Sweet citrus and banana"],
        ["Oz", "$165"],
        ["2 Oz", "$290"],
        ["4 Oz", "$500"],
        ["8 Oz", "$800"],
        ["1 Lb", "$1,550"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    }
  },
  "dispos-carts": {
    "raw-garden-1g-cartridge-authentic": {
      title: "Raw Garden 1g Cartridge Authentic",
      brand: "Raw Garden",
      price: "$65.00",
      compareAt: null,
      image: "images/uploads/raw-garden-1g-cartridge-authentic-1.png",
      alt: "Raw Garden 1g Cartridge Authentic",
      description: "Authentic Raw Garden 1g refined live resin cartridge. Real Raw Garden quality — clean oil, consistent hits, and strain-specific live resin for the cart shoppers who know what they want.",
      facts: [
        ["Brand", "Raw Garden"],
        ["Authentic", "Yes"],
        ["Hardware", "Cartridge"],
        ["Oil", "Refined Live Resin"],
        ["Size", "1g"],
        ["1 Unit", "$65"],
        ["2 Units", "$125"],
        ["3 Units", "$175"],
        ["4 Units", "$230"],
        ["5 Units", "$280"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "blueberry-freezer-stky-disposable-2g": {
      title: "Authentic ColdFire Half G Rosin Dispo",
      brand: "ColdFire",
      price: "$50.00",
      compareAt: null,
      image: "images/uploads/authentic-coldfire-half-g-rosin-dispo.png",
      alt: "Authentic ColdFire Half G Rosin Dispo",
      description: "Authentic ColdFire half gram rosin disposable with bulk pricing available through Telegram. Pricing: 10 for $500, 30 for $1350, 50 for $2000, and 100 for $3700.",
      facts: [
        ["Hardware", "Disposable"],
        ["Oil", "Rosin"],
        ["Size", "0.5g"],
        ["10 Units", "$500"],
        ["30 Units", "$1350"],
        ["50 Units", "$2000"],
        ["100 Units", "$3700"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "candy-apple-muha-meds-cartridge-2g": {
      title: "1G Authentic Boutiq Licensed Product",
      brand: "Boutiq",
      price: "$25.00",
      compareAt: null,
      image: "images/uploads/authentic-boutiq-licensed-product-1g.png",
      alt: "1G Authentic Boutiq Licensed Product",
      description: "1 gram authentic Boutiq licensed product with bulk pricing available through Telegram. Pricing: 10 for $250, 30 for $630, 50 for $850, and 100 for $1500.",
      facts: [
        ["Hardware", "Cartridge"],
        ["Type", "Licensed product"],
        ["Size", "1g"],
        ["10 Units", "$250"],
        ["30 Units", "$630"],
        ["50 Units", "$850"],
        ["100 Units", "$1500"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "coldfire-juice-cannabis-oil-cartridge-1g": {
      title: "1G Authentic Raw Garden Dispo",
      brand: "Raw Garden",
      price: "$50.00",
      compareAt: null,
      image: "images/uploads/authentic-raw-garden-dispo-1g.png",
      alt: "1G Authentic Raw Garden Dispo",
      description: "1 gram authentic Raw Garden disposable with bulk pricing available through Telegram. Pricing: 10 for $500, 30 for $1050, 50 for $1500, and 100 for $2750.",
      facts: [
        ["Hardware", "Disposable"],
        ["Type", "Authentic dispo"],
        ["Size", "1g"],
        ["10 Units", "$500"],
        ["30 Units", "$1050"],
        ["50 Units", "$1500"],
        ["100 Units", "$2750"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "fuel-disposable-1g": {
      title: "2G Authentic Wholemelt Candy Edition (Dual Chamber)",
      brand: "Wholemelt",
      price: "$37.50",
      compareAt: null,
      image: "images/uploads/authentic-wholemelt-candy-edition-dual-chamber-2g.png",
      alt: "2G Authentic Wholemelt Candy Edition Dual Chamber",
      description: "2 gram authentic Wholemelt candy edition dual chamber disposable with bulk pricing available through Telegram. Pricing: 10 for $375, 30 for $700, 50 for $1000, and 100 for $1750.",
      facts: [
        ["Hardware", "Dual chamber"],
        ["Type", "Candy edition"],
        ["Size", "2g"],
        ["10 Units", "$375"],
        ["30 Units", "$700"],
        ["50 Units", "$1000"],
        ["100 Units", "$1750"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "grape-god-cbd-vape-disposable-1-gram": {
      title: "2G Authentic Ace Ultra Dispo",
      brand: "Ace Ultra",
      price: "$37.00",
      compareAt: null,
      image: "images/uploads/authentic-ace-ultra-dispo-2g.png",
      alt: "2G Authentic Ace Ultra Dispo",
      description: "2 gram authentic Ace Ultra disposable with bulk pricing available through Telegram. Pricing: 10 for $370, 30 for $800, 50 for $1150, and 100 for $2050.",
      facts: [
        ["Hardware", "Disposable"],
        ["Type", "Authentic dispo"],
        ["Size", "2g"],
        ["10 Units", "$370"],
        ["30 Units", "$800"],
        ["50 Units", "$1150"],
        ["100 Units", "$2050"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "grape-soda-gelato-vape-cartridge-1g": {
      title: "2G Authentic Big Chief Dispo V3",
      brand: "Big Chief",
      price: "$32.50",
      compareAt: null,
      image: "images/uploads/authentic-big-chief-dispo-v3-2g.png",
      alt: "2G Authentic Big Chief Dispo V3",
      description: "2 gram authentic Big Chief V3 disposable with bulk pricing available through Telegram. Pricing: 10 for $325, 30 for $700, 50 for $1025, and 100 for $1850.",
      facts: [
        ["Hardware", "Disposable"],
        ["Type", "V3"],
        ["Size", "2g"],
        ["10 Units", "$325"],
        ["30 Units", "$700"],
        ["50 Units", "$1025"],
        ["100 Units", "$1850"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "krypto-chronic-alien-labs-live-resin-disposable-1g": {
      title: "2G Authentic Boutiq ORB V5",
      brand: "Boutiq",
      price: "$32.50",
      compareAt: null,
      image: "images/uploads/authentic-boutiq-orb-v5-2g.png",
      alt: "2G Authentic Boutiq ORB V5",
      description: "2 gram authentic Boutiq ORB V5 with a fire device and oil built for big clouds. Triple chamber hardware with 0.7 gram in each chamber for 2.0 grams total. Pricing: 10 for $325, 30 for $685, 50 for $1025, and 100 for $1750.",
      facts: [
        ["Hardware", "Triple chamber"],
        ["Clouds", "Big clouds"],
        ["Chambers", "0.7g each"],
        ["Total", "2.0g"],
        ["10 Units", "$325"],
        ["30 Units", "$685"],
        ["50 Units", "$1025"],
        ["100 Units", "$1750"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "orange-elixir-cbd-vape-disposable-1-gram": {
      title: "2G Authentic Hitz Live Resin (Gladiator Edition)",
      brand: "Hitz",
      price: "$32.50",
      compareAt: null,
      image: "images/uploads/authentic-hitz-live-resin-gladiator-edition-2g.png",
      alt: "2G Authentic Hitz Live Resin Gladiator Edition",
      description: "2 gram authentic Hitz live resin disposable in the gladiator edition with bulk pricing available through Telegram. Pricing: 10 for $325, 30 for $640, 50 for $950, and 100 for $1650.",
      facts: [
        ["Hardware", "Disposable"],
        ["Oil", "Live resin"],
        ["Edition", "Gladiator edition"],
        ["Size", "2g"],
        ["10 Units", "$325"],
        ["30 Units", "$640"],
        ["50 Units", "$950"],
        ["100 Units", "$1650"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "papaya-cbd-vape-disposable-1-gram": {
      title: "2G Authentic Mad Labs Dispo",
      brand: "Mad Labs",
      price: "$32.50",
      compareAt: null,
      image: "images/uploads/authentic-mad-labs-dispo-2g.png",
      alt: "2G Authentic Mad Labs Dispo",
      description: "2 gram authentic Mad Labs disposable with a ceramic coil, licensed brand hardware, and absolutely fire product quality. Bulk pricing: 10 for $325, 30 for $640, 50 for $950, and 100 for $1650.",
      facts: [
        ["Hardware", "Ceramic coil"],
        ["Brand", "Licensed brand"],
        ["Quality", "Absolutely fire product"],
        ["Size", "2g"],
        ["10 Units", "$325"],
        ["30 Units", "$640"],
        ["50 Units", "$950"],
        ["100 Units", "$1650"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "smarties-cali-thc-cartridge-1g": {
      title: "2G Authentic Sherbinski Quatro Live Resin",
      brand: "Sherbinski",
      price: "$36.00",
      compareAt: null,
      image: "images/uploads/authentic-sherbinski-quatro-live-resin-2g.png",
      alt: "2G Authentic Sherbinski Quatro Live Resin",
      description: "Authentic Sherbinski 2 gram Quatro live resin disposable from a licensed brand and one of our favorite dispos on the menu. Bulk pricing: 10 for $360, 30 for $790, 50 for $1175, and 100 for $2150.",
      facts: [
        ["Hardware", "Disposable"],
        ["Oil", "Live resin"],
        ["Brand", "Licensed brand"],
        ["Menu Note", "One of our favorite dispos"],
        ["10 Units", "$360"],
        ["30 Units", "$790"],
        ["50 Units", "$1175"],
        ["100 Units", "$2150"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "strawberry-banana-cbd-vape-disposable-1-gram": {
      title: "2G Authentic Muha Dispo",
      brand: "Muha Meds",
      price: "$32.50",
      compareAt: null,
      image: "images/uploads/authentic-muha-dispo-2g.png",
      alt: "2G Authentic Muha Dispo",
      description: "New device and new flavors on these authentic 2 gram Muha Meds disposables. Licensed product with bulk pricing available through Telegram: 10 for $325, 30 for $660, 50 for $1000, and 100 for $1800.",
      facts: [
        ["Device", "New device"],
        ["Flavors", "New flavors"],
        ["Brand", "Licensed product"],
        ["Size", "2g"],
        ["10 Units", "$325"],
        ["30 Units", "$660"],
        ["50 Units", "$1000"],
        ["100 Units", "$1800"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "2g-hitz-infinity-aio-disposable": {
      title: "2G HITZ Infinity AIO Disposable",
      brand: "HITZ",
      price: "$40.00",
      compareAt: null,
      image: "images/uploads/hitz-infinity-aio-disposable-2g.png",
      alt: "2G HITZ Infinity AIO Disposable",
      description: "2 gram HITZ Infinity all-in-one disposable featuring live resin, sugar liquid diamonds, and a compact rechargeable-style AIO device. Available with straightforward quantity pricing.",
      facts: [
        ["Hardware", "AIO disposable"],
        ["Brand", "HITZ Infinity"],
        ["Size", "2g"],
        ["Oil", "Live resin sugar liquid diamonds"],
        ["1 Unit", "$40"],
        ["2 Units", "$80"],
        ["3 Units", "$110"],
        ["4 Units", "$130"],
        ["5 Units", "$150"],
        ["10 Units", "$250"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "2g-ace-ultra-aio-disposable": {
      title: "2G ACE ULTRA AIO Disposable",
      brand: "ACE ULTRA",
      price: "$40.00",
      compareAt: null,
      image: "images/uploads/ace-ultra-aio-disposable-2g.png",
      alt: "2G ACE ULTRA AIO Disposable",
      description: "2 gram ACE ULTRA all-in-one disposable with premium gold device styling and simple quantity tiers. Built for easy add-to-cart ordering through the Dispos/Carts menu.",
      facts: [
        ["Hardware", "AIO disposable"],
        ["Brand", "ACE ULTRA"],
        ["Size", "2g"],
        ["Style", "Premium gold device"],
        ["1 Unit", "$40"],
        ["2 Units", "$80"],
        ["3 Units", "$110"],
        ["4 Units", "$130"],
        ["5 Units", "$150"],
        ["10 Units", "$250"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "2g-blinkers-double-chamber-aio-disposable": {
      title: "2G Blinkers Double Chamber AIO Disposable",
      brand: "Blinkers",
      price: "$40.00",
      compareAt: null,
      image: "images/uploads/blinkers-double-chamber-aio-disposable-2g.png",
      alt: "2G Blinkers Double Chamber AIO Disposable",
      description: "2 gram Blinkers Flip double chamber all-in-one disposable with Mango Tango and Lemon Heads hybrid chambers. Available with simple quantity tiers through the Dispos/Carts menu.",
      facts: [
        ["Hardware", "AIO disposable"],
        ["Brand", "Blinkers"],
        ["Size", "2g"],
        ["Device", "Double chamber"],
        ["Chambers", "Mango Tango / Lemon Heads"],
        ["1 Unit", "$40"],
        ["2 Units", "$80"],
        ["3 Units", "$110"],
        ["4 Units", "$130"],
        ["5 Units", "$150"],
        ["10 Units", "$250"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "2g-sluggers-hit-switch-aio-disposable": {
      title: "2G Sluggers Hit Switch AIO Disposable",
      brand: "Sluggers",
      price: "$40.00",
      compareAt: null,
      image: "images/uploads/sluggers-hit-switch-aio-disposable-2g.png",
      alt: "2G Sluggers Hit Switch AIO Disposable",
      description: "2 gram Sluggers Hit Switch all-in-one disposable with dual chamber vape pen styling and Sativa / Hybrid side-by-side flavor switching. Available with simple quantity tiers through the Dispos/Carts menu.",
      facts: [
        ["Hardware", "AIO disposable"],
        ["Brand", "Sluggers"],
        ["Size", "2g"],
        ["Device", "Hit Switch"],
        ["Style", "Dual chamber vape pen"],
        ["1 Unit", "$40"],
        ["2 Units", "$80"],
        ["3 Units", "$110"],
        ["4 Units", "$130"],
        ["5 Units", "$150"],
        ["10 Units", "$250"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "in-house-live-rosin-cart-1g": {
      title: "1G Live Rosin Cart",
      brand: "In-house",
      price: "$55.00",
      compareAt: null,
      image: "images/uploads/in-house-live-rosin-cart-1g.png",
      alt: "1G Live Rosin Cart",
      description: "In-house 1 gram live rosin cart made for a premium rosin taste without feeling like each hit burns through the wallet. Current strains include Blues, High Five, Live Long and Prosper, 5 Alive, Purple Urkle, and Life Savers.",
      facts: [
        ["Hardware", "Cartridge"],
        ["Brand", "In-house"],
        ["Size", "1g"],
        ["Oil", "Live rosin"],
        ["Strains", "Blues, High Five, Live Long and Prosper, 5 Alive, Purple Urkle, Life Savers"],
        ["1 Unit", "$55"],
        ["2 Units", "$95"],
        ["3 Units", "$130"],
        ["4 Units", "$165"],
        ["5 Units", "$200"],
        ["10 Units", "$325"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "caliplug-cart-1g": {
      title: "1G CaliPlug Cart",
      brand: "CaliPlug",
      price: "$35.00",
      compareAt: null,
      image: "images/uploads/caliplug-cart-1g.png",
      alt: "1G CaliPlug Cart",
      description: "1 gram CaliPlug THC cartridge with clean cannabis oil cart hardware and simple quantity tier pricing through the Dispos/Carts menu.",
      facts: [
        ["Hardware", "Cartridge"],
        ["Brand", "CaliPlug"],
        ["Size", "1g"],
        ["Oil", "Cannabis oil"],
        ["1 Unit", "$35"],
        ["2 Units", "$55"],
        ["3 Units", "$80"],
        ["4 Units", "$95"],
        ["5 Units", "$110"],
        ["10 Units", "$175"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "tier-1-rosin-dispos": {
      title: "Tier 1 Rosin Dispos",
      brand: "Tier 1 Rosin",
      price: "$60.00",
      compareAt: null,
      image: "images/uploads/tier-1-rosin-dispos.png",
      alt: "Tier 1 Rosin Dispos",
      description: "Tier 1 rosin disposables with mind-boggling rosin quality and strain options including Grapeade, Rainbow Guava, and Saddle Bags. Orders under 10 count can choose a max of 2 strains; orders over 10 count may mix and match evenly.",
      facts: [
        ["Hardware", "Disposable"],
        ["Tier", "Tier 1"],
        ["Oil", "Rosin"],
        ["Strains", "Grapeade, Rainbow Guava, Saddle Bags"],
        ["Under 10ct", "Max 2 strain choices"],
        ["Over 10ct", "Mix and match evenly"],
        ["1 Unit", "$60"],
        ["2 Units", "$110"],
        ["3 Units", "$150"],
        ["4 Units", "$195"],
        ["5 Units", "$225"],
        ["10 Units", "$385"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "coldfire-cart-1g-authentic": {
      title: "1G ColdFire Cart - Authentic",
      brand: "ColdFire",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/coldfire-cart-1g-authentic.png",
      alt: "1G ColdFire Cart - Authentic",
      description: "Authentic 1G ColdFire cart with current strains: Motorbreath x Banana Punch, Zoap, Now n Later, Grillz, Cherry Haze, Cherry Dough, Sour Peaches, Oishi, Xs and Os, and Orange Wifi. Pricing: 2 for $115, 3 for $160, 5 for $250, 10 for $450, 25 for $1025, and 100 for $3500.",
      facts: [
        ["Hardware", "Cartridge"],
        ["Size", "1g"],
        ["Strains", "Motorbreath x Banana Punch, Zoap, Now n Later, Grillz, Cherry Haze, Cherry Dough, Sour Peaches, Oishi, Xs and Os, Orange Wifi"],
        ["2 Units", "$115"],
        ["3 Units", "$160"],
        ["5 Units", "$250"],
        ["10 Units", "$450"],
        ["25 Units", "$1025"],
        ["100 Units", "$3500"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "fuel-half-g-rosin-dispo": {
      title: "Fuel Half G Rosin Dispo",
      brand: "Fuel",
      price: "$55.00",
      compareAt: null,
      image: "images/uploads/fuel-half-g-rosin-dispo.png",
      alt: "Fuel Half G Rosin Dispo",
      description: "Best hash rosin disposables in the world, it does not get better than this. Discover high end cannabis consumption today and fuel your day. Current strains: Wakanda, Guava, Government Oasis. Pricing: 1 for $55 add on only, 2 for $100, 3 for $145, 5 for $225, and 10 for $350.",
      facts: [
        ["Hardware", "Disposable"],
        ["Format", ".5g rosin dispo"],
        ["Current Strains", "Wakanda, Guava, Government Oasis"],
        ["1 Unit", "$55 add on only"],
        ["2 Units", "$100"],
        ["3 Units", "$145"],
        ["5 Units", "$225"],
        ["10 Units", "$350"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "high-standards-2g-dispo-authentic": {
      title: "2G High Standard Dispo Authentic",
      brand: "High Standards",
      price: "$75.00",
      compareAt: null,
      image: "images/uploads/high-standards-2g-dispo-authentic-device.png",
      gallery: [
        "images/uploads/high-standards-2g-dispo-authentic-lineup.png"
      ],
      alt: "2G High Standard Dispo Authentic",
      description: "These are actually gass, the hardware rips and is smooth. Oil is very good as well. Pricing: 2 for $75, 3 for $90, 4 for $115, 5 for $130, and 10 for $225.",
      facts: [
        ["Hardware", "Disposable"],
        ["Size", "2g"],
        ["Hybrid Flavors", "Blue Runtz, Blue Dream, Lemon Cherry Gelato"],
        ["Sativa Flavors", "Sour Diesel, Grape Gas, Lemon Heads"],
        ["Indica Flavors", "Hard Candy, Cherry Heads, Mellowz"],
        ["2 Units", "$75"],
        ["3 Units", "$90"],
        ["4 Units", "$115"],
        ["5 Units", "$130"],
        ["10 Units", "$225"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "muha-meds-gen-3-2g-dispo-authentic": {
      title: "2G Muha Meds Gen 3 Dispo Authentic",
      brand: "Muha Meds",
      price: "$115.00",
      compareAt: null,
      image: "images/uploads/muha-meds-gen-3-2g-dispo-authentic.png",
      alt: "2G Muha Meds Gen 3 Dispo Authentic",
      description: "Authentic 2G Muha Meds Gen 3 disposable with tier pricing available through Telegram. Pricing: 3 for $115, 4 for $140, 5 for $170, and 10 for $285.",
      facts: [
        ["Hardware", "Disposable"],
        ["Size", "2g"],
        ["3 Units", "$115"],
        ["4 Units", "$140"],
        ["5 Units", "$170"],
        ["10 Units", "$285"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    }
  },
  edibles: {
    "blueberry-x-blue-dream-10pk-100mg-live-resin-chews-100mg": {
      title: "Rolexotics | Daytona Mini Hash Hole Joint : MIX N' MATCH",
      brand: "Rolexotics",
      price: "$50.00",
      compareAt: null,
      image: "images/edibles/rolexotics-daytona-mini-hash-hole-joint-mix-n-match.png",
      alt: "Rolexotics Daytona Mini Hash Hole Joint",
      description: "Behold the mini version of Rolexotic's Hash Hole edition, Daytona. Rolled exclusively with Elements paper and featuring an exquisite glass bullet tip, inside you will find premium exotic flower paired with top tier 70-120u Gucci Gear cold cure hash rosin. Hand rolled, artisan crafted, and pairings curated by Boom. Experience luxury, Rolexotics!",
      facts: [
        ["Format", "Mini hash hole joint"],
        ["Flower", "1.3g"],
        ["Rosin", "0.3g Gucci Gear cold cure hash rosin"],
        ["Paper", "Elements"],
        ["Tip", "Glass bullet tip"],
        ["Mix N Match", "Orange Drip x Citrus Tsunami; Lemon Drip x Honey Runtz; Lemosa x Purple Ice Water"],
        ["Minimum", "Order of two"],
        ["2 Units", "$100"],
        ["3 Units", "$145"],
        ["4 Units", "$185"],
        ["5 Units", "$205"],
        ["10 Units", "$340"],
        ["20 Units", "$600"],
        ["50 Units", "$1200"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "cherry-lime-x-gmo-10pk-100mg-live-resin-chews-100mg": {
      title: "2G Exotic Pre Rolls",
      brand: "Exotic Pre Rolls",
      price: "$10.00",
      compareAt: null,
      image: "images/edibles/2g-exotic-pre-rolls.png",
      alt: "2G Exotic Pre Rolls",
      description: "Feel free to request strains in the order notes, but we may swap out if we run out of stock because these go fast.",
      facts: [
        ["Format", "2g exotic pre-roll"],
        ["Strains", "Grape Gas, Perm Marker, RS-11, Apples & Bananas, Jealousy, Wasabi Lemonade, Los Wookies, Apple Scotti, Alien Tech, Pixelz, Moon Beams, Blue Slushie, Saturn OG, Orions Belt, Magic Melon, Gummies"],
        ["Minimum", "Order of 5"],
        ["5 Units", "$50"],
        ["10 Units", "$80"],
        ["25 Units", "$150"],
        ["50 Units", "$250"],
        ["100 Units", "$400"],
        ["250 Units", "$800"],
        ["500 Units", "$1300"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "jefferey-single-infused-joint": {
      title: "Jefferey Single Infused Joint",
      brand: "West Coast Cure",
      price: "$50.00",
      compareAt: null,
      image: "images/edibles/jefferey-single-infused-joint.png",
      alt: "Jefferey Single Infused Joint by West Coast Cure",
      description: "Jefferey single infused joints by West Coast Cure, shown with 1.2g single pack joints and rotating strain options. Each joint is infused with diamonds and priced with simple quantity tiers.",
      facts: [
        ["Format", "Single infused joint"],
        ["Line", "Jefferey"],
        ["Brand", "West Coast Cure"],
        ["Infusion", "Diamonds"],
        ["Size", "1.2g joint"],
        ["Options", "Red Delicious, OG Kush, Blue Dream, Lemon Burst, Frozen Cherries, and rotating single-pack options"],
        ["1 Unit", "$50"],
        ["2 Units", "$95"],
        ["3 Units", "$135"],
        ["4 Units", "$175"],
        ["5 Units", "$210"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "710-labs-hash-rosin-gummy-authentic": {
      title: "710 LABS HASH ROSIN GUMMY Authentic",
      brand: "710 Labs",
      price: "$60.00",
      compareAt: null,
      image: "images/edibles/710-labs-hash-rosin-gummy-authentic.png",
      alt: "710 Labs Hash Rosin Gummy Authentic",
      description: "Authentic 710 Labs cannabis-infused hash rosin gummies. Full spectrum handmade rosin gummies with a clean white pouch look and simple tier pricing.",
      facts: [
        ["Format", "Hash rosin gummy"],
        ["Brand", "710 Labs"],
        ["Type", "Cannabis-infused full spectrum rosin gummy"],
        ["Pack", "10 gummies per pack"],
        ["Dose", "10mg THC and 10mg CBD per piece"],
        ["Pack Total", "100mg THC and 100mg CBD per pack"],
        ["1 Unit", "$60"],
        ["2 Units", "$115"],
        ["3 Units", "$155"],
        ["4 Units", "$200"],
        ["5 Units", "$245"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "haze-main-thc-chocolate": {
      title: "Haze & Main THC Chocolate",
      brand: "Haze & Main",
      price: "$30.00",
      compareAt: null,
      image: "images/edibles/haze-main-thc-chocolate.png",
      alt: "Haze & Main THC Chocolate 100mg cake batter bar",
      description: "Haze & Main THC Chocolate is a cannabis-infused 100mg chocolate bar with a cake batter profile and colorful speckled pieces. Simple quantity tiers make it easy to add one bar or build a larger order.",
      facts: [
        ["Format", "THC chocolate bar"],
        ["Brand", "Haze & Main"],
        ["Flavor", "Cake Batter"],
        ["Strength", "100mg THC per bar"],
        ["Type", "Cannabis-infused chocolate"],
        ["1 Unit", "$30"],
        ["2 Units", "$50"],
        ["3 Units", "$65"],
        ["4 Units", "$80"],
        ["5 Units", "$90"],
        ["10 Units", "$120"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "chocolate-chip-dr-norms-mini-cookies-100mg": {
      title: "BITEZ | 100MG THC INFUSED GUMMIES",
      brand: "BITEZ",
      price: "$30.00",
      compareAt: null,
      image: "images/edibles/bitez-100mg-gummies-packaging.png",
      gallery: [
        "images/edibles/bitez-100mg-gummies-squares.png"
      ],
      alt: "BITEZ 100mg THC infused gummies",
      description: "10mg per piece, infused and fast acting nano THC, licensed and CAT4 compliant. It took eight different manufacturers to find the best edibles, and this manufacturer is responsible for some of the best gummies on the legal market. Premium product.",
      facts: [
        ["Format", "THC infused gummies"],
        ["Dose", "10mg per piece"],
        ["Type", "Fast acting nano THC"],
        ["Compliance", "Licensed and CAT4 compliant"],
        ["Flavors", "Blackberry, Peach, Strawberry, Green Apple, Lychee, Blue Raspberry, Pineapple, Apple, Mixed Fruit"],
        ["Minimum", "Order of 2"],
        ["2 Units", "$60"],
        ["3 Units", "$75"],
        ["4 Units", "$85"],
        ["5 Units", "$100"],
        ["10 Units", "$125"],
        ["50 Units", "$425"],
        ["100 Units", "$750"],
        ["100+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "chocolate-crispy-rice-bar-dr-norms-rice-krispy-treat-100mg": {
      title: "Chocolate Fudge - 600mg",
      brand: "RSO Fudge",
      price: "$55.00",
      compareAt: null,
      image: "images/edibles/chocolate-fudge-600mg.png",
      alt: "Chocolate Fudge 600mg",
      description: "Chocolate Fudge is sold as a 600mg 2x2 square made with RSO. Four varieties are available: sea salt topped chocolate with Maldon sea salt flakes, toffee topped chocolate, peppermint chocolate, and salted caramel chocolate. These are absolutely phenomenal and hit like a truck.",
      facts: [
        ["Format", "600mg 2x2 fudge square"],
        ["Made With", "RSO"],
        ["Varieties", "Sea salt topped chocolate, toffee topped chocolate, peppermint chocolate, salted caramel chocolate"],
        ["1 Unit", "$55"],
        ["2 Units", "$100"],
        ["3 Units", "$130"],
        ["5 Units", "$160"],
        ["10 Units", "$290"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "clockwork-lemon-infused-gummies-10pk-100mg": {
      title: "THC Lean CannaSyrup 1000mg - 4oz Bottle",
      brand: "THC Lean",
      price: "$65.00",
      compareAt: null,
      image: "images/edibles/thc-lean-cannasyrup-1000mg-4oz.png",
      alt: "THC Lean CannaSyrup 1000mg 4oz Bottle",
      description: "THC Lean CannaSyrup is a full spectrum THC syrup. Each item is a 4oz bottle containing 1000mg THC. It leans nicely to the thinner side, so it can be taken straight or added to any drink. This is very, very potent and made with RSO. Shake well before using because contents may settle a little over time.",
      facts: [
        ["Format", "4oz bottle"],
        ["Strength", "1000mg THC"],
        ["Type", "Full spectrum THC syrup"],
        ["Made With", "RSO"],
        ["Flavors", "Blackberry, Blackberry Peach, Caramel Vanilla, Guava, Maple Butter Rum, Orange Creamsicle, Mango, Peach Mango, Pineapple, Pineapple Orange, Strawberry Banana, Strawberry Guava, Watermelon"],
        ["Note", "Shake well before using"],
        ["1 Unit", "$65"],
        ["2 Units", "$110"],
        ["3 Units", "$145"],
        ["5 Units", "$195"],
        ["10 Units", "$325"],
        ["20 Units", "$550"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "cookies-n-cream-dr-norms-mini-cookies-100mg": {
      title: "Salted Budder Toffee - 50mg - 1000mg",
      brand: "Budder Toffee",
      price: "$60.00",
      compareAt: null,
      image: "images/edibles/salted-budder-toffee-50mg-1000mg.png",
      alt: "Salted Budder Toffee 50mg 1000mg",
      description: "These delicious Budder Toffee Bites are made in house with real butter and finished with Fleur De Sel sea salt. The flavor profile hides the cannabis oil dangerously well. These are full spectrum and made with RSO. Each piece contains 50mg THC, with 20 pieces per bag for 1000mg THC total.",
      facts: [
        ["Format", "Budder toffee bites"],
        ["Dose", "50mg THC per piece"],
        ["Bag Total", "1000mg THC"],
        ["Pieces", "20 pieces per bag"],
        ["Type", "Full spectrum"],
        ["Made With", "RSO"],
        ["Finish", "Fleur De Sel sea salt"],
        ["1 Unit", "$60"],
        ["2 Units", "$100"],
        ["5 Units", "$190"],
        ["10 Units", "$270"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "crunchy-toasted-cinnamon-dr-norms-crispy-rice-bar-100mg-nano": {
      title: "Sugar High Edible",
      brand: "Sugar High",
      price: "$50.00",
      compareAt: null,
      image: "images/edibles/sugar-high-edible-500mg.png",
      alt: "Sugar High Edible 500mg gummies",
      description: "Sugar High gummies offer a delicious and potent way to enjoy THC. Each pack contains 10 gummies, with each gummy delivering 50mg THC for 500mg per bag. These are made for experienced cannabis users and offer a sweet, convenient, full-spectrum experience.",
      facts: [
        ["Format", "THC gummies"],
        ["Pack", "10 gummies per bag"],
        ["Dose", "50mg THC per gummy"],
        ["Bag Total", "500mg THC"],
        ["Type", "Full spectrum"],
        ["Flavors", "Apple Fritter, Watermelon Gelato, Blue Lychee Slush, Pink Rose, Purple Punchsicle, Key Lime Pie, Strawberry Shortcake, Mixed Fruit, Passionfruit Slush, Pineapple Express"],
        ["1 Unit", "$50"],
        ["2 Units", "$85"],
        ["5 Units", "$170"],
        ["10 Units", "$275"],
        ["10+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "dark-chocolate-raspberry-punch-solventless-punch-bar-100mg": {
      title: "100mg Camino Gummies and Camino Sours Vegan Gummies",
      brand: "Camino",
      price: "$50.00",
      compareAt: null,
      image: "images/edibles/camino-gummies-and-sours-100mg.png",
      alt: "100mg Camino Gummies and Camino Sours Vegan Gummies",
      description: "Camino Gummies and Camino Sours Vegan Gummies come with 10mg per gummy and 10 gummies per tin. Options include Sleep with CBN and indica terpenes, Chill for a laid-back relaxed state, Uplifting with sativa-like terpenes, Balance with a 1:1 ratio of 5mg THC and 5mg CBD, and Recover with 5mg THC and 10mg CBG. Effects generally take about 30 minutes to 2 hours to feel and typically last 4-8 hours.",
      facts: [
        ["Format", "Camino gummies and Camino Sours vegan gummies"],
        ["Dose", "10mg per gummy"],
        ["Tin Total", "100mg"],
        ["Pack", "10 gummies per tin"],
        ["Options", "Sleep, Chill, Uplifting, Balance, Recover"],
        ["Onset", "30 minutes to 2 hours"],
        ["Duration", "4-8 hours"],
        ["Minimum", "Order of 2"],
        ["2 Units", "$100"],
        ["5 Units", "$190"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    }
  },
  mushies: {
    "albino-blend-mushies-3-5g": {
      title: "Bluie Vuitton Shrooms",
      brand: "Bluie Vuitton",
      price: "$95.00",
      compareAt: null,
      image: "images/mushies/bluie-vuitton-shrooms.png",
      alt: "Bluie Vuitton Shrooms",
      description: "These are very high quality fungi. Grown by a master mycologist with time and care instead of being cranked out fast. Amazing potency.",
      facts: [
        ["Format", "Dried mushrooms"],
        ["Quality", "Very high quality fungi"],
        ["Grower", "Master mycologist"],
        ["Potency", "Amazing potency"],
        ["14g", "$95"],
        ["1 Oz", "$145"],
        ["2 Oz", "$240"],
        ["3 Oz", "$300"],
        ["4 Oz", "$350"],
        ["1 Lb", "$700"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "blue-stem-mushies-3-5g": {
      title: "Bluie Vuitton X Blue Meanie",
      brand: "Bluie Vuitton X Blue Meanie",
      price: "$95.00",
      compareAt: null,
      image: "images/mushies/bluie-vuitton-x-blue-meanie.png",
      alt: "Bluie Vuitton X Blue Meanie",
      description: "These are very high quality fungi. Grown by a master mycologist with time and care instead of being cranked out fast. Amazing potency.",
      facts: [
        ["Format", "Dried mushrooms"],
        ["Quality", "Very high quality fungi"],
        ["Grower", "Master mycologist"],
        ["Potency", "Amazing potency"],
        ["14g", "$95"],
        ["1 Oz", "$145"],
        ["2 Oz", "$240"],
        ["3 Oz", "$300"],
        ["4 Oz", "$350"],
        ["1 Lb", "$700"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "ghost-x-blue-meanie-mushies": {
      title: "Shakita",
      brand: "Shakita",
      price: "$95.00",
      compareAt: null,
      image: "images/mushies/shakita.png",
      alt: "Shakita",
      description: "These are very high quality fungi. Grown by a master mycologist with time and care instead of being cranked out fast. Amazing potency.",
      facts: [
        ["Format", "Dried mushrooms"],
        ["Quality", "Very high quality fungi"],
        ["Grower", "Master mycologist"],
        ["Potency", "Amazing potency"],
        ["14g", "$95"],
        ["1 Oz", "$145"],
        ["2 Oz", "$240"],
        ["3 Oz", "$300"],
        ["4 Oz", "$350"],
        ["1 Lb", "$700"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "golden-cap-mushies-3-5g": {
      title: "Iceberg x Full Moon Party",
      brand: "Iceberg x Full Moon Party",
      price: "$95.00",
      compareAt: null,
      image: "images/mushies/iceberg-x-full-moon-party.png",
      alt: "Iceberg x Full Moon Party",
      description: "These are very high quality fungi. Grown by a master mycologist with time and care instead of being cranked out fast. Amazing potency.",
      facts: [
        ["Format", "Dried mushrooms"],
        ["Quality", "Very high quality fungi"],
        ["Grower", "Master mycologist"],
        ["Potency", "Amazing potency"],
        ["14g", "$95"],
        ["1 Oz", "$145"],
        ["2 Oz", "$240"],
        ["3 Oz", "$300"],
        ["4 Oz", "$350"],
        ["1 Lb", "$700"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "iceberg-x-full-moon-party-mushies": {
      title: "Ghost X Blue Meanie",
      brand: "Ghost X Blue Meanie",
      price: "$95.00",
      compareAt: null,
      image: "images/mushies/ghost-x-blue-meanie.png",
      alt: "Ghost X Blue Meanie",
      description: "These are very high quality fungi. Grown by a master mycologist with time and care instead of being cranked out fast. Amazing potency.",
      facts: [
        ["Format", "Dried mushrooms"],
        ["Quality", "Very high quality fungi"],
        ["Grower", "Master mycologist"],
        ["Potency", "Amazing potency"],
        ["14g", "$95"],
        ["1 Oz", "$145"],
        ["2 Oz", "$240"],
        ["3 Oz", "$300"],
        ["4 Oz", "$350"],
        ["1 Lb", "$700"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "magics-mushroom-cups-mushies": {
      title: "Magic's | Mushroom Peanut Butter Cups",
      brand: "Magic's",
      price: "$60.00",
      compareAt: null,
      image: "images/mushies/magics-mushroom-peanut-butter-cups.png",
      alt: "Magic's Mushroom Peanut Butter Cups",
      description: "Magic's. Indulge in our small-batch magic mushroom peanut butter cups, handcrafted with premium ingredients by a passionate artisan. Each velvety chocolate shell wraps a creamy peanut butter core so smooth, you would never guess there was 1/2g of psychedelic magic within.",
      facts: [
        ["Format", "Mushroom peanut butter cups"],
        ["Pieces per bag", "5"],
        ["Dose per piece", "0.5g"],
        ["Total per bag", "2.5g"],
        ["1 Bag", "$60"],
        ["2 Bags", "$100"],
        ["3 Bags", "$120"],
        ["4 Bags", "$140"],
        ["5 Bags", "$165"],
        ["10 Bags", "$250"],
        ["20 Bags", "$425"],
        ["20+", "Contact on TG"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    }
  },
  concentrates: {
    "amarelo-mountain-man-melts-cold-cured-live-resin-2g": {
      title: "1G ABX Badder",
      brand: "ABX",
      price: "$50.00",
      compareAt: null,
      image: "images/concentrates/abx-badder-1g-authentic.png",
      alt: "1G ABX Badder",
      description: "Authentic 1 gram ABX badder with a deep strain bench including GMO OG, Permanent Haze, Bacio Pancakes, Key Lime Kush, Future Haze, Papaya Gold, Papaya Juice, Papaya Spritzer, Lemon Bow, Zu Tang, Zour Zohan, Orange Z, Blue Skunkberry, HB Donutz, Jelly Papaya, Peach Ztarfruit, Yellow Ztarfruit, and Peach Dreams. Bulk pricing available through Telegram.",
      facts: [
        ["Type", "Badder"],
        ["Brand", "Authentic"],
        ["Size", "1g"],
        ["Strains 1", "GMO OG, Permanent Haze, Bacio Pancakes, Key Lime Kush, Future Haze, Papaya Gold"],
        ["Strains 2", "Papaya Juice, Papaya Spritzer, Lemon Bow, Zu Tang, Zour Zohan, Orange Z"],
        ["Strains 3", "Blue Skunkberry, HB Donutz, Jelly Papaya, Peach Ztarfruit, Yellow Ztarfruit, Peach Dreams"],
        ["1 Unit", "$50"],
        ["2 Units", "$90"],
        ["3 Units", "$115"],
        ["5 Units", "$140"],
        ["10 Units", "$250"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "banana-punch-4-strawberry-guava-9-persy-thumbprint-2g": {
      title: "1G Barrett Farms Fresh Frozen Live Rosin",
      brand: "Barrett Farms",
      price: "$80.00",
      compareAt: null,
      image: "images/concentrates/barrett-farms-fresh-frozen-live-rosin-1g-authentic.png",
      alt: "1G Barrett Farms Fresh Frozen Live Rosin",
      description: "Authentic 1 gram Barrett Farms fresh frozen live rosin inspired by the beauty of Humboldt County and the unconditional love of their loyal companion, Barrett. Feel free to request strains, but strain selections may swap if certain options are out of stock.",
      facts: [
        ["Type", "Fresh frozen live rosin"],
        ["Brand", "Authentic"],
        ["Size", "1g"],
        ["Strains", "Skynet, Superboof, Amarelo, Champaya, Dulce de Uva, Spritzer, GMOZK"],
        ["Stock Note", "Requested strains may swap if out of stock"],
        ["1 Unit", "$80"],
        ["2 Units", "$140"],
        ["3 Units", "$190"],
        ["5 Units", "$285"],
        ["10 Units", "$495"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "blackwater-og-nasha-extracts-green-unpressed-hash-1-2g": {
      title: "1G In House Live Rosin Tier 1",
      brand: "In House",
      price: "$55.00",
      compareAt: null,
      image: "images/concentrates/in-house-live-rosin-tier-1-1g.png",
      alt: "1G In House Live Rosin Tier 1",
      description: "This is some pressure. Try out In House Tier 1 live rosin and you will not be disappointed. Strain options currently include LCG and Sherbert with deep bulk pricing available through Telegram.",
      facts: [
        ["Type", "Live rosin Tier 1"],
        ["Brand", "In House"],
        ["Size", "1g"],
        ["Strains", "LCG, Sherbert"],
        ["1 Unit", "$55"],
        ["2 Units", "$100"],
        ["3 Units", "$140"],
        ["4 Units", "$180"],
        ["5 Units", "$205"],
        ["10 Units", "$350"],
        ["25 Units", "$725"],
        ["50 Units", "$1250"],
        ["100 Units", "$2320"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "blue-zina-punch-live-rosin-badder-tier-3-1g": {
      title: "DAB White Label | 1oz Badder",
      brand: "DAB White Label",
      price: "$145.00",
      compareAt: null,
      image: "images/concentrates/dab-white-label-logo.png",
      gallery: [
        "images/concentrates/dab-white-label-1oz-badder.png"
      ],
      alt: "DAB White Label 1oz Badder",
      description: "In my professional opinion there has not been a more consistent badder brand in the past 2 years than DAB. No other cheap badder in baller jars with a master box has matched DAB's consistency. Besides the superior product, the design, concept, and aesthetic is flyer than the competition by a long shot. Feel encouraged to share your preferred strains. We are able to accommodate desires most of the time, but please be prepared for replacements and variety.",
      facts: [
        ["Type", "Badder"],
        ["Size", "1oz"],
        ["Brand", "White Label"],
        ["Strains 1", "Prism, Huckleberry, Pineapple Frost, Lightspeed, Terpenstein, Mass Driver, UFO"],
        ["Strains 2", "Alien OG, Sugar Bear, Animal Cookies, Gas Giant, Mars OG, Space Kush, Brainwash"],
        ["Strains 3", "OZ Kush, Wormhole, Blueberry Muffin, Purple Panties, Romulan, White Rhino, Sour Spyder"],
        ["Strains 4", "Chemdawg, Creme Brulee, Bruce Banner, Grape Moscato, Platinum OG, Black Lime"],
        ["Stock Note", "Preferred strains can often be accommodated, but replacements may happen"],
        ["1 Unit", "$145"],
        ["2 Units", "$245"],
        ["4 Units", "$425"],
        ["8 Units", "$695"],
        ["1 Lb", "$1075"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "blueberry-muffin-nasha-extracts-green-unpressed-hash-1-2g": {
      title: "DAB White Label | 1oz Crumble",
      brand: "DAB White Label",
      price: "$145.00",
      compareAt: null,
      image: "images/concentrates/dab-white-label-1oz-crumble.png",
      gallery: [
        "images/concentrates/dab-white-label-logo.png"
      ],
      alt: "DAB White Label 1oz Crumble",
      description: "The best BHO extractors see their work as artisanal craft and DAB is an autismanal product. High quality inputs and material meet care and excellence with every batch. Feel encouraged to share your preferred strains. We are able to accommodate desires most of the time, but please be prepared for replacements and variety.",
      facts: [
        ["Type", "Crumble"],
        ["Size", "1oz"],
        ["Brand", "White Label"],
        ["Strains", "Mamba Haze, Bangers & Mash, Zeclair, Lemon OG, Glitter Bomb"],
        ["Stock Note", "Preferred strains can often be accommodated, but replacements may happen"],
        ["1 Unit", "$145"],
        ["2 Units", "$245"],
        ["4 Units", "$425"],
        ["8 Units", "$695"],
        ["1 Lb", "$1075"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "butterscotch-frostee-the-bryantist-live-rosin-badder-2g": {
      title: "DAB | Sugar",
      brand: "DAB",
      price: "$145.00",
      compareAt: null,
      image: "images/concentrates/dab-sugar.png",
      gallery: [
        "images/concentrates/dab-white-label-logo.png"
      ],
      alt: "DAB Sugar",
      description: "Some is more saucie than others, and some is a lil separated in the video due to 1lb jars. We will mix them as we make ounces. You can see the overall quality though, top notch. These are slightly a step above in quality from the rest of the DAB line up and still insane for the price. Feel encouraged to share your preferred strains. We are able to accommodate desires 90% of the time, but please be prepared for simple replacements.",
      facts: [
        ["Type", "Sugar"],
        ["Brand", "DAB"],
        ["Quality", "Slightly above the rest of the DAB line"],
        ["Jar Note", "Some jars are more saucy or a little separated in 1 lb jars"],
        ["Stock Note", "Preferred strains can be accommodated about 90% of the time"],
        ["1 Unit", "$145"],
        ["2 Units", "$245"],
        ["4 Units", "$425"],
        ["8 Units", "$695"],
        ["1 Lb", "$1075"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "champaya-mountain-man-melts-cold-cured-live-resin-2g": {
      title: "DAB White Label | 1oz Sauce",
      brand: "DAB White Label",
      price: "$145.00",
      compareAt: null,
      image: "images/concentrates/dab-white-label-sauce-label.png",
      gallery: [
        "images/concentrates/dab-white-label-1oz-sauce.png"
      ],
      alt: "DAB White Label 1oz Sauce",
      description: "Basically wet crumble. Not so granular and dry that it's considered sugar, but also a lil chunky and saucy. Premium per usual. Feel encouraged to share your preferred strains. We are able to accommodate desires most of the time, but please be prepared for replacements and variety.",
      facts: [
        ["Type", "Sauce"],
        ["Texture", "Basically wet crumble"],
        ["Size", "1oz"],
        ["Brand", "White Label"],
        ["Strains 1", "Zebraz, Sauce Boss, Peach Z, Cash Stash, Cruel Summer"],
        ["Strains 2", "Jelly Belly, Honey Badger, Crimson Kush, Purple Punch, Hawaiian OG"],
        ["Strains 3", "White Runtz, Lemon Haze, Ecto Cooler, Headband, Afghani Pie"],
        ["Stock Note", "Preferred strains can often be accommodated, but replacements may happen"],
        ["1 Unit", "$145"],
        ["2 Units", "$245"],
        ["4 Units", "$425"],
        ["8 Units", "$695"],
        ["1 Lb", "$1075"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "creme-de-luna-nasha-extracts-green-unpressed-hash-1-2g": {
      title: "Roswell | 1oz Full Spectrum Hash Rosin",
      brand: "Roswell",
      price: "$475.00",
      compareAt: null,
      image: "images/concentrates/roswell-1oz-hash-rosin-promo.png",
      gallery: [
        "images/concentrates/roswell-1oz-full-spectrum-hash-rosin.png"
      ],
      alt: "Roswell 1oz Full Spectrum Hash Rosin",
      description: "Roswell brand is a full spectrum hash rosin offering. With unbeatable value, it sits as a fire budget option. Feel encouraged to share your preferred strains in the order notes. We are able to accommodate desires 90% of the time, but please be prepared for simple replacements. All strains are fire, though.",
      facts: [
        ["Type", "Full Spectrum Hash Rosin"],
        ["Size", "1oz"],
        ["Brand", "Roswell"],
        ["Strains 1", "Citrus Cooker, Hash Burger, Lime OG, Rainbow Belts"],
        ["Strains 2", "Banana Cream Pie, Garlic Juice, Lemon Heads, Government Oasis"],
        ["Strains 3", "Garlic Limes, Frozen Banana, Grease Monkey, Rainbow Cake"],
        ["Strains 4", "Lemon Cake, Tahoe OG, Tropic Thunder, Rainbow Guava"],
        ["Stock Note", "Preferred strains can be accommodated about 90% of the time"],
        ["OZ", "$475"],
        ["2 OZ", "$825"],
        ["QP", "$1550"],
        ["HP", "$2650"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "creme-de-luna-nasha-extracts-red-pressed-hash-1-2g": {
      title: "Gucci Gear | 2g 70-120u Hash Rosin",
      brand: "Gucci Gear",
      price: "$110.00",
      compareAt: null,
      image: "images/concentrates/gucci-gear-2g-70-120u-hash-rosin.png",
      alt: "Gucci Gear 2g 70-120u Hash Rosin",
      description: "Single-source, living soil, cold-cured live hash rosin at an unbeatable price. Crafted by award winning hash makers, Gucci Gear is for the connoisseur. Feel encouraged to share your preferred strains in the order notes. We are able to accommodate desires 90% of the time, but please be prepared for simple replacements.",
      facts: [
        ["Type", "70-120u Hash Rosin"],
        ["Size", "2g"],
        ["Brand", "Gucci Gear"],
        ["Strains 1", "Papa Burger, Garlotti, Collins Ave, Passion Fruit, Candy Cane"],
        ["Strains 2", "Pink Aruba, Baja Blast, Banana Hammock, Trop Shop, Grape Gas"],
        ["Strains 3", "Papaya, Cherry Zkittlez, Lemon Berry, Nam Wah, Spritzer"],
        ["Stock Note", "Preferred strains can be accommodated about 90% of the time"],
        ["1", "$110"],
        ["2", "$180"],
        ["3", "$240"],
        ["7 (14g)", "$475"],
        ["14 (28g)", "$865"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "diamond-hash-nasha-extracts-topper-thc-a-diamonds-cold-water-hashish-1g": {
      title: "Dubble Bubble | 10g Pressed Bubble Hash",
      brand: "Dubble Bubble",
      price: "$130.00",
      compareAt: null,
      image: "images/concentrates/dubble-bubble-10g-pressed-bubble-hash.png",
      alt: "Dubble Bubble 10g Pressed Bubble Hash",
      description: "Experience the rich tradition of Moroccan hash with our latest offering, Moroccan Pressed Bubble Hash. Popularly used to accompany flower and tobacco in joints, giving a smooth and mellow high. 10g per pack. Feel encouraged to share your preferred strains in the order notes. We are able to accommodate desires 90% of the time, but please be prepared for simple replacements. Four strains per lb maximum.",
      facts: [
        ["Type", "Pressed Bubble Hash"],
        ["Style", "Moroccan style"],
        ["Size", "10g per pack"],
        ["Brand", "Dubble Bubble"],
        ["Strains", "Grape Gas, Amnesia Haze, Cherry Guzzler, Zakura"],
        ["Stock Note", "Preferred strains can be accommodated about 90% of the time"],
        ["Limit", "4 strains per lb maximum"],
        ["1 Pack", "$130"],
        ["5 Pack", "$500"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    },
    "do-lato-10-cereal-star-5-persy-thumbprint-2g": {
      title: "Slab Labs | 10g Static Sift",
      brand: "Slab Labs",
      price: "Contact on TG for price",
      compareAt: null,
      image: "images/concentrates/slab-labs-10g-static-sift.png",
      alt: "Slab Labs 10g Static Sift",
      description: "Static Sift is the latest in solventless concentrates that Europe and the UK is going crazy for. Produced using advanced static sifting techniques, it isolates premium trichome heads while preserving the plant's natural terpene profile. After going through many samples and batches before adding anything to the menu, this stood out. These are produced by a single source organic farm in Humboldt from a true aficionado. The nose and quality rival brands that cost twice as much.",
      facts: [
        ["Type", "Static Sift"],
        ["Size", "10g"],
        ["Brand", "Slab Labs"],
        ["Production", "Single source organic farm in Humboldt"],
        ["Strains 1", "Nam Wah, Garlic Juice, Tropaya, Dark Rainbow, Banana Punch"],
        ["Strains 2", "Sour Strawberry, Honey Banana, Wakanda, Grape Gas, Trop Cherry"],
        ["Pricing", "Contact on TG for price"],
        ["Ordering", "Add to cart and finish through Telegram"]
      ]
    }
  }
};

const flowerProductAliases = [
  ["3bros-premium-flower-half-oz-jar", "apple-mac-awesome-dope-indoor-flower-7g"],
  ["white-cherries-boutique-indoor", "lucky-ztrike-flower-7g"],
  ["orange-fanta-boutique-indoor", "mambaz-milk-flower-7g"],
  ["lucky-charms-boutique-indoor", "one-og-west-coast-x-bomb-redstash-indoor-flower-3-5g"],
  ["killer-og-boutique-indoor", "orange-apricot-awesome-dope-indoor-flower-3-5g"],
  ["green-gumbo-boutique-indoor", "peanut-butter-glue-awesome-dope-indoor-flower-3-5g"],
  ["cheesecake-boutique-indoor", "peanut-butter-glue-awesome-dope-indoor-flower-7g"],
  ["starburst-top-shelf", "rail-up-blem-flower-3-5g"],
  ["confetti-cake-top-shelf", "red-hotz-flower-7g"]
];

for (const [aliasSlug, sourceSlug] of flowerProductAliases) {
  if (productOverrides.flower[sourceSlug] && !productOverrides.flower[aliasSlug]) {
    productOverrides.flower[aliasSlug] = { ...productOverrides.flower[sourceSlug] };
  }
}

const brandPatterns = [
  ["awesome-dope", "Awesome Dope"], ["clubhouse-drops", "Clubhouse Drops"], ["preferred-gardens", "Preferred Gardens"],
  ["wood-wide", "Wood Wide"], ["gas-no-brakes", "Gas No Brakes"], ["west-coast-x-bomb", "West Coast x BHOMB"],
  ["serge-cannabis", "Serge Cannabis"], ["mountain-man-melts", "Mountain Man Melts"], ["nasha-extracts", "Nasha Extracts"],
  ["red-dragon", "Red Dragon"], ["the-bryantist", "The Bryantist"], ["coldfire-x-bako", "ColdFire x Bako"],
  ["punch-x-stinger", "Punch x Stinger"], ["punch", "Punch"], ["lost-farm", "Lost Farm"], ["dr-norms", "Dr. Norms"],
  ["sonoma-hills-farm", "Sonoma Hills Farm"], ["terra-bites", "Terra Bites"], ["muha-meds", "Muha Meds"],
  ["alien-labs", "Alien Labs"], ["whole-melts", "Whole Melts"], ["big-chief", "Big Chief"],
  ["cali-thc", "Cali THC"], ["gelato", "Gelato"], ["stky", "Stky"], ["goti", "GOTI"], ["blem", "BLEM"],
  ["connected", "Connected"], ["classics", "Classics"], ["flavorade-x-bosky", "Flavorade x Bosky"], ["flavorade", "Flavorade"],
  ["persy-thumbprint", "710 Labs"], ["coldfire", "ColdFire"], ["jetty-extracts", "Jetty Extracts"]
].sort((a, b) => b[0].length - a[0].length);

const sliderImages = [
  "images/flower/flower-real-01.jpeg", "images/flower/flower-real-02.jpeg", "images/flower/flower-real-03.jpeg",
  "images/concentrates/abx-badder-1g-authentic.png", "images/concentrates/dab-white-label-1oz-badder.png", "images/concentrates/roswell-hash-rosin-jar.png",
  "images/edibles/edible-01.jpeg", "images/edibles/edible-02.jpeg", "images/edibles/edible-03.jpeg",
  "images/mushies/bluie-vuitton-shrooms.png", "images/mushies/bluie-vuitton-x-blue-meanie.png", "images/mushies/shakita.png", "images/mushies/iceberg-x-full-moon-party.png", "images/mushies/ghost-x-blue-meanie.png", "images/mushies/magics-mushroom-peanut-butter-cups.png",
  "images/dispos-carts/dispos-cart-01.jpeg", "images/dispos-carts/dispos-cart-02.jpeg", "images/dispos-carts/dispos-cart-03.jpeg"
];

  const excludedCategoryImages = {
    edibles: new Set([
      "bitez-100mg-gummies-packaging.png",
      "bitez-100mg-gummies-squares.png",
      "2g-exotic-pre-rolls.png",
      "rolexotics-daytona-mini-hash-hole-joint-mix-n-match.png"
    ]),
    concentrates: new Set([
      "abx-badder-1g-authentic.png",
    "barrett-farms-fresh-frozen-live-rosin-1g-authentic.png",
    "in-house-live-rosin-tier-1-1g.png",
    "dab-sugar.png",
    "dab-white-label-logo.png",
    "dab-white-label-1oz-badder.png",
    "dab-white-label-1oz-crumble.png",
    "dab-white-label-1oz-sauce.png",
    "dab-white-label-1oz-sauce-jar.png",
    "dab-white-label-sauce-label.png",
    "dab-white-label-sauce-lockup.png",
    "dab-white-label-sugar.png",
    "roswell-1oz-full-spectrum-hash-rosin.png",
    "roswell-1oz-hash-rosin-promo.png",
    "roswell-hash-rosin-jar.png",
    "roswell-hash-rosin-promo.png",
    "gucci-gear-2g-70-120u-hash-rosin.png",
    "gucci-gear-2g-hash-rosin-display.png",
    "dubble-bubble-10g-pressed-bubble-hash.png",
    "slab-labs-10g-static-sift.png"
  ])
};

const categoryImages = {
  flower: listImages("flower"),
  concentrates: listImages("concentrates"),
  edibles: listImages("edibles"),
  mushies: listImages("mushies"),
  "dispos-carts": listImages("dispos-carts")
};

function listImages(folder) {
  const excluded = excludedCategoryImages[folder] || new Set();
  return fs.readdirSync(path.join(root, "images", folder))
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .filter((name) => !name.startsWith("category-"))
    .filter((name) => !excluded.has(name))
    .sort()
    .map((name) => `images/${folder}/${name}`);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(relativePath, contents) {
  const filePath = path.join(root, relativePath);
  ensureDir(filePath);
  fs.writeFileSync(filePath, contents, "utf8");
}

function readText(filePath, encoding = "utf8") {
  return fs.readFileSync(filePath, encoding);
}

function readTextWithFallback(primaryPath, fallbackPath, encoding = "utf8") {
  const filePath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;
  return readText(filePath, encoding);
}

function getCachedOrLocalPage(rawCache, title, fallbackFile) {
  if (rawCache) {
    try {
      return replaceSharedAssets(extractCachedHtml(rawCache, title));
    } catch {
      // Fall back to the checked-in local page when this cache entry is missing.
    }
  }
  return replaceSharedAssets(readText(path.join(root, fallbackFile)));
}

function cleanupLiveServer(html) {
  return html.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/html>\s*$/i, "</body>\n</html>\n");
}

function replaceSharedAssets(html, rootPrefix = "") {
  return cleanupLiveServer(html)
    .replace(/images\/trader-growz-logo-[^"' )]+/g, `${rootPrefix}images/${logoFile}?v=${version}`)
    .replace(/href="css\/style\.css[^"]*"/g, `href="${rootPrefix}css/style.css?v=${version}"`)
    .replace(/src="js\/script\.js[^"]*"/g, `src="${rootPrefix}js/script.js?v=${version}"`);
}

function extractCachedHtml(raw, title) {
  const titleTag = `<title>${title}</title>`;
  const titleIndex = raw.indexOf(titleTag);

  if (titleIndex === -1) {
    throw new Error(`Missing cached HTML for ${title}`);
  }

  const startIndex = raw.lastIndexOf("<!DOCTYPE html>", titleIndex);
  const endIndex = raw.indexOf("</html>", titleIndex);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Unable to isolate cached HTML for ${title}`);
  }

  return raw.slice(startIndex, endIndex + "</html>".length);
}

function decodeHtml(text) {
  return String(text).replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function escapeJsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

function escapeXml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function compactText(text, maxLength = 160) {
  const normalized = decodeHtml(text || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  const limit = Math.max(20, maxLength - 3);
  const cut = normalized.lastIndexOf(" ", limit);
  return `${normalized.slice(0, cut > 20 ? cut : limit).trim()}...`;
}

function normalizeEdiblesCategoryLabel(html) {
  return html
    .replace(/(<a\b[^>]*href="[^"]*edibles\.html"[^>]*>)Edibles(?:\s*&(?:amp;)?\s*Prerolls)?(<\/a>)/g, "$1Edibles &amp; Prerolls$2")
    .replace(/(<h3\b[^>]*>)Edibles(?:\s*&(?:amp;)?\s*Prerolls)?(<\/h3>)/g, "$1Edibles &amp; Prerolls$2")
    .replace(/(<p\b[^>]*class="[^"]*text-leaf[^"]*"[^>]*>)Edibles(<\/p>)/g, "$1Edibles &amp; Prerolls$2")
    .replace(/alt="Edibles category"/g, 'alt="Edibles &amp; Prerolls category"');
}

function addBaseHref(html, href) {
  if (html.includes("<base ")) return html;
  return html.replace("<head>", `<head>\n  <base href="${href}">`);
}

function normalizeSiteLocationContent(html) {
  return html
    .replace(new RegExp(`Trader Growz <span class="dot"></span> ${formerCountryName}`, "g"), `Trader Growz <span class="dot"></span> ${siteStateName}`)
    .replace(new RegExp(`${formerCountryName}-based`, "g"), `${siteStateName}-based`);
}

function listToMetaContent(items) {
  return [...new Set(items.map((item) => decodeHtml(item || "").trim()).filter(Boolean))].join(", ");
}

function buildKeywordContent(title, extraKeywords = []) {
  const titleWords = decodeHtml(title || "")
    .split(/[|,-]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return listToMetaContent([...titleWords, ...extraKeywords, ...baseSeoKeywords]);
}

function normalizePathname(pathname = "home.html") {
  const cleaned = String(pathname || "home.html")
    .split("#")[0]
    .replace(/^(\.\.\/)+/, "")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "");
  return cleaned || "home.html";
}

function absoluteUrl(pathname = "home.html") {
  return `${siteOrigin}/${normalizePathname(pathname)}`;
}

function assetUrl(pathname = defaultSeoImage) {
  return absoluteUrl(pathname);
}

function imageMimeType(pathname = "") {
  const extension = normalizePathname(pathname).split(".").pop().toLowerCase().split("?")[0];
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "webp") return "image/webp";
  if (extension === "svg") return "image/svg+xml";
  return "image/png";
}

function parsePriceValue(price) {
  const match = String(price || "").match(/^\$?([0-9][0-9,]*(?:\.[0-9]+)?)/);
  return match ? match[1].replace(/,/g, "") : null;
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: absoluteUrl("home.html"),
    logo: assetUrl(logoUrlPath),
    areaServed: {
      "@type": "State",
      name: siteStateName,
      containedInPlace: {
        "@type": "Country",
        name: siteCountryName
      }
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: siteStateCode,
      addressCountry: siteCountryCode
    },
    sameAs: ["https://www.instagram.com/tradergrowz?igsh=MXBpcDZqaWVxaHJ5eA=="]
  };
}

function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: absoluteUrl("home.html"),
    inLanguage: siteLanguage,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: assetUrl(logoUrlPath)
      }
    }
  };
}

function buildWebPageSchema(pathname, title, description, pageType = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    name: decodeHtml(title),
    url: absoluteUrl(pathname),
    description: compactText(description, 220),
    inLanguage: siteLanguage,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("home.html")
    },
    contentLocation: {
      "@type": "State",
      name: siteStateName,
      containedInPlace: {
        "@type": "Country",
        name: siteCountryName
      }
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: assetUrl(logoUrlPath)
      }
    }
  };
}

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function buildCategorySchema(category, products) {
  const pathname = topLevelPages[category];
  const seo = categorySeo[category];
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    url: absoluteUrl(pathname),
    description: seo.description,
    inLanguage: siteLanguage,
    contentLocation: {
      "@type": "State",
      name: siteStateName,
      containedInPlace: {
        "@type": "Country",
        name: siteCountryName
      }
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`products/${category}/${product.slug}.html`),
        name: decodeHtml(product.title)
      }))
    }
  };
}

function getProductSeoDescription(product, category) {
  const label = categoryMeta[category]?.[0] || "menu";
  return compactText(`${decodeHtml(product.title)} on the Trader Growz ${label} menu. ${getProductDescription(product, category)}`, 158);
}

function buildProductSchema(category, product) {
  const pathname = `products/${category}/${product.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: decodeHtml(product.title),
    image: [product.image, ...(product.gallery || [])].map((image) => assetUrl(image)),
    description: getProductSeoDescription(product, category),
    category: categoryMeta[category]?.[0] || category,
    brand: {
      "@type": "Brand",
      name: decodeHtml(product.brand || siteName)
    },
    areaServed: {
      "@type": "State",
      name: siteStateName,
      containedInPlace: {
        "@type": "Country",
        name: siteCountryName
      }
    },
    url: absoluteUrl(pathname)
  };

  const price = parsePriceValue(product.price);
  if (price) {
    schema.offers = {
      "@type": "Offer",
      url: absoluteUrl(pathname),
      priceCurrency: siteCurrency,
      price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition"
    };
  }

  return schema;
}

function buildSeoBlock({ title, description, pathname = "home.html", robots = "index, follow", type = "website", image = defaultSeoImage, imageAlt = "", keywords = [], price = null, structuredData = [] }) {
  const cleanDescription = compactText(description || pageSeo.home.description, 165);
  const canonicalUrl = absoluteUrl(pathname);
  const imageUrl = assetUrl(image);
  const pageTitle = decodeHtml(title);
  const keywordsContent = buildKeywordContent(pageTitle, keywords);
  const imageAltText = imageAlt || `${siteName} - ${pageTitle}`;
  const imageType = imageMimeType(image);
  const priceValue = parsePriceValue(price);
  const productMeta = type === "product" && priceValue
    ? `  <meta property="product:price:amount" content="${escapeHtml(priceValue)}">
  <meta property="product:price:currency" content="${siteCurrency}">
  <meta property="product:availability" content="in stock">`
    : "";
  const schemaTags = structuredData
    .filter(Boolean)
    .map((schema) => `  <script type="application/ld+json">${escapeJsonLd(schema)}</script>`)
    .join("\n");

  return `  <!-- SEO metadata: search/social sharing/snippets. -->
  <meta name="description" content="${escapeHtml(cleanDescription)}">
  <meta name="keywords" content="${escapeHtml(keywordsContent)}">
  <meta name="author" content="${escapeHtml(siteAuthor)}">
  <meta name="publisher" content="${escapeHtml(sitePublisher)}">
  <meta name="copyright" content="${escapeHtml(siteName)}">
  <meta name="robots" content="${escapeHtml(robots)}">
  <meta name="googlebot" content="${escapeHtml(robots)}">
  <meta name="bingbot" content="${escapeHtml(robots)}">
  <meta name="rating" content="adult">
  <meta name="distribution" content="${escapeHtml(sitePlacename)}">
  <meta name="coverage" content="${escapeHtml(sitePlacename)}">
  <meta name="target" content="${escapeHtml(sitePlacename)}">
  <meta name="language" content="${siteLanguage}">
  <meta name="revisit-after" content="7 days">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="format-detection" content="telephone=no">
  <meta name="generator" content="Trader Growz static site generator">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <link rel="alternate" hreflang="en-us" href="${escapeHtml(canonicalUrl)}">
  <link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}">
  <meta name="application-name" content="${escapeHtml(siteName)}">
  <meta name="apple-mobile-web-app-title" content="${escapeHtml(siteName)}">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="${siteThemeColor}">
  <meta name="msapplication-TileColor" content="${siteThemeColor}">
  <meta name="color-scheme" content="light dark">
  <meta name="geo.region" content="${siteRegion}">
  <meta name="geo.country" content="${siteCountryCode}">
  <meta name="geo.placename" content="${escapeHtml(sitePlacename)}">
  <meta name="geo.position" content="${siteCoordinates}">
  <meta name="ICBM" content="${siteCoordinatesComma}">
  <meta name="DC.title" content="${escapeHtml(pageTitle)}">
  <meta name="DC.description" content="${escapeHtml(cleanDescription)}">
  <meta name="DC.creator" content="${escapeHtml(siteAuthor)}">
  <meta name="DC.publisher" content="${escapeHtml(sitePublisher)}">
  <meta name="DC.language" content="${siteLanguage}">
  <meta name="DC.coverage" content="${escapeHtml(sitePlacename)}">
  <meta name="DC.identifier" content="${escapeHtml(canonicalUrl)}">
  <meta name="DC.type" content="${type === "product" ? "Product" : "Text"}">
  <meta itemprop="name" content="${escapeHtml(pageTitle)}">
  <meta itemprop="description" content="${escapeHtml(cleanDescription)}">
  <meta itemprop="image" content="${escapeHtml(imageUrl)}">
  <meta property="og:locale" content="${siteLocale}">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">
  <meta property="og:type" content="${escapeHtml(type)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(cleanDescription)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:type" content="${escapeHtml(imageType)}">
  <meta property="og:image:alt" content="${escapeHtml(imageAltText)}">
  <meta property="og:updated_time" content="${sitemapDate}">
  <meta property="business:contact_data:country_name" content="${escapeHtml(siteCountryName)}">
  <meta property="business:contact_data:region" content="${escapeHtml(siteStateName)}">
  <meta property="business:contact_data:website" content="${escapeHtml(siteOrigin)}">
${productMeta}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:domain" content="${escapeHtml(siteDomain)}">
  <meta name="twitter:url" content="${escapeHtml(canonicalUrl)}">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(cleanDescription)}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
  <meta name="twitter:image:alt" content="${escapeHtml(imageAltText)}">
${schemaTags ? `${schemaTags}\n` : ""}  <!-- End SEO metadata. -->`;
}

function removeSeoBlock(html) {
  return html.replace(/\s*<!-- SEO metadata: search\/social sharing\/snippets\. -->[\s\S]*?<!-- End SEO metadata\. -->/g, "");
}

function applySeoToExistingPage(html, seo) {
  const cleaned = removeSeoBlock(cleanupLiveServer(html));
  const titleTag = `<title>${escapeHtml(seo.title)}</title>\n${buildSeoBlock(seo)}`;
  return cleaned.replace(/<title>[\s\S]*?<\/title>/i, titleTag);
}

function cartArg(value) {
  return escapeHtml(JSON.stringify(String(value)));
}

function humanizeSlug(slug) {
  const normalized = slug
    .replace(/-([0-9])-([0-9])g\b/g, (_, a, b) => ` ${a}.${b}g`)
    .replace(/-([0-9])pk\b/g, (_, a) => ` ${a}pk`)
    .replace(/-([0-9]+)pack\b/g, (_, a) => ` ${a}-Pack`)
    .replace(/\bog\b/g, "OG").replace(/\bcbd\b/g, "CBD").replace(/\bthc\b/g, "THC").replace(/\bthca\b/g, "THCA")
    .replace(/\bthcv\b/g, "THCV").replace(/\bcbn\b/g, "CBN").replace(/\bgmo\b/g, "GMO").replace(/\bzbx\b/g, "ZBX")
    .replace(/\brs\b/g, "RS").replace(/\bx\b/g, "x").replace(/-/g, " ");
  return normalized.split(/\s+/).filter(Boolean).map((word) => {
    if (/^(CBD|THC|THCA|THCV|CBN|OG|RS|GMO|ZBX)$/i.test(word)) return word.toUpperCase();
    if (/^[0-9.]+g$/i.test(word) || /^[0-9]+pk$/i.test(word) || /^[0-9]+-Pack$/i.test(word) || word === "x") return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

function deriveTitleAndBrand(slug, category) {
  for (const [pattern, label] of brandPatterns) {
    const index = slug.indexOf(pattern);
    if (index >= 0) {
      const before = slug.slice(0, index).replace(/-$/, "");
      const after = slug.slice(index + pattern.length).replace(/^-/, "");
      return {
        title: [before && humanizeSlug(before), label, after && humanizeSlug(after)].filter(Boolean).join(" | "),
        brand: label
      };
    }
  }
  return { title: humanizeSlug(slug), brand: categoryMeta[category]?.[0] || "Trader Growz" };
}

function inferAmount(slug) {
  const match = slug.match(/([0-9]+(?:-[0-9]+)?)g\b/i);
  return match ? `${match[1].replace("-", ".")}g` : "Current drop";
}

function pricePair(current, compareAt = null) {
  const currentValue = Number(current).toFixed(2);
  const compareValue = compareAt == null ? (Math.ceil(Number(currentValue) * 1.18 * 100) / 100).toFixed(2) : Number(compareAt).toFixed(2);
  return { price: `$${currentValue}`, compareAt: `$${compareValue}` };
}

function getProductOverride(category, slug) {
  return productOverrides[category]?.[slug] || null;
}

function isActiveProductSlug(category, slug) {
  return !inactiveProductSlugs[category]?.has(slug);
}

function applyProductAdjustments(category, product) {
  if (category === "flower" && ozMinimumFlowerSlugs.has(product.slug)) {
    return {
      ...product,
      price: "$195.00",
      minimumLabel: "Oz minimum",
      cartPrice: "$195.00 / Oz minimum"
    };
  }

  if (category === "dispos-carts" && tenMinimumDispoPrices.has(product.slug)) {
    const price = tenMinimumDispoPrices.get(product.slug);
    return {
      ...product,
      price,
      minimumLabel: "10 unit minimum",
      cartPrice: `${price} / 10 unit minimum`
    };
  }

  return product;
}

function addMinimumFact(facts, minimumLabel, beforeLabel) {
  const withoutMinimum = facts.filter(([label]) => label.toLowerCase() !== "minimum");
  const insertIndex = withoutMinimum.findIndex(([label]) => label.toLowerCase() === beforeLabel.toLowerCase());
  const nextFacts = [...withoutMinimum];
  nextFacts.splice(insertIndex === -1 ? 0 : insertIndex, 0, ["Minimum", minimumLabel]);
  return nextFacts;
}

function applyFactAdjustments(category, slug, facts) {
  if (category === "flower" && ozMinimumFlowerSlugs.has(slug)) {
    return addMinimumFact(
      facts.filter(([label]) => label.toLowerCase() !== "14g"),
      "Oz",
      "Oz"
    );
  }

  if (category === "dispos-carts" && tenMinimumDispoPrices.has(slug)) {
    return addMinimumFact(facts, "10 Units", "10 Units");
  }

  return facts;
}

function inferPrice(slug, category) {
  if (category === "mushies") {
    const map = {
      "albino-blend-mushies-3-5g": pricePair(35, 40),
      "blue-stem-mushies-3-5g": pricePair(38, 45),
      "golden-cap-mushies-3-5g": pricePair(42, 48)
    };
    return map[slug] || pricePair(38, 45);
  }
  if (category === "dispos-carts") {
    const map = {
      "fuel-disposable-1g": pricePair(35, 42),
      "coldfire-juice-cannabis-oil-cartridge-1g": pricePair(42.5, 50),
      "blueberry-freezer-stky-disposable-2g": pricePair(25.5, 30),
      "trimester-dropout-ii-disposable-3g": pricePair(55, 65),
      "candy-apple-muha-meds-cartridge-2g": pricePair(42.5, 50),
      "grape-soda-gelato-vape-cartridge-1g": pricePair(18, 22),
      "smarties-cali-thc-cartridge-1g": pricePair(18, 22),
      "za-ya-ya-x-key-lime-cake-whole-melts-dual-chamber-2g": pricePair(38, 45),
      "krypto-chronic-alien-labs-live-resin-disposable-1g": pricePair(42.5, 50),
      "grape-god-cbd-vape-disposable-1-gram": pricePair(15, 20),
      "orange-elixir-cbd-vape-disposable-1-gram": pricePair(15, 20),
      "papaya-cbd-vape-disposable-1-gram": pricePair(15, 20),
      "strawberry-banana-cbd-vape-disposable-1-gram": pricePair(15, 20)
    };
    return map[slug] || pricePair(28, 34);
  }
  if (category === "edibles") {
    if (slug.includes("lost-farm") || slug.includes("live-resin-chews")) return pricePair(15.3, 18);
    if (slug.includes("dr-norms-mini-cookies")) return pricePair(11.9, 14);
    if (slug.includes("dr-norms-rice-krispy") || slug.includes("crispy-rice-bar")) return pricePair(15.3, 18);
    if (slug.includes("infused-gummies")) return pricePair(14.45, 17);
    if (slug.includes("punch-bar")) return pricePair(12.75, 15);
    if (slug.includes("terra-bites")) return pricePair(21.6, 24);
    return pricePair(15.3, 18);
  }
  if (category === "concentrates") {
    if (slug.includes("persy-thumbprint-2g")) return pricePair(153, 180);
    if (slug.includes("mountain-man-melts") && slug.includes("2g")) return pricePair(106.25, 125);
    if (slug.includes("the-bryantist") && slug.includes("2g")) return pricePair(93.75, 125);
    if (slug.includes("red-dragon") && slug.includes("cold-cure-live-rosin-badder-2g")) return pricePair(119, 148);
    if (slug.includes("red-dragon") && slug.includes("fresh-press-live-rosin-1g")) return pricePair(76.5, 90);
    if (slug.includes("nasha-extracts") && slug.includes("blue-pressed-hash")) return pricePair(27.2, 32);
    if (slug.includes("nasha-extracts") && slug.includes("pressed-hash")) return pricePair(23.38, 27.5);
    if (slug.includes("nasha-extracts") && slug.includes("unpressed-hash")) return slug.includes("g-tan") || slug.includes("mad-fruit") ? pricePair(23.38, 27.5) : pricePair(19.13, 22.5);
    if (slug.includes("premium-shatter-1g")) return pricePair(17, 20);
    if (slug.includes("crushed-diamonds")) return pricePair(19.6, 28);
    if (slug.includes("tier-2-1g")) return pricePair(42.5, 50);
    if (slug.includes("tier-3-1g")) return pricePair(38.25, 45);
    if (slug.includes("badder-1g") || slug.includes("resin-badder-1g")) return pricePair(30.6, 36);
    if (slug.includes("badder-2g")) return pricePair(93.75, 125);
    return pricePair(42.5, 55);
  }
  return pricePair(25, 30);
}

function inferDescription(product, category) {
  const titleLead = decodeHtml(product.title).split("|")[0].trim();
  const amount = inferAmount(product.slug);
  if (category === "flower") return `${titleLead} is part of the current flower menu with a clean indoor presentation and a bold shelf look. This ${amount} drop is set up for quick cart adds and easy Telegram checkout.`;
  if (category === "concentrates") return `${titleLead} lands in the concentrates lineup with a smooth texture, strong aroma, and a simple add-to-cart flow. This ${amount} option is ready to send through Telegram once your cart is dialed in.`;
  if (category === "edibles") return `${titleLead} is part of the edibles and prerolls selection for shoppers who want a quick, measured pickup. This drop is arranged for easy cart building and a smooth Telegram order handoff.`;
  if (category === "mushies") return `${titleLead} is part of the current mushies menu and comes in a straightforward ${amount} format. Add it to your cart, then send the full order through Telegram when you are ready.`;
  return `${titleLead} is part of the current dispos and carts lineup with a fast, easy-to-shop format. Add it to cart and send the full order through Telegram when you are ready.`;
}

function inferFacts(product, category) {
  const title = decodeHtml(product.title).toLowerCase();
  const amount = inferAmount(product.slug);
  if (category === "flower") return [["Type", title.includes("indoor") ? "Indoor flower" : "Premium flower"], ["Format", amount], ["Ordering", "Add to cart, then send the full order through Telegram"], ["Notes", "Fresh menu drop with a clean shelf presence"]];
  if (category === "concentrates") {
    const texture = title.includes("shatter") ? "Shatter" : title.includes("hash") ? "Hash" : title.includes("badder") ? "Badder" : title.includes("thumbprint") ? "Thumbprint" : "Concentrate";
    return [["Texture", texture], ["Format", amount], ["Brand", product.brand], ["Ordering", "Build the cart first, then finish through Telegram"]];
  }
  if (category === "edibles") {
    const format = title.includes("pre roll") || title.includes("preroll") ? "Preroll drop" : title.includes("gummies") ? "Infused gummies" : title.includes("cookies") ? "Mini cookies" : title.includes("bar") ? "Infused bar" : "Edible drop";
    return [["Format", format], ["Pack", "Current menu pack"], ["Brand", product.brand], ["Ordering", "Add to cart and send the finished order through Telegram"]];
  }
  if (category === "mushies") return [["Format", "Dried mushroom drop"], ["Pack", amount], ["Brand", "Trader Growz"], ["Ordering", "Cart first, Telegram checkout second"]];
  const hardware = title.includes("cartridge") ? "Cartridge" : "Disposable";
  const oil = title.includes("cbd") ? "CBD blend" : title.includes("live resin") ? "Live resin" : title.includes("cannabis oil") ? "Cannabis oil" : "Distillate";
  return [["Hardware", hardware], ["Oil", oil], ["Size", amount], ["Ordering", "Add to cart and finish through Telegram"]];
}

function getProductDescription(product, category) {
  const override = getProductOverride(category, product.slug);
  return override?.description || inferDescription(product, category);
}

function getProductFacts(product, category) {
  const override = getProductOverride(category, product.slug);
  return applyFactAdjustments(category, product.slug, override?.facts || inferFacts(product, category));
}

function buildPriceMarkup(product, priceClass) {
  const hasDollarPrice = product.price.trim().startsWith("$");
  if (!hasDollarPrice) {
    return `<span class="${priceClass}">${escapeHtml(product.price)}</span>`;
  }

  const currencyCode = `<span class="align-middle text-xs font-black uppercase tracking-[0.14em] text-white/50">${siteCurrency}</span>`;
  const currentPrice = `<span class="${priceClass}">${escapeHtml(product.price)}</span>`;
  return product.compareAt
    ? `${currencyCode} <span class="line-through">${escapeHtml(product.compareAt)}</span> ${currentPrice}`
    : `${currencyCode} ${currentPrice}`;
}

function buildMinimumMarkup(product, className = "mt-2 text-sm font-black uppercase tracking-[0.12em] text-ink/65") {
  return product.minimumLabel ? `<p class="${className}">${escapeHtml(product.minimumLabel)}</p>` : "";
}

function cartPriceForProduct(product) {
  return product.cartPrice || product.price;
}

function buildHead(title, rootPrefix = "", seo = {}) {
  return `<!-- Page setup: metadata, favicon, stylesheets, and scripts. -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
${buildSeoBlock({ ...seo, title })}
  <script>window.tailwind=window.tailwind||{};window.tailwind.config={theme:{extend:{colors:{night:"#ffffff",ink:"#171111",leaf:"#db0111",ember:"#a8000d",honey:"#ffe9ec"}}}};</script>
  <link rel="icon" type="image/png" href="${rootPrefix}images/${logoFile}?v=${version}">
  <link rel="apple-touch-icon" href="${rootPrefix}images/${logoFile}?v=${version}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="${rootPrefix}css/style.css?v=${version}">
  <link rel="stylesheet" href="${rootPrefix}css/logo-red-theme.css?v=20260424-logo-red">
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="${rootPrefix}js/script.js?v=${version}"></script>
</head>`;
}

function buildHeader(rootPrefix = "") {
  return `  <!-- Site header: promotion bar, logo, navigation, social links, and cart icon. -->
  <header class="site-header sticky top-0 z-50">
    <div class="promo-bar">Grand Opening Sale: 10% off sitewide</div>
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
      <a href="${rootPrefix}home.html" class="brand-mark" aria-label="Trader Growz home"><img src="${rootPrefix}images/${logoFile}?v=${version}" alt="Trader Growz"></a>
      <div class="hidden items-center gap-7 lg:flex">
        <a href="${rootPrefix}home.html" class="nav-link">Home</a>
        <div class="shop-dropdown relative">
          <button type="button" class="nav-link">Shop</button>
          <div class="desktop-dropdown absolute left-0 top-full pt-4"><div class="dropdown-panel p-2">
            <a href="${rootPrefix}flower.html" class="dropdown-item px-4 py-3">Flower</a><a href="${rootPrefix}mushies.html" class="dropdown-item px-4 py-3">Mushies</a><a href="${rootPrefix}concentrates.html" class="dropdown-item px-4 py-3">Concentrates</a><a href="${rootPrefix}edibles.html" class="dropdown-item px-4 py-3">Edibles &amp; Prerolls</a><a href="${rootPrefix}vapes.html" class="dropdown-item px-4 py-3 is-category-hidden" aria-hidden="true" tabindex="-1">Vapes</a><a href="${rootPrefix}dispos.html" class="dropdown-item px-4 py-3">Dispos/Carts</a>
          </div></div>
        </div>
        <a href="${rootPrefix}order.html" class="nav-link">Order</a><a href="${rootPrefix}faqs.html" class="nav-link">FAQs</a><a href="${rootPrefix}contact.html" class="nav-link">Contact Us</a>
      </div>
      <div class="header-social-links ml-auto mr-3 lg:ml-0 lg:mr-0" aria-label="Social links">
        <a href="https://callup.luffa.im/c/ZDpPd114Xwh" target="_blank" rel="noopener" class="social-nav-link" aria-label="Join Luffa"><span class="social-label">Join Luffa</span><span class="social-icon luffa-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M4 6.8A4.8 4.8 0 0 1 8.8 2h6.4A4.8 4.8 0 0 1 20 6.8v4.9a4.8 4.8 0 0 1-4.8 4.8H11l-5.2 4.1v-4.4A4.8 4.8 0 0 1 4 12.5V6.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 8.5h8M8 12h5.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span></a>
        <a href="https://www.instagram.com/tradergrowz?igsh=MXBpcDZqaWVxaHJ5eA==" target="_blank" rel="noopener" class="social-nav-link" aria-label="Follow Trader Growz on Instagram"><span class="social-label">Follow Us</span><span class="social-icon instagram-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.7" cy="7.3" r="1.1" fill="currentColor"/></svg></span></a>
      </div>
      <a href="${rootPrefix}cart.html" class="cart-icon-link mr-3 lg:mr-0" aria-label="View cart"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.4 6h15l-1.7 8.2a2 2 0 0 1-2 1.6H9.1a2 2 0 0 1-2-1.6L5.3 3.8H2.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg><span class="cart-count">0</span></a>
      <button id="mobile-menu-toggle" type="button" class="grid h-11 w-11 place-items-center rounded-lg border border-white/15 lg:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span class="space-y-1.5"><span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span></span></button>
    </nav>
    <!-- Mobile menu: opens from the hamburger button on small screens. -->
    <div id="mobile-menu" class="mobile-menu lg:hidden"><div class="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <a href="${rootPrefix}home.html" class="block py-3 font-bold text-white/80">Home</a>
      <button id="mobile-shop-toggle" type="button" class="flex w-full items-center justify-between py-3 font-bold text-white/80" aria-expanded="false" aria-controls="mobile-shop-panel">Shop<span class="text-leaf">+</span></button>
      <div id="mobile-shop-panel" class="mobile-shop-panel"><div class="grid gap-1 border-l border-white/10 pl-4">
        <a href="${rootPrefix}flower.html" class="py-2 text-white/70">Flower</a><a href="${rootPrefix}mushies.html" class="py-2 text-white/70">Mushies</a><a href="${rootPrefix}concentrates.html" class="py-2 text-white/70">Concentrates</a><a href="${rootPrefix}edibles.html" class="py-2 text-white/70">Edibles &amp; Prerolls</a><a href="${rootPrefix}vapes.html" class="py-2 text-white/70 is-category-hidden" aria-hidden="true" tabindex="-1">Vapes</a><a href="${rootPrefix}dispos.html" class="py-2 text-white/70">Dispos/Carts</a>
      </div></div>
      <a href="${rootPrefix}order.html" class="block py-3 font-bold text-white/80">Order</a><a href="${rootPrefix}faqs.html" class="block py-3 font-bold text-white/80">FAQs</a><a href="${rootPrefix}contact.html" class="block py-3 font-bold text-white/80">Contact Us</a>
    </div></div>
  </header>`;
}

function buildUpdatesBanner() {
  return `    <!-- Updates banner: sends users to the Luffa updates link. -->
    <section class="telegram-band px-4 py-10 sm:px-6 lg:px-8"><div class="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><h2 class="text-2xl font-black text-white sm:text-3xl">Join our Luffa for updates</h2><a href="https://callup.luffa.im/c/ZDpPd114Xwh" target="_blank" rel="noopener" class="btn-primary px-7">Open Luffa</a></div></section>`;
}

function buildNewsletterSection(rootPrefix = "") {
  const slides = sliderImages.map((image) => `<img class="newsletter-collage-img" src="${rootPrefix}${image}" alt="">`).join("");
  return `    <!-- Newsletter section: email signup UI only, no backend submission. -->
    <section class="newsletter-banner px-4 py-16 sm:px-6 lg:px-8"><div class="newsletter-art newsletter-collage" aria-hidden="true"><div class="newsletter-collage-grid">${slides}</div></div><div class="newsletter-content mx-auto max-w-7xl"><div class="max-w-2xl lg:ml-auto"><p class="newsletter-kicker text-sm font-black uppercase">Join our newsletter</p><h2 class="newsletter-title mt-3 text-4xl font-black uppercase leading-tight sm:text-5xl"><span>Discount</span> on Trader Growz drops</h2><p class="newsletter-subtitle mt-5 text-lg font-black uppercase">Get exclusive products!</p><div class="mt-6 flex flex-col gap-3 sm:max-w-xl sm:flex-row"><input type="email" class="newsletter-input flex-1 px-4" placeholder="Email address" aria-label="Email address"><button type="button" class="newsletter-submit px-7">Sign Up</button></div></div></div></section>`;
}

function buildFaqSection() {
  return `    <!-- FAQ section: expandable legal and product questions. -->
    <section class="faq-legal-section px-4 py-16 sm:px-6 lg:px-8"><div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"><div class="faq-copy"><h2>Frequently Asked <span>Questions</span></h2><p>We know hemp laws and THCA can feel like a maze, so here are clear answers about legality, shipping, effects, and what makes our products special.</p></div><div class="faq-accordion"><details><summary>Are THCA Products Legal?<span aria-hidden="true">?</span></summary><p>Hemp-derived THCA products are federally permitted when they comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC by dry weight. Local laws can vary, so always check your state before purchasing.</p></details><details><summary>What is THCA?<span aria-hidden="true">?</span></summary><p>THCA is tetrahydrocannabinolic acid, a naturally occurring cannabinoid found in raw cannabis and hemp. It becomes THC through heat, a process known as decarboxylation.</p></details><details><summary>Is THCA Flower Natural?<span aria-hidden="true">?</span></summary><p>Yes. THCA occurs naturally in the plant before it is heated. Quality THCA flower should be properly cultivated, tested, and handled with care.</p></details><details><summary>Will THCA Get Me High?<span aria-hidden="true">?</span></summary><p>Raw THCA is not the same as active THC. When THCA is heated, it can convert into THC and may produce intoxicating effects.</p></details><details><summary>What is Delta 9?<span aria-hidden="true">?</span></summary><p>Delta-9 THC is the primary psychoactive cannabinoid in cannabis. Hemp products must remain within applicable Delta-9 THC limits to comply with federal hemp rules.</p></details></div></div></section>`;
}

function buildDisclaimerSection() {
  return `    <!-- Legal disclaimer section: THCA and age-use information. -->
    <section class="disclaimer-section px-4 py-12 sm:px-6 lg:px-8"><div class="disclaimer-card mx-auto max-w-7xl"><h2>Disclaimer</h2><h3>Federal Law</h3><p>Consumable THCA products are federally legal and permitted to ship over state lines when they comply with applicable hemp rules.</p><h3>State Law</h3><p>Delta-9 THC products that contain less than 0.3% Delta-9 THC are legal in many states, while some states have banned Delta-8 or placed restrictions on hemp-derived cannabinoids.</p><p>Products containing THCA-derived THC at this concentration are federally legal under the 2018 Farm Bill. Check your local laws before purchasing.</p><h3>Are THCA Products Legal?</h3><p>Yes, THCA products are federally legal under the 2018 Farm Bill when compliant. Some states have made THCA or other cannabinoids illegal, so we do not ship restricted products to those states.</p><h3>What is THCA?</h3><p>THCA stands for tetrahydrocannabinolic acid and is the precursor to THC. When heated, THCA can convert into THC, the main psychoactive compound in cannabis.</p><h3>Disclaimer</h3><p>Please be aware that individual reactions to cannabis can differ significantly. This content is provided only for informational purposes and should not be interpreted as medical guidance. Consult a healthcare professional before using cannabis or THCA-based products, especially for medical purposes. Adults are responsible for understanding and following the laws in their area. Buy and consume at your own risk.</p></div></section>`;
}

function buildFooter(rootPrefix = "") {
  return `  <!-- Site footer: logo, legal notice, and policy links. -->
  <footer class="site-footer px-4 py-8 sm:px-6 lg:px-8"><div class="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><a href="${rootPrefix}home.html" class="brand-mark" aria-label="Trader Growz home"><img src="${rootPrefix}images/${logoFile}?v=${version}" alt="Trader Growz"></a><p class="legal-copy mt-3 max-w-2xl text-sm">This website is intended for 21+ users. All products comply with applicable laws (THCA disclaimer).</p></div><div class="flex flex-wrap gap-4 text-sm"><a href="${rootPrefix}privacy.html" class="footer-link">Privacy Policy</a><a href="${rootPrefix}terms.html" class="footer-link">Terms &amp; Conditions</a><a href="${rootPrefix}return-policy.html" class="footer-link">Return Policy</a><a href="${rootPrefix}shipping.html" class="footer-link">Shipping Disclaimer</a><a href="${rootPrefix}contact.html" class="footer-link">Contact</a></div></div></footer>`;
}

function buildPageShell({ title, page, mainHtml, rootPrefix = "", protectedPage = true, extraBodyAttrs = "", seo = {} }) {
  return `<!DOCTYPE html>
<html lang="en">
${buildHead(title, rootPrefix, seo)}
<!-- Visible page content starts here. -->
<body data-page="${page}"${protectedPage ? ` data-protected="true"` : ""}${rootPrefix ? ` data-root="${rootPrefix}"` : ""}${extraBodyAttrs}>
${buildHeader(rootPrefix)}

  <!-- Main page content. -->
  <main>
${mainHtml}
  </main>

${buildFooter(rootPrefix)}
</body>
</html>
`;
}

function buildInfoCards() {
  return `    <!-- Order steps section: simple process overview. -->
    <section class="section-band px-4 py-16 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><div class="mb-10 max-w-3xl"><p class="badge mb-4 px-3 py-2">How to Order</p><h2 class="text-3xl font-black text-white sm:text-4xl">Fast checkout through Telegram</h2><p class="mt-3 text-white/70">Browse the menu, add them to cart, and send the full cart to Telegram when you are ready to confirm.</p></div><div class="grid gap-6 md:grid-cols-3"><article class="info-card p-6"><p class="text-sm font-black text-leaf">01</p><h3 class="mt-3 text-xl font-black text-white">Browse</h3><p class="mt-2 text-white/70">Move through the categories, open product pages, and add the menu items you want.</p></article><article class="info-card p-6"><p class="text-sm font-black text-ember">02</p><h3 class="mt-3 text-xl font-black text-white">Review Cart</h3><p class="mt-2 text-white/70">Adjust quantities, remove items, and check the order total.</p></article><article class="info-card p-6"><p class="text-sm font-black text-honey">03</p><h3 class="mt-3 text-xl font-black text-white">Confirm</h3><p class="mt-2 text-white/70">Send the full cart to Telegram and finish details in chat.</p></article></div></div></section>`;
}

function buildCategoryPage(category, products) {
  const [label, badge, introTitle, introCopy, heroTitle] = categoryMeta[category];
  const seo = categorySeo[category];
  const cards = products.map((product) => `        <article class="product-card"><a href="products/${category}/${product.slug}.html" class="product-card-link" aria-label="View details for ${escapeHtml(product.title)}"><img src="${product.image}" alt="${escapeHtml(product.alt)}"></a><div class="p-5"><p class="badge mb-3 px-3 py-2">${escapeHtml(product.brand)}</p><h2 class="text-2xl font-black text-white"><a href="products/${category}/${product.slug}.html" class="product-card-link">${escapeHtml(product.title)}</a></h2><p class="mt-3 text-base font-bold text-white/60">${buildPriceMarkup(product, "text-2xl font-black text-leaf")}</p>${buildMinimumMarkup(product)}<button type="button" onclick="addToCart(${cartArg(product.title)}, ${cartArg(cartPriceForProduct(product))})" class="btn-primary mt-5 w-full px-5">Add to Cart</button></div></article>`).join("\n");
  const main = `    <!-- Page hero section: title and intro for this page. -->
    <section class="page-hero px-4 py-20 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><p class="badge mb-4 px-3 py-2">${escapeHtml(label)}</p><h1 class="max-w-3xl text-4xl font-black text-white sm:text-5xl">${escapeHtml(heroTitle)}</h1></div></section>
    <!-- Product listing section: product cards that can be copied to add new products. -->
    <section class="section-band px-4 py-16 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><div class="mb-10 max-w-3xl"><p class="badge mb-4 px-3 py-2">${escapeHtml(badge)}</p><h2 class="text-3xl font-black text-white sm:text-4xl">${escapeHtml(introTitle)}</h2><p class="mt-3 text-white/70">${escapeHtml(introCopy)}</p></div><!-- Product cards start here: copy one article block to add a new product. --><div id="${category}-products" class="product-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-products-per-page="9">${cards}</div><nav id="product-pagination" class="product-pagination" aria-label="${escapeHtml(label)} product pages"></nav></div></section>
${buildUpdatesBanner()}
${buildFaqSection()}
${buildDisclaimerSection()}`;
  return buildPageShell({
    title: seo.title,
    page: category === "dispos-carts" ? "dispos" : category,
    mainHtml: main,
    seo: {
      description: seo.description,
      pathname: topLevelPages[category],
      keywords: [label, badge, introTitle, `${label} California`, `${label} USA`, `${siteName} ${label}`],
      structuredData: [
        buildWebPageSchema(topLevelPages[category], seo.title, seo.description, "CollectionPage"),
        buildCategorySchema(category, products)
      ]
    }
  });
}

function buildProductPage(category, product, products) {
  const label = categoryMeta[category][0];
  const pathname = `products/${category}/${product.slug}.html`;
  const title = `${decodeHtml(product.title)} | ${label} | Trader Growz`;
  const description = getProductSeoDescription(product, category);
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3).map((item) => `        <article class="product-card"><a href="${item.slug}.html" class="product-card-link" aria-label="View details for ${escapeHtml(item.title)}"><img src="${item.relativeImage}" alt="${escapeHtml(item.alt)}"></a><div class="p-5"><p class="badge mb-3 px-3 py-2">${escapeHtml(item.brand)}</p><h2 class="text-xl font-black text-white"><a href="${item.slug}.html" class="product-card-link">${escapeHtml(item.title)}</a></h2><p class="mt-3 text-base font-bold text-white/60">${buildPriceMarkup(item, "text-2xl font-black text-leaf")}</p>${buildMinimumMarkup(item)}<button type="button" onclick="addToCart(${cartArg(item.title)}, ${cartArg(cartPriceForProduct(item))})" class="btn-primary mt-5 w-full px-5">Add to Cart</button></div></article>`).join("\n");
  const facts = getProductFacts(product, category).map(([label, value]) => `            <div class="product-fact"><span class="product-fact-label">${escapeHtml(label)}</span><span class="product-fact-value">${escapeHtml(value)}</span></div>`).join("\n");
  const galleryMarkup = product.relativeGallery?.length
    ? `<div class="mt-6 grid gap-4 sm:grid-cols-2">${product.relativeGallery.map((image, index) => `<div class="surface overflow-hidden p-3"><img src="${image}" alt="${escapeHtml(product.alt)} detail view ${index + 2}" class="w-full rounded-lg object-cover"></div>`).join("")}</div>`
    : "";
  const videoMarkup = product.relativeVideo
    ? `<div class="surface mt-6 overflow-hidden p-4 sm:p-6"><p class="mb-3 text-sm font-black uppercase tracking-[0.2em] text-white/55">Product Video</p><video controls playsinline preload="metadata" poster="${product.relativeImage}" class="w-full rounded-lg bg-black"><source src="${product.relativeVideo}" type="video/mp4">Your browser does not support the video tag.</video></div>`
    : "";
  const mediaMarkup = `<div class="surface overflow-hidden p-4 sm:p-6"><img src="${product.relativeImage}" alt="${escapeHtml(product.alt)}" class="w-full rounded-lg object-cover"></div>${galleryMarkup}${videoMarkup}`;
  const main = `    <!-- Product detail section: main image, pricing, product facts, and cart action. -->
    <section class="product-detail-wrap px-4 py-16 sm:px-6 lg:px-8"><div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div class="product-detail-media">${mediaMarkup}</div><div class="product-detail-copy"><p class="badge mb-4 px-3 py-2">${escapeHtml(product.brand)}</p><h1 class="product-detail-title text-4xl font-black text-white sm:text-5xl">${escapeHtml(product.title)}</h1><p class="product-detail-price mt-5 text-base font-bold text-white/60">${buildPriceMarkup(product, "text-3xl font-black text-leaf")}</p>${buildMinimumMarkup(product, "mt-2 text-sm font-black uppercase tracking-[0.14em] text-ink/65")}<p class="product-detail-description mt-6 text-white/70">${escapeHtml(getProductDescription(product, category))}</p><div class="product-meta-strip mt-8 grid gap-4 sm:grid-cols-2">${facts}</div><div class="product-buy-row mt-8 flex flex-col gap-4 sm:flex-row"><button type="button" onclick="addToCart(${cartArg(product.title)}, ${cartArg(cartPriceForProduct(product))})" class="btn-primary px-7">Add to Cart</button><a href="../../cart.html" class="btn-secondary px-7">View Cart</a></div><p class="mt-5 text-sm font-semibold text-white/55">Reserve ${escapeHtml(product.title)} now and send the finished order through Telegram once your cart is ready.</p><div class="mt-8"><a href="../../${topLevelPages[category]}" class="btn-secondary px-7">Back to ${escapeHtml(categoryMeta[category][0])}</a></div></div></div></section>
    <!-- Related products section: more items from the same category. -->
    <section class="section-band px-4 py-16 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><div class="mb-10 max-w-3xl"><p class="badge mb-4 px-3 py-2">Related Products</p><h2 class="text-3xl font-black text-white sm:text-4xl">Keep the cart moving</h2><p class="mt-3 text-white/70">More picks from the same category so the order stays easy to build.</p></div><div class="product-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${related}</div></div></section>
${buildUpdatesBanner()}
${buildFaqSection()}
${buildDisclaimerSection()}`;
  return buildPageShell({
    title,
    page: "product",
    rootPrefix: "../../",
    mainHtml: main,
    seo: {
      description,
      pathname,
      type: "product",
      image: product.image,
      imageAlt: product.alt,
      price: product.price,
      keywords: [product.title, product.brand, label, `${product.title} California`, `${product.title} USA`, `${siteName} ${label}`],
      structuredData: [
        buildWebPageSchema(pathname, title, description, "ItemPage"),
        buildProductSchema(category, product)
      ]
    }
  });
}

function buildRedirectPage(title, target, rootPrefix = "", canonicalPath = target) {
  return `<!DOCTYPE html>
<html lang="en">
${buildHead(title, rootPrefix, {
  description: pageSeo.redirect.description,
  pathname: canonicalPath,
  robots: "noindex, follow"
})}
<!-- Visible page content starts here. -->
<body data-page="redirect">
  <!-- Redirect section: moves legacy links to the current destination. -->
  <main class="min-h-screen flex items-center justify-center px-4 py-10"><section class="surface max-w-xl p-8 text-center"><p class="badge mb-4 px-3 py-2">Redirecting</p><h1 class="text-3xl font-black text-white">Taking you to the current menu</h1><p class="mt-4 text-white/70">This link now points to the active Trader Growz catalog.</p><a href="${target}" class="btn-primary mt-6 px-7">Continue</a></section></main>
  <script>window.location.replace(${JSON.stringify(target)});</script>
</body>
</html>
`;
}

function buildAgePage() {
  const title = pageSeo.age.title;
  const description = pageSeo.age.description;
  return `<!DOCTYPE html>
<html lang="en">
<!-- Page setup: metadata, favicon, stylesheets, and scripts. -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
${buildSeoBlock({
    title,
    description,
    pathname: "index.html",
    robots: "noindex, follow"
  })}
  <script>
    (function () {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const isAgeVerified = localStorage.getItem("ageVerified") === "true" || sessionStorage.getItem("ageVerified") === "true";

        if (!isLoggedIn) {
          window.location.replace("password.html");
          return;
        }

        if (isAgeVerified) {
          window.location.replace("home.html");
        }
      } catch (error) {
        // Ignore storage errors and let the main script handle access.
      }
    }());
  </script>
  <script>
    window.tailwind = window.tailwind || {}; window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            night: "#ffffff",
            ink: "#171111",
            leaf: "#db0111",
            ember: "#a8000d",
            honey: "#ffe9ec"
          }
        }
      }
    };
  </script>
  <link rel="icon" type="image/png" href="images/${logoFile}?v=${version}">
  <link rel="apple-touch-icon" href="images/${logoFile}?v=${version}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="css/style.css?v=${version}">
  <style>
    :root {
      --tg-age-red: #eb0717;
      --tg-age-red-deep: #a8000d;
      --tg-age-ink: #100c08;
      --tg-age-soft: #fff2f4;
      --tg-age-line: rgba(235, 7, 23, 0.18);
    }

    body[data-page="age"] {
      min-height: 100vh;
      overflow-x: hidden;
      background:
        radial-gradient(circle at 12% 16%, rgba(235, 7, 23, 0.16), transparent 28%),
        radial-gradient(circle at 84% 12%, rgba(168, 0, 13, 0.13), transparent 28%),
        radial-gradient(circle at 75% 88%, rgba(255, 190, 198, 0.34), transparent 28%),
        linear-gradient(135deg, #ffffff 0%, #fff6f7 48%, #ffe7eb 100%) !important;
      color: var(--tg-age-ink) !important;
    }

    body[data-page="age"]::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image:
        linear-gradient(rgba(235, 7, 23, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(235, 7, 23, 0.035) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(circle at center, black 0%, transparent 76%);
    }

    .tg-age-shell {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 28px 16px;
    }

    .tg-age-blob {
      position: fixed;
      width: 340px;
      height: 340px;
      border-radius: 999px;
      pointer-events: none;
      z-index: 0;
      filter: blur(6px);
      opacity: 0.32;
      animation: tgAgeBlob 16s ease-in-out infinite alternate;
    }

    .tg-age-blob.b1 {
      top: -120px;
      left: -90px;
      background: radial-gradient(circle, rgba(235, 7, 23, 0.42), transparent 68%);
    }

    .tg-age-blob.b2 {
      right: -110px;
      top: 10%;
      background: radial-gradient(circle, rgba(168, 0, 13, 0.3), transparent 70%);
      animation-delay: -5s;
    }

    .tg-age-blob.b3 {
      left: 54%;
      bottom: -150px;
      background: radial-gradient(circle, rgba(255, 120, 135, 0.34), transparent 68%);
      animation-delay: -9s;
    }

    @keyframes tgAgeBlob {
      from { transform: translate3d(0, 0, 0) scale(1); }
      to { transform: translate3d(28px, -22px, 0) scale(1.08); }
    }

    .tg-age-leaf {
      position: fixed;
      z-index: 0;
      width: 92px;
      color: rgba(235, 7, 23, 0.12);
      pointer-events: none;
      animation: tgAgeLeafFloat 8s ease-in-out infinite;
    }

    .tg-age-leaf.l1 { top: 8%; left: 8%; transform: rotate(-18deg); }
    .tg-age-leaf.l2 { top: 16%; right: 8%; transform: rotate(18deg); animation-delay: -2s; }
    .tg-age-leaf.l3 { bottom: 10%; left: 10%; transform: rotate(22deg); animation-delay: -4s; }
    .tg-age-leaf.l4 { bottom: 8%; right: 12%; transform: rotate(-24deg); animation-delay: -6s; }

    @keyframes tgAgeLeafFloat {
      0%, 100% { translate: 0 0; opacity: 0.1; }
      50% { translate: 0 -18px; opacity: 0.18; }
    }

    .tg-age-particles {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .tg-age-particle {
      position: absolute;
      bottom: -18px;
      border-radius: 999px;
      background: rgba(235, 7, 23, 0.28);
      animation: tgAgeParticle linear infinite;
    }

    @keyframes tgAgeParticle {
      from { transform: translate3d(0, 0, 0); opacity: 0; }
      12% { opacity: 1; }
      86% { opacity: 0.65; }
      to { transform: translate3d(var(--dx), -112vh, 0); opacity: 0; }
    }

    .tg-age-card-wrap {
      width: min(680px, 100%);
      position: relative;
      opacity: 0;
      transform: translateY(28px) scale(0.97);
      transition:
        opacity 0.78s ease,
        transform 0.88s cubic-bezier(.16,1,.3,1);
    }

    .tg-age-card-wrap.is-ready {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .tg-age-card-wrap::before {
      content: "";
      position: absolute;
      inset: -2px;
      border-radius: 26px;
      background: linear-gradient(135deg, rgba(235, 7, 23, 0.75), rgba(255, 255, 255, 0.64), rgba(168, 0, 13, 0.55));
      opacity: 0.82;
      animation: tgAgeBorderGlow 4.5s ease-in-out infinite;
    }

    @keyframes tgAgeBorderGlow {
      0%, 100% { filter: saturate(1) brightness(1); opacity: 0.68; }
      50% { filter: saturate(1.2) brightness(1.08); opacity: 0.94; }
    }

    .tg-age-card {
      position: relative;
      z-index: 1;
      overflow: hidden;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.86);
      box-shadow:
        0 34px 90px rgba(16, 12, 8, 0.18),
        0 12px 28px rgba(235, 7, 23, 0.12);
      backdrop-filter: blur(18px);
      padding: clamp(28px, 5vw, 48px);
      text-align: center;
    }

    .tg-age-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 50% 0%, rgba(235, 7, 23, 0.13), transparent 42%),
        linear-gradient(120deg, rgba(255, 255, 255, 0.82), transparent 38%);
      pointer-events: none;
    }

    .tg-age-logo-wrap {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      margin-bottom: 18px;
    }

    .tg-age-logo-ring {
      width: 132px;
      height: 132px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: #ffffff;
      box-shadow:
        inset 0 0 0 1px rgba(235, 7, 23, 0.12),
        0 18px 38px rgba(235, 7, 23, 0.16);
      position: relative;
    }

    .tg-age-logo-ring::before {
      content: "";
      position: absolute;
      inset: -9px;
      border-radius: inherit;
      border: 2px solid rgba(235, 7, 23, 0.18);
      border-top-color: rgba(235, 7, 23, 0.72);
      animation: tgAgeSpin 9s linear infinite;
    }

    @keyframes tgAgeSpin { to { transform: rotate(360deg); } }

    .tg-age-logo-ring img {
      width: 96px;
      height: 96px;
      object-fit: contain;
      border-radius: 18px;
      background: #ffffff;
    }

    .tg-age-badge {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 34px;
      padding: 8px 13px;
      border-radius: 999px;
      border: 1px solid rgba(235, 7, 23, 0.2);
      background: rgba(235, 7, 23, 0.08);
      color: var(--tg-age-red-deep);
      font-size: 0.72rem;
      font-weight: 950;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .tg-age-badge svg {
      width: 15px;
      height: 15px;
    }

    .tg-age-title {
      position: relative;
      z-index: 1;
      margin-top: 18px;
      color: var(--tg-age-ink);
      font-size: clamp(2rem, 5vw, 3.35rem);
      line-height: 1.02;
      font-weight: 1000;
      letter-spacing: 0;
    }

    .tg-age-word {
      display: inline-block;
      opacity: 0;
      transform: translateY(18px);
      animation: tgAgeWordIn 0.72s cubic-bezier(.16,1,.3,1) forwards;
    }

    @keyframes tgAgeWordIn {
      to { opacity: 1; transform: translateY(0); }
    }

    .tg-age-subtitle {
      position: relative;
      z-index: 1;
      margin: 14px auto 0;
      max-width: 470px;
      color: rgba(16, 12, 8, 0.66);
      font-size: 1rem;
      font-weight: 800;
      line-height: 1.55;
    }

    .tg-age-form {
      position: relative;
      z-index: 1;
      margin-top: 26px;
      display: grid;
      gap: 16px;
    }

    .tg-age-fields {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }

    .tg-age-field {
      text-align: left;
    }

    .tg-age-label {
      display: block;
      margin-bottom: 8px;
      color: rgba(16, 12, 8, 0.66);
      font-size: 0.78rem;
      font-weight: 950;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .tg-age-select {
      width: 100%;
      min-height: 56px;
      border-radius: 12px;
      border: 2px solid var(--tg-age-line);
      background:
        linear-gradient(45deg, transparent 50%, var(--tg-age-red) 50%) right 18px center / 7px 7px no-repeat,
        linear-gradient(135deg, var(--tg-age-red) 50%, transparent 50%) right 12px center / 7px 7px no-repeat,
        #ffffff;
      color: var(--tg-age-ink);
      padding: 0 42px 0 14px;
      font-size: 1rem;
      font-weight: 950;
      appearance: none;
      outline: none;
      transition:
        transform 0.18s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    .tg-age-select:hover,
    .tg-age-select:focus {
      border-color: rgba(235, 7, 23, 0.54);
      box-shadow: 0 0 0 5px rgba(235, 7, 23, 0.09);
      transform: translateY(-1px);
    }

    .tg-age-remember {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      color: rgba(16, 12, 8, 0.7);
      font-size: 0.9rem;
      font-weight: 900;
    }

    .tg-age-remember input {
      width: 20px;
      height: 20px;
      accent-color: var(--tg-age-red);
    }

    .tg-age-error {
      min-height: 24px;
      margin: 0;
      color: var(--tg-age-red-deep);
      font-weight: 950;
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .tg-age-error.is-shown {
      opacity: 1;
      transform: translateY(0);
    }

    .tg-age-submit {
      position: relative;
      isolation: isolate;
      width: 100%;
      min-height: 58px;
      border: 0;
      border-radius: 14px;
      overflow: hidden;
      background: linear-gradient(120deg, var(--tg-age-red), var(--tg-age-red-deep));
      color: #ffffff;
      font-size: 1rem;
      font-weight: 1000;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      box-shadow:
        0 16px 32px rgba(235, 7, 23, 0.24),
        0 5px 12px rgba(168, 0, 13, 0.14);
      cursor: pointer;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .tg-age-submit::before {
      content: "";
      position: absolute;
      inset: 0 auto 0 -80%;
      width: 54%;
      z-index: -1;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.42), transparent);
      transform: skewX(-18deg);
      animation: tgAgeButtonSweep 3.4s ease-in-out infinite;
    }

    @keyframes tgAgeButtonSweep {
      0%, 42% { left: -80%; }
      70%, 100% { left: 132%; }
    }

    .tg-age-submit:hover,
    .tg-age-submit:focus-visible {
      transform: translateY(-2px);
      box-shadow:
        0 22px 42px rgba(235, 7, 23, 0.28),
        0 8px 16px rgba(168, 0, 13, 0.16);
      outline: none;
    }

    .tg-age-submit.is-loading,
    .tg-age-submit.is-success {
      pointer-events: none;
    }

    .tg-age-submit.is-success {
      background: linear-gradient(120deg, #1f9d55, #137a3f);
      box-shadow: 0 18px 38px rgba(31, 157, 85, 0.28);
    }

    .tg-age-spinner,
    .tg-age-check {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .tg-age-submit.is-loading .tg-age-label-text,
    .tg-age-submit.is-success .tg-age-label-text {
      opacity: 0;
    }

    .tg-age-submit.is-loading .tg-age-spinner,
    .tg-age-submit.is-success .tg-age-check {
      opacity: 1;
    }

    .tg-age-spinner::before {
      content: "";
      width: 22px;
      height: 22px;
      border-radius: 999px;
      border: 3px solid rgba(255, 255, 255, 0.36);
      border-top-color: #ffffff;
      animation: tgAgeSpin 0.75s linear infinite;
    }

    .tg-age-check svg {
      width: 28px;
      height: 28px;
    }

    .tg-age-hint {
      position: relative;
      z-index: 1;
      margin-top: 18px;
      color: rgba(16, 12, 8, 0.5);
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .tg-age-hint .dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      margin: 0 8px;
      border-radius: 999px;
      background: var(--tg-age-red);
      vertical-align: middle;
      animation: tgAgeDotPulse 1.6s ease-in-out infinite;
    }

    @keyframes tgAgeDotPulse {
      0%, 100% { transform: scale(1); opacity: 0.58; }
      50% { transform: scale(1.65); opacity: 1; }
    }

    .tg-age-shake {
      animation: tgAgeShake 0.42s ease;
    }

    @keyframes tgAgeShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-7px); }
      50% { transform: translateX(7px); }
      75% { transform: translateX(-4px); }
    }

    @media (max-width: 640px) {
      .tg-age-fields {
        grid-template-columns: 1fr;
      }

      .tg-age-card {
        border-radius: 20px;
      }

      .tg-age-logo-ring {
        width: 112px;
        height: 112px;
      }

      .tg-age-logo-ring img {
        width: 82px;
        height: 82px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.001s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001s !important;
      }
    }
  </style>
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="js/script.js?v=${version}"></script>
  <link rel="stylesheet" href="css/logo-red-theme.css?v=20260424-logo-red">
</head>
<!-- Visible page content starts here. -->
<body data-page="age" class="tg-age-page">
  <div class="tg-age-blob b1" aria-hidden="true"></div>
  <div class="tg-age-blob b2" aria-hidden="true"></div>
  <div class="tg-age-blob b3" aria-hidden="true"></div>

  <svg class="tg-age-leaf l1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.4 2.5 1.4 4.6 2.7 6.5-1.6-.6-3.1-1-4.6-1.1 1.7 1.6 3 3.5 3.7 5.7-1.7-.8-3.4-1.2-5.1-1.2 1.6 1.5 2.9 3.3 3.6 5.4-1.6-.7-3.2-1-4.7-1 1.7 1.7 3 3.7 3.7 6 .4 1.4 1 2.4 1.7 2.9-.5-1.7-.4-3.2 0-4.6.4 1.4.5 2.9 0 4.6.7-.5 1.3-1.5 1.7-2.9.7-2.3 2-4.3 3.7-6-1.5 0-3.1.3-4.7 1 .7-2.1 2-3.9 3.6-5.4-1.7 0-3.4.4-5.1 1.2.7-2.2 2-4.1 3.7-5.7-1.5.1-3 .5-4.6 1.1C10.6 6.6 11.6 4.5 12 2z"></path></svg>
  <svg class="tg-age-leaf l2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.4 2.5 1.4 4.6 2.7 6.5-1.6-.6-3.1-1-4.6-1.1 1.7 1.6 3 3.5 3.7 5.7-1.7-.8-3.4-1.2-5.1-1.2 1.6 1.5 2.9 3.3 3.6 5.4-1.6-.7-3.2-1-4.7-1 1.7 1.7 3 3.7 3.7 6 .4 1.4 1 2.4 1.7 2.9-.5-1.7-.4-3.2 0-4.6.4 1.4.5 2.9 0 4.6.7-.5 1.3-1.5 1.7-2.9.7-2.3 2-4.3 3.7-6-1.5 0-3.1.3-4.7 1 .7-2.1 2-3.9 3.6-5.4-1.7 0-3.4.4-5.1 1.2.7-2.2 2-4.1 3.7-5.7-1.5.1-3 .5-4.6 1.1C10.6 6.6 11.6 4.5 12 2z"></path></svg>
  <svg class="tg-age-leaf l3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.4 2.5 1.4 4.6 2.7 6.5-1.6-.6-3.1-1-4.6-1.1 1.7 1.6 3 3.5 3.7 5.7-1.7-.8-3.4-1.2-5.1-1.2 1.6 1.5 2.9 3.3 3.6 5.4-1.6-.7-3.2-1-4.7-1 1.7 1.7 3 3.7 3.7 6 .4 1.4 1 2.4 1.7 2.9-.5-1.7-.4-3.2 0-4.6.4 1.4.5 2.9 0 4.6.7-.5 1.3-1.5 1.7-2.9.7-2.3 2-4.3 3.7-6-1.5 0-3.1.3-4.7 1 .7-2.1 2-3.9 3.6-5.4-1.7 0-3.4.4-5.1 1.2.7-2.2 2-4.1 3.7-5.7-1.5.1-3 .5-4.6 1.1C10.6 6.6 11.6 4.5 12 2z"></path></svg>
  <svg class="tg-age-leaf l4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.4 2.5 1.4 4.6 2.7 6.5-1.6-.6-3.1-1-4.6-1.1 1.7 1.6 3 3.5 3.7 5.7-1.7-.8-3.4-1.2-5.1-1.2 1.6 1.5 2.9 3.3 3.6 5.4-1.6-.7-3.2-1-4.7-1 1.7 1.7 3 3.7 3.7 6 .4 1.4 1 2.4 1.7 2.9-.5-1.7-.4-3.2 0-4.6.4 1.4.5 2.9 0 4.6.7-.5 1.3-1.5 1.7-2.9.7-2.3 2-4.3 3.7-6-1.5 0-3.1.3-4.7 1 .7-2.1 2-3.9 3.6-5.4-1.7 0-3.4.4-5.1 1.2.7-2.2 2-4.1 3.7-5.7-1.5.1-3 .5-4.6 1.1C10.6 6.6 11.6 4.5 12 2z"></path></svg>

  <div id="tg-age-particles" class="tg-age-particles" aria-hidden="true"></div>

  <!-- Main page content. -->
  <main class="tg-age-shell">
    <!-- Age verification form: logo, instructions, birthday fields, remember-me, and submit button. -->
    <section class="tg-age-card-wrap" id="tg-age-card-wrap" aria-labelledby="age-title">
      <div class="tg-age-card">
        <div class="tg-age-logo-wrap">
          <div class="tg-age-logo-ring">
            <img src="images/${logoFile}?v=${version}" alt="Trader Growz">
          </div>
        </div>

        <div class="tg-age-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>
          Adult access
        </div>

        <h1 id="age-title" class="tg-age-title" aria-label="Confirm you are 21 or older">
          <span class="tg-age-word" style="animation-delay: 0.10s">Confirm</span>
          <span class="tg-age-word" style="animation-delay: 0.20s">you are</span>
          <span class="tg-age-word" style="animation-delay: 0.30s">21+</span>
        </h1>
        <p class="tg-age-subtitle">Enter your birthday to continue into Trader Growz.</p>

        <form id="age-form" class="tg-age-form" novalidate>
          <div class="tg-age-fields">
            <label class="tg-age-field">
              <span class="tg-age-label">Month</span>
              <select id="birth-month" class="tg-age-select" required>
                <option value="">MM</option>
              </select>
            </label>
            <label class="tg-age-field">
              <span class="tg-age-label">Day</span>
              <select id="birth-day" class="tg-age-select" required>
                <option value="">DD</option>
              </select>
            </label>
            <label class="tg-age-field">
              <span class="tg-age-label">Year</span>
              <select id="birth-year" class="tg-age-select" required>
                <option value="">YYYY</option>
              </select>
            </label>
          </div>

          <label class="tg-age-remember">
            <input id="remember-age" type="checkbox">
            Remember me
          </label>

          <p id="age-error" class="tg-age-error" role="alert" aria-live="polite"></p>

          <button id="tg-age-submit" type="submit" class="tg-age-submit">
            <span class="tg-age-label-text">Enter Site</span>
            <span class="tg-age-spinner" aria-hidden="true"></span>
            <span class="tg-age-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12 10 17 19 7"></polyline></svg>
            </span>
          </button>
        </form>

        <p class="tg-age-hint">Trader Growz <span class="dot"></span> California</p>
      </div>
    </section>
  </main>

  <script>
    (function () {
      const particleHost = document.getElementById("tg-age-particles");
      if (particleHost) {
        const count = window.matchMedia("(max-width: 640px)").matches ? 18 : 38;
        for (let i = 0; i < count; i += 1) {
          const particle = document.createElement("span");
          const size = 3 + Math.random() * 6;
          particle.className = "tg-age-particle";
          particle.style.width = size + "px";
          particle.style.height = size + "px";
          particle.style.left = (Math.random() * 100) + "vw";
          particle.style.setProperty("--dx", ((Math.random() - 0.5) * 220) + "px");
          particle.style.animationDuration = (10 + Math.random() * 14) + "s";
          particle.style.animationDelay = (-Math.random() * 14) + "s";
          particle.style.opacity = String(0.35 + Math.random() * 0.45);
          particleHost.appendChild(particle);
        }
      }

      const cardWrap = document.getElementById("tg-age-card-wrap");
      requestAnimationFrame(function () {
        if (cardWrap) cardWrap.classList.add("is-ready");
      });

      function runGsap() {
        if (typeof window.gsap === "undefined") return;
        const gsap = window.gsap;
        gsap.from(".tg-age-logo-ring", {
          y: -30,
          opacity: 0,
          scale: 0.78,
          duration: 0.9,
          ease: "back.out(1.65)",
          delay: 0.05
        });
        gsap.from(".tg-age-badge", { y: -8, opacity: 0, duration: 0.52, delay: 0.2, ease: "power2.out" });
        gsap.from(".tg-age-subtitle", { y: 12, opacity: 0, duration: 0.56, delay: 0.42, ease: "power2.out" });
        gsap.from(".tg-age-field, .tg-age-remember, .tg-age-submit", {
          y: 16,
          opacity: 0,
          duration: 0.56,
          stagger: 0.07,
          delay: 0.5,
          ease: "power2.out"
        });
        gsap.from(".tg-age-hint", { opacity: 0, duration: 0.6, delay: 1.05, ease: "power2.out" });
      }

      function calculateAge(year, month, day) {
        const today = new Date();
        const birthday = new Date(year, month - 1, day);
        if (
          birthday.getFullYear() !== year ||
          birthday.getMonth() !== month - 1 ||
          birthday.getDate() !== day
        ) {
          return null;
        }
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) age -= 1;
        return age;
      }

      function showAgeError(message) {
        const error = document.getElementById("age-error");
        if (error) {
          error.textContent = message;
          error.classList.add("is-shown");
        }
        if (cardWrap) {
          cardWrap.classList.remove("tg-age-shake");
          void cardWrap.offsetWidth;
          cardWrap.classList.add("tg-age-shake");
        }
      }

      function clearAgeError() {
        const error = document.getElementById("age-error");
        if (error) {
          error.textContent = "";
          error.classList.remove("is-shown");
        }
      }

      function animateSubmitAndRedirect(remember) {
        const submit = document.getElementById("tg-age-submit");
        if (submit) {
          submit.classList.add("is-loading");
          submit.disabled = true;
        }

        window.setTimeout(function () {
          try {
            if (remember) localStorage.setItem("ageVerified", "true");
            else sessionStorage.setItem("ageVerified", "true");
          } catch (error) {
            sessionStorage.setItem("ageVerified", "true");
          }

          if (submit) {
            submit.classList.remove("is-loading");
            submit.classList.add("is-success");
          }
          if (cardWrap) cardWrap.classList.add("is-ready");

          window.setTimeout(function () {
            window.location.replace("home.html");
          }, 520);
        }, 420);
      }

      document.addEventListener("DOMContentLoaded", function () {
        runGsap();

        const form = document.getElementById("age-form");
        const selects = document.querySelectorAll(".tg-age-select");
        selects.forEach(function (select) {
          select.addEventListener("change", clearAgeError);
        });

        const error = document.getElementById("age-error");
        if (error) {
          const observer = new MutationObserver(function () {
            error.classList.toggle("is-shown", Boolean(error.textContent.trim()));
          });
          observer.observe(error, { childList: true, characterData: true, subtree: true });
        }

        if (!form) return;

        form.addEventListener("submit", function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();

          const month = Number(document.getElementById("birth-month").value);
          const day = Number(document.getElementById("birth-day").value);
          const year = Number(document.getElementById("birth-year").value);
          const remember = document.getElementById("remember-age").checked;

          if (!month || !day || !year) {
            showAgeError("Please enter a valid birthday");
            return;
          }

          const age = calculateAge(year, month, day);
          if (age === null) {
            showAgeError("Please enter a valid birthday");
            return;
          }

          if (age < 21) {
            showAgeError("You must be 21+ to access this site");
            return;
          }

          clearAgeError();
          animateSubmitAndRedirect(remember);
        }, true);
      });
    }());
  </script>
</body>
</html>
`;
}

function buildCartPage() {
  const main = `    <!-- Page hero section: title and quick checkout note. -->
    <section class="page-hero px-4 py-20 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><p class="badge mb-4 px-3 py-2">Cart</p><h1 class="max-w-3xl text-4xl font-black text-white sm:text-5xl">Review your cart before checkout</h1><p class="mt-4 max-w-2xl text-white/70">Adjust quantities, keep the order clean, then send the full cart to Telegram in one message.</p></div></section>
    <!-- Cart section: live items, totals, and Telegram checkout action. -->
    <section class="section-band px-4 py-16 sm:px-6 lg:px-8"><div class="mx-auto max-w-5xl"><div class="surface p-6 sm:p-8"><p id="cart-message" class="error-message mb-4"></p><div id="cart-empty" class="text-white/70">Your cart is empty.</div><div id="cart-items" class="grid gap-4"></div><div id="cart-summary" class="mt-8 hidden"><div class="flex items-center justify-between border-t border-white/10 pt-5"><span class="text-lg font-black text-white">Order total</span><span id="cart-total" class="text-2xl font-black text-leaf">$0.00</span></div><div class="mt-6 flex flex-col gap-3 sm:flex-row"><button id="cart-order-button" type="button" class="btn-primary px-7">Order via Telegram</button><button id="cart-clear-button" type="button" class="btn-secondary px-7">Clear Cart</button></div></div></div></div></section>
${buildUpdatesBanner()}
${buildFaqSection()}
${buildDisclaimerSection()}`;
  return buildPageShell({
    title: pageSeo.cart.title,
    page: "cart",
    mainHtml: main,
    seo: {
      description: pageSeo.cart.description,
      pathname: "cart.html",
      robots: "noindex, follow"
    }
  });
}

function buildOrderPage() {
  const main = `    <!-- Page hero section: order overview and intro. -->
    <section class="page-hero px-4 py-20 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><p class="badge mb-4 px-3 py-2">Order</p><h1 class="max-w-3xl text-4xl font-black text-white sm:text-5xl">Order in three quick steps</h1><p class="mt-4 max-w-2xl text-white/70">Browse the menu, add products to cart, and send the full order to Telegram when you are ready.</p></div></section>
${buildInfoCards()}
${buildUpdatesBanner()}
${buildNewsletterSection()}
${buildFaqSection()}
${buildDisclaimerSection()}`;
  return buildPageShell({
    title: pageSeo.order.title,
    page: "order",
    mainHtml: main,
    seo: {
      description: pageSeo.order.description,
      pathname: "order.html",
      structuredData: [buildWebPageSchema("order.html", pageSeo.order.title, pageSeo.order.description)]
    }
  });
}

function buildFaqsPage() {
  const main = `    <!-- Page hero section: FAQs intro copy. -->
    <section class="page-hero px-4 py-20 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><p class="badge mb-4 px-3 py-2">FAQs</p><h1 class="max-w-3xl text-4xl font-black text-white sm:text-5xl">The quick answers page</h1><p class="mt-4 max-w-2xl text-white/70">Everything the current site says about hemp legality, product basics, and how ordering works.</p></div></section>
${buildFaqSection()}
${buildDisclaimerSection()}`;
  return buildPageShell({
    title: pageSeo.faqs.title,
    page: "faqs",
    mainHtml: main,
    seo: {
      description: pageSeo.faqs.description,
      pathname: "faqs.html",
      structuredData: [
        buildWebPageSchema("faqs.html", pageSeo.faqs.title, pageSeo.faqs.description, "FAQPage"),
        buildFaqSchema()
      ]
    }
  });
}

function buildContactPage() {
  const main = `    <!-- Page hero section: contact options and intro. -->
    <section class="page-hero px-4 py-20 sm:px-6 lg:px-8"><div class="mx-auto max-w-7xl"><p class="badge mb-4 px-3 py-2">Contact Us</p><h1 class="max-w-3xl text-4xl font-black text-white sm:text-5xl">Reach Trader Growz on the apps you already use</h1><p class="mt-4 max-w-2xl text-white/70">Tap the card that fits how you want to connect. Telegram is best for orders, Instagram is great for the vibe, and Luffa is where updates land.</p></div></section>
    <!-- Contact cards section: app links for Telegram, Instagram, and Luffa. -->
    <section class="section-band px-4 py-16 sm:px-6 lg:px-8"><div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-3"><a href="https://t.me/JoeTheGrower" target="_blank" rel="noopener" class="contact-card surface p-6"><p class="badge mb-4 px-3 py-2">Telegram</p><h2 class="text-2xl font-black text-white">@JoeTheGrower</h2><p class="mt-3 text-white/70">Best for product questions, cart follow-up, and finishing the order.</p></a><a href="https://www.instagram.com/tradergrowz?igsh=MXBpcDZqaWVxaHJ5eA==" target="_blank" rel="noopener" class="contact-card surface p-6"><p class="badge mb-4 px-3 py-2">Instagram</p><h2 class="text-2xl font-black text-white">Trader Growz</h2><p class="mt-3 text-white/70">Follow the storefront look, community feel, and current brand updates.</p></a><a href="https://callup.luffa.im/c/ZDpPd114Xwh" target="_blank" rel="noopener" class="contact-card surface p-6"><p class="badge mb-4 px-3 py-2">Luffa</p><h2 class="text-2xl font-black text-white">Get updates</h2><p class="mt-3 text-white/70">Join the update flow and stay close to current drops and menu changes.</p></a></div></section>
${buildFaqSection()}
${buildDisclaimerSection()}`;
  return buildPageShell({
    title: pageSeo.contact.title,
    page: "contact",
    mainHtml: main,
    seo: {
      description: pageSeo.contact.description,
      pathname: "contact.html",
      structuredData: [buildWebPageSchema("contact.html", pageSeo.contact.title, pageSeo.contact.description, "ContactPage")]
    }
  });
}

function buildLegalPage(title, badge, heading, paragraphs, pathname, description) {
  const body = paragraphs.map((paragraph) => `<p class="mt-4 text-white/70">${escapeHtml(paragraph)}</p>`).join("");
  const main = `    <!-- Page section: editable content block. -->
    <section class="min-h-screen px-4 py-12 sm:px-6 lg:px-8"><div class="mx-auto max-w-3xl"><div class="surface p-6 sm:p-8"><p class="badge mb-4 px-3 py-2">${escapeHtml(badge)}</p><h1 class="text-3xl font-black text-white">${escapeHtml(heading)}</h1>${body}<a href="home.html" class="btn-primary mt-7 px-7">Back Home</a></div><p class="legal-copy mt-8 text-sm">This website is intended for 21+ users. All products comply with applicable laws (THCA disclaimer).</p></div></section>
${buildFaqSection()}
${buildDisclaimerSection()}`;
  return buildPageShell({
    title,
    page: badge.toLowerCase().replace(/\s+/g, "-"),
    mainHtml: main,
    seo: {
      description: description || compactText(paragraphs.join(" "), 155),
      pathname,
      structuredData: [buildWebPageSchema(pathname, title, description || paragraphs.join(" "))]
    }
  });
}

function parseFlowerProducts(flowerHtml) {
  const output = [];
  const articlePattern = /<article class="product-card">([\s\S]*?)<\/article>/g;
  let match;
  while ((match = articlePattern.exec(flowerHtml)) !== null) {
    const article = match[1];
    const linkMatch = article.match(/href="products\/flower\/([^"]+)\.html"[^>]*><img src="([^"]+)" alt="([^"]+)"/);
    const badgeMatch = article.match(/<p class="badge[^"]*">([\s\S]*?)<\/p>/);
    const titleMatch = article.match(/<h2[\s\S]*?<a[^>]*>([\s\S]*?)<\/a><\/h2>/);
    const compareAtMatch = article.match(/<span class="line-through">([^<]+)<\/span>/);
    const priceMatch = article.match(/<span class="text-2xl font-black text-leaf">([^<]+)<\/span>/);

    if (!linkMatch || !badgeMatch || !titleMatch || !priceMatch) {
      continue;
    }

    output.push({
      slug: linkMatch[1],
      image: linkMatch[2],
      alt: decodeHtml(linkMatch[3]),
      brand: decodeHtml(badgeMatch[1].trim()),
      title: decodeHtml(titleMatch[1].trim()),
      compareAt: compareAtMatch ? compareAtMatch[1].trim() : null,
      price: priceMatch[1].trim()
    });
  }
  return output;
}

function enrichProducts(category, products) {
  return products.map((product, index) => {
    const image = product.image || categoryImages[category][index % categoryImages[category].length];
    const video = product.video || null;
    const gallery = product.gallery || [];
    return {
      ...product,
      image,
      video,
      gallery,
      relativeImage: image.startsWith("images/") ? `../../${image}` : image,
      relativeVideo: video ? (video.startsWith("media/") || video.startsWith("images/") ? `../../${video}` : video) : null,
      relativeGallery: gallery.map((item) => (item.startsWith("images/") || item.startsWith("media/") ? `../../${item}` : item)),
      alt: product.alt || decodeHtml(product.title).replace(/\s*\|\s*/g, " ")
    };
  });
}

function applyProductOverrides(category, products) {
  return products.map((product) => {
    const override = getProductOverride(category, product.slug);
    if (!override) return applyProductAdjustments(category, product);
    const hasOverrideCompareAt = Object.prototype.hasOwnProperty.call(override, "compareAt");
    return applyProductAdjustments(category, {
      ...product,
      title: override.title || product.title,
      brand: override.brand || product.brand,
      compareAt: hasOverrideCompareAt ? override.compareAt : product.compareAt,
      price: override.price || product.price,
      image: override.image || product.image,
      video: override.video || product.video,
      gallery: override.gallery || product.gallery,
      alt: override.alt || product.alt
    });
  });
}

function generateProductsFromSlugs(category, slugs) {
  return enrichProducts(category, slugs.map((slug, index) => {
    const pieces = deriveTitleAndBrand(slug, category);
    const pricing = inferPrice(slug, category);
    const override = getProductOverride(category, slug);
    const hasOverrideCompareAt = override && Object.prototype.hasOwnProperty.call(override, "compareAt");
    const title = override?.title || pieces.title;
    return applyProductAdjustments(category, {
      slug,
      title,
      brand: override?.brand || pieces.brand,
      compareAt: hasOverrideCompareAt ? override.compareAt : pricing.compareAt,
      price: override?.price || pricing.price,
      image: override?.image || categoryImages[category][index % categoryImages[category].length],
      video: override?.video || null,
      gallery: override?.gallery || [],
      alt: override?.alt || title.replace(/\s*\|\s*/g, " ")
    });
  }));
}

function slugsForCategory(category) {
  return fs.readdirSync(path.join(root, "products", category)).filter((name) => name.endsWith(".html")).map((name) => name.replace(/\.html$/, "")).sort();
}

function catalogSlugsForCategory(category) {
  const explicitOrder = categoryProductOrder[category];
  if (!explicitOrder) {
    return slugsForCategory(category).filter((slug) => isActiveProductSlug(category, slug));
  }

  const available = new Set(slugsForCategory(category));
  return explicitOrder.filter((slug) => (available.has(slug) || getProductOverride(category, slug)) && isActiveProductSlug(category, slug));
}

function buildFlowerCatalog(flowerHtml) {
  const baseProducts = applyProductOverrides(
    "flower",
    parseFlowerProducts(flowerHtml).filter((product) => isActiveProductSlug("flower", product.slug))
  );
  const baseSlugs = new Set(baseProducts.map((product) => product.slug));
  const explicitExtraSlugs = (categoryProductOrder.flower || []).filter((slug) => (
    !baseSlugs.has(slug) &&
    getProductOverride("flower", slug) &&
    isActiveProductSlug("flower", slug)
  ));
  return [
    ...enrichProducts("flower", baseProducts),
    ...generateProductsFromSlugs("flower", explicitExtraSlugs)
  ];
}

function restoreCachedPages() {
  const homeHtml = applySeoToExistingPage(
    normalizeSiteLocationContent(normalizeEdiblesCategoryLabel(replaceSharedAssets(readTextWithFallback(cacheHome, path.join(root, "home.html"))))),
    {
      title: pageSeo.home.title,
      description: pageSeo.home.description,
      pathname: "home.html",
      structuredData: [
        buildOrganizationSchema(),
        buildWebsiteSchema(),
        buildWebPageSchema("home.html", pageSeo.home.title, pageSeo.home.description)
      ]
    }
  );
  const flowerHtml = replaceSharedAssets(readTextWithFallback(cacheFlower, path.join(root, "flower.html")));
  const data3 = fs.existsSync(cacheData3) ? readText(cacheData3, "latin1") : null;
  writeFile("home.html", homeHtml);
  writeFile("flower.html", flowerHtml);
  writeFile("index.html", buildAgePage());
  const passwordHtml = applySeoToExistingPage(normalizeSiteLocationContent(getCachedOrLocalPage(data3, "Trader Growz | Password", "password.html")), {
    title: pageSeo.password.title,
    description: pageSeo.password.description,
    pathname: "password.html",
    robots: "index, follow",
    keywords: [
      "Trader Growz California",
      "Trader Growz USA",
      "private THCA menu",
      "THCA menu California",
      "THCA flower California",
      "THCA rosin California",
      "THCA edibles and prerolls California",
      "THCA prerolls California",
      "THCA carts California"
    ],
    structuredData: [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildWebPageSchema("password.html", pageSeo.password.title, pageSeo.password.description)
    ]
  });
  writeFile("password.html", passwordHtml);
  writeFile("password/index.html", addBaseHref(passwordHtml, "../"));
  writeFile("privacy.html", applySeoToExistingPage(normalizeSiteLocationContent(normalizeEdiblesCategoryLabel(getCachedOrLocalPage(data3, "Trader Growz | Privacy Policy", "privacy.html"))), {
    title: pageSeo.privacy.title,
    description: pageSeo.privacy.description,
    pathname: "privacy.html",
    structuredData: [buildWebPageSchema("privacy.html", pageSeo.privacy.title, pageSeo.privacy.description)]
  }));
  return { flowerHtml };
}

function rebuildTopLevel(productCatalog) {
  writeFile("flower.html", buildCategoryPage("flower", productCatalog.flower));
  writeFile("concentrates.html", buildCategoryPage("concentrates", productCatalog.concentrates));
  writeFile("edibles.html", buildCategoryPage("edibles", productCatalog.edibles));
  writeFile("mushies.html", buildCategoryPage("mushies", productCatalog.mushies));
  writeFile("dispos.html", buildCategoryPage("dispos-carts", productCatalog["dispos-carts"]));
  writeFile("cart.html", buildCartPage());
  writeFile("order.html", buildOrderPage());
  writeFile("faqs.html", buildFaqsPage());
  writeFile("contact.html", buildContactPage());
  writeFile("terms.html", buildLegalPage(pageSeo.terms.title, "Terms & Conditions", "Terms & Conditions", ["Trader Growz is a static storefront designed for adults 21 and over. By using the website, you confirm that you meet the required age in your area.", "All product information is presented for menu and ordering purposes only. Final fulfillment details are confirmed directly through Telegram.", "Local laws vary. Customers are responsible for knowing the rules where they live before placing an order."], "terms.html", pageSeo.terms.description));
  writeFile("shipping.html", buildLegalPage(pageSeo.shipping.title, "Shipping Disclaimer", "Shipping Disclaimer", ["Hemp-derived products are offered only where permitted by law. Orders may be declined if a destination falls under a restricted area.", "Shipping timelines can vary based on carrier conditions, order volume, and destination. Exact shipment details are confirmed directly during checkout chat.", "Customers are responsible for making sure products can be received legally at the destination address."], "shipping.html", pageSeo.shipping.description));
  writeFile("return-policy.html", buildLegalPage(pageSeo.returns.title, "Return Policy", "Return Policy", ["Because menu items are consumable, all sales are typically treated as final unless there is a confirmed issue with the received order.", "If there is a product concern, reach out through Telegram with the order details so the situation can be reviewed directly.", "Resolutions are handled case by case based on the order record and product condition."], "return-policy.html", pageSeo.returns.description));
  writeFile("prerolls.html", buildRedirectPage(pageSeo.redirect.title, "dispos.html", "", "dispos.html"));
  writeFile("merch.html", buildRedirectPage(pageSeo.redirect.title, "dispos.html", "", "dispos.html"));
  writeFile("vapes.html", buildRedirectPage(pageSeo.redirect.title, "home.html#shop", "", "home.html"));
}

function rebuildProducts(productCatalog) {
  for (const category of ["flower", "concentrates", "edibles", "mushies", "dispos-carts"]) {
    for (const product of productCatalog[category]) writeFile(`products/${category}/${product.slug}.html`, buildProductPage(category, product, productCatalog[category]));
  }
  for (const slug of slugsForCategory("pre-rolls")) writeFile(`products/pre-rolls/${slug}.html`, buildRedirectPage(pageSeo.redirect.title, "../../dispos.html", "../../", "dispos.html"));
  for (const slug of slugsForCategory("vapes")) writeFile(`products/vapes/${slug}.html`, buildRedirectPage(pageSeo.redirect.title, "../../home.html#shop", "../../", "home.html"));
}

function redirectInactiveProductPages(productCatalog) {
  for (const category of ["flower", "concentrates", "edibles", "mushies", "dispos-carts"]) {
    const activeSlugs = new Set(productCatalog[category].map((product) => product.slug));
    for (const slug of slugsForCategory(category)) {
      if (!activeSlugs.has(slug)) {
        const target = `../../${topLevelPages[category]}`;
        writeFile(`products/${category}/${slug}.html`, buildRedirectPage(pageSeo.redirect.title, target, "../../", topLevelPages[category]));
      }
    }
  }
}

function buildSitemap(productCatalog) {
  const entries = [
    ["password.html", "weekly", "1.0"],
    ["home.html", "daily", "1.0"],
    ["flower.html", "daily", "0.9"],
    ["concentrates.html", "daily", "0.9"],
    ["edibles.html", "daily", "0.9"],
    ["mushies.html", "daily", "0.9"],
    ["dispos.html", "daily", "0.9"],
    ["order.html", "weekly", "0.7"],
    ["faqs.html", "weekly", "0.7"],
    ["contact.html", "monthly", "0.6"],
    ["privacy.html", "yearly", "0.3"],
    ["terms.html", "yearly", "0.3"],
    ["shipping.html", "yearly", "0.3"],
    ["return-policy.html", "yearly", "0.3"]
  ];

  for (const category of ["flower", "concentrates", "edibles", "mushies", "dispos-carts"]) {
    for (const product of productCatalog[category]) {
      entries.push([`products/${category}/${product.slug}.html`, "weekly", "0.8"]);
    }
  }

  const urls = entries.map(([pathname, changefreq, priority]) => `  <url>
    <loc>${escapeXml(absoluteUrl(pathname))}</loc>
    <lastmod>${sitemapDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Allow: /password.html
Allow: /password/
Allow: /sitemap.xml
Allow: /robots.txt

Sitemap: ${absoluteUrl("sitemap.xml")}
`;
}

const { flowerHtml } = restoreCachedPages();
const catalog = {
  flower: buildFlowerCatalog(flowerHtml),
  concentrates: generateProductsFromSlugs("concentrates", catalogSlugsForCategory("concentrates")),
  edibles: generateProductsFromSlugs("edibles", catalogSlugsForCategory("edibles")),
  mushies: generateProductsFromSlugs("mushies", slugsForCategory("mushies")),
  "dispos-carts": generateProductsFromSlugs("dispos-carts", catalogSlugsForCategory("dispos-carts"))
};

rebuildTopLevel(catalog);
rebuildProducts(catalog);
redirectInactiveProductPages(catalog);
writeFile("sitemap.xml", buildSitemap(catalog));
writeFile("robots.txt", buildRobotsTxt());
