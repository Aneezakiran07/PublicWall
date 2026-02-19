import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔧 REPLACE THESE WITH YOUR SUPABASE VALUES

const SUPABASE_URL = "https://cvchsjpvszyeryrfffek.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2hzanB2c3p5ZXJ5cmZmZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDk1NTUsImV4cCI6MjA4NzAyNTU1NX0.L2ckyzW9bs88_JTNwesk5Bz7LNYrYRr2-Y9ywoTINjU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const THEMES = [
  { label: "Ink", color: "#1a1a2e", font: "'Caveat', cursive" },
  { label: "Rose", color: "#c0392b", font: "'Kalam', cursive" },
  { label: "Navy", color: "#154360", font: "'Patrick Hand', cursive" },
  { label: "Forest", color: "#1e8449", font: "'Caveat', cursive" },
  { label: "Plum", color: "#6c3483", font: "'Kalam', cursive" },
  { label: "Rust", color: "#ba4a00", font: "'Patrick Hand', cursive" },
];

export default function App() {
  const [writings, setWritings] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // {x, y}
  const [inputText, setInputText] = useState("");
  const [theme, setTheme] = useState(THEMES[0]);
  const [liveUsers, setLiveUsers] = useState(0);
  const pageRef = useRef(null);
  const inputRef = useRef(null);
  const channelRef = useRef(null);

  // Load initial writings
  useEffect(() => {
    supabase
      .from("writings")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setWritings(data);
      });
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("writings-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "writings" },
        (payload) => {
          setWritings((prev) => [...prev, payload.new]);
        }
      )
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setLiveUsers(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ joined_at: Date.now() });
        }
      });

    channelRef.current = channel;
    return () => supabase.removeChannel(channel);
  }, []);

  const handlePageClick = useCallback(
    (e) => {
      if (e.target.closest(".toolbar") || e.target.closest(".writing-text"))
        return;
      const rect = pageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setActiveInput({ x, y });
      setInputText("");
      setTimeout(() => inputRef.current?.focus(), 50);
    },
    []
  );

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      const writing = {
        content: inputText.trim(),
        position_x: activeInput.x,
        position_y: activeInput.y,
        font_color: theme.color,
        font_style: theme.font,
      };
      await supabase.from("writings").insert([writing]);
      setActiveInput(null);
      setInputText("");
    }
    if (e.key === "Escape") {
      setActiveInput(null);
      setInputText("");
    }
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
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.15s, border-color 0.15s;
        }
        .theme-btn:hover { transform: scale(1.2); }
        .theme-btn.active { border-color: #4a3728; transform: scale(1.15); }

        .hint {
          font-size: 13px;
          color: #8a7a6a;
          font-family: 'Patrick Hand', cursive;
        }

        .page-wrapper {
          position: relative;
          width: 100%;
          max-width: 900px;
          min-height: 80vh;
        }

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

          /* Notebook lines */
          background-image:
            linear-gradient(transparent calc(100% - 1px), #c8d8e8 calc(100%));
          background-size: 100% 36px;
          background-position: 0 60px;
        }

        /* Red margin line */
        .notebook-page::before {
          content: '';
          position: absolute;
          left: 72px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(220, 120, 120, 0.4);
          z-index: 1;
        }

        /* Hole punches */
        .notebook-page::after {
          content: '';
          position: absolute;
          left: 22px;
          top: 0;
          bottom: 0;
          width: 40px;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 120px,
            #e8e0d0 120px,
            #e8e0d0 124px,
            transparent 124px,
            transparent 144px,
            #e8e0d0 144px,
            #e8e0d0 148px,
            transparent 148px,
            transparent 268px
          );
          z-index: 0;
        }

        .writing-text {
          position: absolute;
          white-space: nowrap;
          line-height: 1.2;
          font-size: 20px;
          pointer-events: none;
          transform: translateY(-50%);
          padding: 0;
          cursor: default;
          text-shadow: 0 1px 1px rgba(255,255,255,0.3);
          animation: inkDrop 0.3s ease-out;
          z-index: 10;
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

        .active-input::placeholder { opacity: 0.5; font-size: 15px; }
      `}</style>

      <div className="toolbar">
        <span className="toolbar-title">📓 shared notebook</span>
        <span className="live-badge">● {liveUsers} online</span>
        <span className="hint">click anywhere to write</span>
        {THEMES.map((t) => (
          <button
            key={t.label}
            className={`theme-btn ${theme.label === t.label ? "active" : ""}`}
            style={{ background: t.color }}
            title={t.label}
            onClick={() => setTheme(t)}
          />
        ))}
      </div>

      <div className="page-wrapper">
        <div className="notebook-page" ref={pageRef} onClick={handlePageClick}>
          {writings.map((w) => (
            <span
              key={w.id}
              className="writing-text"
              style={{
                left: `${w.position_x}%`,
                top: `${w.position_y}%`,
                color: w.font_color,
                fontFamily: w.font_style,
              }}
            >
              {w.content}
            </span>
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