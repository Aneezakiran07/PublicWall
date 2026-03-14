import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { ssrDynamicImportKey } from "vite/runtime";

const GIPHY_KEY = import.meta.env.VITE_GIPHY;
const SUPABASE_URL = import.meta.env.VITE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_ANON;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

const PEN_COLORS = [
  "#1a1a2e","#e74c3c","#e67e22","#f1c40f","#2ecc71","#3498db",
  "#9b59b6","#ff6b9d","#1abc9c","#e91e8c","#ffffff","#000000",
];

const REACTION_EMOJIS = ["❤️", "🔥", "✨", "😂", "🥺", "👏"];

const LOFI_TRACKS = [
  { url: "https://stream.nightride.fm/nightride.mp3",  label: "nightride fm" },
  { url: "https://stream.nightride.fm/chillsynth.mp3", label: "chillsynth fm" },
  { url: "https://stream.nightride.fm/datawave.mp3",   label: "datawave fm" },
  { url: "https://stream.nightride.fm/spacesynth.mp3", label: "spacesynth fm" },
];

const STICKER_PACKS = [
  { label: "😀 Smileys", stickers: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","☺️","😚","😙","🥲","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","🥸","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠️","💩","🤡","👹","👺","👻","👽","👾","🤖"] },
  { label: "👋 People", stickers: ["👋","🤚","🖐️","✋","🖖","👌","🤌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦿","🦵","🦶","👂","🦻","👃","🧠","🫀","🫁","🦷","🦴","👀","👁️","👅","👄","💋","👶","🧒","👦","👧","🧑","👱","👨","🧔","👩","🧓","👴","👵","🙍","🙎","🙅","🙆","💁","🙋","🧏","🙇","🤦","🤷"] },
  { label: "❤️ Hearts", stickers: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❤️‍🔥","❤️‍🩹","❣️","💕","💞","💓","💗","💖","💘","💝","💟","🫶","💑","💏","🥰","😍","😘","💌","💋","🌹","🥀","🌸","🌺","🌻","🌼","🌷","🎀","🎊","🎉","🎈","✨","💫","⭐","🌟","🌙","☀️","🌈","🎆","🎇","🧨","🎁","🎗️","🏵️"] },
  { label: "🐱 Animals", stickers: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🦋","🐌","🐞","🐜","🐢","🦎","🐍","🐲","🦕","🦖","🐳","🐋","🦈","🦭","🐬","🐟","🐠","🐡","🐙","🦑","🦪","🐚","🦔","🦊","🐾","🌵","🎄","🌲","🌳","🌴","🌱","🌿","☘️","🍀","🌾","💐","🌷","🌹","🥀","🌺","🌸","🌼","🌻"] },
  { label: "🍔 Food", stickers: ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🧄","🧅","🥔","🍠","🥐","🥯","🍞","🥖","🥨","🧀","🥚","🍳","🧈","🥞","🧇","🥓","🥩","🍗","🍖","🌭","🍔","🍟","🍕","🌮","🌯","🥗","🥘","🍝","🍜","🍲","🍛","🍣","🍱","🥟","🍤","🍙","🍚","🍘","🍥","🥮","🍢","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🌰","🥜","🍯","🧃","🥤","🧋","☕","🍵","🍶","🍺","🍻","🥂","🍷","🥃","🍸","🍹"] },
  { label: "⚽ Sports", stickers: ["⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓","🏸","🏒","🥍","🏑","🏏","🪃","🥅","⛳","🪁","🏹","🎣","🤿","🥊","🥋","🎽","🛹","🛼","🛷","⛸️","🥌","🎿","⛷️","🏂","🪂","🏋️","🤼","🤸","⛹️","🤺","🏇","🧘","🏄","🏊","🤽","🚣","🧗","🚵","🚴","🏆","🥇","🥈","🥉","🏅","🎖️","🏵️","🎗️","🎫","🎟️","🎪","🤹","🎭","🩰","🎨","🎬","🎤","🎧","🎼","🎵","🎶","🎸","🥁","🪘","🎹","🪗","🎷","🎺","🎻","🪕","🎮","🕹️","🎲","♟️","🎯","🎳"] },
  { label: "✈️ Travel", stickers: ["🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🛻","🚚","🚛","🚜","🏍️","🛵","🛺","🚲","🛴","🛹","🛼","⚓","🛟","⛵","🚤","🛥️","🛳️","⛴️","🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀","🛸","🏠","🏡","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪","🏫","🏭","🗼","🗽","⛪","🕌","🛕","🕍","⛩️","🕋","⛲","⛺","🌁","🌃","🏙️","🌄","🌅","🌆","🌇","🌉","🎠","🎡","🎢","💈","🎪"] },
  { label: "💼 Objects", stickers: ["⌚","📱","💻","⌨️","🖥️","🖨️","🖱️","🖲️","💽","💾","💿","📀","📷","📸","📹","🎥","📽️","🎞️","📞","☎️","📟","📠","📺","📻","🧭","⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","💸","💵","💴","💶","💷","🪙","💰","💳","💎","⚖️","🔧","🔨","⚒️","🛠️","⛏️","🪚","🔩","🪛","💣","🪜","🧱","🪞","🪟","🛏️","🛋️","🚪","🪑","🚽","🪠","🚿","🛁","🪤","🧴","🧷","🧹","🧺","🧻","🪣","🧼","🫧","🪥","🧽","🧹","🛒","🗿","🏺","🧿","💈"] },
  { label: "🌸 Japanese", stickers: ["⛩️","🏯","🗼","🗻","🌋","🏔️","🎌","🎎","🎏","🎐","🎑","🍡","🍘","🍙","🍚","🍛","🍜","🍝","🍣","🍤","🍥","🍱","🥟","🍢","🍧","🍨","🍦","🍵","🍶","🥢","🔴","🌊","🐉","🐲","🦊","🐼","🐨","🦋","🌙","⭐","🌟","✨","💫","🔮","🪄","🎎","👘","🥻","🩱","👗"] },
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
    id: "mizuiro", label: "水色 Watercolor", emoji: "🎨",
    bodyBg: "#f0f8ff",
    bodyBgImage: "radial-gradient(ellipse at 20% 20%, rgba(150,200,255,0.3) 0%, transparent 40%), radial-gradient(ellipse at 80% 40%, rgba(255,150,200,0.2) 0%, transparent 35%), radial-gradient(ellipse at 40% 80%, rgba(150,255,200,0.2) 0%, transparent 40%)",
    style: { background: "#f0f8ff", backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(150,200,255,0.3) 0%, transparent 40%), radial-gradient(ellipse at 80% 40%, rgba(255,150,200,0.2) 0%, transparent 35%), radial-gradient(ellipse at 40% 80%, rgba(150,255,200,0.2) 0%, transparent 40%)" },
    overlayEmojis: ["🎨","🌈","🪷","🎨","🖌️","✨","🌸","🎨","🌊","🪻","🌈","🎨"],
  },
];

function rand(min, max) { return Math.random() * (max - min) + min; }

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

function GifPicker({ onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const lastQuery = useRef("");
  const ref = useRef(null);
  const debounceRef = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", h), 10);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  const search = async (q, off = 0, append = false) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(q)}&limit=30&offset=${off}&rating=g`);
      const data = await res.json();
      const results = data.data || [];
      setGifs(prev => append ? [...prev, ...results] : results);
      setHasMore(results.length === 30);
      setOffset(off + results.length);
    } catch {
      if (!append) setGifs([]);
    }
    setLoading(false);
  };
  const searchTrending = async (off = 0, append = false) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=30&offset=${off}&rating=g`);
      const data = await res.json();
      const results = data.data || [];
      setGifs(prev => append ? [...prev, ...results] : results);
      setHasMore(results.length === 30);
      setOffset(off + results.length);
    } catch {
      if (!append) setGifs([]);
    }
    setLoading(false);
  };
  useEffect(() => { searchTrending(); }, []);
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    lastQuery.current = val;
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setOffset(0); searchTrending(0, false); return; }
    debounceRef.current = setTimeout(() => { setOffset(0); search(val, 0, false); }, 400);
  };
  const handleKey = (e) => { if (e.key === "Enter") { clearTimeout(debounceRef.current); setOffset(0); search(query, 0, false); } };
  const handleTag = (t) => { setQuery(t); lastQuery.current = t; setOffset(0); search(t, 0, false); };
  const handleLoadMore = () => {
    if (lastQuery.current.trim()) search(lastQuery.current, offset, true);
    else searchTrending(offset, true);
  };
  return (
    <div ref={ref} className="gif-picker" onClick={(e) => e.stopPropagation()}>
      <p className="picker-label">Giphy GIFs</p>
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
          {gifs.length === 0 && <div className="gif-loading">no results</div>}
        </div>
      )}
      {!loading && hasMore && (
        <button className="gif-load-more" onClick={handleLoadMore}>load more~</button>
      )}
      <p style={{ fontSize: 9, color: "#cca0b8", textAlign: "right", marginTop: 4, fontFamily: "'Patrick Hand', cursive" }}>Powered by GIPHY</p>
    </div>
  );
}

function StickerGifPicker({ onPlace, onClose }) {
  const [tab, setTab] = useState("stickers");
  const [stickerPack, setStickerPack] = useState(0);
  const [stickerSearch, setStickerSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", h), 10);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const filteredStickers = stickerSearch
    ? STICKER_PACKS.flatMap(p => p.stickers).filter(s => s.includes(stickerSearch.toLowerCase()))
    : STICKER_PACKS[stickerPack]?.stickers || [];

  return (
    <div ref={ref} className="sticker-picker" onClick={(e) => e.stopPropagation()}>
      <div className="sp-tabs">
        <button className={`sp-tab${tab==="stickers"?" active":""}`} onClick={() => setTab("stickers")}>Stickers</button>
        <button className={`sp-tab${tab==="gifs"?" active":""}`} onClick={() => setTab("gifs")}>GIFs</button>
      </div>
      {tab === "stickers" && (
        <>
          <div className="sp-search-row">
            <input
              className="sp-search"
              placeholder="Search stickers..."
              value={stickerSearch}
              onChange={e => setStickerSearch(e.target.value)}
            />
          </div>
          {!stickerSearch && (
            <div className="sp-pack-tabs">
              {STICKER_PACKS.map((p, i) => (
                <button key={i} className={`sp-pack-tab${stickerPack===i?" active":""}`}
                  onClick={() => setStickerPack(i)}>
                  {p.label.split(" ")[0]}
                </button>
              ))}
            </div>
          )}
          <div className="sp-grid">
            {filteredStickers.map((s, i) => (
              <button key={i} className="sp-emoji-btn" onClick={() => { onPlace({ type: "emoji", content: s }); onClose(); }}>
                {s}
              </button>
            ))}
            {filteredStickers.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "20px", color: "#c080a0", fontFamily: "'Patrick Hand', cursive", fontSize: 13 }}>
                No stickers found for "{stickerSearch}"
              </div>
            )}
          </div>
        </>
      )}
      {tab === "gifs" && (
        <GifPicker
          onSelect={(url) => { onPlace({ type: "gif", content: url }); onClose(); }}
          onClose={() => {}}
        />
      )}
    </div>
  );
}

function MediaNode({ item, onDelete, onDragEnd, onResize, pageRef }) {
  const wrapRef = useRef(null);
  const dragging = useRef(false);
  const resizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, size: 120 });
  const hasDragged = useRef(false);
  const currentSize = item.size || (item.media_type === "emoji" ? 64 : 120);

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
        onDragEnd(item.id, ev.clientX - pageRect.left - dragOffset.current.x, ev.clientY - pageRect.top - dragOffset.current.y);
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
      const inner = wrapRef.current.querySelector(".sticker-gif, .sticker-emoji");
      if (inner) {
        if (item.media_type === "gif") inner.style.width = `${newSize}px`;
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
      onResize(item.id, Math.round(newSize));
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={wrapRef}
      className="media-node"
      style={{ left: item.position_x, top: item.position_y }}
      onMouseDown={handleMouseDown}
      data-sticker-id={item.id}
    >
      {item.media_type === "gif" ? (
        <img src={item.content} alt="gif" className="sticker-gif" draggable={false} style={{ width: currentSize }} />
      ) : (
        <span className="sticker-emoji" style={{ fontSize: currentSize }}>{item.content}</span>
      )}
      <button className="delete-btn" onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(item.id); }}>×</button>
      <div className="resize-handle" onMouseDown={handleResizeDown} title="drag to resize">⤡</div>
    </div>
  );
}

function WritingNode({ writing, isEditing, onStartEdit, onDelete, onDragEnd, pageRef }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const saveTimer = useRef(null);
  const isEditingRef = useRef(isEditing);
  const onStartEditRef = useRef(onStartEdit);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  const resizing = useRef(false);
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, fontSize: 20 });

  useEffect(() => { isEditingRef.current = isEditing; }, [isEditing]);
  useEffect(() => { onStartEditRef.current = onStartEdit; }, [onStartEdit]);

  // Focus & move cursor to end when entering edit mode
  useEffect(() => {
  if (isEditing && ref.current) {
    // populate the empty contentEditable with existing text before focusing
    if (!ref.current.innerText) {
      ref.current.innerText = writing.content;
    }
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
    if (!text) {
      onDelete(writing.id);
    } else {
      supabase.from("writings").update({ content: text }).eq("id", writing.id)
        .then(({ error }) => { if (error) console.error("save failed:", error.message); });
    }
  };

  const handleMouseDown = (e) => {
    if (isEditingRef.current) return;
    if (e.target.closest(".delete-btn")) return;
    e.preventDefault(); e.stopPropagation();
    dragging.current = true; hasDragged.current = false;
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

  const handleResizeDown = (e) => {
    e.preventDefault(); e.stopPropagation();
    resizing.current = true;
    const currentFontSize = parseFloat(window.getComputedStyle(ref.current).fontSize) || 20;
    resizeStart.current = { mouseX: e.clientX, mouseY: e.clientY, fontSize: currentFontSize };
    const onMove = (ev) => {
      if (!resizing.current) return;
      const dx = ev.clientX - resizeStart.current.mouseX;
      const dy = ev.clientY - resizeStart.current.mouseY;
      const delta = Math.sqrt(dx*dx + dy*dy) * (dx + dy > 0 ? 1 : -1);
      const newSize = Math.max(10, Math.min(80, resizeStart.current.fontSize + delta * 0.3));
      ref.current.style.fontSize = `${newSize}px`;
    };
    const onUp = () => {
      resizing.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      const newSize = parseFloat(ref.current.style.fontSize) || 20;
      supabase.from("writings").update({ font_size: Math.round(newSize) }).eq("id", writing.id);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={wrapRef}
      className={`writing-node ${isEditing ? "editing" : ""}`}
      style={{ left: writing.position_x, top: writing.position_y, color: writing.font_color, fontFamily: writing.font_style }}
      data-id={writing.id}
      onMouseDown={handleMouseDown}
    >
      {}
      {isEditing ? (
        <div
          ref={ref}
          className="writing-node-text"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={(e) => { if (e.key === "Escape") ref.current.blur(); }}
          onBlur={handleBlur}
          spellCheck={false}
          style={{ fontSize: writing.font_size ? `${writing.font_size}px` : "20px" }}
        />
      ) : (
        <div
          ref={ref}
          className="writing-node-text"
          style={{ fontSize: writing.font_size ? `${writing.font_size}px` : "20px" }}
          dangerouslySetInnerHTML={{ __html: writing.content }}
        />
      )}
      {writing.author_name && (
        <div className="writing-author">~ {writing.author_name}</div>
      )}
      <button className="delete-btn" onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(writing.id); }}>×</button>
      <div className="resize-handle-text" onMouseDown={handleResizeDown} title="drag to resize">⤡</div>
    </div>
  );
}

function NameModal({ onSave }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);
  const handleSave = () => { const t = name.trim(); if (t) onSave(t); };
  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ maxWidth: 360 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ borderBottom: "none", paddingBottom: 0 }}>
          <span className="modal-title">✏️ what's your name?</span>
        </div>
        <p className="modal-subtitle" style={{ paddingBottom: 16 }}>it'll show on your notes so others know who wrote what~</p>
        <div style={{ padding: "0 26px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            ref={inputRef}
            style={{
              background: "rgba(255,240,248,0.8)",
              border: "1.5px solid rgba(255,180,210,0.5)",
              borderRadius: 12, padding: "10px 14px",
              fontSize: 18, fontFamily: "'Caveat', cursive",
              color: "#4a2838", width: "100%", outline: "none",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
            placeholder="type your name~"
            maxLength={24}
          />
          <button
            className="tb-btn primary"
            style={{ height: 40, fontSize: 15, borderRadius: 14, opacity: name.trim() ? 1 : 0.5 }}
            onClick={handleSave}
          >
            let's go ✨
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeModal({ currentThemeId, onSelect, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">ページのテーマ · Page Theme</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <p className="modal-subtitle">かわいい Japanese styles · changes for everyone</p>
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

function useOnlineCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const channel = supabase.channel("online-users", {
      config: { presence: { key: crypto.randomUUID() } },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        setCount(Object.keys(channel.presenceState()).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });
    return () => { supabase.removeChannel(channel); };
  }, []);
  return count;
}

function useJoinEvents(userName) {
  const [events, setEvents] = useState([]);
  const myKey = useRef(crypto.randomUUID());

  useEffect(() => {
    if (!userName) return;
    const channel = supabase.channel("join-events", {
      config: { presence: { key: myKey.current } },
    });
    channel
      .on("presence", { event: "join" }, ({ newPresences }) => {
        newPresences.forEach((p) => {
          if (p.key === myKey.current) return;
          const name = p.name || "someone";
          const id = Date.now() + Math.random();
          setEvents(prev => [...prev, { id, text: `${name} joined the notebook ✨` }]);
          setTimeout(() => setEvents(prev => prev.filter(e => e.id !== id)), 4000);
        });
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        leftPresences.forEach((p) => {
          if (p.key === myKey.current) return;
          const name = p.name || "someone";
          const id = Date.now() + Math.random();
          setEvents(prev => [...prev, { id, text: `${name} left the notebook~` }]);
          setTimeout(() => setEvents(prev => prev.filter(e => e.id !== id)), 4000);
        });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ name: userName, key: myKey.current });
        }
      });
    return () => { supabase.removeChannel(channel); };
  }, [userName]);

  return events;
}

function JoinToasts({ events }) {
  if (!events.length) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      zIndex: 3000, pointerEvents: "none",
    }}>
      {events.map(e => (
        <div key={e.id} style={{
          background: "rgba(255,255,255,0.92)",
          border: "1.5px solid rgba(255,180,210,0.5)",
          borderRadius: 20, padding: "7px 18px",
          fontFamily: "'Patrick Hand', cursive", fontSize: 13, color: "#8b4060",
          boxShadow: "0 4px 16px rgba(255,107,157,0.15)",
          backdropFilter: "blur(8px)",
          animation: "toastIn 0.25s ease",
        }}>
          {e.text}
        </div>
      ))}
    </div>
  );
}

function useTypingUsers(userName, isTyping) {
  const [typingUsers, setTypingUsers] = useState([]);
  const myKey = useRef(crypto.randomUUID());
  const channelRef = useRef(null);

  useEffect(() => {
    if (!userName) return;
    const channel = supabase.channel("typing-indicator", {
      config: { presence: { key: myKey.current } },
    });
    channelRef.current = channel;
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const typing = [];
        Object.entries(state).forEach(([key, presences]) => {
          const p = presences[0];
          if (key !== myKey.current && p?.typing) typing.push(p.name);
        });
        setTypingUsers(typing);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ name: userName, typing: false });
        }
      });
    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [userName]);

  useEffect(() => {
    if (!channelRef.current || !userName) return;
    channelRef.current.track({ name: userName, typing: isTyping });
  }, [isTyping, userName]);

  return typingUsers;
}

function TypingIndicator({ users }) {
  if (!users.length) return null;
  const text = users.length === 1
    ? `${users[0]} is typing...`
    : `${users.slice(0, -1).join(", ")} and ${users[users.length - 1]} are typing...`;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: "rgba(255,255,255,0.92)",
      border: "1.5px solid rgba(255,180,210,0.5)",
      borderRadius: 20, padding: "6px 14px",
      fontFamily: "'Patrick Hand', cursive", fontSize: 12, color: "#a06080",
      boxShadow: "0 4px 16px rgba(255,107,157,0.12)",
      backdropFilter: "blur(8px)", zIndex: 3000,
      pointerEvents: "none", animation: "toastIn 0.2s ease",
    }}>
      ✏️ {text}
    </div>
  );
}

function OnlineBadge({ count }) {
  return (
    <div className="online-badge" title={`${count} ${count === 1 ? "person" : "people"} online`}>
      <span className="online-dot" />
      <span className="online-count">{count} online</span>
    </div>
  );
}

function DrawingCanvas({ isDrawing, penColor, penSize, pageRef, strokes, onStrokeComplete, onDrawStart, onDeleteStroke }) {
  const canvasRef = useRef(null);
  const isMouseDown = useRef(false);
  const currentPath = useRef([]);
  const [hoveredStrokeId, setHoveredStrokeId] = useState(null);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const page = pageRef.current;
      if (!canvas || !page) return;
      const newWidth = page.offsetWidth;
      const newHeight = page.scrollHeight;
      if (canvas.width === newWidth && canvas.height === newHeight) return;
      const imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = newWidth;
      canvas.height = newHeight;
      canvas.getContext("2d").putImageData(imageData, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(resize);
    if (pageRef.current) observer.observe(pageRef.current);
    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [pageRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.forEach(stroke => {
      if (!stroke.points || stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });
  }, [strokes]);

  const getPos = (e) => {
    const page = pageRef.current;
    const rect = page.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const xPct = (clientX - rect.left) / rect.width;
    const yPct = (clientY - rect.top) / rect.height;
    return {
      x: xPct * page.offsetWidth,
      y: yPct * page.scrollHeight,
    };
  };

  const startDraw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    onDrawStart?.();
    isMouseDown.current = true;
    const pos = getPos(e);
    currentPath.current = [pos];
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing || !isMouseDown.current) return;
    e.preventDefault();
    const pos = getPos(e);
    currentPath.current.push(pos);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    if (currentPath.current.length > 1) {
      onStrokeComplete({ points: currentPath.current, color: penColor, size: penSize });
    }
    currentPath.current = [];
  };

  const isNearStroke = (px, py, stroke) => {
    const threshold = Math.max(stroke.size, 4) + 8;
    const pts = stroke.points;
    for (let i = 0; i < pts.length - 1; i++) {
      const ax = pts[i].x, ay = pts[i].y, bx = pts[i+1].x, by = pts[i+1].y;
      const dx = bx - ax, dy = by - ay;
      const lenSq = dx * dx + dy * dy;
      const t = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
      const nx = ax + t * dx - px, ny = ay + t * dy - py;
      if (nx * nx + ny * ny < threshold * threshold) return true;
    }
    return false;
  };

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const onMove = (e) => {
      if (isDrawing) { setHoveredStrokeId(null); return; }
      const rect = page.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * page.offsetWidth;
      const py = ((e.clientY - rect.top) / rect.height) * page.scrollHeight;
      const hit = strokes.slice().reverse().find(s => s.points && s.points.length >= 2 && isNearStroke(px, py, s));
      setHoveredStrokeId(hit ? hit.id : null);
    };
    const onLeave = () => setHoveredStrokeId(null);
    page.addEventListener("mousemove", onMove);
    page.addEventListener("mouseleave", onLeave);
    return () => {
      page.removeEventListener("mousemove", onMove);
      page.removeEventListener("mouseleave", onLeave);
    };
  }, [isDrawing, strokes, pageRef]);

  const hoveredStroke = hoveredStrokeId ? strokes.find(s => s.id === hoveredStrokeId) : null;
  const getMid = (pts) => pts[Math.floor(pts.length / 2)];

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", top: 0, left: 0, zIndex: 15,
          pointerEvents: isDrawing ? "all" : "none",
          //cursor: isDrawing ? `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cg%20transform%3D%22rotate%28-45%2016%2016%29%22%3E%3Crect%20x%3D%2213%22%20y%3D%224%22%20width%3D%226%22%20height%3D%2216%22%20rx%3D%222%22%20fill%3D%22%23e91e8c%22%20stroke%3D%22white%22%20stroke-width%3D%221%22%2F%3E%3Cpolygon%20points%3D%2213%2C20%2019%2C20%2016%2C28%22%20fill%3D%22%231a1a2e%22%20stroke%3D%22white%22%20stroke-width%3D%221%22%2F%3E%3Crect%20x%3D%2213%22%20y%3D%224%22%20width%3D%226%22%20height%3D%225%22%20rx%3D%222%22%20fill%3D%22%23ff85a2%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") 2 30, crosshair` : "default",
          cursor: isDrawing ? "crosshair" : "default",
          touchAction: "none",
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />
      {!isDrawing && hoveredStroke && hoveredStroke.points && hoveredStroke.points.length >= 2 && (() => {
        const mid = getMid(hoveredStroke.points);
        return (
          <button
            style={{
              position: "absolute",
              left: mid.x - 9, top: mid.y - 9,
              width: 18, height: 18,
              borderRadius: "50%",
              background: "#e74c3c", color: "white",
              border: "2px solid white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
              fontSize: 13, lineHeight: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 20, pointerEvents: "all",
              padding: 0, fontFamily: "sans-serif",
            }}
            onMouseEnter={() => setHoveredStrokeId(hoveredStroke.id)}
            onMouseDown={(e) => {
              e.stopPropagation(); e.preventDefault();
              setHoveredStrokeId(null);
              onDeleteStroke(hoveredStroke.id);
            }}
          >×</button>
        );
      })()}
    </>
  );
}

function PenSizeDot({ size, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: Math.max(size * 1.5, 12),
        height: Math.max(size * 1.5, 12),
        borderRadius: "50%",
        background: selected ? "#ff6b9d" : "#c0a0b0",
        border: selected ? "2px solid #ff85a2" : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.15s",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}

function useLofiSync(userName) {
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const channelRef = useRef(null);
  const isSyncingRef = useRef(false);

  useEffect(() => {
    const channel = supabase.channel("lofi-sync");
    channelRef.current = channel;
    channel
      .on("broadcast", { event: "lofi" }, ({ payload }) => {
        isSyncingRef.current = true;
        if (payload.action === "play")  { setPlaying(true);  setTrackIdx(payload.trackIdx ?? 0); }
        if (payload.action === "pause") { setPlaying(false); }
        if (payload.action === "track") { setTrackIdx(payload.trackIdx); setPlaying(true); }
        setTimeout(() => { isSyncingRef.current = false; }, 50);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const broadcast = useCallback((payload) => {
    channelRef.current?.send({ type: "broadcast", event: "lofi", payload });
  }, []);

  const togglePlay = useCallback(() => {
    const next = !playing;
    setPlaying(next);
    broadcast({ action: next ? "play" : "pause", trackIdx });
  }, [playing, trackIdx, broadcast]);

  const selectTrack = useCallback((idx) => {
    setTrackIdx(idx);
    setPlaying(true);
    broadcast({ action: "track", trackIdx: idx });
  }, [broadcast]);

  return { playing, trackIdx, togglePlay, selectTrack };
}

function LofiPlayer({ playing, trackIdx, onToggle, onSelectTrack, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    setTimeout(() => document.addEventListener("mousedown", h), 10);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div ref={ref} className="lofi-dropdown" onClick={(e) => e.stopPropagation()}>
      <p className="picker-label">lofi radio</p>
      <button className="lofi-play-btn" onClick={onToggle}>
        <span style={{ fontSize: 13 }}>{playing ? "||" : "▶"}</span>
        <span style={{ flex: 1, textAlign: "left" }}>{playing ? "now playing" : "paused"}</span>
      </button>
      <p className="picker-label" style={{ marginTop: 4 }}>Stations</p>
      {LOFI_TRACKS.map((t, i) => (
        <button
          key={t.url}
          className={`lofi-track-btn${trackIdx === i ? " active" : ""}`}
          onClick={() => onSelectTrack(i)}
        >
          <span style={{ flex: 1, textAlign: "left", fontFamily: "'Patrick Hand', cursive", fontSize: 12 }}>{t.label}</span>
          {trackIdx === i && <span style={{ color: "#ff6b9d", fontSize: 10 }}>●</span>}
        </button>
      ))}
      <p style={{ fontSize: 9, color: "#cca0b8", textAlign: "center", marginTop: 8, fontFamily: "'Patrick Hand', cursive" }}>
        synced for everyone • nightride.fm
      </p>
    </div>
  );
}

function useReactions(userName) {
  const [bursts, setBursts] = useState([]);
  const channelRef = useRef(null);

  useEffect(() => {
    const channel = supabase.channel("reactions-broadcast");
    channelRef.current = channel;
    channel
      .on("broadcast", { event: "reaction" }, ({ payload }) => {
        const id = crypto.randomUUID();
        const x = 10 + Math.random() * 80;
        setBursts(prev => [...prev, { id, emoji: payload.emoji, name: payload.name, x }]);
        setTimeout(() => setBursts(prev => prev.filter(b => b.id !== id)), 2800);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const sendReaction = useCallback((emoji) => {
    const id = crypto.randomUUID();
    const x = 10 + Math.random() * 80;
    setBursts(prev => [...prev, { id, emoji, name: userName || "someone", x }]);
    setTimeout(() => setBursts(prev => prev.filter(b => b.id !== id)), 2800);
    channelRef.current?.send({
      type: "broadcast",
      event: "reaction",
      payload: { emoji, name: userName || "someone" },
    });
  }, [userName]);

  return { bursts, sendReaction };
}

function ReactionBurst({ burst }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 80,
      left: `${burst.x}%`,
      zIndex: 4000,
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      animation: "reactionFloat 2.8s ease-out forwards",
    }}>
      <span style={{ fontSize: 32, lineHeight: 1, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }}>
        {burst.emoji}
      </span>
      <span style={{
        fontFamily: "'Patrick Hand', cursive", fontSize: 11,
        color: "#8b4060", background: "rgba(255,255,255,0.88)",
        borderRadius: 10, padding: "1px 7px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        whiteSpace: "nowrap",
      }}>
        {burst.name}
      </span>
    </div>
  );
}

function ReactionBar({ onReact }) {
  return (
    <div style={{
      position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
      display: "flex", alignItems: "center", gap: 4,
      background: "rgba(255,255,255,0.92)",
      border: "1.5px solid rgba(255,180,210,0.5)",
      borderRadius: 40, padding: "6px 12px",
      boxShadow: "0 4px 20px rgba(255,107,157,0.15), 0 1px 4px rgba(0,0,0,0.08)",
      backdropFilter: "blur(10px)",
      zIndex: 3500,
    }}>
      {REACTION_EMOJIS.map(emoji => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 22, lineHeight: 1, padding: "2px 5px",
            borderRadius: 12, transition: "transform 0.12s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.35)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          title={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [writings, setWritings]               = useState([]);
  const [mediaItems, setMediaItems]           = useState([]);
  const [userName, setUserName]               = useState(() => localStorage.getItem("nb_username") || "");
  const [showNameModal, setShowNameModal]     = useState(() => !localStorage.getItem("nb_username"));
  const [activeInput, setActiveInput]         = useState(null);
  const [inputText, setInputText]             = useState("");
  const [editingId, setEditingId]             = useState(null);
  const [inkColor, setInkColor]               = useState("#1a1a2e");
  const [inkFont,  setInkFont]                = useState(FONTS[0].value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker,  setShowFontPicker]  = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [pageThemeId, setPageThemeId]         = useState("sakura");
  const [showThemeModal, setShowThemeModal]   = useState(false);
  const [transitioning, setTransitioning]     = useState(false);
  const [extraHeight, setExtraHeight]         = useState(0);

  const [isDrawingMode, setIsDrawingMode]     = useState(false);
  const [showDrawMenu, setShowDrawMenu]       = useState(false);
  const [penColor, setPenColor]               = useState("#e91e8c");
  const [penSize, setPenSize]                 = useState(3);
  const [strokes, setStrokes]                 = useState([]);

  const onlineCount = useOnlineCount();
  const joinEvents  = useJoinEvents(userName);

  const pageRef        = useRef(null);
  const inputRef       = useRef(null);
  const audioRef       = useRef(null);
  const editingIdRef   = useRef(null);
  const inputTextRef   = useRef("");
  const activeInputRef = useRef(null);
  const inkColorRef    = useRef(inkColor);
  const inkFontRef     = useRef(inkFont);

  const typingUsers = useTypingUsers(userName, !!activeInput);
  const { bursts, sendReaction } = useReactions(userName);
  const { playing: lofiPlaying, trackIdx: lofiTrack, togglePlay: lofiToggle, selectTrack: lofiSelect } = useLofiSync(userName);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = LOFI_TRACKS[lofiTrack].url;
    if (lofiPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [lofiPlaying, lofiTrack]);

  const [showLofi, setShowLofi] = useState(false);

  useEffect(() => { editingIdRef.current   = editingId;   }, [editingId]);
  useEffect(() => { inputTextRef.current   = inputText;   }, [inputText]);
  useEffect(() => { activeInputRef.current = activeInput; }, [activeInput]);
  useEffect(() => { inkColorRef.current    = inkColor;    }, [inkColor]);
  useEffect(() => { inkFontRef.current     = inkFont;     }, [inkFont]);

  const closeAllPickers = () => {
    setShowColorPicker(false);
    setShowFontPicker(false);
    setShowStickerPicker(false);
    setShowLofi(false);
  };

  const pageTheme = PAGE_THEMES.find((t) => t.id === pageThemeId) || PAGE_THEMES[0];

  useEffect(() => {
    document.body.style.transition = "background 0.5s ease";
    document.body.style.background = pageTheme.bodyBg;
    document.body.style.backgroundImage = pageTheme.bodyBgImage === "none" ? "" : pageTheme.bodyBgImage;
  }, [pageTheme.bodyBg, pageTheme.bodyBgImage]);

  useEffect(() => {
    supabase.from("writings").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setWritings(data); });
  }, []);

  useEffect(() => {
    supabase.from("media_items").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setMediaItems(data); });
  }, []);

  useEffect(() => {
    supabase.from("page_settings").select("*").eq("id", PAGE_THEME_ROW_ID).single()
      .then(({ data, error }) => {
        if (data?.theme_id) setPageThemeId(data.theme_id);
        if (data?.extra_height != null) setExtraHeight(data.extra_height);
        if (!data && error?.code === "PGRST116") {
          supabase.from("page_settings").insert({
            id: PAGE_THEME_ROW_ID,
            theme_id: "sakura",
            extra_height: 0,
          });
        }
      });
  }, []);

  useEffect(() => {
    supabase.from("drawing_strokes").select("*").order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setStrokes(data.map(row => ({
            id: row.id,
            points: row.points,
            color: row.color,
            size: row.size,
          })));
        }
      });
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("drawing-strokes-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "drawing_strokes" }, (payload) => {
        const row = payload.new;
        setStrokes(prev => {
          if (prev.find(s => s.id === row.id)) return prev;
          return [...prev, { id: row.id, points: row.points, color: row.color, size: row.size }];
        });
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "drawing_strokes" }, (payload) => {
        setStrokes(prev => prev.filter(s => s.id !== payload.old.id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("writings-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "writings" }, (payload) => {
        setWritings(prev => prev.find(w => w.id === payload.new.id) ? prev : [...prev, payload.new]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "writings" }, (payload) => {
        //  skip applying remote updates to whichever node is being edited
        //    so realtime echoes of the user's own saves never clobber their typing
        setWritings(prev => prev.map(w =>
          (w.id === payload.new.id && editingIdRef.current !== payload.new.id)
            ? payload.new
            : w
        ));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "writings" }, (payload) => {
        setWritings(prev => prev.filter(w => w.id !== payload.old.id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("media-items-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "media_items" }, (payload) => {
        setMediaItems(prev => prev.find(m => m.id === payload.new.id) ? prev : [...prev, payload.new]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "media_items" }, (payload) => {
        setMediaItems(prev => prev.map(m => m.id === payload.new.id ? payload.new : m));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "media_items" }, (payload) => {
        setMediaItems(prev => prev.filter(m => m.id !== payload.old.id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleStrokeComplete = useCallback(async (stroke) => {
    setStrokes(prev => [...prev, stroke]);
    const { data } = await supabase.from("drawing_strokes").insert([{
      points: stroke.points,
      color: stroke.color,
      size: stroke.size,
    }]).select().single();
    if (data) {
      setStrokes(prev => {
        const updated = [...prev];
        const last = updated.length - 1;
        updated[last] = { ...updated[last], id: data.id };
        return updated;
      });
    }
  }, []);

  const handleDeleteStroke = useCallback(async (id) => {
    if (!id) return;
    setStrokes(prev => prev.filter(s => s.id !== id));
    await supabase.from("drawing_strokes").delete().eq("id", id);
  }, []);

  const handleClearDrawing = async () => {
    setStrokes([]);
    await supabase.from("drawing_strokes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  };

  useEffect(() => {
    const handler = (e) => {
      if (isDrawingMode) return;
      if (!pageRef.current?.contains(e.target)) return;
      const node          = e.target.closest("[data-id]");
      const toolbar       = e.target.closest(".toolbar");
      const deleteBtn     = e.target.closest(".delete-btn");
      const mediaNode     = e.target.closest(".media-node");
      const stickerPicker = e.target.closest(".sticker-picker, .gif-picker");
      if (toolbar || deleteBtn || mediaNode || stickerPicker) return;
      if (node) {
        e.stopPropagation(); e.preventDefault();
        setEditingId(node.dataset.id);
        setActiveInput(null);
        return;
      }
      setEditingId(null);
      const rect = pageRef.current.getBoundingClientRect();
      setActiveInput({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
      setInputText("");
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showStickerPicker, isDrawingMode]);

  const handleSubmit = async (e) => {
    const text = inputTextRef.current;
    const pos  = activeInputRef.current;
    if (e.key === "Enter" && text.trim() && pos) {
      const writing = {
        content:     text.trim(),
        position_x:  Math.min((pos.x / 100) * (pageRef.current?.offsetWidth || 900), (pageRef.current?.offsetWidth || 900) - 160),
        position_y:  (pos.y / 100) * (pageRef.current?.scrollHeight || 600),
        font_color:  inkColorRef.current,
        font_style:  inkFontRef.current,
        author_name: userName || null,
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

  const handlePlaceMedia = useCallback(async ({ type, content }) => {
    const page = pageRef.current;
    const pageRect = page.getBoundingClientRect();
    const centerXpx = page.offsetWidth / 2;
    const centerYpx = (window.innerHeight / 2 - pageRect.top) / pageRect.height * 100;
    const x = centerXpx - 40;
    const y = (centerYpx / 100) * page.scrollHeight - 40;
    const defaultSize = type === "emoji" ? 64 : 120;
    const item = {
      media_type:  type,
      content:     content,
      position_x:  Math.max(0, x),
      position_y:  Math.max(20, y),
      size:        defaultSize,
    };
    const { data } = await supabase.from("media_items").insert([item]).select().single();
    if (data) setMediaItems((prev) => [...prev, data]);
    setShowStickerPicker(false);
  }, []);

  const handleMediaDelete = async (id) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    await supabase.from("media_items").delete().eq("id", id);
  };

  const handleMediaDragEnd = async (id, newX, newY) => {
    const pageW = pageRef.current?.offsetWidth || 900;
    const clampedX = Math.max(0, Math.min(newX, pageW - 50));
    const clampedY = Math.max(0, newY);
    setMediaItems((prev) => prev.map((m) => m.id === id ? { ...m, position_x: clampedX, position_y: clampedY } : m));
    await supabase.from("media_items").update({ position_x: clampedX, position_y: clampedY }).eq("id", id);
  };

  const handleMediaResize = async (id, newSize) => {
    setMediaItems((prev) => prev.map((m) => m.id === id ? { ...m, size: newSize } : m));
    await supabase.from("media_items").update({ size: newSize }).eq("id", id);
  };

  const currentFontLabel = FONTS.find((f) => f.value === inkFont)?.label || "Caveat";
  const PEN_SIZES = [2, 4, 8];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Kalam:wght@300;400&family=Patrick+Hand&family=Indie+Flower&family=Shadows+Into+Light&family=Pacifico&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
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
          position: sticky; top: 16px;
          z-index: 1000; overflow: visible;
          backdrop-filter: blur(8px);
        }
        .toolbar-title { font-family: 'Caveat', cursive; font-size: 22px; font-weight: 600; color: #4a2838; letter-spacing: -0.5px; white-space: nowrap; }
        .toolbar-divider { width: 1px; height: 20px; background: rgba(255,160,200,0.35); flex-shrink: 0; }
        .toolbar-label { font-size: 11px; color: #c0909c; font-family: 'Patrick Hand', cursive; white-space: nowrap; }

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

        .font-btn-wrap  { position: relative; overflow: visible; display: flex; align-items: center; }
        .media-btn-wrap { position: relative; overflow: visible; display: flex; align-items: center; }
        .page-btns      { display: flex; align-items: center; gap: 6px; }

        .online-badge {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 10px;
          background: rgba(240,255,245,0.9);
          border: 1.5px solid rgba(100,220,140,0.45);
          border-radius: 20px; flex-shrink: 0; cursor: default;
        }
        .online-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #34d058;
          box-shadow: 0 0 0 2px rgba(52,208,88,0.25);
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 2px rgba(52,208,88,0.25); }
          50%       { box-shadow: 0 0 0 4px rgba(52,208,88,0.15); }
        }
        .online-count {
          font-family: 'Patrick Hand', cursive;
          font-size: 12px; color: #2a7a40; white-space: nowrap;
        }

        .mode-toggle-wrap { position: relative; overflow: visible; display: flex; align-items: center; }
        .mode-toggle {
          position: relative; display: flex; align-items: center;
          background: rgba(255,240,248,0.9);
          border: 1.5px solid rgba(255,180,210,0.5);
          border-radius: 20px; padding: 3px; gap: 0; height: 32px;
        }
        .mode-toggle-pill {
          position: absolute; top: 3px; left: 3px;
          width: 48px; height: 24px;
          background: linear-gradient(135deg, #ff85a2, #ff6b9d);
          border-radius: 14px;
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 8px rgba(255,107,157,0.4);
          pointer-events: none; z-index: 0;
        }
        .mode-toggle-pill.draw { transform: translateX(48px); }
        .mode-toggle-btn {
          position: relative; z-index: 1;
          width: 48px; height: 24px;
          border: none; background: none; border-radius: 14px;
          font-size: 12px; font-family: 'Patrick Hand', cursive;
          font-weight: 600; letter-spacing: 0.2px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.15s; flex-shrink: 0; color: #b080a0;
        }
        .mode-toggle-btn.active { color: white; }
        .mode-toggle-btn:hover:not(.active) { color: #8b4060; }
        .draw-btn-wrap { position: relative; overflow: visible; display: flex; align-items: center; }
        .draw-dropdown {
          position: absolute; top: calc(100% + 10px);
          left: 50%; transform: translateX(-50%);
          background: #fffbf8;
          border: 1px solid rgba(255,180,210,0.5);
          border-radius: 16px; padding: 14px;
          box-shadow: 0 12px 40px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 9999; width: 220px;
          animation: popIn 0.15s ease;
        }
        .pen-color-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
        .pen-color-dot {
          width: 26px; height: 26px; border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer; transition: transform 0.12s, border-color 0.12s; flex-shrink: 0;
        }
        .pen-color-dot:hover { transform: scale(1.2); }
        .pen-color-dot.selected { border-color: #ff6b9d; transform: scale(1.12); }
        .pen-size-row { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }

        .sticker-picker {
          position: absolute; top: calc(100% + 10px);
          left: 50%; transform: translateX(-50%);
          background: #fffbf8;
          border: 1px solid rgba(255,180,210,0.5);
          border-radius: 18px; padding: 14px;
          box-shadow: 0 16px 48px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 9999; width: 320px; max-height: 400px;
          display: flex; flex-direction: column;
          animation: popIn 0.15s ease;
        }
        .sp-tabs { display: flex; gap: 6px; margin-bottom: 10px; flex-shrink: 0; }
        .sp-tab {
          flex: 1; padding: 6px 0;
          background: none; border: 1.5px solid rgba(255,180,210,0.4);
          border-radius: 12px; font-family: 'Patrick Hand', cursive;
          font-size: 13px; color: #a07888; cursor: pointer; transition: all 0.15s;
        }
        .sp-tab:hover { background: rgba(255,210,230,0.3); }
        .sp-tab.active { background: linear-gradient(135deg,#ff85a2,#ff6b9d); color: white; border-color: transparent; }
        .sp-search-row { margin-bottom: 8px; flex-shrink: 0; }
        .sp-search {
          width: 100%; padding: 7px 12px;
          background: rgba(255,240,248,0.8);
          border: 1.5px solid rgba(255,180,210,0.4);
          border-radius: 12px; outline: none;
          font-family: 'Patrick Hand', cursive; font-size: 13px;
          color: #4a2838; transition: border-color 0.15s;
        }
        .sp-search:focus { border-color: #ff85a2; }
        .sp-pack-tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; flex-shrink: 0; }
        .sp-pack-tab {
          padding: 3px 7px; background: none;
          border: 1px solid rgba(255,180,210,0.4);
          border-radius: 8px; font-size: 14px; cursor: pointer; transition: all 0.12px;
        }
        .sp-pack-tab:hover { background: rgba(255,210,230,0.3); transform: scale(1.1); }
        .sp-pack-tab.active { background: linear-gradient(135deg,#ff85a2,#ff6b9d); border-color: transparent; }
        .sp-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 3px; overflow-y: auto; flex: 1; }
        .sp-emoji-btn {
          aspect-ratio: 1; border: none; background: none;
          font-size: 20px; cursor: pointer; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.1s, background 0.1s;
        }
        .sp-emoji-btn:hover { transform: scale(1.3); background: rgba(255,210,230,0.3); }

        .media-node {
          position: absolute; z-index: 10;
          cursor: grab; user-select: none;
          animation: inkDrop 0.3s ease-out;
          display: inline-flex; align-items: flex-start;
        }
        .media-node:hover .delete-btn { display: flex; }
        .media-node:hover .resize-handle { opacity: 1; }
        .sticker-emoji { display: block; line-height: 1; pointer-events: none; }
        .sticker-gif { display: block; pointer-events: none; border-radius: 6px; }
        .resize-handle {
          position: absolute; bottom: -10px; right: -10px;
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #ff85a2, #ff6b9d);
          border-radius: 50%; cursor: se-resize;
          opacity: 0; transition: opacity 0.15s;
          border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          z-index: 21; display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: white; font-weight: bold; line-height: 1;
        }
        .resize-handle:hover { transform: scale(1.2); opacity: 1 !important; }

        .picker-popup {
          position: absolute; top: calc(100% + 10px);
          left: 50%; transform: translateX(-50%);
          background: #fffbf8;
          border: 1px solid rgba(255,180,210,0.5);
          border-radius: 16px; padding: 14px;
          box-shadow: 0 12px 40px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 9999; width: 220px;
          animation: popIn 0.15s ease;
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
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

        .page-wrapper { position: relative; width: 100%; min-height: 80vh; }
        .notebook-page {
          position: relative; width: 100%; min-height: 100vh;
          box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 10px 40px rgba(0,0,0,0.12), 4px 0 0 rgba(0,0,0,0.06), -2px 0 0 rgba(255,255,255,0.4);
          cursor: crosshair; overflow-x: clip; overflow-y: visible;
          transition: opacity 0.22s ease, filter 0.22s ease;
          padding-bottom: 200px;
        }
        .notebook-page.drawing-active { cursor: default; }
        .notebook-page.transitioning { opacity: 0; filter: blur(8px); }

        .writing-node {
          position: absolute; z-index: 10;
          cursor: grab; animation: inkDrop 0.3s ease-out;
          user-select: none; max-width: min(380px, calc(100% - 20px));
        }
        .writing-node.editing { cursor: text; }
        .writing-node .resize-handle-text {
          position: absolute; bottom: -8px; right: -8px;
          width: 16px; height: 16px;
          background: linear-gradient(135deg, #ff85a2, #ff6b9d);
          border-radius: 50%; cursor: se-resize;
          opacity: 0; transition: opacity 0.15s;
          border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          z-index: 21; display: flex; align-items: center;
          justify-content: center; font-size: 8px; color: white;
        }
        .writing-node:hover .resize-handle-text { opacity: 1; }
        .writing-node-text {
          display: block; font-size: 20px; line-height: 1.4;
          white-space: pre-wrap; word-break: break-word;
          width: 100%; outline: none; border-radius: 2px;
          padding: 1px 3px; transition: background 0.15s;
          text-shadow: 0 1px 1px rgba(255,255,255,0.3);
          min-height: 1.2em; min-width: 4px;
        }
        .writing-node:not(.editing):hover .writing-node-text { background: rgba(255,230,80,0.3); }
        .writing-node.editing .writing-node-text {
          background: rgba(255,255,255,0.7);
          box-shadow: 0 0 0 1.5px rgba(100,150,255,0.4);
          user-select: text; caret-color: currentColor; text-shadow: none;
        }
        .delete-btn {
          position: absolute; top: -8px; right: -8px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #e74c3c; color: white; border: none;
          font-size: 14px; line-height: 1; cursor: pointer;
          display: none; align-items: center; justify-content: center;
          z-index: 20; padding: 0;
        }
        .writing-author {
          position: absolute; bottom: -18px; left: 2px;
          font-family: 'Patrick Hand', cursive; font-size: 11px;
          color: #c090a8; opacity: 0; white-space: nowrap;
          transition: opacity 0.15s; pointer-events: none;
          text-shadow: 0 1px 2px rgba(255,255,255,0.8);
        }
        .writing-node:hover .writing-author { opacity: 1; }
        .writing-node:hover .delete-btn { display: flex; }
        @keyframes inkDrop {
          from { opacity: 0; transform: translateY(-50%) scale(0.9); }
          to   { opacity: 1; transform: translateY(-50%) scale(1);   }
        }
        .active-input-wrapper { position: absolute; transform: translateY(-50%); z-index: 20; }
        .active-input {
          background: transparent; border: none;
          border-bottom: 2px dashed currentColor;
          outline: none; font-size: 20px;
          min-width: 200px; max-width: 400px;
          padding: 0 2px; font-family: inherit; color: inherit;
        }
        .active-input::placeholder { opacity: 0.5; font-size: 15px; }

        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(20,0,10,0.45);
          z-index: 2000; display: flex;
          align-items: center; justify-content: center;
          backdrop-filter: blur(3px);
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes reactionFloat {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          20%  { opacity: 1; transform: translateY(-30px) scale(1.15); }
          100% { opacity: 0; transform: translateY(-160px) scale(0.8); }
        }
        .modal {
          background: #fffbf8; border-radius: 22px;
          width: min(760px, 96vw); max-height: 88vh; overflow-y: auto;
          box-shadow: 0 24px 70px rgba(255,107,157,0.2), 0 8px 20px rgba(0,0,0,0.12);
          animation: slideUp 0.22s ease;
          border: 1px solid rgba(255,180,200,0.5);
        }
        @keyframes slideUp {
          from { transform: translateY(28px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 26px 10px;
          position: sticky; top: 0; background: #fffbf8;
          z-index: 2; border-bottom: 1px solid rgba(255,180,200,0.3);
        }
        .modal-title { font-family: 'Caveat', cursive; font-size: 22px; font-weight: 600; color: #4a2838; }
        .modal-subtitle { font-family: 'Patrick Hand', cursive; font-size: 13px; color: #b06080; padding: 8px 26px 4px; }
        .modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: #c07090; padding: 4px 8px; border-radius: 10px; }
        .modal-close:hover { background: rgba(255,180,200,0.3); }
        .modal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; padding: 16px 24px 28px; }
        .theme-card {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          background: none; border: 2.5px solid transparent;
          border-radius: 16px; padding: 8px; cursor: pointer;
          transition: border-color 0.15s, transform 0.15s; position: relative;
        }
        .theme-card:hover { border-color: #ffb0c8; transform: translateY(-3px) scale(1.03); }
        .theme-card.selected { border-color: #ff6b9d; box-shadow: 0 0 0 3px rgba(255,107,157,0.18); }
        .theme-preview-wrap { width: 100%; aspect-ratio: 4/3; border-radius: 10px; border: 1px solid rgba(0,0,0,0.07); overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; padding: 8px; background-size: cover; }
        .theme-preview-page { width: 80%; height: 80%; border-radius: 5px; position: relative; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .theme-card-label { font-family: 'Patrick Hand', cursive; font-size: 11px; color: #4a2838; text-align: center; line-height: 1.4; }
        .theme-check { position: absolute; top: 5px; right: 5px; width: 20px; height: 20px; background: linear-gradient(135deg,#ff85a2,#ff6b9d); color: white; border-radius: 50%; font-size: 11px; display: flex; align-items: center; justify-content: center; }

        .gif-picker { padding: 0; display: flex; flex-direction: column; max-height: 340px; }
        .gif-search-row { margin-bottom: 8px; }
        .gif-search-input {
          width: 100%; padding: 7px 12px;
          background: rgba(255,240,248,0.8);
          border: 1.5px solid rgba(255,180,210,0.4);
          border-radius: 12px; outline: none;
          font-family: 'Patrick Hand', cursive; font-size: 13px;
          color: #4a2838; transition: border-color 0.15s;
        }
        .gif-search-input:focus { border-color: #ff85a2; }
        .quick-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
        .quick-tag {
          padding: 2px 8px; background: rgba(255,240,248,0.8);
          border: 1px solid rgba(255,180,210,0.4);
          border-radius: 10px; font-size: 11px;
          font-family: 'Patrick Hand', cursive; color: #a07888;
          cursor: pointer; transition: all 0.12s;
        }
        .quick-tag:hover { background: rgba(255,210,230,0.4); color: #8b4060; }
        .gif-loading { text-align: center; padding: 20px; color: #c080a0; font-family: 'Patrick Hand', cursive; font-size: 13px; }
        .gif-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; overflow-y: auto; flex: 1; }
        .gif-thumb {
          width: 100%; aspect-ratio: 1; object-fit: cover;
          border-radius: 6px; cursor: pointer;
          transition: transform 0.1s, box-shadow 0.1s; display: block;
        }
        .gif-thumb:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(255,107,157,0.3); }
        .gif-load-more {
          width: 100%; margin-top: 6px; padding: 6px;
          background: rgba(255,240,248,0.8);
          border: 1.5px solid rgba(255,180,210,0.4);
          border-radius: 12px; cursor: pointer;
          font-family: 'Patrick Hand', cursive; font-size: 12px;
          color: #a07888; transition: all 0.15s; flex-shrink: 0;
        }
        .gif-load-more:hover { background: rgba(255,210,230,0.4); color: #8b4060; }

        .lofi-dropdown {
          position: absolute; top: calc(100% + 10px);
          left: 50%; transform: translateX(-50%);
          background: #fffbf8;
          border: 1px solid rgba(255,180,210,0.5);
          border-radius: 16px; padding: 14px;
          box-shadow: 0 12px 40px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
          z-index: 9999; width: 220px;
          animation: popIn 0.15s ease;
        }
        .lofi-play-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 8px 10px; margin-bottom: 6px;
          background: linear-gradient(135deg, rgba(255,133,162,0.15), rgba(255,107,157,0.1));
          border: 1.5px solid rgba(255,180,210,0.5);
          border-radius: 12px; cursor: pointer;
          font-family: 'Patrick Hand', cursive; font-size: 13px; color: #8b4060;
          transition: all 0.15s;
        }
        .lofi-play-btn:hover { background: rgba(255,210,230,0.4); }
        .lofi-track-btn {
          display: flex; align-items: center; gap: 6px;
          width: 100%; padding: 6px 8px;
          background: none; border: 1.5px solid transparent;
          border-radius: 10px; cursor: pointer; transition: all 0.12s;
        }
        .lofi-track-btn:hover { background: rgba(255,210,230,0.3); border-color: rgba(255,180,210,0.3); }
        .lofi-track-btn.active { border-color: #ff85a2; background: rgba(255,210,230,0.2); }
      `}</style>

      <div className="toolbar">
        <span className="toolbar-title">shared notebook</span>

        <div className="toolbar-divider" />
        <OnlineBadge count={onlineCount} />

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
            Stickers & GIFs
          </button>
          {showStickerPicker && (
            <StickerGifPicker
              onPlace={handlePlaceMedia}
              onClose={() => setShowStickerPicker(false)}
            />
          )}
        </div>

        <div className="toolbar-divider" />
        <div style={{ position: "relative", overflow: "visible", display: "flex", alignItems: "center" }}>
          <button
            className={`tb-btn${lofiPlaying ? " active" : ""}`}
            onClick={(e) => { e.stopPropagation(); closeAllPickers(); setShowLofi(v => !v); }}
            title="lofi radio"
          >
            lofi
          </button>
          {showLofi && (
            <LofiPlayer
              playing={lofiPlaying}
              trackIdx={lofiTrack}
              onToggle={() => { lofiToggle(); }}
              onSelectTrack={(i) => { lofiSelect(i); }}
              onClose={() => setShowLofi(false)}
            />
          )}
        </div>

        <div className="toolbar-divider" />
        <div className="mode-toggle-wrap">
          <div className="mode-toggle" onClick={(e) => e.stopPropagation()}>
            <div className={`mode-toggle-pill${isDrawingMode ? " draw" : ""}`} />
            <button
              className={`mode-toggle-btn${!isDrawingMode ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsDrawingMode(false);
                setShowDrawMenu(false);
                setActiveInput(null);
                setEditingId(null);
              }}
              title="textbox mode"
            >
              Text
            </button>
            <button
              className={`mode-toggle-btn${isDrawingMode ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsDrawingMode(true);
                setShowDrawMenu(v => !v);
                setActiveInput(null);
                setEditingId(null);
              }}
              title="draw mode"
            >
              Draw
            </button>
          </div>

          {isDrawingMode && showDrawMenu && (
            <div className="draw-dropdown" onClick={(e) => e.stopPropagation()}>
              <p className="picker-label">Pen color</p>
              <div className="pen-color-grid">
                {PEN_COLORS.map(c => (
                  <button
                    key={c}
                    className={`pen-color-dot${penColor === c ? " selected" : ""}`}
                    style={{ background: c, boxShadow: c === "#ffffff" ? "0 0 0 1px #ccc" : "none" }}
                    onClick={(e) => { e.stopPropagation(); setPenColor(c); }}
                    title={c}
                  />
                ))}
              </div>
              <p className="picker-label" style={{ marginTop: 10 }}>Pen size</p>
              <div className="pen-size-row">
                {PEN_SIZES.map(s => (
                  <PenSizeDot
                    key={s}
                    size={s}
                    selected={penSize === s}
                    onClick={(e) => { e.stopPropagation(); setPenSize(s); }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="toolbar-divider" />
        <div className="page-btns">
          <button className="tb-btn primary" onClick={(e) => { e.stopPropagation(); setShowThemeModal(true); }}>
            Change Page
          </button>
          <button className="tb-btn"
            onClick={async (e) => {
              e.stopPropagation();
              const newH = extraHeight + 600;
              setExtraHeight(newH);
              await supabase.from("page_settings").upsert({
                id: PAGE_THEME_ROW_ID,
                theme_id: pageThemeId,
                extra_height: newH,
                updated_at: new Date().toISOString(),
              });
            }}>
            Add Page
          </button>
        </div>
      </div>

      <div className="page-wrapper">
        <div
          className={`notebook-page${transitioning ? " transitioning" : ""}${isDrawingMode ? " drawing-active" : ""}`}
          ref={pageRef}
          style={{ ...pageTheme.style, minHeight: `calc(100vh + ${extraHeight}px)` }}
        >
          <PageDecorations emojis={pageTheme.overlayEmojis} themeId={pageThemeId} />

          {writings.map((w) => (
            <WritingNode
              key={w.id} writing={w}
              isEditing={editingId === w.id}
              onStartEdit={(id) => setEditingId(id)}
              onDelete={handleDelete}
              onDragEnd={handleDragEnd}
              pageRef={pageRef}
            />
          ))}

          {mediaItems.map((m) => (
            <MediaNode
              key={m.id} item={m}
              onDelete={handleMediaDelete}
              onDragEnd={handleMediaDragEnd}
              onResize={handleMediaResize}
              pageRef={pageRef}
            />
          ))}

          <DrawingCanvas
            isDrawing={isDrawingMode}
            penColor={penColor}
            penSize={penSize}
            pageRef={pageRef}
            strokes={strokes}
            onStrokeComplete={handleStrokeComplete}
            onDrawStart={() => setShowDrawMenu(false)}
            onDeleteStroke={handleDeleteStroke}
          />

          {activeInput && !isDrawingMode && (
            <div className="active-input-wrapper"
              style={{
                left: `${(activeInput.x / 100) * (pageRef.current?.offsetWidth || 900)}px`,
                top:  `${(activeInput.y / 100) * (pageRef.current?.scrollHeight || 600)}px`,
                color: inkColor, fontFamily: inkFont,
              }}>
              <input
                ref={inputRef}
                className="active-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleSubmit}
                placeholder="type & press Enter..."
                style={{ color: inkColor, fontFamily: inkFont }}
              />
            </div>
          )}
        </div>
      </div>

      {showNameModal && (
        <NameModal onSave={(name) => {
          setUserName(name);
          localStorage.setItem("nb_username", name);
          setShowNameModal(false);
        }} />
      )}

      <audio ref={audioRef} preload="none" />

      <JoinToasts events={joinEvents} />
      <TypingIndicator users={typingUsers} />
      <ReactionBar onReact={sendReaction} />
      {bursts.map(b => <ReactionBurst key={b.id} burst={b} />)}

      {showThemeModal && (
        <ThemeModal
          currentThemeId={pageThemeId}
          onSelect={async (id) => {
            setTransitioning(true);
            setTimeout(() => { setPageThemeId(id); setTransitioning(false); }, 220);
            await supabase.from("page_settings").upsert({
              id: PAGE_THEME_ROW_ID,
              theme_id: id,
              extra_height: extraHeight,
              updated_at: new Date().toISOString(),
            });
          }}
          onClose={() => setShowThemeModal(false)}
        />
      )}
    </>
  );
}