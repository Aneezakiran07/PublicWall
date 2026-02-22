import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cvchsjpvszyeryrfffek.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2hzanB2c3p5ZXJ5cmZmZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDk1NTUsImV4cCI6MjA4NzAyNTU1NX0.L2ckyzW9bs88_JTNwesk5Bz7LNYrYRr2-Y9ywoTINjU";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const GIPHY_KEY = import.meta.env.VITE_GIPHY;

const ADJECTIVES = ["Amber","Azure","Breezy","Calm","Coral","Gentle","Golden","Happy","Jolly","Lemon","Mellow","Misty","Pastel","Quiet","Rosy","Sage","Silky","Sleepy","Sunny","Teal","Velvet","Wispy"];
const ANIMALS = ["Bunny","Cat","Crane","Deer","Duck","Fox","Hedgehog","Koala","Otter","Owl","Panda","Penguin","Seal","Sloth","Sparrow","Swan","Wren"];
const MY_NAME = `${ADJECTIVES[Math.floor(Math.random()*ADJECTIVES.length)]} ${ANIMALS[Math.floor(Math.random()*ANIMALS.length)]}`;
const PAGE_THEME_ROW_ID = "global-page-theme";

const FONTS = [
  { label: "Caveat",             value: "'Caveat', cursive" },
  { label: "Kalam",              value: "'Kalam', cursive" },
  { label: "Patrick Hand",       value: "'Patrick Hand', cursive" },
  { label: "Indie Flower",       value: "'Indie Flower', cursive" },
  { label: "Shadows Into Light", value: "'Shadows Into Light', cursive" },
  { label: "Pacifico",           value: "'Pacifico', cursive" },
];

const INK_PRESETS = [
  "#1a1a2e","#c0392b","#154360","#1e8449","#6c3483","#ba4a00",
  "#e91e8c","#00897b","#5c6bc0","#f57f17","#4a148c","#1b5e20",
];

