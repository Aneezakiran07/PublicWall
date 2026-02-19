import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cvchsjpvszyeryrfffek.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2hzanB2c3p5ZXJ5cmZmZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDk1NTUsImV4cCI6MjA4NzAyNTU1NX0.L2ckyzW9bs88_JTNwesk5Bz7LNYrYRr2-Y9ywoTINjU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const THEMES = [
  { label: "Ink",    color: "#1a1a2e", font: "'Caveat', cursive" },
  { label: "Rose",   color: "#c0392b", font: "'Kalam', cursive" },
  { label: "Navy",   color: "#154360", font: "'Patrick Hand', cursive" },
  { label: "Forest", color: "#1e8449", font: "'Caveat', cursive" },
  { label: "Plum",   color: "#6c3483", font: "'Kalam', cursive" },
  { label: "Rust",   color: "#ba4a00", font: "'Patrick Hand', cursive" },
];

function WritingNode({ writing, isEditing, onStartEdit, onDelete }) {
  const ref = useRef(null);
  const saveTimer = useRef(null);
  const isEditingRef = useRef(isEditing);
  const onStartEditRef = useRef(onStartEdit);

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
  console.log("BLUR - saving text:", text, "for id:", writing.id);
  if (!text) {
    onDelete(writing.id);
  } else {
    supabase
      .from("writings")
      .update({ content: text })
      .eq("id", writing.id)
      .then(({ error }) => console.log("SAVE RESULT:", error || "success"));
  }
};

  return (
    <div
      className={`writing-node ${isEditing ? "editing" : ""}`}
      style={{
        left: `${writing.position_x}%`,
        top: `${writing.position_y}%`,
        color: writing.font_color,
        fontFamily: writing.font_style,
      }}
      data-id={writing.id}
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
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete(writing.id);
        }}
      >×</button>
    </div>
  );
}

export default function App() {
  const [writings, setWritings] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [theme, setTheme] = useState(THEMES[0]);
  const [liveUsers, setLiveUsers] = useState(0);
  const pageRef = useRef(null);
  const inputRef = useRef(null);
  const editingIdRef = useRef(null);

  useEffect(() => { editingIdRef.current = editingId; }, [editingId]);

  useEffect(() => {
    supabase
      .from("writings")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setWritings(data); });
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
      .on("presence", { event: "sync" }, () => {
        setLiveUsers(Object.keys(channel.presenceState()).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") await channel.track({ joined_at: Date.now() });
      });

    return () => supabase.removeChannel(channel);
  }, []);

  // single global click handler on document
