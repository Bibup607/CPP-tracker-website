import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { TOPICS } from "../data/topicsData";

const DIFFICULTY_WEIGHT = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

export default function TopicsList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortDifficulty, setSortDifficulty] = useState("default"); // 'default' | 'asc' (Easy->Hard) | 'desc' (Hard->Easy)

  // Получаем список категорий
  const categories = useMemo(() => {
    const cats = new Set(TOPICS.map((t) => t.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Сохраненный прогресс
  const completedTopics = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("completedTopics") || "{}");
    } catch {
      return {};
    }
  }, []);

  // Фильтрация и сортировка
  const filteredAndSortedTopics = useMemo(() => {
    let result = TOPICS.filter((topic) => {
      const matchesSearch =
        topic.title.toLowerCase().includes(search.toLowerCase()) ||
        topic.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || topic.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortDifficulty === "asc") {
      result = [...result].sort(
        (a, b) => DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty]
      );
    } else if (sortDifficulty === "desc") {
      result = [...result].sort(
        (a, b) => DIFFICULTY_WEIGHT[b.difficulty] - DIFFICULTY_WEIGHT[a.difficulty]
      );
    }

    return result;
  }, [search, selectedCategory, sortDifficulty]);

  // Переключение сортировки по клику на столбец
  const toggleDifficultySort = () => {
    if (sortDifficulty === "default") setSortDifficulty("asc");
    else if (sortDifficulty === "asc") setSortDifficulty("desc");
    else setSortDifficulty("default");
  };

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "#2cbb5d";
    if (diff === "Medium") return "#ffc01e";
    return "#ef4743";
  };

  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / TOPICS.length) * 100);

  return (
    <div className="container page-anim" style={{ maxWidth: "1280px", padding: "40px 20px 80px" }}>
      
      {/* Шапка раздела со статистикой прогресса */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "32px",
        borderBottom: "1px solid var(--border-color)",
        paddingBottom: "24px"
      }}>
        <div>
          <span style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "1px" }}>
            Дорожная карта
          </span>
          <h1 style={{ fontSize: "32px", fontWeight: 800, margin: "6px 0 0 0" }}>
            Каталог тем C++
          </h1>
        </div>

        {/* Прогресс-бар LeetCode style */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          padding: "12px 20px",
          minWidth: "260px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
            <span style={{ color: "var(--text-muted)" }}>Пройдено:</span>
            <strong style={{ color: "var(--text-main)" }}>{completedCount} / {TOPICS.length} ({progressPercent}%)</strong>
          </div>
          <div style={{ width: "100%", height: "6px", background: "var(--bg-main)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: "var(--accent-green)",
              transition: "width 0.3s ease"
            }} />
          </div>
        </div>
      </div>

      {/* Панель фильтров, поиска и сортировки */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "14px",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flexGrow: 1, maxWidth: "600px" }}>
          {/* Поле поиска */}
          <input
            type="text"
            placeholder="Поиск по названию или категории..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flexGrow: 1,
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-main)",
              padding: "10px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none"
            }}
          />

          {/* Фильтр по категории */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-main)",
              padding: "10px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
              cursor: "pointer"
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "Все категории" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Быстрый селектор сортировки по сложности */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Сортировка:</span>
          <select
            value={sortDifficulty}
            onChange={(e) => setSortDifficulty(e.target.value)}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: sortDifficulty !== "default" ? "var(--accent-orange)" : "var(--text-main)",
              fontWeight: 600,
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="default">По порядку курса</option>
            <option value="asc">Сложность: Easy → Hard</option>
            <option value="desc">Сложность: Hard → Easy</option>
          </select>
        </div>
      </div>

      {/* Таблица тем в стиле LeetCode */}
      <div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "70px 1fr 180px 150px 110px",
          padding: "14px 20px",
          background: "var(--bg-tertiary)",
          borderBottom: "1px solid var(--border-color)",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          <div>Статус</div>
          <div>Название темы</div>
          <div>Категория</div>
          
          {/* Кликабельный заголовок для быстрой сортировки по сложности */}
          <div
            onClick={toggleDifficultySort}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: sortDifficulty !== "default" ? "var(--accent-orange)" : "var(--text-muted)",
              userSelect: "none"
            }}
            title="Нажмите для сортировки по сложности"
          >
            Сложность
            <span style={{ fontSize: "13px" }}>
              {sortDifficulty === "default" && "⇅"}
              {sortDifficulty === "asc" && "▲"}
              {sortDifficulty === "desc" && "▼"}
            </span>
          </div>

          <div style={{ textAlign: "right" }}>Действие</div>
        </div>

        {filteredAndSortedTopics.length === 0 ? (
          <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
            Ничего не найдено по вашему запросу.
          </div>
        ) : (
          filteredAndSortedTopics.map((topic, index) => {
            const isDone = !!completedTopics[topic.id];

            return (
              <div
                key={topic.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "70px 1fr 180px 150px 110px",
                  alignItems: "center",
                  padding: "16px 20px",
                  borderBottom: index !== filteredAndSortedTopics.length - 1 ? "1px solid var(--border-color)" : "none",
                  background: index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.01)",
                  fontSize: "14px",
                  transition: "background 0.15s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.01)")}
              >
                {/* Индикатор выполнения */}
                <div>
                  <span style={{
                    display: "inline-block",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: isDone ? "none" : "1.5px solid var(--border-color)",
                    background: isDone ? "var(--accent-green)" : "transparent",
                    color: "#121212",
                    textAlign: "center",
                    lineHeight: "18px",
                    fontSize: "11px",
                    fontWeight: 800
                  }}>
                    {isDone ? "✓" : ""}
                  </span>
                </div>

                {/* Название темы со ссылкой */}
                <div>
                  <Link
                    to={`/topic/${topic.id}`}
                    style={{
                      color: isDone ? "var(--text-muted)" : "var(--text-main)",
                      textDecoration: isDone ? "line-through" : "none",
                      fontWeight: 600
                    }}
                  >
                    {topic.title}
                  </Link>
                </div>

                {/* Категория */}
                <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  {topic.category}
                </div>

                {/* Сложность темы */}
                <div>
                  <span style={{
                    color: getDifficultyColor(topic.difficulty),
                    background: `${getDifficultyColor(topic.difficulty)}18`,
                    border: `1px solid ${getDifficultyColor(topic.difficulty)}40`,
                    padding: "3px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 700
                  }}>
                    {topic.difficulty}
                  </span>
                </div>

                {/* Ссылка на карточку */}
                <div style={{ textAlign: "right" }}>
                  <Link
                    to={`/topic/${topic.id}`}
                    style={{
                      color: "var(--accent-orange)",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none"
                    }}
                  >
                    Решать →
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