// kawaii sticker packs shown in the sticker picker
const STICKER_PACKS = [
  { label: "😀 Smileys", stickers: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","☺️","😚","😙","🥲","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","🥸","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠️","💩","🤡","👹","👺","👻","👽","👾","🤖"] },
  { label: "👋 People", stickers: ["👋","🤚","🖐️","✋","🖖","👌","🤌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦿","🦵","🦶","👂","🦻","👃","🧠","🫀","🫁","🦷","🦴","👀","👁️","👅","👄","💋","👶","🧒","👦","👧","🧑","👱","👨","🧔","👩","🧓","👴","👵","🙍","🙎","🙅","🙆","💁","🙋","🧏","🙇","🤦","🤷"] },
  { label: "❤️ Hearts", stickers: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❤️‍🔥","❤️‍🩹","❣️","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☪️","🕉️","✡️","🔯","🪯","☯️","☦️","🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","🆔","⚛️","🉑","☢️","☣️","📴","📳","🈶","🈚","🈸","🈺","🈷️","✴️","🆚","💮","🉐","㊙️","㊗️","🈴","🈵","🈹","🈲","🅰️","🅱️","🆎","🆑","🅾️","🆘","❌","⭕","🛑","⛔","📛","🚫","💯","💢","♨️","🚷","🚯","🚳","🚱","🔞","📵","🔕"] },
  { label: "🐱 Animals", stickers: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🪱","🐛","🦋","🐌","🐞","🐜","🪲","🦟","🦗","🕷️","🦂","🐢","🦎","🐍","🐲","🦕","🦖","🐳","🐋","🦈","🦭","🐬","🐟","🐠","🐡","🦐","🦞","🦀","🐙","🦑","🦪","🐚","🐌","🦔","🐾","🐉","🌵","🎄","🌲","🌳","🌴","🪵","🌱","🌿","☘️","🍀","🎍","🪴","🎋","🍃","🍂","🍁","🍄","🌾","💐","🌷","🌹","🥀","🪷","🌺","🌸","🌼","🌻","🌞","🌝","🌛","🌜","🌚","🌕","🌖","🌗","🌘","🌑","🌒","🌓","🌔","🌙","🌟","⭐","🌠","🌌","☀️","⛅","🌤️","🌈","☁️","🌧️","⛈️","🌩️","🌨️","❄️","☃️","⛄","🌊","🌀","🌈"] },
  { label: "🍔 Food", stickers: ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🫑","🧄","🧅","🥔","🍠","🥐","🥯","🍞","🥖","🥨","🧀","🥚","🍳","🧈","🥞","🧇","🥓","🥩","🍗","🍖","🌭","🍔","🍟","🍕","🫓","🥙","🧆","🌮","🌯","🫔","🥗","🥘","🫕","🍝","🍜","🍲","🍛","🍣","🍱","🥟","🦪","🍤","🍙","🍚","🍘","🍥","🥮","🍢","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🌰","🥜","🫘","🍯","🧃","🥤","🧋","☕","🍵","🧉","🍺","🍻","🥂","🍷","🥃","🍸","🍹","🧊","🥄","🍴","🍽️","🥢","🧂"] },
  { label: "⚽ Sports", stickers: ["⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓","🏸","🏒","🥍","🏑","🏏","🪃","🥅","⛳","🪁","🏹","🎣","🤿","🥊","🥋","🎽","🛹","🛼","🛷","⛸️","🥌","🎿","⛷️","🏂","🪂","🏋️","🤼","🤸","⛹️","🤺","🏇","🧘","🏄","🏊","🤽","🚣","🧗","🚵","🚴","🏆","🥇","🥈","🥉","🏅","🎖️","🏵️","🎗️","🎫","🎟️","🎪","🤹","🎭","🩰","🎨","🎬","🎤","🎧","🎼","🎵","🎶","🎸","🥁","🪘","🎹","🪗","🎷","🎺","🎻","🪕","🎮","🕹️","🎲","♟️","🎯","🎳"] },
  { label: "✈️ Travel", stickers: ["🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🛻","🚚","🚛","🚜","🏍️","🛵","🛺","🚲","🛴","🛹","🛼","🚏","🛣️","🛤️","⛽","🚨","🚥","🚦","🛑","⚓","🛟","⛵","🚤","🛥️","🛳️","⛴️","🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀","🛸","🏠","🏡","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪","🏫","🏭","🗼","🗽","⛪","🕌","🛕","🕍","⛩️","🕋","⛲","⛺","🌁","🌃","🏙️","🌄","🌅","🌆","🌇","🌉","♾️","🎠","🎡","🎢","💈","🎪"] },
  { label: "💼 Objects", stickers: ["⌚","📱","💻","⌨️","🖥️","🖨️","🖱️","🖲️","💽","💾","💿","📀","📷","📸","📹","🎥","📽️","🎞️","📞","☎️","📟","📠","📺","📻","🧭","⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","🛢️","💸","💵","💴","💶","💷","🪙","💰","💳","💎","⚖️","🦯","🔧","🔨","⚒️","🛠️","⛏️","🪚","🔩","🪛","🔫","🧲","💣","🪜","🧱","🪞","🪟","🛏️","🛋️","🚪","🪑","🚽","🪠","🚿","🛁","🪤","🧴","🧷","🧹","🧺","🧻","🪣","🧼","🫧","🪥","🧽","🧹","🛒","🚬","⚰️","🪦","⚱️","🗿","🏺","🧿","💈"] },
  { label: "🌸 Japanese", stickers: ["⛩️","🏯","🗼","🗻","🌋","🏔️","🎌","🎎","🎏","🎐","🎑","🎍","🎋","🎴","🀄","🏮","🪭","🧧","🎊","🎉","🎈","🎀","🎁","🎗️","🎟️","🏵️","🌸","🌺","🌻","🌼","🌷","🍡","🍘","🍙","🍚","🍛","🍜","🍝","🍣","🍤","🍥","🍱","🥟","🍢","🍧","🍨","🍦","🍵","🍶","🥢","🔴","⛄","🌊","🐉","🐲","🦊","🐼","🐨","🦋","🌙","⭐","🌟","✨","💫","🔮","🪄","⛎","🎎","👘","🥻","🩱","👗"] },
  { label: "💅 Aesthetic", stickers: ["✨","💫","⭐","🌟","🌸","🌺","🌻","🦋","🌙","☀️","🌈","💎","🔮","🪄","🧿","🕯️","🫧","🌊","🍃","🌿","🍀","🌱","🌾","🌵","🎀","💝","💖","💗","💓","💞","💕","🫶","🤍","🤎","🖤","💜","💙","💚","💛","🧡","❤️","🪷","🌷","🥀","💐","🍄","🌰","🫐","🍓","🍒","🍑","🥭","🍋","🍊","🫶","🙌","👐","🤲","🫂","💆","💅","🧖","🧘","🛁","🕯️","🧸","🪆","🎠","🎡","🫙","🍯","🧋","☕","🍵","🌙","🌛","🌜","🌝","⛅","🌤️","🌧️","❄️","🌨️","☃️"] },
];

const PAGE_THEMES = [
  {
    id: "sakura", label: "桜 Sakura", emoji: "🌸",
    bodyBg: "#fff5f7",
    bodyBgImage: "radial-gradient(ellipse at 10% 20%, rgba(255,182,193,0.5) 0%, transparent 45%), radial-gradient(ellipse at 85% 75%, rgba(255,153,186,0.4) 0%, transparent 45%)",
    style: { background: "#fff5f7", backgroundImage: "radial-gradient(ellipse at 10% 20%, rgba(255,182,193,0.5) 0%, transparent 45%), radial-gradient(ellipse at 85% 75%, rgba(255,153,186,0.4) 0%, transparent 45%), linear-gradient(transparent calc(100% - 1px), rgba(255,160,180,0.4) 100%)", backgroundSize: "100% 100%, 100% 100%, 100% 34px" },
    overlayEmojis: ["🌸","🌸","🌺","🌸","🌸","🌷","🌸","🌼","🌸","🦋","🌸","🌸"],
  },
  {
    id: "washi", label: "和紙 Washi", emoji: "📜",
    bodyBg: "#f5edd8",
    bodyBgImage: "radial-gradient(ellipse at 30% 50%, rgba(210,180,120,0.2) 0%, transparent 60%)",
    style: { background: "#f5edd8", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(160,120,60,0.05) 5px, rgba(160,120,60,0.05) 6px), radial-gradient(ellipse at 30% 50%, rgba(210,180,120,0.2) 0%, transparent 60%)" },
    overlayEmojis: ["🍃","🎋","🍃","📜","🎍","🍵","🎴","🌿","🍂","🎋"],
  },
  {
    id: "shoji", label: "障子 Shoji", emoji: "🏮",
    bodyBg: "#fdf8ee",
    bodyBgImage: "none",
    style: { background: "#fdf8ee", backgroundImage: "linear-gradient(rgba(160,120,60,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(160,120,60,0.2) 1px, transparent 1px)", backgroundSize: "60px 60px" },
    overlayEmojis: ["🏮","🪷","🏮","🎋","🌸","🏮","🪭","🎎","🏮","🕯️"],
  },
  {
    id: "matcha", label: "抹茶 Matcha", emoji: "🍵",
    bodyBg: "#eef4e8",
    bodyBgImage: "radial-gradient(ellipse at 20% 80%, rgba(120,180,80,0.2) 0%, transparent 50%)",
    style: { background: "#eef4e8", backgroundImage: "radial-gradient(ellipse at 20% 80%, rgba(120,180,80,0.2) 0%, transparent 50%), linear-gradient(transparent calc(100% - 1px), rgba(100,160,80,0.3) 100%)", backgroundSize: "100% 100%, 100% 32px" },
    overlayEmojis: ["🍵","🌿","🍃","🌱","🍵","🎋","🌿","🍃","🍵","🌾","🌿","🍃"],
  },
  {
    id: "usagi", label: "うさぎ Bunny", emoji: "🐰",
    bodyBg: "#fdf0f8",
    bodyBgImage: "radial-gradient(circle at 15% 85%, rgba(255,200,230,0.4) 0%, transparent 35%), radial-gradient(circle at 85% 15%, rgba(255,220,240,0.35) 0%, transparent 35%)",
    style: { background: "#fdf0f8", backgroundImage: "radial-gradient(circle at 15% 85%, rgba(255,200,230,0.4) 0%, transparent 35%), radial-gradient(circle at 85% 15%, rgba(255,220,240,0.35) 0%, transparent 35%), linear-gradient(transparent calc(100% - 1px), rgba(255,160,210,0.35) 100%)", backgroundSize: "100% 100%, 100% 100%, 100% 30px" },
    overlayEmojis: ["🐰","🌙","⭐","🐰","✨","🌸","🐇","🌙","⭐","🐰","💫","🌷"],
  },
  {
    id: "nami", label: "波 Waves", emoji: "🌊",
    bodyBg: "#eaf4fb",
    bodyBgImage: "none",
    style: { background: "#eaf4fb", backgroundImage: "repeating-linear-gradient(-30deg, transparent, transparent 18px, rgba(100,170,220,0.12) 18px, rgba(100,170,220,0.12) 20px, transparent 20px, transparent 40px, rgba(70,140,200,0.08) 40px, rgba(70,140,200,0.08) 42px)" },
    overlayEmojis: ["🌊","🐋","🐠","🌊","🐚","🦈","🐬","🌊","🐙","🦑","🐟","🌊"],
  },
  {
    id: "koifish", label: "鯉 Koi Pond", emoji: "🎏",
    bodyBg: "#e8f7f5",
    bodyBgImage: "none",
    style: { background: "#e8f7f5", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(80,160,180,0.08) 20px, rgba(80,160,180,0.08) 22px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(60,140,160,0.06) 20px, rgba(60,140,160,0.06) 22px)" },
    overlayEmojis: ["🎏","🐠","🪷","🎏","🐟","🌊","🪷","🎏","🐡","🌿","🎏","🐠"],
  },
  {
    id: "hanami", label: "花見 Hanami", emoji: "🌺",
    bodyBg: "#fffbf0",
    bodyBgImage: "radial-gradient(ellipse at 0% 0%, rgba(255,200,100,0.2) 0%, transparent 40%)",
    style: { background: "#fffbf0", backgroundImage: "radial-gradient(ellipse at 0% 0%, rgba(255,200,100,0.2) 0%, transparent 40%), linear-gradient(transparent calc(100% - 1px), rgba(220,160,60,0.25) 100%)", backgroundSize: "100% 100%, 100% 38px" },
    overlayEmojis: ["🌺","🍡","🌸","🌺","🏮","🎋","🌸","🍡","🌺","🎑","🌸","🌺"],
  },
  {
    id: "tanuki", label: "たぬき Tanuki", emoji: "🦝",
    bodyBg: "#f5ece0",
    bodyBgImage: "none",
    style: { background: "#f5ece0", backgroundImage: "repeating-linear-gradient(30deg, transparent, transparent 25px, rgba(150,100,50,0.04) 25px, rgba(150,100,50,0.04) 26px)" },
    overlayEmojis: ["🦝","🍂","🌰","🍄","🦝","🍁","🌿","🦔","🍂","🦝","🌰","🍄"],
  },
  {
    id: "mochi", label: "もち Mochi", emoji: "🍡",
    bodyBg: "linear-gradient(135deg, #fde8f5, #e8f0ff, #e8fff5, #fff8e8)",
    bodyBgImage: "none",
    style: { background: "linear-gradient(135deg, #fde8f5, #e8f0ff, #e8fff5, #fff8e8)" },
    overlayEmojis: ["🍡","🍬","🍭","🍡","🧁","🍰","🎂","🍡","🍮","🍭","🍬","🍡"],
  },
  {
    id: "fuji", label: "富士 Mt. Fuji", emoji: "🗻",
    bodyBg: "#eef4fb",
    bodyBgImage: "linear-gradient(180deg, rgba(200,220,255,0.4) 0%, transparent 50%)",
    style: { background: "#eef4fb", backgroundImage: "linear-gradient(180deg, rgba(200,220,255,0.4) 0%, transparent 50%), linear-gradient(transparent calc(100% - 1px), rgba(150,180,220,0.3) 100%)", backgroundSize: "100% 100%, 100% 32px" },
    overlayEmojis: ["🗻","❄️","🦢","🗻","☁️","🌨️","🦅","🗻","❄️","🌙","🦢","🗻"],
  },
  {
    id: "oni", label: "鬼 Oni", emoji: "👹",
    bodyBg: "#1a0808",
    bodyBgImage: "radial-gradient(ellipse at 30% 40%, rgba(180,20,20,0.4) 0%, transparent 50%)",
    style: { background: "#1a0808", backgroundImage: "radial-gradient(ellipse at 30% 40%, rgba(180,20,20,0.4) 0%, transparent 50%), repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(255,50,50,0.04) 9px, rgba(255,50,50,0.04) 10px)" },
    overlayEmojis: ["👹","🔥","👺","👹","💀","⛩️","🔥","👹","🗡️","💢","👺","🔥"], isDark: true,
  },
  {
    id: "mizuiro", label: "水色 Watercolor", emoji: "🎨",
    bodyBg: "#f0f8ff",
    bodyBgImage: "radial-gradient(ellipse at 20% 20%, rgba(150,200,255,0.3) 0%, transparent 40%), radial-gradient(ellipse at 80% 40%, rgba(255,150,200,0.2) 0%, transparent 35%), radial-gradient(ellipse at 40% 80%, rgba(150,255,200,0.2) 0%, transparent 40%)",
    style: { background: "#f0f8ff", backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(150,200,255,0.3) 0%, transparent 40%), radial-gradient(ellipse at 80% 40%, rgba(255,150,200,0.2) 0%, transparent 35%), radial-gradient(ellipse at 40% 80%, rgba(150,255,200,0.2) 0%, transparent 40%)" },
    overlayEmojis: ["🎨","🌈","🪷","🎨","🖌️","✨","🌸","🎨","🌊","🪻","🌈","🎨"],
  },
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function generateEdgePlacements(pool, count = 10) {
  const zones = [
    () => ({ left: Math.round(rand(6, 22)),  top: `${Math.round(rand(8,  42))}%`  }),
    () => ({ left: Math.round(rand(6, 22)),  top: `${Math.round(rand(55, 88))}%`  }),
    () => ({ right: Math.round(rand(6, 22)), top: `${Math.round(rand(8,  42))}%`  }),
    () => ({ right: Math.round(rand(6, 22)), top: `${Math.round(rand(55, 88))}%`  }),
    () => ({ left: Math.round(rand(6, 30)),  top:    Math.round(rand(12, 40))      }),
    () => ({ right: Math.round(rand(6, 30)), top:    Math.round(rand(12, 40))      }),
    () => ({ left: Math.round(rand(6, 30)),  bottom: Math.round(rand(12, 50))      }),
    () => ({ right: Math.round(rand(6, 30)), bottom: Math.round(rand(12, 50))      }),
  ];
  const shuffled = [...zones].sort(() => Math.random() - 0.5);
  return Array.from({ length: count }, (_, i) => ({
    posStyle: shuffled[i % shuffled.length](),
    emoji:    pool[Math.floor(Math.random() * pool.length)],
    size:     Math.round(rand(16, 26)),
    opacity:  parseFloat((rand(25, 50) / 100).toFixed(2)),
    rotate:   Math.round(rand(-20, 20)),
  }));
}

function PageDecorations({ emojis, themeId }) {
  const placements = useMemo(() => generateEdgePlacements(emojis, 10), [themeId]);
  if (!emojis?.length) return null;
  return (
    <>
      {placements.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          ...Object.fromEntries(Object.entries(p.posStyle).map(([k, v]) => [k, typeof v === "number" ? `${v}px` : v])),
          fontSize: `${p.size}px`,
          opacity: p.opacity,
          transform: `rotate(${p.rotate}deg)`,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
          lineHeight: 1,
        }}>
          {p.emoji}
        </div>
      ))}
    </>
  );
}

// draggable + resizable sticker/gif placed on the page
function StickerNode({ sticker, onDelete, onDragEnd, onResize, pageRef }) {
  const wrapRef = useRef(null);
  const dragging = useRef(false);
  const resizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, size: 120 });
  const hasDragged = useRef(false);
  const currentSize = sticker.size || (sticker.type === "sticker" ? 64 : 120);

  const handleMouseDown = (e) => {
    if (e.target.closest(".delete-btn") || e.target.closest(".resize-handle")) return;
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
    hasDragged.current = false;
    const rect = wrapRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    wrapRef.current.style.opacity = "0.75";
    wrapRef.current.style.cursor = "grabbing";
    wrapRef.current.style.zIndex = "999";
    const onMove = (ev) => {
      if (!dragging.current) return;
      hasDragged.current = true;
      const pageRect = pageRef.current.getBoundingClientRect();
      wrapRef.current.style.left = `${ev.clientX - pageRect.left - dragOffset.current.x}px`;
      wrapRef.current.style.top  = `${ev.clientY - pageRect.top  - dragOffset.current.y}px`;
    };
    const onUp = (ev) => {
      if (!dragging.current) return;
      dragging.current = false;
      wrapRef.current.style.opacity = "1";
      wrapRef.current.style.cursor = "";
      wrapRef.current.style.zIndex = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (hasDragged.current) {
        const pageRect = pageRef.current.getBoundingClientRect();
        onDragEnd(sticker.id, ev.clientX - pageRect.left - dragOffset.current.x, ev.clientY - pageRect.top - dragOffset.current.y);
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const handleResizeDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    resizing.current = true;
    resizeStart.current = { mouseX: e.clientX, mouseY: e.clientY, size: currentSize };
    wrapRef.current.style.zIndex = "999";
    const onMove = (ev) => {
      if (!resizing.current) return;
      const dx = ev.clientX - resizeStart.current.mouseX;
      const dy = ev.clientY - resizeStart.current.mouseY;
      const delta = Math.sqrt(dx*dx + dy*dy) * (dx + dy > 0 ? 1 : -1);
      const newSize = Math.max(32, Math.min(400, resizeStart.current.size + delta));
      // update visually without re-render for smoothness
      const inner = wrapRef.current.querySelector(".sticker-gif, .sticker-emoji");
      if (inner) {
        if (sticker.type === "gif") inner.style.width = `${newSize}px`;
        else inner.style.fontSize = `${newSize}px`;
      }
    };
    const onUp = (ev) => {
      if (!resizing.current) return;
      resizing.current = false;
      wrapRef.current.style.zIndex = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      const dx = ev.clientX - resizeStart.current.mouseX;
      const dy = ev.clientY - resizeStart.current.mouseY;
      const delta = Math.sqrt(dx*dx + dy*dy) * (dx + dy > 0 ? 1 : -1);
      const newSize = Math.max(32, Math.min(400, resizeStart.current.size + delta));
      onResize(sticker.id, Math.round(newSize));
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={wrapRef}
      className="sticker-node"
      style={{ left: sticker.position_x, top: sticker.position_y }}
      onMouseDown={handleMouseDown}
      data-sticker-id={sticker.id}
    >
      {sticker.type === "gif" ? (
        <img src={sticker.content} alt="gif" className="sticker-gif" draggable={false} style={{ width: currentSize }} />
      ) : (
        <span className="sticker-emoji" style={{ fontSize: currentSize }}>{sticker.content}</span>
      )}
      <button className="delete-btn" onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(sticker.id); }}>×</button>
      <div className="resize-handle" onMouseDown={handleResizeDown} title="drag to resize">⤡</div>
    </div>
  );
}

