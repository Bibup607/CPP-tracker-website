import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOPICS } from "../data/topicsData";
import { PROJECTS } from "../data/projectsData";

export default function Home() {
  const [quickQuery, setQuickQuery] = useState("");
  const [completedTopics, setCompletedTopics] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("completedTopics");
    if (saved) {
      try {
        setCompletedTopics(JSON.parse(saved));
      } catch (e) {
        setCompletedTopics({});
      }
    }
  }, []);

  const totalTopics = TOPICS.length;
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/topics?search=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      navigate("/topics");
    }
  };

  const tracks = [
    {
      id: "basics",
      badge: "Темы 1 — 8",
      badgeColor: "#2cbb5d",
      title: "Основы языка, адресация и управление памятью",
      dates: "Синтаксис, циклы, массивы, указатели & heap",
      author: "Базовый уровень",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      count: TOPICS.filter((t) =>
        ["Основы языка", "Управление потоком", "Структуры данных", "Управление памятью"].includes(t.category)
      ).length
    },
    {
      id: "modularity",
      badge: "Темы 9 — 11",
      badgeColor: "#ffa116",
      title: "Модульность, ссылки и многофайловая сборка",
      dates: "Рекурсия, перегрузка функций, .h и .cpp файлы",
      author: "Средний уровень",
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      count: TOPICS.filter((t) => t.category === "Модульность").length
    },
    {
      id: "oop",
      badge: "Темы 12 — 18",
      badgeColor: "#ef4743",
      title: "Объектно-ориентированное программирование",
      dates: "Инкапсуляция, string, полиморфизм & ромбовидное наследование",
      author: "Продвинутый уровень",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      count: TOPICS.filter((t) => t.category === "ООП").length
    }
  ];

  const cpp20Features = [
    {
      title: "Concepts (Концепты)",
      tag: "template <typename T>",
      desc: "Ограничения шаблонов во время компиляции с информативными сообщениями об ошибках сборки вместо SFINAE.",
      code: `template <typename T>\nrequires std::integral<T>\nT add(T a, T b) { return a + b; }`
    },
    {
      title: "Ranges (Диапазоны)",
      tag: "std::views",
      desc: "Ленивые конвейеры обработки данных через пайплайн (|) без аллокации временных контейнеров.",
      code: `auto evens = nums \n  | std::views::filter([](int n) { return n % 2 == 0; })\n  | std::views::transform([](int n) { return n * 2; });`
    },
    {
      title: "Coroutines (Корутины)",
      tag: "co_yield / co_await",
      desc: "Функции с возможностью приостановки и возобновления контекста без блокировки системного потока.",
      code: `generator<int> range(int n) {\n    for (int i = 0; i < n; ++i)\n        co_yield i;\n}`
    },
    {
      title: "Modules (Модули)",
      tag: "import / export",
      desc: "Изолированные единицы трансляции с быстрой компиляцией и защитой от макросных коллизий #include.",
      code: `export module MathCore;\nexport int square(int x) {\n    return x * x;\n}`
    }
  ];

  return (
    <div className="page-anim" style={{ width: "100%", paddingBottom: "80px" }}>
      
      {/* 1. HERO БАННЕР */}
      <div style={{
        position: "relative",
        width: "100%",
        minHeight: "460px",
        backgroundImage: `linear-gradient(rgba(13, 13, 13, 0.85), rgba(18, 18, 18, 0.95)), url('https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "70px 20px 50px",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: "inset 0 -40px 60px rgba(0,0,0,0.7)"
      }}>
        
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 161, 22, 0.12)",
          border: "1px solid rgba(255, 161, 22, 0.35)",
          padding: "4px 14px",
          borderRadius: "20px",
          marginBottom: "16px"
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-orange)" }} />
          <span style={{ fontSize: "12px", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "0.5px" }}>
            C++ INTERACTIVE ROADMAP 2026
          </span>
        </div>

        <h1 style={{
          fontSize: "40px",
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.5px",
          margin: "0 0 12px 0",
          textShadow: "0 2px 10px rgba(0,0,0,0.8)"
        }}>
          Интерактивный трекер курса C++ и ООП
        </h1>

        <p style={{
          color: "rgba(255, 255, 255, 0.85)",
          fontSize: "16px",
          maxWidth: "700px",
          margin: "0 0 28px 0",
          lineHeight: "1.6",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)"
        }}>
          Изучение C++ от базовых типов и указателей до проектирования полиморфных систем, виртуального наследования и 7 практических работ.
        </p>

        {/* Быстрый поиск */}
        <form 
          onSubmit={handleSearchSubmit}
          style={{
            background: "rgba(24, 24, 24, 0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            padding: "6px 8px 6px 14px",
            display: "flex",
            gap: "10px",
            maxWidth: "620px",
            width: "100%",
            boxShadow: "0 16px 36px rgba(0,0,0,0.5)"
          }}
        >
          <input 
            type="text"
            placeholder="Поиск тем: указатели, ООП, виртуальные функции..."
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            style={{
              flexGrow: 1,
              background: "transparent",
              border: "none",
              color: "#fff",
              padding: "8px 0",
              fontSize: "14px",
              outline: "none"
            }}
          />
          <button
            type="submit"
            style={{
              background: "var(--accent-orange)",
              color: "#121212",
              fontWeight: 700,
              border: "none",
              padding: "10px 22px",
              borderRadius: "6px",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            Найти тему
          </button>
        </form>

        {/* Быстрые теги */}
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {["Память", "Указатели", "ООП", "Наследование", "Полиморфизм"].map((tag) => (
            <Link
              key={tag}
              to="/topics"
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.75)",
                background: "rgba(255, 255, 255, 0.08)",
                padding: "4px 12px",
                borderRadius: "20px",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.12)"
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <div className="container" style={{ maxWidth: "1280px", marginTop: "36px", padding: "0 16px" }}>
        
        {/* Информационный виджет прогресса */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "24px 30px",
          marginBottom: "40px",
          display: "grid",
          gridTemplateColumns: "180px 1fr 220px auto",
          alignItems: "center",
          gap: "24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
        }}>
          <div style={{ borderRight: "1px solid var(--border-color)", paddingRight: "16px" }}>
            <div style={{ fontSize: "38px", fontWeight: 900, color: "var(--accent-orange)", lineHeight: "1", fontFamily: "var(--font-mono)" }}>
              {completedCount} <span style={{ fontSize: "20px", color: "var(--text-muted)" }}>/ {totalTopics}</span>
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
              тем завершено ({progressPercent}%)
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 6px 0", color: "var(--text-main)" }}>
              Практический трекинг курса и лабораторных
            </h2>
            <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
              Лекционные материалы, интерактивные задачи на закрепление, лабораторные работы с 1 по 7 и зачётный консольный квест.
            </p>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px" }}>
              <span>Прогресс</span>
              <span style={{ fontWeight: 700, color: "var(--accent-orange)" }}>{progressPercent}%</span>
            </div>
            <div style={{ width: "100%", height: "7px", background: "var(--bg-main)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${progressPercent}%`, height: "100%", background: "var(--accent-orange)", transition: "width 0.3s ease" }} />
            </div>
          </div>

          <div>
            <Link
              to="/topics"
              style={{
                background: "var(--accent-orange)",
                color: "#121212",
                fontWeight: 700,
                padding: "10px 18px",
                borderRadius: "6px",
                fontSize: "13px",
                whiteSpace: "nowrap",
                display: "inline-block",
                textDecoration: "none"
              }}
            >
              К темам курса →
            </Link>
          </div>
        </div>

        {/* Заголовок разделов курса */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "18px" }}>
          <div>
            <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "0.5px" }}>
              Структура обучения
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "4px 0 0 0" }}>
              Модули дорожной карты
            </h3>
          </div>
          <Link to="/topics" style={{ fontSize: "13px", color: "var(--accent-orange)", fontWeight: 600, textDecoration: "none" }}>
            Все {totalTopics} тем →
          </Link>
        </div>

        {/* Карточки направлений */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {tracks.map((track) => (
            <div 
              key={track.id}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, border-color 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--accent-orange)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
                <img 
                  src={track.img} 
                  alt={track.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: track.badgeColor,
                  color: "#121212",
                  fontWeight: 700,
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase"
                }}>
                  {track.badge}
                </span>
                <span style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "12px",
                  background: "rgba(0,0,0,0.75)",
                  color: "#fff",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono)"
                }}>
                  {track.count} тем
                </span>
              </div>

              <div style={{ padding: "18px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
                  {track.dates}
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 14px 0", lineHeight: "1.4", flexGrow: 1 }}>
                  {track.title}
                </h4>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border-color)",
                  fontSize: "12px"
                }}>
                  <span style={{ color: "var(--text-muted)" }}>
                    Сложность: <strong style={{ color: "var(--text-main)" }}>{track.author}</strong>
                  </span>
                  <Link 
                    to="/topics" 
                    style={{ color: "var(--accent-orange)", fontWeight: 600, textDecoration: "none" }}
                  >
                    Открыть модуль →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. СЕКЦИЯ: ЛАБОРАТОРНЫЕ РАБОТЫ */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "24px 28px",
          marginBottom: "40px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "0.5px" }}>
                Практический блок
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "4px 0 0 0" }}>
                Практические работы (ПР №1 — ПР №7)
              </h3>
            </div>
            <Link to="/projects" style={{ fontSize: "13px", color: "var(--accent-orange)", textDecoration: "none", fontWeight: 600 }}>
              Открыть все проекты ({PROJECTS.length}) →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
            {PROJECTS.map((proj) => (
              <Link
                key={proj.id}
                to="/projects"
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  padding: "14px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "11px", color: "var(--accent-orange)", fontFamily: "var(--font-mono)" }}>
                      {proj.number}
                    </span>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                      {proj.category}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
                    {proj.title}
                  </div>
                </div>
                <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--text-muted)" }}>
                  Заданий: {proj.tasks?.length || 0}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Быстрая статистика платформы */}
        <div style={{
          background: "var(--bg-main)",
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          marginBottom: "40px"
        }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>
              {totalTopics} тем
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Синтаксис, память и ООП</div>
          </div>
          <div style={{ borderRight: "1px solid var(--border-color)" }} />
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>
              {PROJECTS.length} работ
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Лабораторные и итоговый квест</div>
          </div>
          <div style={{ borderRight: "1px solid var(--border-color)" }} />
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent-orange)", fontFamily: "var(--font-mono)" }}>
              100% Offline
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Сохранение прогресса в браузере</div>
          </div>
        </div>

        {/* 4. СЕКЦИЯ: ЧТО НОВОГО В C++20 (HIGHLIGHTS) */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(44, 187, 93, 0.12)",
                border: "1px solid rgba(44, 187, 93, 0.3)",
                color: "var(--accent-green)",
                padding: "3px 10px",
                borderRadius: "16px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                marginBottom: "8px"
              }}>
                <span>●</span> ISO/IEC 14882:2020
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "var(--text-main)" }}>
                Ключевые нововведения C++20
              </h3>
            </div>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "13px", maxWidth: "480px" }}>
              Стандарт C++20 расширяет возможности шаблонов, ускоряет сборку благодаря модулям и внедряет ленивую потоковую обработку данных.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "18px"
          }}>
            {cpp20Features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
                      {feat.title}
                    </h4>
                    <span style={{
                      fontSize: "11px",
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent-orange)",
                      background: "rgba(255, 161, 22, 0.08)",
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}>
                      {feat.tag}
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5", marginBottom: "14px" }}>
                    {feat.desc}
                  </p>
                </div>

                <div style={{
                  background: "#0d0d0d",
                  border: "1px solid #222",
                  borderRadius: "6px",
                  padding: "10px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "#9cdcfe",
                  overflowX: "auto",
                  lineHeight: "1.5"
                }}>
                  <pre style={{ margin: 0 }}><code>{feat.code}</code></pre>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}