useEffect(() => {
  
  const handler = (e) => {
    if (!pageRef.current?.contains(e.target)) return;
    console.log("CLICK TARGET:", e.target);
    console.log("CLOSEST NODE:", e.target.closest(".writing-node"));
    
    const node = e.target.closest("[data-id]");
    const toolbar = e.target.closest(".toolbar");
    const deleteBtn = e.target.closest(".delete-btn");

    if (toolbar) { console.log("TOOLBAR CLICK, returning"); return; }
    if (deleteBtn) { console.log("DELETE BTN, returning"); return; }

    if (node) {
  const id = node.dataset.id;
  console.log("NODE FOUND, id:", id);
  e.stopPropagation();
  e.preventDefault();
  setEditingId(id);
  setActiveInput(null);
  return;  // make sure this return is there
}
    console.log("BLANK CANVAS CLICK");
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

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      const writing = {
        content: inputText.trim(),
        position_x: activeInput.x,
        position_y: activeInput.y,
        font_color: theme.color,
        font_style: theme.font,
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Kalam:wght@300;400&family=Patrick+Hand&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #e8e0d0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 16px;
          font-family: 'Caveat', cursive;
        }

        .toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          background: rgba(255,255,255,0.85);
          border: 1px solid #c9b99a;
          border-radius: 40px;
          padding: 10px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          flex-wrap: wrap;
          justify-content: center;
          z-index: 100;
        }

        .toolbar-title {
          font-family: 'Caveat', cursive;
          font-size: 22px;
          font-weight: 600;
          color: #4a3728;
          letter-spacing: -0.5px;
          margin-right: 8px;
        }

        .live-badge {
          background: #e74c3c;
          color: white;
          font-size: 11px;
          font-family: monospace;
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }

        .theme-btn {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.15s, border-color 0.15s;
        }
        .theme-btn:hover { transform: scale(1.2); }
        .theme-btn.active { border-color: #4a3728; transform: scale(1.15); }

        .hint { font-size: 13px; color: #8a7a6a; font-family: 'Patrick Hand', cursive; }

        .page-wrapper { position: relative; width: 100%; max-width: 900px; min-height: 80vh; }

        .notebook-page {
          position: relative;
          width: 100%;
          min-height: 80vh;
          background-color: #fdfaf4;
          border-radius: 4px;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.07),
            0 10px 40px rgba(0,0,0,0.12),
            4px 0 0 #e8d5b7,
            -2px 0 0 #f5edd8;
          cursor: crosshair;
          overflow: hidden;
          background-image: linear-gradient(transparent calc(100% - 1px), #c8d8e8 calc(100%));
          background-size: 100% 36px;
          background-position: 0 60px;
        }

        .notebook-page::before {
          content: '';
          position: absolute;
          left: 72px; top: 0; bottom: 0;
          width: 1px;
          background: rgba(220, 120, 120, 0.4);
          z-index: 1;
        }

        .notebook-page::after {
          content: '';
          position: absolute;
          left: 22px; top: 0; bottom: 0; width: 40px;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 120px,
            #e8e0d0 120px, #e8e0d0 124px,
            transparent 124px, transparent 144px,
            #e8e0d0 144px, #e8e0d0 148px,
            transparent 148px, transparent 268px
          );
          z-index: 0;
        }

        .writing-node {
          position: absolute;
          transform: translateY(-50%);
          z-index: 10;
          cursor: pointer;
          animation: inkDrop 0.3s ease-out;
        }

        .writing-node-text {
          display: inline-block;
          font-size: 20px;
          line-height: 1.2;
          white-space: pre-wrap;
          word-break: break-word;
          max-width: 480px;
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

        .writing-node.editing { cursor: text; }

        .writing-node.editing .writing-node-text {
          background: rgba(255,255,255,0.7);
          box-shadow: 0 0 0 1.5px rgba(100,150,255,0.4);
          user-select: text;
          caret-color: currentColor;
          text-shadow: none;
        }

        .delete-btn {
          position: absolute;
          top: -8px; right: -8px;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #e74c3c;
          color: white; border: none;
          font-size: 14px; line-height: 1;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 20; padding: 0;
        }
        .writing-node:hover .delete-btn { display: flex; }

        @keyframes inkDrop {
          from { opacity: 0; transform: translateY(-50%) scale(0.9); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
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

        .active-input::placeholder { opacity: 0.5; font-size: 15px; }
      `}</style>

      <div className="toolbar">
        <span className="toolbar-title">📓 shared notebook</span>
        <span className="live-badge">● {liveUsers} online</span>
        <span className="hint">click anywhere to write · click text to edit</span>
        {THEMES.map((t) => (
          <button
            key={t.label}
            className={`theme-btn ${theme.label === t.label ? "active" : ""}`}
            style={{ background: t.color }}
            title={t.label}
            onClick={(e) => { e.stopPropagation(); setTheme(t); }}
          />
        ))}
      </div>

      <div className="page-wrapper">
        <div className="notebook-page" ref={pageRef}>
          {writings.map((w) => (
            <WritingNode
              key={w.id}
              writing={w}
              isEditing={editingId === w.id}
              onStartEdit={(id) => setEditingId(id)}
              onDelete={handleDelete}
            />
          ))}

          {activeInput && (
            <div
              className="active-input-wrapper"
              style={{
                left: `${activeInput.x}%`,
                top: `${activeInput.y}%`,
                color: theme.color,
                fontFamily: theme.font,
              }}
            >
              <input
                ref={inputRef}
                className="active-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleSubmit}
                placeholder="type & press Enter..."
                style={{ color: theme.color, fontFamily: theme.font }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}