// giphy search popup
function GifPicker({ onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", h), 10);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const search = async (q) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(q)}&limit=16&rating=g`);
      const data = await res.json();
      setGifs(data.data || []);
    } catch {
      setGifs([]);
    }
    setLoading(false);
  };

  const searchTrending = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=16&rating=g`);
      const data = await res.json();
      setGifs(data.data || []);
    } catch {
      setGifs([]);
    }
    setLoading(false);
  };

  // load trending on open
  useEffect(() => { searchTrending(); }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    // debounce live search as user types
    clearTimeout(debounceRef.current);
    if (!val.trim()) { searchTrending(); return; }
    debounceRef.current = setTimeout(() => search(val), 400);
  };

  const handleKey = (e) => { if (e.key === "Enter") { clearTimeout(debounceRef.current); search(query); } };

  const handleTag = (t) => { setQuery(t); search(t); };

  return (
    <div ref={ref} className="gif-picker" onClick={(e) => e.stopPropagation()}>
      <p className="picker-label">🎞️ Giphy GIFs</p>
      <div className="gif-search-row">
        <input
          className="gif-search-input"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKey}
          placeholder="search gifs... (type or press Enter)"
          autoFocus
        />
      </div>
      <div className="quick-tags">
        {["kawaii","sakura","cat","bunny","anime","heart","cute","funny"].map((t) => (
          <button key={t} className="quick-tag" onClick={() => handleTag(t)}>{t}</button>
        ))}
      </div>
      {loading ? (
        <div className="gif-loading">loading~</div>
      ) : (
        <div className="gif-grid">
          {gifs.map((g) => (
            <img
              key={g.id}
              src={g.images.fixed_height_small.url}
              alt={g.title}
              className="gif-thumb"
              onClick={() => { onSelect(g.images.fixed_height.url); onClose(); }}
            />
          ))}
          {gifs.length === 0 && <div className="gif-loading">no results 🥺</div>}
        </div>
      )}
      <p style={{ fontSize: 9, color: "#cca0b8", textAlign: "right", marginTop: 4, fontFamily: "'Patrick Hand', cursive" }}>Powered by GIPHY</p>
    </div>
  );
}

// emoji keyword map — emoji → searchable keywords
const EMOJI_KEYWORDS = {
  "😀":"smile happy grin face",
  "😃":"smile happy grin big",
  "😄":"smile happy laugh grin",
  "😁":"grin beam smile happy",
  "😆":"laugh grin happy",
  "😅":"sweat nervous laugh smile",
  "🤣":"rolling laugh funny",
  "😂":"laugh cry tears funny",
  "🙂":"smile slight",
  "🙃":"upside smile",
  "😉":"wink",
  "😊":"smile blush happy",
  "😇":"angel halo smile innocent",
  "🥰":"love hearts smile adore",
  "😍":"heart eyes love",
  "🤩":"star eyes excited wow",
  "😘":"kiss love heart",
  "😗":"kiss",
  "☺️":"smile blush",
  "😚":"kiss closed eyes",
  "😙":"kiss smiling",
  "🥲":"smile tear",
  "😋":"yum tongue food",
  "😛":"tongue silly",
  "😜":"wink tongue crazy",
  "🤪":"crazy silly zany",
  "😝":"tongue eyes closed",
  "🤑":"money greedy",
  "🤗":"hug",
  "🤭":"oops covered mouth",
  "🤫":"shush quiet secret",
  "🤔":"thinking hmm",
  "🤐":"zipper mouth quiet",
  "🤨":"raised eyebrow skeptical",
  "😐":"neutral face",
  "😑":"expressionless",
  "😶":"no mouth silent",
  "😏":"smirk",
  "😒":"unamused unhappy",
  "🙄":"eye roll",
  "😬":"grimace nervous",
  "🤥":"lying pinocchio",
  "😌":"relieved calm",
  "😔":"pensive sad",
  "😪":"sleepy tired",
  "🤤":"drool hungry",
  "😴":"sleep tired zzz",
  "😷":"sick mask ill",
  "🤒":"sick thermometer ill",
  "🤕":"hurt injured",
  "🤢":"nauseous sick green",
  "🤮":"vomit sick disgusted",
  "🤧":"sneeze tissues sick",
  "🥵":"hot sweating",
  "🥶":"cold freezing",
  "🥴":"woozy dizzy",
  "😵":"dizzy dead eyes",
  "🤯":"mind blown explode",
  "🤠":"cowboy hat",
  "🥳":"party celebrate birthday",
  "🥸":"disguise glasses incognito",
  "😎":"cool sunglasses",
  "🤓":"nerd glasses smart",
  "🧐":"monocle smart curious",
  "😕":"confused worried",
  "😟":"worried",
  "🙁":"frown sad",
  "☹️":"frown sad",
  "😮":"surprised open mouth",
  "😯":"hushed surprised",
  "😲":"astonished shocked",
  "😳":"flushed embarrassed",
  "🥺":"pleading puppy eyes sad cute",
  "😦":"frown open mouth",
  "😧":"anguished",
  "😨":"fearful scared",
  "😰":"anxious sweat worried",
  "😥":"sad disappointed",
  "😢":"cry tear sad",
  "😭":"crying sob loud sad",
  "😱":"scream scared horror",
  "😖":"confounded",
  "😣":"persevere struggle",
  "😞":"disappointed sad",
  "😓":"downcast sweat",
  "😩":"weary tired",
  "😫":"tired exhausted",
  "🥱":"yawn tired bored",
  "😤":"steam angry huff",
  "😡":"angry mad pouting",
  "😠":"angry mad",
  "🤬":"angry swear symbols",
  "😈":"devil smiling evil",
  "👿":"angry devil",
  "💀":"skull death dead",
  "☠️":"skull crossbones death",
  "💩":"poop",
  "🤡":"clown",
  "👹":"ogre monster japanese oni",
  "👺":"goblin mask japanese red",
  "👻":"ghost boo halloween",
  "👽":"alien ufo",
  "👾":"alien monster game",
  "🤖":"robot",
  "❤️":"heart love red",
  "🧡":"heart orange",
  "💛":"heart yellow",
  "💚":"heart green",
  "💙":"heart blue",
  "💜":"heart purple",
  "🖤":"heart black",
  "🤍":"heart white",
  "🤎":"heart brown",
  "💔":"broken heart sad",
  "❤️‍🔥":"heart fire passion",
  "❤️‍🩹":"mending healing heart",
  "❣️":"heart exclamation",
  "💕":"two hearts love",
  "💞":"revolving hearts",
  "💓":"beating heart",
  "💗":"growing heart",
  "💖":"sparkling heart",
  "💘":"heart arrow cupid love",
  "💝":"heart ribbon gift love",
  "💟":"heart decoration",
  "🐶":"dog puppy pet",
  "🐱":"cat kitten kitty pet",
  "🐭":"mouse",
  "🐹":"hamster",
  "🐰":"rabbit bunny",
  "🦊":"fox japan kitsune",
  "🐻":"bear",
  "🐼":"panda",
  "🐨":"koala",
  "🐯":"tiger",
  "🦁":"lion",
  "🐮":"cow",
  "🐷":"pig",
  "🐸":"frog",
  "🐵":"monkey",
  "🙈":"see no evil monkey",
  "🙉":"hear no evil monkey",
  "🙊":"speak no evil monkey",
  "🐔":"chicken",
  "🐧":"penguin",
  "🐦":"bird",
  "🐤":"chick baby bird",
  "🦆":"duck",
  "🦅":"eagle",
  "🦉":"owl",
  "🦇":"bat",
  "🐺":"wolf",
  "🐗":"boar pig",
  "🐴":"horse",
  "🦄":"unicorn magic",
  "🐝":"bee honey",
  "🦋":"butterfly pretty",
  "🐛":"caterpillar worm",
  "🐌":"snail slow",
  "🐞":"ladybug red",
  "🐜":"ant",
  "🦟":"mosquito bug",
  "🦗":"cricket bug",
  "🕷️":"spider",
  "🦂":"scorpion",
  "🐢":"turtle slow",
  "🦎":"lizard",
  "🐍":"snake",
  "🐲":"dragon mythical",
  "🦕":"dinosaur",
  "🐳":"whale ocean",
  "🐋":"whale big",
  "🦈":"shark ocean",
  "🦭":"seal",
  "🐬":"dolphin ocean",
  "🐟":"fish",
  "🐠":"tropical fish",
  "🐡":"blowfish",
  "🦐":"shrimp",
  "🦞":"lobster",
  "🦀":"crab",
  "🐙":"octopus",
  "🦑":"squid",
  "🐚":"shell ocean",
  "🦔":"hedgehog spiky",
  "🐾":"paw print animal",
  "🦝":"raccoon tanuki",
  "🦦":"otter water cute",
  "🌸":"sakura cherry blossom pink flower japan",
  "🌺":"hibiscus tropical flower red",
  "🌻":"sunflower yellow",
  "🌹":"rose flower red love",
  "🥀":"wilted rose dead flower",
  "🪷":"lotus flower pink",
  "🌷":"tulip pink flower",
  "🌼":"blossom flower yellow",
  "💐":"bouquet flowers",
  "🍀":"four leaf clover lucky",
  "☘️":"shamrock clover irish",
  "🌱":"seedling plant grow",
  "🌿":"herb leaf plant",
  "🍃":"leaves nature",
  "🍂":"autumn fall leaves orange",
  "🍁":"maple leaf autumn canada",
  "🌲":"evergreen tree",
  "🌳":"tree nature",
  "🌴":"palm tree tropical",
  "🎋":"bamboo japan tanabata",
  "🌵":"cactus desert",
  "🍄":"mushroom",
  "🌾":"sheaf rice grain",
  "🌊":"wave ocean water",
  "🌈":"rainbow colorful",
  "☀️":"sun sunny bright",
  "🌙":"crescent moon night",
  "⭐":"star yellow",
  "🌟":"star glowing bright",
  "✨":"sparkles shine magic twinkle",
  "💫":"star dizzy spinning",
  "🌠":"shooting star wish",
  "❄️":"snowflake cold winter ice",
  "☃️":"snowman winter",
  "🔥":"fire flame hot",
  "🌋":"volcano",
  "🏔️":"mountain snow",
  "🗻":"mount fuji japan mountain",
  "🍡":"dango japanese mochi sweet",
  "🍰":"cake slice birthday",
  "🧁":"cupcake sweet",
  "🍭":"lollipop candy sweet",
  "🍬":"candy sweet",
  "🍫":"chocolate",
  "🍩":"donut sweet",
  "🍪":"cookie sweet baked",
  "🍮":"custard pudding",
  "🎂":"birthday cake celebration",
  "🍕":"pizza",
  "🍔":"burger hamburger",
  "🍟":"fries fast food",
  "🌮":"taco",
  "🍣":"sushi japanese",
  "🍜":"ramen noodle soup japanese",
  "🍝":"pasta spaghetti",
  "🍛":"curry rice",
  "🍱":"bento box japanese",
  "🍵":"green japan matcha tea",
  "☕":"coffee hot drink",
  "🧋":"bubble tea boba",
  "🍶":"sake japanese",
  "🍺":"beer",
  "🍷":"wine",
  "🍓":"strawberry fruit",
  "🍒":"cherry fruit",
  "🍑":"peach fruit",
  "🥭":"mango tropical",
  "🍋":"lemon yellow sour",
  "🍊":"orange fruit",
  "🍇":"grapes purple",
  "🍉":"watermelon summer",
  "🍌":"banana yellow",
  "🫐":"blueberry",
  "🍏":"green apple",
  "🍎":"red apple",
  "⛩️":"torii shrine japan shinto",
  "🏯":"castle japan",
  "🗼":"tokyo tower japan",
  "🎌":"japan flag",
  "🎎":"japanese dolls hina matsuri",
  "🎏":"carp streamer koinobori japan",
  "🎐":"wind chime japan",
  "🎑":"moon viewing tsukimi japan",
  "🎍":"pine decoration japan",
  "🎴":"flower cards hanafuda japan",
  "🀄":"mahjong",
  "🏮":"red lantern japan festival",
  "🪭":"fan japanese",
  "🧧":"red envelope lucky",
  "🐉":"dragon chinese",
  "💎":"diamond gem jewel precious",
  "🔮":"crystal ball magic fortune",
  "🪄":"magic wand spell",
  "🎀":"ribbon bow pink cute",
  "🎁":"gift present wrapped",
  "🎉":"party popper celebrate",
  "🎊":"confetti celebrate party",
  "🎈":"balloon party",
  "🎵":"music note song",
  "🎶":"music notes song",
  "🎸":"guitar music rock",
  "🎹":"piano keyboard music",
  "🎷":"saxophone music jazz",
  "🎺":"trumpet music",
  "🎮":"video game controller",
  "🕹️":"joystick arcade game",
  "🎲":"dice board game",
  "🏆":"trophy winner prize",
  "🥇":"gold medal first",
  "🎨":"art paint palette",
  "🖌️":"paintbrush art",
  "✏️":"pencil write draw",
  "📚":"books study read",
  "💅":"nail polish manicure beauty",
  "🧖":"face mask spa beauty",
  "🧘":"yoga meditate calm",
  "🛁":"bath relax",
  "🕯️":"candle light cozy",
  "🫧":"bubbles soap clean",
  "🧸":"teddy bear cute toy",
  "🪆":"matryoshka doll russian",
  "🪐":"planet saturn space",
  "🚀":"rocket space launch",
  "🌌":"galaxy space stars",
  "🧿":"evil eye protection blue",
  "💈":"barber pole",
  "🎠":"carousel merry go round",
  "🎡":"ferris wheel fun fair",
  "🎢":"roller coaster fun"
};

function searchEmojis(q) {
  const lower = q.toLowerCase().trim();
  if (!lower) return [];
  const all = STICKER_PACKS.flatMap((p) => p.stickers);
  const seen = new Set();
  const results = [];
  for (const s of all) {
    if (seen.has(s)) continue;
    seen.add(s);
    const kw = (EMOJI_KEYWORDS[s] || "").toLowerCase();
    // match keyword OR pack label
    const packLabel = STICKER_PACKS.find((p) => p.stickers.includes(s))?.label.toLowerCase() || "";
    if (kw.includes(lower) || packLabel.includes(lower)) results.push(s);
  }
  return results;
}

// sticker emoji picker popup
function StickerPicker({ onSelect, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", h), 10);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const searchResults = search.trim() ? searchEmojis(search) : null;
  const displayed = searchResults ?? STICKER_PACKS[activeTab].stickers;

  return (
    <div ref={ref} className="sticker-picker" onClick={(e) => e.stopPropagation()}>
      <p className="picker-label">🩷 Emoji Palette</p>
      <input
        className="sticker-search-input"
        placeholder="search: cat, heart, star, sakura..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
      />
      {!search && (
        <div className="sticker-tabs">
          {STICKER_PACKS.map((pack, i) => (
            <button key={i} className={`sticker-tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>
              {pack.label}
            </button>
          ))}
        </div>
      )}
      <div className="sticker-grid">
        {displayed.map((s, i) => (
          <button key={i} className="sticker-btn" title={EMOJI_KEYWORDS[s] || s} onClick={() => { onSelect(s); onClose(); }}>
            {s}
          </button>
        ))}
        {displayed.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "16px", fontFamily: "'Patrick Hand', cursive", fontSize: 12, color: "#b080a0" }}>
            no emojis found 🥺 try: cat, heart, star, flower
          </div>
        )}
      </div>
    </div>
  );
}

