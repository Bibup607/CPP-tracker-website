import { useState, useEffect } from "react";
import { TOPICS } from "../data/topicsData";
import TopicCard from "../components/TopicCard";

export default function TopicsList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [completedMap, setCompletedMap] = useState(() => {
    const saved = localStorage.getItem("completedTopics");
    return saved ? JSON.parse(saved) : {};
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

  const filteredTopics = TOPICS.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Все" || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const completedCount = Object.values(completedMap).filter(Boolean).length;

  return (
    <div className="container page-anim">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 600 }}>Каталог тем C++</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Отслеживание пройденного материала
          </p>
        </div>
        <div style={{
          background: "var(--bg-secondary)",
          padding: "10px 18px",
          borderRadius: "6px",
          border: "1px solid var(--border-color)",
          textAlign: "right"
        }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Пройдено</div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent-green)" }}>
            {completedCount} / {TOPICS.length}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <input 
          placeholder="Поиск по названию..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "260px" }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Все">Все категории</option>
          <option value="Основы">Основы</option>
          <option value="Память">Память</option>
          <option value="ООП">ООП</option>
          <option value="STL">STL</option>
        </select>
      </div>

      <div style={{ background: "var(--bg-secondary)", borderRadius: "6px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "50px 1fr 120px 100px 110px", 
          padding: "12px 16px", 
          background: "var(--bg-tertiary)", 
          fontSize: "12px", 
          color: "var(--text-muted)", 
          fontWeight: 600 
        }}>
          <div>СТАТУС</div>
          <div>НАЗВАНИЕ ТЕМЫ</div>
          <div>КАТЕГОРИЯ</div>
          <div>СЛОЖНОСТЬ</div>
          <div style={{ textAlign: "right" }}>ДЕЙСТВИЕ</div>
        </div>

        {filteredTopics.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
            Темы не найдены
          </div>
        ) : (
          filteredTopics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              isCompleted={!!completedMap[topic.id]} 
              onToggle={toggleTopic} 
            />
          ))
        )}
      </div>
    </div>
  );
}