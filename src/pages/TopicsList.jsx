import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TOPICS } from "../data/topicsData";

export default function TopicsList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [difficultyFilter, setDifficultyFilter] = useState("Все");
  
  const [completedMap, setCompletedMap] = useState(() => {
    try {
      const saved = localStorage.getItem("completedTopics");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("completedTopics", JSON.stringify(completedMap));
  }, [completedMap]);

  const toggleTopic = (id) => {
    setCompletedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = ["Все", "Основы", "Память", "Функции", "Файлы", "Архитектура", "ООП", "Шаблоны"];

  const filteredTopics = (TOPICS || []).filter((t) => {
    const s = search.toLowerCase();
    const matchesSearch = (t.title || "").toLowerCase().includes(s) || 
                          (t.syntax || "").toLowerCase().includes(s);
    const matchesCat = category === "Все" || t.category === category;
    const matchesDiff = difficultyFilter === "Все" || t.difficulty === difficultyFilter;
    return matchesSearch && matchesCat && matchesDiff;
  });

  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const totalCount = TOPICS ? TOPICS.length : 0;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const getDifficultyBadge = (diff) => {
    if (diff === "Easy") return { color: "#2cbb5d", bg: "rgba(44, 187, 93, 0.12)" };
    if (diff === "Medium") return { color: "#ffc01e", bg: "rgba(255, 192, 30, 0.12)" };
    return { color: "#ef4743", bg: "rgba(239, 71, 67, 0.12)" };
  };

  return (
    <div className="container page-anim" style={{ padding: "24px 16px" }}>
      {/* Аналитический блок */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: "24px",
        marginBottom: "24px",
        background: "var(--bg-secondary)",
        padding: "24px",
        borderRadius: "8px",
        border: "1px solid var(--border-color)"
      }}>
        <div>
          <div style={{ display: "inline-block", background: "rgba(255, 161, 22, 0.1)", color: "var(--accent-orange)", border: "1px solid rgba(255,161,22,0.2)", borderRadius: "4px", fontSize: "11px", fontWeight: 700, padding: "2px 8px", marginBottom: "8px" }}>
            C++ ROADMAP
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 8px 0" }}>
            Каталог тем C++ & ООП
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0 }}>
            Всего доступно тем: {totalCount}. Отслеживайте прогресс изучения синтаксиса и алгоритмов.
          </p>
        </div>

        <div style={{ background: "var(--bg-main)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>ПРОГРЕСС</span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent-green)" }}>
              {completedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>
          <div style={{ height: "6px", width: "100%", background: "#262626", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "var(--accent-green)", transition: "width 0.3s ease" }} />
          </div>
        </div>
      </div>

      {/* Панель фильтрации */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input 
            placeholder="Поиск по названию или синтаксису..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "260px" }}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c === "Все" ? "Все разделы" : c}</option>
            ))}
          </select>
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option value="Все">Любая сложность</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          Показано: <strong style={{ color: "var(--text-main)" }}>{filteredTopics.length}</strong>
        </div>
      </div>

      {/* Таблица */}
      <div style={{ background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "50px 1fr 140px 100px 90px", 
          padding: "12px 18px", 
          background: "var(--bg-tertiary)", 
          fontSize: "11px", 
          color: "var(--text-muted)", 
          fontWeight: 700,
          textTransform: "uppercase"
        }}>
          <div>Статус</div>
          <div>Тема</div>
          <div>Категория</div>
          <div>Сложность</div>
          <div style={{ textAlign: "right" }}>Разбор</div>
        </div>

        {filteredTopics.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
            Темы не найдены по заданным фильтрам
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isDone = !!completedMap[topic.id];
            const badge = getDifficultyBadge(topic.difficulty);

            return (
              <div 
                key={topic.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "50px 1fr 140px 100px 90px",
                  padding: "14px 18px",
                  alignItems: "center",
                  borderTop: "1px solid var(--border-color)",
                  background: isDone ? "rgba(44, 187, 93, 0.03)" : "transparent"
                }}
              >
                <div>
                  <input 
                    type="checkbox" 
                    checked={isDone} 
                    onChange={() => toggleTopic(topic.id)}
                    style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "var(--accent-green)" }}
                  />
                </div>
                <div>
                  <Link 
                    to={`/topic/${topic.id}`} 
                    style={{ 
                      fontWeight: 600, 
                      fontSize: "14px",
                      color: isDone ? "var(--text-muted)" : "var(--text-main)",
                      textDecoration: isDone ? "line-through" : "none" 
                    }}
                  >
                    {topic.title}
                  </Link>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                    {topic.syntax}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "12px", background: "var(--bg-main)", padding: "2px 8px", borderRadius: "4px", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                    {topic.category}
                  </span>
                </div>
                <div>
                  <span style={{ color: badge.color, background: badge.bg, fontSize: "12px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px" }}>
                    {topic.difficulty}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Link 
                    to={`/topic/${topic.id}`} 
                    style={{ fontSize: "12px", color: "var(--accent-orange)", border: "1px solid var(--border-color)", padding: "4px 10px", borderRadius: "4px", background: "var(--bg-main)" }}
                  >
                    Код →
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