function ColorPicker({ color, onChange, onClose }) {
  const [hex, setHex] = useState(color);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", h), 10);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  const handleHex = (v) => { setHex(v); if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v); };
  return (
    <div ref={ref} className="picker-popup" onClick={(e) => e.stopPropagation()}>
      <p className="picker-label">Quick picks</p>
      <div className="swatch-grid">
        {INK_PRESETS.map((c) => (
          <button key={c} className={`swatch${color===c?" active":""}`} style={{ background:c }}
            onClick={() => { onChange(c); setHex(c); }} />
        ))}
      </div>
      <div className="picker-row">
        <input type="color" className="native-color"
          value={hex.startsWith("#")&&hex.length===7?hex:"#000000"}
          onChange={(e) => { setHex(e.target.value); onChange(e.target.value); }} />
        <span style={{ flex:1, fontSize:12, color:"#a07888", fontFamily:"'Patrick Hand',cursive" }}>🎨 All colors</span>
        <input className="hex-input" value={hex} onChange={(e) => handleHex(e.target.value)} placeholder="#000000" maxLength={7} spellCheck={false} />
      </div>
      <div style={{ height:6, borderRadius:4, background:color, border:"1px solid rgba(0,0,0,0.06)", transition:"background 0.15s" }} />
    </div>
  );
}

