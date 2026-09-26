import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TOPICS } from "../data/topicsData";

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((item) => item.id === id);

  const [isCompleted, setIsCompleted] = useState(false);

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

  if (!topic) {
    return (
      <div className="container" style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Тема не найдена</h2>
        <button 
          onClick={() => navigate("/topics")} 
          style={{ marginTop: "16px", background: "var(--accent-orange)", padding: "8px 16px" }}
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="container page-anim">
      <button 
        onClick={() => navigate("/topics")}
        style={{ background: "transparent", color: "var(--text-muted)", marginBottom: "16px" }}
      >
        ← Назад к списку тем
      </button>

      {/* Интерфейс разделенного экрана LeetCode */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "520px" }}>
        
        {/* Левая панель: Спецификация и концепция */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "6px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{topic.category}</span>
              <h2 style={{ fontSize: "20px", marginTop: "4px" }}>{topic.title}</h2>
            </div>
            <button 
              onClick={handleToggle}
              style={{
                background: isCompleted ? "var(--accent-green)" : "var(--bg-tertiary)",
                color: isCompleted ? "#000" : "var(--text-main)",
                fontWeight: 600,
                padding: "8px 14px",
                borderRadius: "4px"
              }}
            >
              {isCompleted ? "✓ Пройдено" : "Отметить пройденным"}
            </button>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
              Синтаксическая сигнатура
            </div>
            <div style={{ 
              background: "var(--bg-main)", 
              padding: "10px", 
              borderRadius: "4px", 
              border: "1px solid var(--border-color)", 
              fontFamily: "var(--font-mono)", 
              fontSize: "13px" 
            }}>
              {topic.syntaxSummary}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
              Теоретическое описание
            </div>
            <p style={{ fontSize: "14px", color: "#d0d0d0", lineHeight: "1.6" }}>
              {topic.theory}
            </p>
          </div>
        </div>

        {/* Правая панель: Редактор кода */}
        <div style={{ 
          background: "var(--bg-secondary)", 
          border: "1px solid var(--border-color)", 
          borderRadius: "6px", 
          overflow: "hidden", 
          display: "flex", 
          flexDirection: "column" 
        }}>
          <div style={{ 
            background: "var(--bg-tertiary)", 
            padding: "8px 16px", 
            borderBottom: "1px solid var(--border-color)", 
            fontSize: "12px", 
            color: "var(--text-muted)", 
            display: "flex", 
            justifyContent: "space-between" 
          }}>
            <span>solution.cpp</span>
            <span>C++20 Clang</span>
          </div>
          <pre style={{ 
            padding: "16px", 
            margin: 0, 
            background: "#141414", 
            color: "#e6e6e6", 
            fontFamily: "var(--font-mono)", 
            fontSize: "13px", 
            overflowX: "auto",
            flexGrow: 1
          }}>
            <code>{topic.codeSample}</code>
          </pre>
        </div>

      </div>
    </div>
  );
}