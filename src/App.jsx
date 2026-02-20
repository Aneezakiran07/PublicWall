import { useState, useEffect, useRef } from "react";
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
const PAGE_THEMES = [
  {
    id: "sakura", label: "桜 Sakura", emoji: "🌸",
    bodyBg: "linear-gradient(135deg, #ffe0ec, #ffd6e7, #fce4f0)",
    style: { background: "#fff5f7", backgroundImage: "radial-gradient(ellipse at 10% 20%, rgba(255,182,193,0.5) 0%, transparent 45%), radial-gradient(ellipse at 85% 75%, rgba(255,153,186,0.4) 0%, transparent 45%), linear-gradient(transparent calc(100% - 1px), rgba(255,160,180,0.4) 100%)", backgroundSize: "100% 100%, 100% 100%, 100% 34px" },
    overlayEmojis: ["🌸","🌸","🌺","🌸","🌸"],
  },
  
];
function PageDecorations({ emojis }) {
  if (!emojis?.length) return null;
  const positions = [
    { top: "3%",    left: "2%",    size: 22, rotate: -15, opacity: 0.18 },
    { top: "6%",    right: "3%",   size: 18, rotate:  12, opacity: 0.15 },
    { bottom: "4%", left: "4%",    size: 20, rotate:   8, opacity: 0.16 },
    { bottom: "7%", right: "3%",   size: 22, rotate: -10, opacity: 0.18 },
    { top: "45%",   left: "1.5%",  size: 16, rotate:  20, opacity: 0.12 },
    { top: "52%",   right: "1.5%", size: 18, rotate:  -8, opacity: 0.13 },
  ];
  return (
    <>
      {positions.slice(0, Math.min(emojis.length, positions.length)).map((pos, i) => (
        <div key={i} style={{ position:"absolute", fontSize:`${pos.size}px`, opacity:pos.opacity, transform:`rotate(${pos.rotate}deg)`, pointerEvents:"none", userSelect:"none", zIndex:1, ...pos }}>
          {emojis[i % emojis.length]}
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
      const newX = ev.clientX - pageRect.left - dragOffset.current.x;
      const newY = ev.clientY - pageRect.top - dragOffset.current.y;
      wrapRef.current.style.left = `${newX}px`;
      wrapRef.current.style.top = `${newY}px`;
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
        const newX = ev.clientX - pageRect.left - dragOffset.current.x;
        const newY = ev.clientY - pageRect.top - dragOffset.current.y;
        onDragEnd(writing.id, newX, newY);
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
      <button
        className="delete-btn"
        onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(writing.id); }}
      >×</button>
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
        <p className="modal-subtitle">かわいい Japanese styles, Change Themes for everyone 🌸</p>
        <div className="modal-grid">
          {PAGE_THEMES.map((t) => (
            <button key={t.id} className={`theme-card${currentThemeId===t.id?" selected":""}`}
              onClick={() => { onSelect(t.id); onClose(); }}>
              <div className="theme-preview-wrap" style={{ background:t.bodyBg }}>
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
  const [writings, setWritings] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [inkColor, setInkColor] = useState("#1a1a2e");
  const [inkFont,  setInkFont]  = useState(FONTS[0].value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker,  setShowFontPicker]  = useState(false);
  const [pageThemeId, setPageThemeId]         = useState("sakura");
  const [showThemeModal, setShowThemeModal]   = useState(false);
  const [notification, setNotification]       = useState(null);
  const [transitioning, setTransitioning]     = useState(false);
  const [extraHeight, setExtraHeight]         = useState(0);
  const [liveUsers, setLiveUsers] = useState(0);
  const pageRef = useRef(null);
  const inputRef = useRef(null);
  const editingIdRef = useRef(null);
  const inputTextRef = useRef("");
  const activeInputRef = useRef(null);
  useEffect(() => { editingIdRef.current = editingId; }, [editingId]);
  useEffect(() => { inputTextRef.current = inputText; }, [inputText]);
  useEffect(() => { activeInputRef.current = activeInput; }, [activeInput]);
  const pageTheme = PAGE_THEMES.find((t) => t.id === pageThemeId) || PAGE_THEMES[0];
  useEffect(() => {
    document.body.style.transition = "background 0.5s ease";
    document.body.style.background = pageTheme.bodyBg;
  }, [pageTheme.bodyBg]);
  useEffect(() => {
    supabase.from("writings").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setWritings(data); });
  }, []);
  useEffect(() => {
    supabase.from("page_settings").select("*").eq("id", PAGE_THEME_ROW_ID).single()
      .then(({ data, error }) => {
        console.log("PAGE SETTINGS LOAD:", data, error);
        if (data?.theme_id) setPageThemeId(data.theme_id);
        if (data?.extra_height != null) setExtraHeight(data.extra_height);
        // If row doesn't exist yet, create it
        if (!data) {
          supabase.from("page_settings").insert({ id: PAGE_THEME_ROW_ID, theme_id: "sakura", changed_by: MY_NAME, extra_height: 0 })
            .then(({ error: e }) => console.log("PAGE SETTINGS INIT:", e || "created"));
        }
      });
  }, []);
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
  useEffect(() => {
    const handler = (e) => {
      if (!pageRef.current?.contains(e.target)) return;
      const node = e.target.closest("[data-id]");
      const toolbar = e.target.closest(".toolbar");
      const deleteBtn = e.target.closest(".delete-btn");
      if (toolbar) return;
      if (deleteBtn) return;
      if (node) {
        const id = node.dataset.id;
        e.stopPropagation();
        e.preventDefault();
        setEditingId(id);
        setActiveInput(null);
        return;
      }
      setEditingId(null);
      const rect = pageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setActiveInput({ x, y });
      setInputText("");
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  const inkColorRef = useRef(inkColor);
  const inkFontRef = useRef(inkFont);
  useEffect(() => { inkColorRef.current = inkColor; }, [inkColor]);
  useEffect(() => { inkFontRef.current = inkFont; }, [inkFont]);
  const handleSubmit = async (e) => {
    const text = inputTextRef.current;
    const pos = activeInputRef.current;
    if (e.key === "Enter" && text.trim() && pos) {
      const writing = {
        content: text.trim(),
        position_x: Math.min((pos.x / 100) * (pageRef.current?.offsetWidth || 900), (pageRef.current?.offsetWidth || 900) - 160),
        position_y: (pos.y / 100) * (pageRef.current?.scrollHeight || 600),
        font_color: inkColorRef.current,
        font_style: inkFontRef.current,
      };
      const { data } = await supabase.from("writings").insert([writing]).select().single();
      if (data) setWritings((prev) => [...prev, data]);
      setActiveInput(null);
      setInputText("");
    }
    if (e.key === "Escape") {
      setActiveInput(null);
      setInputText("");
    }
  };
  const handleDelete = async (id) => {
    setWritings((prev) => prev.filter((w) => w.id !== id));
    setEditingId(null);
    await supabase.from("writings").delete().eq("id", id);
  };
  const handleDragEnd = async (id, newX, newY) => {
    const pageW = pageRef.current?.offsetWidth || 900;
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

  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }

  body {
    min-height: 100vh;
    display: flex; 
    flex-direction: column; 
    align-items: center;
    padding: 24px 16px;
    font-family: 'Caveat', cursive;
    transition: background 0.5s ease;
  }

  /* Toolbar Section */
  .toolbar {
    display: flex; 
    align-items: center; 
    gap: 12px;
    margin-bottom: 20px;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(255,180,210,0.5);
    border-radius: 40px;
    padding: 10px 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    flex-wrap: wrap; 
    justify-content: center;
    position: relative; 
    z-index: 1000; 
    overflow: visible;
  }

  .toolbar-title { 
    font-family: 'Caveat', cursive; 
    font-size: 22px; 
    font-weight: 600; 
    color: #4a2838; 
    letter-spacing: -0.5px; 
  }

  .live-badge { 
    background: linear-gradient(135deg,#ff85a2,#ff6b9d); 
    color: white; 
    font-size: 11px; 
    font-family: monospace; 
    padding: 3px 10px; 
    border-radius: 20px; 
  }

  .toolbar-divider { 
    width: 1px; 
    height: 20px; 
    background: rgba(255,160,200,0.4); 
    flex-shrink: 0; 
  }

  .toolbar-label { 
    font-size: 11px; 
    color: #a07888; 
    font-family: 'Patrick Hand', cursive; 
    white-space: nowrap; 
  }

  /* Buttons & Interactive Elements */
  .ink-btn-wrap { 
    position: relative; 
    overflow: visible; 
  }

  .ink-btn { 
    width: 28px; 
    height: 28px; 
    border-radius: 50%; 
    border: 2.5px solid white; 
    box-shadow: 0 0 0 1.5px rgba(0,0,0,0.15); 
    cursor: pointer; 
    transition: transform 0.15s; 
  }

  .ink-btn:hover { 
    transform: scale(1.12); 
  }

  .font-btn-wrap { 
    position: relative; 
    overflow: visible; 
  }

  .font-btn { 
    display: flex; 
    align-items: center; 
    gap: 5px; 
    background: rgba(255,240,248,0.9); 
    border: 1.5px solid rgba(255,180,210,0.5); 
    border-radius: 14px; 
    padding: 4px 12px; 
    cursor: pointer; 
    font-family: 'Patrick Hand', cursive; 
    font-size: 12px; 
    color: #8b4060; 
    width: 130px; 
    white-space: nowrap; 
    overflow: hidden; 
  }

  .font-btn:hover { 
    background: rgba(255,220,238,0.95); 
  }

  .page-btns { 
    display: flex; 
    align-items: center; 
    gap: 6px; 
  }

  .change-page-btn { 
    background: linear-gradient(135deg,#ff85a2,#ff6b9d); 
    color: white; 
    border: none; 
    border-radius: 20px; 
    padding: 5px 12px; 
    font-family: 'Caveat', cursive; 
    font-size: 14px; 
    cursor: pointer; 
    transition: transform 0.15s; 
    box-shadow: 0 2px 10px rgba(255,107,157,0.35); 
    white-space: nowrap; 
  }

  .change-page-btn:hover { 
    transform: scale(1.06); 
  }

  .add-page-btn { 
    background: rgba(255,240,248,0.9); 
    color: #8b4060; 
    border: 1.5px solid rgba(255,180,210,0.5); 
    border-radius: 20px; 
    padding: 5px 12px; 
    font-family: 'Caveat', cursive; 
    font-size: 14px; 
    cursor: pointer; 
    transition: transform 0.15s, background 0.15s; 
    white-space: nowrap; 
  }

  .add-page-btn:hover { 
    background: rgba(255,220,238,0.95); 
    transform: scale(1.06); 
  }

  /* Popups & Pickers */
  .picker-popup {
    position: absolute; 
    top: calc(100% + 10px); 
    left: 50%; 
    transform: translateX(-50%);
    background: #fffbf8; 
    border: 1px solid rgba(255,180,210,0.5);
    border-radius: 16px; 
    padding: 14px;
    box-shadow: 0 12px 40px rgba(255,107,157,0.2), 0 4px 12px rgba(0,0,0,0.1);
    z-index: 9999; 
    width: 220px; 
    animation: popIn 0.15s ease;
  }

  @keyframes popIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
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
    border-top: 1px solid rgba(255,200,220,0.4); 
    padding-top: 10px; 
    margin-bottom: 8px; 
  }

  .native-color { 
    width: 32px; 
    height: 32px; 
    border: 2px solid rgba(255,180,210,0.5); 
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
    border: 1.5px solid rgba(255,180,210,0.5); 
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
    background: rgba(255,210,230,0.3); 
  }

  .font-option.active { 
    border-color: #ff85a2; 
    background: rgba(255,210,230,0.2); 
  }

  /* Notebook Page & Content */
  .page-wrapper { 
    position: relative; 
    width: 100%; 
    min-height: 80vh; 
  }

  .notebook-page {
    position: relative; 
    width: 100%; 
    min-height: 100vh;
    box-shadow: 0 4px 6px rgba(0,0,0,0.07), 
                0 10px 40px rgba(0,0,0,0.12), 
                4px 0 0 rgba(0,0,0,0.06), 
                -2px 0 0 rgba(255,255,255,0.4);
    cursor: crosshair; 
    overflow-x: clip; 
    overflow-y: visible;
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
    text-shadow: 0 1px 1px rgba(255,255,255,0.3); 
    min-height: 1.2em; 
    min-width: 4px; 
  }

  .writing-node:not(.editing):hover .writing-node-text { 
    background: rgba(255,230,80,0.3); 
  }

  .writing-node.editing .writing-node-text { 
    background: rgba(255,255,255,0.7); 
    box-shadow: 0 0 0 1.5px rgba(100,150,255,0.4); 
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
    from { opacity: 0; transform: translateY(-50%) scale(0.9); } 
    to { opacity: 1; transform: translateY(-50%) scale(1); } 
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

  /* Modals & Backdrop */
  .modal-backdrop { 
    position: fixed; 
    inset: 0; 
    background: rgba(20,0,10,0.45); 
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
    box-shadow: 0 24px 70px rgba(255,107,157,0.2), 0 8px 20px rgba(0,0,0,0.12); 
    animation: slideUp 0.22s ease; 
    border: 1px solid rgba(255,180,200,0.5); 
  }

  @keyframes slideUp { 
    from { transform: translateY(28px); opacity: 0; } 
    to { transform: translateY(0); opacity: 1; } 
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
    border-bottom: 1px solid rgba(255,180,200,0.3); 
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
    background: rgba(255,180,200,0.3); 
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
    box-shadow: 0 0 0 3px rgba(255,107,157,0.18); 
  }

  .theme-preview-wrap { 
    width: 100%; 
    aspect-ratio: 4/3; 
    border-radius: 10px; 
    border: 1px solid rgba(0,0,0,0.07); 
    overflow: hidden; 
    position: relative; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    padding: 8px; 
  }

  .theme-preview-page { 
    width: 80%; 
    height: 80%; 
    border-radius: 5px; 
    position: relative; 
    overflow: hidden; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.15); 
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
    background: linear-gradient(135deg,#ff85a2,#ff6b9d); 
    color: white; 
    border-radius: 50%; 
    font-size: 11px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }

  /* Notifications */
  .notif { 
    position: fixed; 
    bottom: 28px; 
    left: 50%; 
    transform: translateX(-50%); 
    background: rgba(60,10,30,0.92); 
    color: #ffeaf4; 
    font-family: 'Patrick Hand', cursive; 
    font-size: 14px; 
    padding: 11px 24px; 
    border-radius: 30px; 
    box-shadow: 0 4px 24px rgba(255,107,157,0.35); 
    z-index: 3000; 
    white-space: nowrap; 
    pointer-events: none; 
    animation: notifIn 0.3s ease, notifOut 0.4s ease 3.1s forwards; 
  }

  @keyframes notifIn { 
    from { opacity: 0; transform: translateX(-50%) translateY(14px); } 
    to { opacity: 1; transform: translateX(-50%) translateY(0); } 
  }

  @keyframes notifOut { 
    from { opacity: 1; } 
    to { opacity: 0; transform: translateX(-50%) translateY(14px); } 
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
          <button className="font-btn toolbar"
            onClick={(e) => { e.stopPropagation(); setShowFontPicker((v) => !v); setShowColorPicker(false); }}>
            <span style={{ fontFamily: inkFont, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{currentFontLabel}</span>
            <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
          </button>
          {showFontPicker && <FontPicker currentFont={inkFont} onChange={setInkFont} onClose={() => setShowFontPicker(false)} />}
        </div>

        <div className="toolbar-divider" />
        <div className="page-btns">
          <button className="change-page-btn toolbar"
            onClick={(e) => { e.stopPropagation(); setShowThemeModal(true); }}>
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
          <PageDecorations emojis={pageTheme.overlayEmojis} />
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