function FontPicker({ currentFont, onChange, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", h), 10);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return (
    <div ref={ref} className="picker-popup" onClick={(e) => e.stopPropagation()}>
      <p className="picker-label">Choose font</p>
      {FONTS.map((f) => (
        <button key={f.value} className={`font-option${currentFont===f.value?" active":""}`}
          onClick={() => { onChange(f.value); onClose(); }}>
          <span style={{ fontFamily:f.value, fontSize:15, flex:1, textAlign:"left" }}>{f.label}</span>
          <span style={{ fontFamily:f.value, fontSize:12, color:"#b080a0" }}>Hello~</span>
          {currentFont===f.value && <span style={{ color:"#ff6b9d", marginLeft:4 }}>✓</span>}
        </button>
      ))}
    </div>
  );
}

function WritingNode({ writing, isEditing, onDelete, onDragEnd, pageRef }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const saveTimer = useRef(null);
  const isEditingRef = useRef(isEditing);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  useEffect(() => { isEditingRef.current = isEditing; }, [isEditing]);
  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [isEditing]);
  const handleInput = () => {
    const text = ref.current.innerText;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      supabase.from("writings").update({ content: text }).eq("id", writing.id);
    }, 500);
  };
  const handleBlur = () => {
    const text = ref.current?.innerText?.trim();
    clearTimeout(saveTimer.current);
    if (!text) { onDelete(writing.id); }
    else { supabase.from("writings").update({ content: text }).eq("id", writing.id); }
  };
  const handleMouseDown = (e) => {
    if (isEditingRef.current) return;
    if (e.target.closest(".delete-btn")) return;
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
    hasDragged.current = false;
    const rect = wrapRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    wrapRef.current.style.opacity = "0.75";
    wrapRef.current.style.cursor = "grabbing";
    wrapRef.current.style.zIndex = "999";
    const onMove = (ev) => {
      if (!dragging.current) return;
      hasDragged.current = true;
      const pageRect = pageRef.current.getBoundingClientRect();
      wrapRef.current.style.left = `${ev.clientX - pageRect.left - dragOffset.current.x}px`;
      wrapRef.current.style.top  = `${ev.clientY - pageRect.top  - dragOffset.current.y}px`;
    };
    const onUp = (ev) => {
      if (!dragging.current) return;
      dragging.current = false;
      wrapRef.current.style.opacity = "1";
      wrapRef.current.style.cursor = "";
      wrapRef.current.style.zIndex = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (hasDragged.current) {
        const pageRect = pageRef.current.getBoundingClientRect();
        onDragEnd(writing.id, ev.clientX - pageRect.left - dragOffset.current.x, ev.clientY - pageRect.top - dragOffset.current.y);
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };
  return (
    <div ref={wrapRef} className={`writing-node ${isEditing ? "editing" : ""}`}
      style={{ left: writing.position_x, top: writing.position_y, color: writing.font_color, fontFamily: writing.font_style }}
      data-id={writing.id} onMouseDown={handleMouseDown}>
      <div ref={ref} className="writing-node-text" contentEditable={isEditing}
        suppressContentEditableWarning onInput={handleInput}
        onKeyDown={(e) => { if (e.key === "Escape") ref.current.blur(); }}
        onBlur={handleBlur} spellCheck={false}>
        {writing.content}
      </div>
      <button className="delete-btn" onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(writing.id); }}>×</button>
    </div>
  );
}

