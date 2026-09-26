import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TOPICS } from "../data/topicsData";

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((item) => item.id === id);

  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("theory");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("completedTopics");
    if (saved) {
      const parsed = JSON.parse(saved);
      setIsCompleted(!!parsed[id]);
    }
  }, [id]);

  const handleToggle = () => {
    const saved = JSON.parse(localStorage.getItem("completedTopics") || "{}");
    const nextValue = !isCompleted;
    saved[id] = nextValue;
    localStorage.setItem("completedTopics", JSON.stringify(saved));
    setIsCompleted(nextValue);
  };

  const handleCopyCode = () => {
    if (topic) {
      navigator.clipboard.writeText(topic.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!topic) {
    return (
      <div className="container page-anim" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "40px 48px",
          maxWidth: "560px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(239, 71, 67, 0.12)",
            color: "var(--accent-red)",
            border: "1px solid rgba(239, 71, 67, 0.25)",
            padding: "4px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.5px",
            marginBottom: "18px"
          }}>
            <span>●</span> 404: TOPIC_NOT_FOUND
          </div>

          <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>
            Тема не существует или была перемещена
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
            Запрошенный идентификатор <code style={{ color: "var(--accent-orange)", background: "var(--bg-main)", padding: "2px 6px", borderRadius: "4px" }}>{id}</code> отсутствует в дорожной карте C++.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button 
              onClick={() => navigate("/")} 
              style={{
                background: "var(--accent-orange)",
                color: "#121212",
                fontWeight: 700,
                padding: "10px 22px",
                borderRadius: "6px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              В главное меню
            </button>

            <button 
              onClick={() => navigate("/topics")} 
              style={{
                background: "var(--bg-main)",
                color: "var(--text-main)",
                border: "1px solid var(--border-color)",
                fontWeight: 600,
                padding: "10px 18px",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              К каталогу тем
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "#2cbb5d";
    if (diff === "Medium") return "#ffc01e";
    return "#ef4743";
  };

  return (
    <div className="container page-anim" style={{ maxWidth: "1350px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <button 
          onClick={() => navigate("/topics")} 
          style={{ background: "transparent", color: "var(--text-muted)", fontSize: "13px", padding: 0, border: "none", cursor: "pointer" }}
        >
          ← Все темы курса
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", color: getDifficultyColor(topic.difficulty), fontWeight: 700 }}>
            {topic.difficulty}
          </span>
          <button 
            onClick={handleToggle}
            style={{
              background: isCompleted ? "var(--accent-green)" : "var(--bg-secondary)",
              border: isCompleted ? "none" : "1px solid var(--border-color)",
              color: isCompleted ? "#000" : "var(--text-main)",
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: "4px",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            {isCompleted ? "✓ Пройдено" : "Отметить выполненным"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "16px", minHeight: "620px" }}>
        {/* Левая панель: Спецификация и Конспект */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "0.5px" }}>
              Раздел: {topic.category}
            </span>
            <h1 style={{ fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>
              {topic.title}
            </h1>
          </div>

          <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", background: "var(--bg-tertiary)" }}>
            <button 
              onClick={() => setActiveTab("theory")}
              style={{
                background: "transparent",
                color: activeTab === "theory" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "theory" ? "2px solid var(--accent-orange)" : "none",
                borderRadius: 0,
                padding: "10px 20px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              Конспект и Синтаксис
            </button>
            <button 
              onClick={() => setActiveTab("notes")}
              style={{
                background: "transparent",
                color: activeTab === "notes" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "notes" ? "2px solid var(--accent-orange)" : "none",
                borderRadius: 0,
                padding: "10px 20px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              Нюансы и Best Practices
            </button>
          </div>

          <div style={{ padding: "24px", overflowY: "auto", flexGrow: 1 }}>
            {activeTab === "theory" ? (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                    Ключевой синтаксис
                  </div>
                  <div style={{ 
                    background: "var(--bg-main)", 
                    padding: "12px 14px", 
                    borderRadius: "6px", 
                    border: "1px solid var(--border-color)", 
                    fontFamily: "var(--font-mono)", 
                    fontSize: "13px",
                    color: "var(--accent-orange)"
                  }}>
                    {topic.syntax}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                    Теоретическая база
                  </div>
                  <p style={{ fontSize: "14px", color: "#d0d0d0", lineHeight: "1.7" }}>
                    {topic.theory}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                  Важно помнить на практике
                </div>
                <div style={{ background: "rgba(255, 161, 22, 0.05)", borderLeft: "3px solid var(--accent-orange)", padding: "14px", borderRadius: "0 4px 4px 0" }}>
                  <p style={{ fontSize: "14px", color: "#e0e0e0", lineHeight: "1.6", margin: 0 }}>
                    {topic.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Правая панель: Окно исходного кода */}
        <div style={{ 
          background: "#141414", 
          border: "1px solid var(--border-color)", 
          borderRadius: "8px", 
          overflow: "hidden", 
          display: "flex", 
          flexDirection: "column" 
        }}>
          <div style={{ 
            background: "var(--bg-secondary)", 
            padding: "8px 16px", 
            borderBottom: "1px solid var(--border-color)", 
            fontSize: "12px", 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4743" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffc01e" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2cbb5d" }} />
              <span style={{ color: "var(--text-muted)", marginLeft: "8px", fontFamily: "var(--font-mono)" }}>main.cpp</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>C++20 (GCC 13)</span>
              <button 
                onClick={handleCopyCode}
                style={{
                  background: "var(--bg-tertiary)",
                  color: copied ? "var(--accent-green)" : "var(--text-muted)",
                  border: "1px solid var(--border-color)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  cursor: "pointer"
                }}
              >
                {copied ? "✓ Скопировано" : "Копировать"}
              </button>
            </div>
          </div>

          <pre style={{ 
            padding: "20px", 
            margin: 0, 
            background: "#141414", 
            color: "#e6e6e6", 
            fontFamily: "var(--font-mono)", 
            fontSize: "13px", 
            lineHeight: "1.6",
            overflowX: "auto",
            flexGrow: 1
          }}>
            <code>{topic.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}