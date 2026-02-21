import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cvchsjpvszyeryrfffek.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2hzanB2c3p5ZXJ5cmZmZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDk1NTUsImV4cCI6MjA4NzAyNTU1NX0.L2ckyzW9bs88_JTNwesk5Bz7LNYrYRr2-Y9ywoTINjU";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// bodyBg: the page background color or gradient
// bodyBgImage: decorative radial overlays without any rule/margin lines
// overlayEmojis: larger pool, placed only on edges and corners
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

// places emojis using px offsets from the page edges so they never overflow
// each placement uses either left OR right, and top with a random vertical spread
// "side" zones hug left/right edges, "corner" zones lock to top or bottom too
function generateEdgePlacements(pool, count = 10) {
  // each zone returns a style object with explicit left/right + top/bottom px offsets
  const zones = [
    () => ({ left: Math.round(rand(6, 22)),  top: `${Math.round(rand(8,  42))}%`  }),  // left strip top
    () => ({ left: Math.round(rand(6, 22)),  top: `${Math.round(rand(55, 88))}%`  }),  // left strip bottom
    () => ({ right: Math.round(rand(6, 22)), top: `${Math.round(rand(8,  42))}%`  }),  // right strip top
    () => ({ right: Math.round(rand(6, 22)), top: `${Math.round(rand(55, 88))}%`  }),  // right strip bottom
    () => ({ left: Math.round(rand(6, 30)),  top:    Math.round(rand(12, 40))      }),  // top-left corner
    () => ({ right: Math.round(rand(6, 30)), top:    Math.round(rand(12, 40))      }),  // top-right corner
    () => ({ left: Math.round(rand(6, 30)),  bottom: Math.round(rand(12, 50))      }),  // bottom-left corner
    () => ({ right: Math.round(rand(6, 30)), bottom: Math.round(rand(12, 50))      }),  // bottom-right corner
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

// renders emojis inside the notebook page, pinned to edges/corners via px offsets
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

function WritingNode({ writing, isEditing, onStartEdit, onDelete, onDragEnd, pageRef }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const saveTimer = useRef(null);
  const isEditingRef = useRef(isEditing);
  const onStartEditRef = useRef(onStartEdit);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  useEffect(() => { isEditingRef.current = isEditing; }, [isEditing]);
  useEffect(() => { onStartEditRef.current = onStartEdit; }, [onStartEdit]);
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
    if (!text) {
      onDelete(writing.id);
    } else {
      supabase.from("writings").update({ content: text }).eq("id", writing.id)
        .then(({ error }) => console.log("SAVE RESULT:", error || "success"));
    }
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
    <div
      ref={wrapRef}
      className={`writing-node ${isEditing ? "editing" : ""}`}
      style={{ left: writing.position_x, top: writing.position_y, color: writing.font_color, fontFamily: writing.font_style }}
      data-id={writing.id}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={ref}
        className="writing-node-text"
        contentEditable={isEditing}
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={(e) => { if (e.key === "Escape") ref.current.blur(); }}
        onBlur={handleBlur}
        spellCheck={false}
      >
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
              {/* preview outer = bodyBg, inner mini page = style */}
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
  const [activeInput, setActiveInput]     = useState(null);
  const [inputText, setInputText]         = useState("");
  const [editingId, setEditingId]         = useState(null);
  const [inkColor, setInkColor]           = useState("#1a1a2e");
  const [inkFont,  setInkFont]            = useState(FONTS[0].value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker,  setShowFontPicker]  = useState(false);
  const [pageThemeId, setPageThemeId]     = useState("sakura");
  const [showThemeModal, setShowThemeModal]   = useState(false);
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

  // apply body background + image when theme changes
  useEffect(() => {
    document.body.style.transition = "background 0.5s ease";
    document.body.style.background = pageTheme.bodyBg;
    document.body.style.backgroundImage = pageTheme.bodyBgImage === "none" ? "" : pageTheme.bodyBgImage;
  }, [pageTheme.bodyBg, pageTheme.bodyBgImage]);

  // initial load of all writings
  useEffect(() => {
    supabase.from("writings").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setWritings(data); });
  }, []);

  // load saved page settings (theme id + extra height)
  useEffect(() => {
    supabase.from("page_settings").select("*").eq("id", PAGE_THEME_ROW_ID).single()
      .then(({ data, error }) => {
        console.log("PAGE SETTINGS LOAD:", data, error);
        if (data?.theme_id) setPageThemeId(data.theme_id);
        if (data?.extra_height != null) setExtraHeight(data.extra_height);
        if (!data) {
          supabase.from("page_settings").insert({ id: PAGE_THEME_ROW_ID, theme_id: "sakura", changed_by: MY_NAME, extra_height: 0 })
            .then(({ error: e }) => console.log("PAGE SETTINGS INIT:", e || "created"));
        }
      });
  }, []);

  // realtime: writings + page_settings + presence
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

  // click handler: edit existing node or place new input
  useEffect(() => {
    const handler = (e) => {
      if (!pageRef.current?.contains(e.target)) return;
      const node      = e.target.closest("[data-id]");
      const toolbar   = e.target.closest(".toolbar");
      const deleteBtn = e.target.closest(".delete-btn");
      if (toolbar || deleteBtn) return;
      if (node) {
        e.stopPropagation();
        e.preventDefault();
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

  const currentFontLabel = FONTS.find((f) => f.value === inkFont)?.label || "Caveat";

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
          border-radius: 40px; padding: 10px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          flex-wrap: wrap; justify-content: center;
          position: relative; z-index: 1000; overflow: visible;
        }
        .toolbar-title {
          font-family: 'Caveat', cursive;
          font-size: 22px;
          font-weight: 600;
          color: #4a2838;
          letter-spacing: -0.5px;
        }

        .live-badge {
          background: linear-gradient(135deg, #ff85a2, #ff6b9d);
          color: white;
          font-size: 11px;
          font-family: monospace;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .toolbar-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 160, 200, 0.4);
          flex-shrink: 0;
        }

        .toolbar-label {
          font-size: 11px;
          color: #a07888;
          font-family: 'Patrick Hand', cursive;
          white-space: nowrap;
        }

        .ink-btn-wrap {
          position: relative;
          overflow: visible;
        }

        .ink-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2.5px solid white;
          box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.15s;
          flex-shrink: 0;
          align-self: center;
        }

        .ink-btn:hover {
          transform: scale(1.12);
        }

        .font-btn-wrap {
          position: relative;
          overflow: visible;
          display: flex;
          align-items: center;
        }

        .font-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 240, 248, 0.9);
          border: 1.5px solid rgba(255, 180, 210, 0.5);
          border-radius: 14px;
          padding: 0 12px;
          cursor: pointer;
          font-family: 'Patrick Hand', cursive;
          font-size: 12px;
          color: #8b4060;
          width: 130px;
          height: 32px;
          white-space: nowrap;
          overflow: hidden;
          align-self: center;
        }

        .font-btn:hover {
          background: rgba(255, 220, 238, 0.95);
        }

        .page-btns {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .change-page-btn {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #ff85a2, #ff6b9d);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 0 14px;
          height: 32px;
          font-family: 'Caveat', cursive;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.15s;
          box-shadow: 0 2px 10px rgba(255, 107, 157, 0.35);
          white-space: nowrap;
          align-self: center;
        }

        .change-page-btn:hover {
          transform: scale(1.06);
        }

        .add-page-btn {
          display: flex;
          align-items: center;
          background: rgba(255, 240, 248, 0.9);
          color: #8b4060;
          border: 1.5px solid rgba(255, 180, 210, 0.5);
          border-radius: 20px;
          padding: 0 14px;
          height: 32px;
          font-family: 'Caveat', cursive;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.15s, background 0.15s;
          white-space: nowrap;
          align-self: center;
        }

        .add-page-btn:hover {
          background: rgba(255, 220, 238, 0.95);
          transform: scale(1.06);
        }

        .picker-popup {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: #fffbf8;
          border: 1px solid rgba(255, 180, 210, 0.5);
          border-radius: 16px;
          padding: 14px;
          box-shadow: 0 12px 40px rgba(255, 107, 157, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 9999;
          width: 220px;
          animation: popIn 0.15s ease;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .picker-label {
          display: block;
          font-family: 'Patrick Hand', cursive;
          font-size: 11px;
          color: #b080a0;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .swatch-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 6px;
          margin-bottom: 12px;
        }

        .swatch {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer;
          transition: transform 0.12s;
        }

        .swatch:hover {
          transform: scale(1.2);
        }

        .swatch.active {
          border-color: #ff6b9d;
          transform: scale(1.12);
        }

        .picker-row {
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid rgba(255, 200, 220, 0.4);
          padding-top: 10px;
          margin-bottom: 8px;
        }

        .native-color {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(255, 180, 210, 0.5);
          border-radius: 8px;
          padding: 2px;
          cursor: pointer;
          background: none;
          flex-shrink: 0;
        }

        .hex-input {
          width: 68px;
          font-family: monospace;
          font-size: 11px;
          border: 1.5px solid rgba(255, 180, 210, 0.5);
          border-radius: 8px;
          padding: 3px 6px;
          color: #4a2838;
          outline: none;
          background: white;
        }

        .hex-input:focus {
          border-color: #ff85a2;
        }

        .font-option {
          display: flex;
          align-items: center;
          width: 100%;
          background: none;
          border: 1.5px solid transparent;
          border-radius: 10px;
          padding: 7px 8px;
          cursor: pointer;
          text-align: left;
        }

        .font-option:hover {
          background: rgba(255, 210, 230, 0.3);
        }

        .font-option.active {
          border-color: #ff85a2;
          background: rgba(255, 210, 230, 0.2);
        }

        .page-wrapper {
          position: relative;
          width: 100%;
          min-height: 80vh;
        }

        .notebook-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 40px rgba(0, 0, 0, 0.12), 4px 0 0 rgba(0, 0, 0, 0.06), -2px 0 0 rgba(255, 255, 255, 0.4);
          cursor: crosshair;
          overflow: hidden;
          transition: opacity 0.22s ease, filter 0.22s ease;
          padding-bottom: 200px;
        }

        .notebook-page.transitioning {
          opacity: 0;
          filter: blur(8px);
        }

        .writing-node {
          position: absolute;
          z-index: 10;
          cursor: grab;
          animation: inkDrop 0.3s ease-out;
          user-select: none;
          max-width: min(380px, calc(100% - 20px));
        }

        .writing-node.editing {
          cursor: text;
        }

        .writing-node-text {
          display: block;
          font-size: 20px;
          line-height: 1.4;
          white-space: pre-wrap;
          word-break: break-word;
          width: 100%;
          outline: none;
          border-radius: 2px;
          padding: 1px 3px;
          transition: background 0.15s;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
          min-height: 1.2em;
          min-width: 4px;
        }

        .writing-node:not(.editing):hover .writing-node-text {
          background: rgba(255, 230, 80, 0.3);
        }

        .writing-node.editing .writing-node-text {
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 0 1.5px rgba(100, 150, 255, 0.4);
          user-select: text;
          caret-color: currentColor;
          text-shadow: none;
        }

        .delete-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #e74c3c;
          color: white;
          border: none;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 20;
          padding: 0;
        }

        .writing-node:hover .delete-btn {
          display: flex;
        }

        @keyframes inkDrop {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }

        .active-input-wrapper {
          position: absolute;
          transform: translateY(-50%);
          z-index: 20;
        }

        .active-input {
          background: transparent;
          border: none;
          border-bottom: 2px dashed currentColor;
          outline: none;
          font-size: 20px;
          min-width: 200px;
          max-width: 400px;
          padding: 0 2px;
          font-family: inherit;
          color: inherit;
        }

        .active-input::placeholder {
          opacity: 0.5;
          font-size: 15px;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(20, 0, 10, 0.45);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(3px);
          animation: fadeIn 0.15s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          background: #fffbf8;
          border-radius: 22px;
          width: min(760px, 96vw);
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 24px 70px rgba(255, 107, 157, 0.2), 0 8px 20px rgba(0, 0, 0, 0.12);
          animation: slideUp 0.22s ease;
          border: 1px solid rgba(255, 180, 200, 0.5);
        }

        @keyframes slideUp {
          from {
            transform: translateY(28px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 26px 10px;
          position: sticky;
          top: 0;
          background: #fffbf8;
          z-index: 2;
          border-bottom: 1px solid rgba(255, 180, 200, 0.3);
        }

        .modal-title {
          font-family: 'Caveat', cursive;
          font-size: 22px;
          font-weight: 600;
          color: #4a2838;
        }

        .modal-subtitle {
          font-family: 'Patrick Hand', cursive;
          font-size: 13px;
          color: #b06080;
          padding: 8px 26px 4px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #c07090;
          padding: 4px 8px;
          border-radius: 10px;
        }

        .modal-close:hover {
          background: rgba(255, 180, 200, 0.3);
        }

        .modal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 12px;
          padding: 16px 24px 28px;
        }

        .theme-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: none;
          border: 2.5px solid transparent;
          border-radius: 16px;
          padding: 8px;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.15s;
          position: relative;
        }

        .theme-card:hover {
          border-color: #ffb0c8;
          transform: translateY(-3px) scale(1.03);
        }

        .theme-card.selected {
          border-color: #ff6b9d;
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.18);
        }

        .theme-preview-wrap {
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.07);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background-size: cover;
        }

        .theme-preview-page {
          width: 80%;
          height: 80%;
          border-radius: 5px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .theme-card-label {
          font-family: 'Patrick Hand', cursive;
          font-size: 11px;
          color: #4a2838;
          text-align: center;
          line-height: 1.4;
        }

        .theme-check {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #ff85a2, #ff6b9d);
          color: white;
          border-radius: 50%;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notif {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(60, 10, 30, 0.92);
          color: #ffeaf4;
          font-family: 'Patrick Hand', cursive;
          font-size: 14px;
          padding: 11px 24px;
          border-radius: 30px;
          box-shadow: 0 4px 24px rgba(255, 107, 157, 0.35);
          z-index: 3000;
          white-space: nowrap;
          pointer-events: none;
          animation: notifIn 0.3s ease, notifOut 0.4s ease 3.1s forwards;
        }

        @keyframes notifIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes notifOut {
          from { opacity: 1; }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(14px);
          }
        }
          
      `}</style>


      <div className="toolbar">
        <span className="toolbar-title">📓 shared notebook</span>
        <span className="live-badge">● {liveUsers} online</span>

        <div className="toolbar-divider" />
        <span className="toolbar-label">Ink</span>
        <div className="ink-btn-wrap">
          <button className="ink-btn" style={{ background: inkColor }}
            onClick={(e) => { e.stopPropagation(); setShowColorPicker((v) => !v); setShowFontPicker(false); }} />
          {showColorPicker && <ColorPicker color={inkColor} onChange={setInkColor} onClose={() => setShowColorPicker(false)} />}
        </div>

        <div className="toolbar-divider" />
        <span className="toolbar-label">Font</span>
        <div className="font-btn-wrap">
          <button className="font-btn toolbar" onClick={(e) => { e.stopPropagation(); setShowFontPicker((v) => !v); setShowColorPicker(false); }}>
            <span style={{ fontFamily: inkFont, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{currentFontLabel}</span>
            <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
          </button>
          {showFontPicker && <FontPicker currentFont={inkFont} onChange={setInkFont} onClose={() => setShowFontPicker(false)} />}
        </div>

        <div className="toolbar-divider" />
        <div className="page-btns">
          <button className="change-page-btn toolbar" onClick={(e) => { e.stopPropagation(); setShowThemeModal(true); }}>
            🌸 Change Page
          </button>
          <button className="add-page-btn toolbar"
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
            <WritingNode
              key={w.id}
              writing={w}
              isEditing={editingId === w.id}
              onStartEdit={(id) => setEditingId(id)}
              onDelete={handleDelete}
              onDragEnd={handleDragEnd}
              pageRef={pageRef}
            />
          ))}

          {activeInput && (
            <div className="active-input-wrapper"
              style={{ left:`${(activeInput.x/100)*(pageRef.current?.offsetWidth||900)}px`, top:`${(activeInput.y/100)*(pageRef.current?.scrollHeight||600)}px`, color:inkColor, fontFamily:inkFont }}>
              <input
                ref={inputRef}
                className="active-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleSubmit}
                placeholder="type & press Enter..."
                style={{ color:inkColor, fontFamily:inkFont }}
              />
            </div>
          )}
        </div>
      </div>

      {showThemeModal && (
        <ThemeModal
          currentThemeId={pageThemeId}
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