function ThemeModal({ currentThemeId, onSelect, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">✨ ページのテーマ · Page Theme</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <p className="modal-subtitle">かわいい Japanese styles, Change Theme for everyone 🌸</p>
        <div className="modal-grid">
          {PAGE_THEMES.map((t) => (
            <button key={t.id} className={`theme-card${currentThemeId===t.id?" selected":""}`}
              onClick={() => { onSelect(t.id); onClose(); }}>
              <div className="theme-preview-wrap" style={{ background: t.bodyBg, backgroundImage: t.bodyBgImage === "none" ? undefined : t.bodyBgImage, backgroundSize: "cover" }}>
                <div className="theme-preview-page" style={t.style}>
                  {t.overlayEmojis && (
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, opacity:0.65 }}>
                      {t.overlayEmojis.slice(0,3).join(" ")}
                    </div>
                  )}
                </div>
              </div>
              <span className="theme-card-label">{t.emoji} {t.label}</span>
              {currentThemeId===t.id && <span className="theme-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Notification({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
  return <div className="notif">{message}</div>;
}

export default function App() {
  const [writings, setWritings]           = useState([]);
  const [stickers, setStickers]           = useState([]);
  const [activeInput, setActiveInput]     = useState(null);
  const [inputText, setInputText]         = useState("");
  const [editingId, setEditingId]         = useState(null);
  const [inkColor, setInkColor]           = useState("#1a1a2e");
  const [inkFont,  setInkFont]            = useState(FONTS[0].value);
  const [showColorPicker, setShowColorPicker]   = useState(false);
  const [showFontPicker,  setShowFontPicker]    = useState(false);
  const [showGifPicker,   setShowGifPicker]     = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [pageThemeId, setPageThemeId]     = useState("sakura");
  const [showThemeModal, setShowThemeModal]     = useState(false);
  const [notification, setNotification]   = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [extraHeight, setExtraHeight]     = useState(0);
  const [liveUsers, setLiveUsers]         = useState(0);

  const pageRef        = useRef(null);
  const inputRef       = useRef(null);
  const editingIdRef   = useRef(null);
  const inputTextRef   = useRef("");
  const activeInputRef = useRef(null);
  const inkColorRef    = useRef(inkColor);
  const inkFontRef     = useRef(inkFont);

  useEffect(() => { editingIdRef.current   = editingId;   }, [editingId]);
  useEffect(() => { inputTextRef.current   = inputText;   }, [inputText]);
  useEffect(() => { activeInputRef.current = activeInput; }, [activeInput]);
  useEffect(() => { inkColorRef.current    = inkColor;    }, [inkColor]);
  useEffect(() => { inkFontRef.current     = inkFont;     }, [inkFont]);

  const pageTheme = PAGE_THEMES.find((t) => t.id === pageThemeId) || PAGE_THEMES[0];

  const closeAllPickers = () => {
    setShowColorPicker(false);
    setShowFontPicker(false);
    setShowGifPicker(false);
    setShowStickerPicker(false);
  };

  useEffect(() => {
    document.body.style.transition = "background 0.5s ease";
    document.body.style.background = pageTheme.bodyBg;
    document.body.style.backgroundImage = pageTheme.bodyBgImage === "none" ? "" : pageTheme.bodyBgImage;
  }, [pageTheme.bodyBg, pageTheme.bodyBgImage]);

  // load writings
  useEffect(() => {
    supabase.from("writings").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setWritings(data); });
  }, []);

  // load stickers
  useEffect(() => {
    supabase.from("stickers").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setStickers(data); });
  }, []);

  // load page settings
  useEffect(() => {
    supabase.from("page_settings").select("*").eq("id", PAGE_THEME_ROW_ID).single()
      .then(({ data }) => {
        if (data?.theme_id) setPageThemeId(data.theme_id);
        if (data?.extra_height != null) setExtraHeight(data.extra_height);
        if (!data) {
          supabase.from("page_settings").insert({ id: PAGE_THEME_ROW_ID, theme_id: "sakura", changed_by: MY_NAME, extra_height: 0 });
        }
      });
  }, []);

  // realtime subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("writings-room")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "writings" }, ({ new: row }) => {
        setWritings((prev) => prev.some((w) => w.id === row.id) ? prev : [...prev, row]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "writings" }, ({ new: row }) => {
        setWritings((prev) => prev.map((w) => w.id === row.id ? { ...w, ...row } : w));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "writings" }, ({ old: row }) => {
        setWritings((prev) => prev.filter((w) => w.id !== row.id));
      })
      // sticker realtime
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "stickers" }, ({ new: row }) => {
        setStickers((prev) => prev.some((s) => s.id === row.id) ? prev : [...prev, row]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "stickers" }, ({ new: row }) => {
        setStickers((prev) => prev.map((s) => s.id === row.id ? { ...s, ...row } : s));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "stickers" }, ({ old: row }) => {
        setStickers((prev) => prev.filter((s) => s.id !== row.id));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "page_settings" }, ({ new: row }) => {
        if (row?.theme_id && row?.id === PAGE_THEME_ROW_ID) {
          setTransitioning(true);
          setTimeout(() => { setPageThemeId(row.theme_id); setTransitioning(false); }, 220);
          if (row.extra_height !== undefined) setExtraHeight(row.extra_height);
          if (row.changed_by && row.changed_by !== MY_NAME) {
            const label = PAGE_THEMES.find((t) => t.id === row.theme_id)?.label || row.theme_id;
            setNotification(`${row.changed_by} changed the page to ${label} ✨`);
          }
        }
      })
      .on("presence", { event: "sync" }, () => {
        setLiveUsers(Object.keys(channel.presenceState()).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") await channel.track({ joined_at: Date.now() });
      });
    return () => supabase.removeChannel(channel);
  }, []);

  // click on page to place writing or edit node
  useEffect(() => {
    const handler = (e) => {
      if (!pageRef.current?.contains(e.target)) return;
      const node      = e.target.closest("[data-id]");
      const sticker   = e.target.closest("[data-sticker-id]");
      const toolbar   = e.target.closest(".toolbar");
      const deleteBtn = e.target.closest(".delete-btn");
      const picker    = e.target.closest(".picker-popup, .gif-picker, .sticker-picker");
      if (toolbar || deleteBtn || picker || sticker) return;
      if (node) {
        e.stopPropagation();
        e.preventDefault();
        setEditingId(node.dataset.id);
        setActiveInput(null);
        return;
      }
      setEditingId(null);
      closeAllPickers();
      const rect = pageRef.current.getBoundingClientRect();
      setActiveInput({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
      setInputText("");
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSubmit = async (e) => {
    const text = inputTextRef.current;
    const pos  = activeInputRef.current;
    if (e.key === "Enter" && text.trim() && pos) {
      const writing = {
        content:    text.trim(),
        position_x: Math.min((pos.x / 100) * (pageRef.current?.offsetWidth || 900), (pageRef.current?.offsetWidth || 900) - 160),
        position_y: (pos.y / 100) * (pageRef.current?.scrollHeight || 600),
        font_color:  inkColorRef.current,
        font_style:  inkFontRef.current,
      };
      const { data } = await supabase.from("writings").insert([writing]).select().single();
      if (data) setWritings((prev) => [...prev, data]);
      setActiveInput(null);
      setInputText("");
    }
    if (e.key === "Escape") { setActiveInput(null); setInputText(""); }
  };

  const handleDelete = async (id) => {
    setWritings((prev) => prev.filter((w) => w.id !== id));
    setEditingId(null);
    await supabase.from("writings").delete().eq("id", id);
  };

  const handleDragEnd = async (id, newX, newY) => {
    const pageW    = pageRef.current?.offsetWidth || 900;
    const clampedX = Math.max(0, Math.min(newX, pageW - 160));
    const clampedY = Math.max(0, newY);
    setWritings((prev) => prev.map((w) => w.id === id ? { ...w, position_x: clampedX, position_y: clampedY } : w));
    await supabase.from("writings").update({ position_x: clampedX, position_y: clampedY }).eq("id", id);
  };

  // place a sticker or gif in the center of the current view
  const placeSticker = async (content, type) => {
    const pageRect = pageRef.current?.getBoundingClientRect();
    const scrollY  = window.scrollY;
    const x = (pageRef.current?.offsetWidth || 900) / 2 - 40;
    const y = (scrollY - (pageRect?.top ?? 0) + window.innerHeight / 2) - 40;
    const row = { content, type, position_x: x, position_y: Math.max(20, y) };
    const { data } = await supabase.from("stickers").insert([row]).select().single();
    if (data) setStickers((prev) => [...prev, data]);
  };

  const handleStickerDelete = async (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    await supabase.from("stickers").delete().eq("id", id);
  };

  const handleStickerDragEnd = async (id, newX, newY) => {
    const pageW    = pageRef.current?.offsetWidth || 900;
    const clampedX = Math.max(0, Math.min(newX, pageW - 120));
    const clampedY = Math.max(0, newY);
    setStickers((prev) => prev.map((s) => s.id === id ? { ...s, position_x: clampedX, position_y: clampedY } : s));
    await supabase.from("stickers").update({ position_x: clampedX, position_y: clampedY }).eq("id", id);
  };

  const handleStickerResize = async (id, newSize) => {
    setStickers((prev) => prev.map((s) => s.id === id ? { ...s, size: newSize } : s));
    await supabase.from("stickers").update({ size: newSize }).eq("id", id);
  };

  const currentFontLabel = FONTS.find((f) => f.value === inkFont)?.label || "Caveat";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Kalam:wght@300;400&family=Patrick+Hand&family=Indie+Flower&family=Shadows+Into+Light&family=Pacifico&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center;
          padding: 24px 16px;
          font-family: 'Caveat', cursive;
          transition: background 0.5s ease;
        }

        .toolbar {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,180,210,0.5);
          border-radius: 40px; padding: 0 20px;
          height: 52px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          flex-wrap: nowrap; justify-content: center;
          position: relative; z-index: 1000; overflow: visible;
        }

        .toolbar-title { font-family: 'Caveat', cursive; font-size: 22px; font-weight: 600; color: #4a2838; letter-spacing: -0.5px; white-space: nowrap; }
        .live-badge { background: linear-gradient(135deg,#ff85a2,#ff6b9d); color: white; font-size: 11px; font-family: 'Patrick Hand', cursive; padding: 0 10px; border-radius: 20px; height: 22px; display: flex; align-items: center; white-space: nowrap; }
        .toolbar-divider { width: 1px; height: 20px; background: rgba(255,160,200,0.35); flex-shrink: 0; }
        .toolbar-label { font-size: 11px; color: #c0909c; font-family: 'Patrick Hand', cursive; white-space: nowrap; }

        /* shared pill style for ALL toolbar buttons */
        .tb-btn {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          height: 32px; padding: 0 14px;
          background: rgba(255,240,248,0.9);
          border: 1.5px solid rgba(255,180,210,0.5);
          border-radius: 20px;
          font-family: 'Patrick Hand', cursive; font-size: 13px; color: #8b4060;
          cursor: pointer; white-space: nowrap;
          transition: background 0.15s, transform 0.12s, border-color 0.15s;
          flex-shrink: 0;
        }
        .tb-btn:hover { background: rgba(255,215,235,0.95); border-color: rgba(255,150,190,0.7); }
        .tb-btn.active { background: rgba(255,200,230,0.95); border-color: #ff85a2; }
        .tb-btn.primary { background: linear-gradient(135deg,#ff85a2,#ff6b9d); color: white; border-color: transparent; box-shadow: 0 2px 10px rgba(255,107,157,0.3); }
        .tb-btn.primary:hover { transform: scale(1.04); box-shadow: 0 3px 14px rgba(255,107,157,0.45); }
        .tb-btn.wide { width: 130px; }

        .ink-btn-wrap { position: relative; overflow: visible; display: flex; align-items: center; }
        .ink-btn { width: 28px; height: 28px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 0 0 1.5px rgba(0,0,0,0.15); cursor: pointer; transition: transform 0.15s; flex-shrink: 0; display: block; }
        .ink-btn:hover { transform: scale(1.12); }

        /* keep these wrappers for popup positioning */
        .font-btn-wrap  { position: relative; overflow: visible; display: flex; align-items: center; }
        .media-btn-wrap { position: relative; overflow: visible; display: flex; align-items: center; }
        .page-btns      { display: flex; align-items: center; gap: 6px; }

        /* pickers shared */
        .picker-popup {
          position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%);
          background: #fffbf8; border: 1px solid rgba(255,180,210,0.5);
          border-radius: 16px; padding: 14px;
          box-shadow: 0 12px 40px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 9999; width: 220px; animation: popIn 0.15s ease;
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .picker-label { display: block; font-family: 'Patrick Hand', cursive; font-size: 11px; color: #b080a0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .swatch-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 12px; }
        .swatch { width: 26px; height: 26px; border-radius: 50%; border: 2.5px solid transparent; cursor: pointer; transition: transform 0.12s; }
        .swatch:hover { transform: scale(1.2); }
        .swatch.active { border-color: #ff6b9d; transform: scale(1.12); }
        .picker-row { display: flex; align-items: center; gap: 8px; border-top: 1px solid rgba(255,200,220,0.4); padding-top: 10px; margin-bottom: 8px; }
        .native-color { width: 32px; height: 32px; border: 2px solid rgba(255,180,210,0.5); border-radius: 8px; padding: 2px; cursor: pointer; background: none; flex-shrink: 0; }
        .hex-input { width: 68px; font-family: monospace; font-size: 11px; border: 1.5px solid rgba(255,180,210,0.5); border-radius: 8px; padding: 3px 6px; color: #4a2838; outline: none; background: white; }
        .hex-input:focus { border-color: #ff85a2; }
        .font-option { display: flex; align-items: center; width: 100%; background: none; border: 1.5px solid transparent; border-radius: 10px; padding: 7px 8px; cursor: pointer; text-align: left; }
        .font-option:hover { background: rgba(255,210,230,0.3); }
        .font-option.active { border-color: #ff85a2; background: rgba(255,210,230,0.2); }

        /* gif picker */
        .gif-picker {
          position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%);
          background: #fffbf8; border: 1px solid rgba(255,180,210,0.5);
          border-radius: 16px; padding: 14px;
          box-shadow: 0 12px 40px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 9999; width: 300px; animation: popIn 0.15s ease;
        }
        .gif-search-row { display: flex; gap: 6px; margin-bottom: 8px; }
        .gif-search-input { flex: 1; border: 1.5px solid rgba(255,180,210,0.5); border-radius: 10px; padding: 4px 10px; font-family: 'Patrick Hand', cursive; font-size: 12px; color: #4a2838; outline: none; background: white; }
        .gif-search-input:focus { border-color: #ff85a2; }
        .gif-search-btn { background: linear-gradient(135deg,#ff85a2,#ff6b9d); color: white; border: none; border-radius: 10px; padding: 4px 12px; font-family: 'Patrick Hand', cursive; font-size: 12px; cursor: pointer; }
        .quick-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
        .quick-tag { background: rgba(255,220,238,0.8); border: 1px solid rgba(255,180,210,0.4); border-radius: 20px; padding: 2px 8px; font-family: 'Patrick Hand', cursive; font-size: 10px; color: #8b4060; cursor: pointer; }
        .quick-tag:hover { background: rgba(255,180,220,0.8); }
        .gif-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; max-height: 200px; overflow-y: auto; }
        .gif-thumb { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 6px; cursor: pointer; transition: transform 0.12s; }
        .gif-thumb:hover { transform: scale(1.06); }
        .gif-loading { font-family: 'Patrick Hand', cursive; font-size: 12px; color: #b080a0; text-align: center; padding: 20px 0; }

        /* sticker picker */
        .sticker-picker {
          position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%);
          background: #fffbf8; border: 1px solid rgba(255,180,210,0.5);
          border-radius: 16px; padding: 14px;
          box-shadow: 0 12px 40px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 9999; width: 340px; animation: popIn 0.15s ease;
        }
        .sticker-search-input { width: 100%; border: 1.5px solid rgba(255,180,210,0.5); border-radius: 10px; padding: 5px 10px; font-family: 'Patrick Hand', cursive; font-size: 12px; color: #4a2838; outline: none; background: white; margin-bottom: 8px; }
        .sticker-search-input:focus { border-color: #ff85a2; }
        .sticker-tabs { display: flex; gap: 4px; margin-bottom: 8px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; }
        .sticker-tabs::-webkit-scrollbar { display: none; }
        .sticker-tab { background: rgba(255,220,238,0.6); border: 1px solid rgba(255,180,210,0.3); border-radius: 20px; padding: 3px 10px; font-family: 'Patrick Hand', cursive; font-size: 11px; color: #8b4060; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
        .sticker-tab:hover { background: rgba(255,180,220,0.7); }
        .sticker-tab.active { background: linear-gradient(135deg,#ff85a2,#ff6b9d); color: white; border-color: transparent; }
        .sticker-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 2px; max-height: 220px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(255,150,190,0.4) transparent; }
        .sticker-btn { background: none; border: 1.5px solid transparent; border-radius: 8px; padding: 4px; font-size: 22px; cursor: pointer; transition: transform 0.12s, border-color 0.12s; text-align: center; line-height: 1; }
        .sticker-btn:hover { transform: scale(1.3); border-color: rgba(255,180,210,0.5); background: rgba(255,220,238,0.5); }

        /* sticker node on page */
        .sticker-node { position: absolute; cursor: grab; z-index: 10; user-select: none; animation: inkDrop 0.25s ease-out; display: inline-block; }
        .sticker-emoji { line-height: 1; display: block; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15)); }
        .sticker-gif { border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.15); display: block; }
        .resize-handle { position: absolute; bottom: -8px; right: -8px; width: 18px; height: 18px; background: linear-gradient(135deg,#ff85a2,#ff6b9d); border-radius: 50%; display: none; align-items: center; justify-content: center; font-size: 10px; color: white; cursor: se-resize; z-index: 20; box-shadow: 0 1px 4px rgba(0,0,0,0.2); user-select: none; line-height: 1; }
        .sticker-node:hover .resize-handle { display: flex; }

        /* page & writing nodes */
        .page-wrapper { position: relative; width: 100%; min-height: 80vh; }

        .notebook-page {
          position: relative; width: 100%; min-height: 100vh;
          box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 10px 40px rgba(0,0,0,0.12), 4px 0 0 rgba(0,0,0,0.06), -2px 0 0 rgba(255,255,255,0.4);
          cursor: crosshair; overflow: hidden;
          transition: opacity 0.22s ease, filter 0.22s ease;
          padding-bottom: 200px;
        }
        .notebook-page.transitioning { opacity: 0; filter: blur(8px); }

        .writing-node { position: absolute; z-index: 10; cursor: grab; animation: inkDrop 0.3s ease-out; user-select: none; max-width: min(380px, calc(100% - 20px)); }
        .writing-node.editing { cursor: text; }
        .writing-node-text { display: block; font-size: 20px; line-height: 1.4; white-space: pre-wrap; word-break: break-word; width: 100%; outline: none; border-radius: 2px; padding: 1px 3px; transition: background 0.15s; text-shadow: 0 1px 1px rgba(255,255,255,0.3); min-height: 1.2em; min-width: 4px; }
        .writing-node:not(.editing):hover .writing-node-text { background: rgba(255,230,80,0.3); }
        .writing-node.editing .writing-node-text { background: rgba(255,255,255,0.7); box-shadow: 0 0 0 1.5px rgba(100,150,255,0.4); user-select: text; caret-color: currentColor; text-shadow: none; }

        .delete-btn { position: absolute; top: -8px; right: -8px; width: 18px; height: 18px; border-radius: 50%; background: #e74c3c; color: white; border: none; font-size: 14px; line-height: 1; cursor: pointer; display: none; align-items: center; justify-content: center; z-index: 20; padding: 0; }
        .writing-node:hover .delete-btn,
        .sticker-node:hover .delete-btn { display: flex; }

        @keyframes inkDrop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .active-input-wrapper { position: absolute; transform: translateY(-50%); z-index: 20; }
        .active-input { background: transparent; border: none; border-bottom: 2px dashed currentColor; outline: none; font-size: 20px; min-width: 200px; max-width: 400px; padding: 0 2px; font-family: inherit; color: inherit; }
        .active-input::placeholder { opacity: 0.5; font-size: 15px; }

        .modal-backdrop { position: fixed; inset: 0; background: rgba(20,0,10,0.45); z-index: 2000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); animation: fadeIn 0.15s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal { background: #fffbf8; border-radius: 22px; width: min(760px, 96vw); max-height: 88vh; overflow-y: auto; box-shadow: 0 24px 70px rgba(255,107,157,0.2), 0 8px 20px rgba(0,0,0,0.12); animation: slideUp 0.22s ease; border: 1px solid rgba(255,180,200,0.5); }
        @keyframes slideUp { from { transform: translateY(28px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 22px 26px 10px; position: sticky; top: 0; background: #fffbf8; z-index: 2; border-bottom: 1px solid rgba(255,180,200,0.3); }
        .modal-title { font-family: 'Caveat', cursive; font-size: 22px; font-weight: 600; color: #4a2838; }
        .modal-subtitle { font-family: 'Patrick Hand', cursive; font-size: 13px; color: #b06080; padding: 8px 26px 4px; }
        .modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: #c07090; padding: 4px 8px; border-radius: 10px; }
        .modal-close:hover { background: rgba(255,180,200,0.3); }
        .modal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; padding: 16px 24px 28px; }

        .theme-card { display: flex; flex-direction: column; align-items: center; gap: 8px; background: none; border: 2.5px solid transparent; border-radius: 16px; padding: 8px; cursor: pointer; transition: border-color 0.15s, transform 0.15s; position: relative; }
        .theme-card:hover { border-color: #ffb0c8; transform: translateY(-3px) scale(1.03); }
        .theme-card.selected { border-color: #ff6b9d; box-shadow: 0 0 0 3px rgba(255,107,157,0.18); }
        .theme-preview-wrap { width: 100%; aspect-ratio: 4/3; border-radius: 10px; border: 1px solid rgba(0,0,0,0.07); overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; padding: 8px; background-size: cover; }
        .theme-preview-page { width: 80%; height: 80%; border-radius: 5px; position: relative; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .theme-card-label { font-family: 'Patrick Hand', cursive; font-size: 11px; color: #4a2838; text-align: center; line-height: 1.4; }
        .theme-check { position: absolute; top: 5px; right: 5px; width: 20px; height: 20px; background: linear-gradient(135deg,#ff85a2,#ff6b9d); color: white; border-radius: 50%; font-size: 11px; display: flex; align-items: center; justify-content: center; }

        .notif { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); background: rgba(60,10,30,0.92); color: #ffeaf4; font-family: 'Patrick Hand', cursive; font-size: 14px; padding: 11px 24px; border-radius: 30px; box-shadow: 0 4px 24px rgba(255,107,157,0.35); z-index: 3000; white-space: nowrap; pointer-events: none; animation: notifIn 0.3s ease, notifOut 0.4s ease 3.1s forwards; }
        @keyframes notifIn  { from { opacity: 0; transform: translateX(-50%) translateY(14px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes notifOut { from { opacity: 1; } to { opacity: 0; transform: translateX(-50%) translateY(14px); } }
      `}</style>

      <div className="toolbar">
        <span className="toolbar-title">📓 shared notebook</span>
        <span className="live-badge">● {liveUsers} online</span>

        <div className="toolbar-divider" />
        <span className="toolbar-label">Ink</span>
        <div className="ink-btn-wrap">
          <button className="ink-btn" style={{ background: inkColor }}
            onClick={(e) => { e.stopPropagation(); closeAllPickers(); setShowColorPicker((v) => !v); }} />
          {showColorPicker && <ColorPicker color={inkColor} onChange={setInkColor} onClose={() => setShowColorPicker(false)} />}
        </div>

        <div className="toolbar-divider" />
        <span className="toolbar-label">Font</span>
        <div className="font-btn-wrap">
          <button className="tb-btn wide" onClick={(e) => { e.stopPropagation(); closeAllPickers(); setShowFontPicker((v) => !v); }}>
            <span style={{ fontFamily: inkFont, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{currentFontLabel}</span>
            <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
          </button>
          {showFontPicker && <FontPicker currentFont={inkFont} onChange={setInkFont} onClose={() => setShowFontPicker(false)} />}
        </div>

        <div className="toolbar-divider" />
        <div className="media-btn-wrap">
          <button className={`tb-btn${showStickerPicker ? " active" : ""}`}
            onClick={(e) => { e.stopPropagation(); closeAllPickers(); setShowStickerPicker((v) => !v); }}>
            🩷 Stickers
          </button>
          {showStickerPicker && <StickerPicker onSelect={(s) => placeSticker(s, "sticker")} onClose={() => setShowStickerPicker(false)} />}
        </div>

        <div className="media-btn-wrap">
          <button className={`tb-btn${showGifPicker ? " active" : ""}`}
            onClick={(e) => { e.stopPropagation(); closeAllPickers(); setShowGifPicker((v) => !v); }}>
            🎞️ GIFs
          </button>
          {showGifPicker && <GifPicker onSelect={(url) => placeSticker(url, "gif")} onClose={() => setShowGifPicker(false)} />}
        </div>

        <div className="toolbar-divider" />
        <div className="page-btns">
          <button className="tb-btn primary" onClick={(e) => { e.stopPropagation(); setShowThemeModal(true); }}>
            🌸 Change Page
          </button>
          <button className="tb-btn"
            onClick={async (e) => {
              e.stopPropagation();
              const newH = extraHeight + 600;
              setExtraHeight(newH);
              await supabase.from("page_settings").upsert({ id: PAGE_THEME_ROW_ID, theme_id: pageThemeId, changed_by: MY_NAME, extra_height: newH, updated_at: new Date().toISOString() });
            }}>
            📄 Add Page
          </button>
        </div>
      </div>

      <div className="page-wrapper">
        <div
          className={`notebook-page${transitioning ? " transitioning" : ""}`}
          ref={pageRef}
          style={{ ...pageTheme.style, minHeight: `calc(100vh + ${extraHeight}px)` }}
        >
          <PageDecorations emojis={pageTheme.overlayEmojis} themeId={pageThemeId} />

          {writings.map((w) => (
            <WritingNode key={w.id} writing={w} isEditing={editingId === w.id}
              onDelete={handleDelete} onDragEnd={handleDragEnd} pageRef={pageRef} />
          ))}

          {stickers.map((s) => (
            <StickerNode key={s.id} sticker={s}
              onDelete={handleStickerDelete} onDragEnd={handleStickerDragEnd} onResize={handleStickerResize} pageRef={pageRef} />
          ))}

          {activeInput && (
            <div className="active-input-wrapper"
              style={{ left:`${(activeInput.x/100)*(pageRef.current?.offsetWidth||900)}px`, top:`${(activeInput.y/100)*(pageRef.current?.scrollHeight||600)}px`, color:inkColor, fontFamily:inkFont }}>
              <input ref={inputRef} className="active-input" value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleSubmit} placeholder="type & press Enter..."
                style={{ color:inkColor, fontFamily:inkFont }} />
            </div>
          )}
        </div>
      </div>

      {showThemeModal && (
        <ThemeModal currentThemeId={pageThemeId}
          onSelect={async (id) => {
            setTransitioning(true);
            setTimeout(() => { setPageThemeId(id); setTransitioning(false); }, 220);
            await supabase.from("page_settings").upsert({ id: PAGE_THEME_ROW_ID, theme_id: id, changed_by: MY_NAME, extra_height: extraHeight, updated_at: new Date().toISOString() });
          }}
          onClose={() => setShowThemeModal(false)}
        />
      )}
      {notification && <Notification message={notification} onDone={() => setNotification(null)} />}
    </>
  );
}
