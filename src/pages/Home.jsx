import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOPICS } from "../data/topicsData";

export default function Home() {
  const [quickQuery, setQuickQuery] = useState("");
  const navigate = useNavigate();
  const totalTopics = TOPICS.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/topics");
  };

  const tracks = [
    {
      id: "basics",
      badge: "Базовый модуль",
      badgeColor: "#2cbb5d",
      title: "Архитектура памяти, указатели и стек C++",
      dates: "Стандарт C++20 • 15 практических тем",
      author: "Инженерная база",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "oop",
      badge: "Продвинутый C++",
      badgeColor: "#ffa116",
      title: "Объектно-ориентированное программирование & vtable",
      dates: "Полиморфизм, friend, наследование • 9 тем",
      author: "Системный дизайн",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "templates",
      badge: "Метапрограммирование",
      badgeColor: "#ef4743",
      title: "Обобщённое программирование: шаблоны функций и классов",
      dates: "STL контейнеры, generics • C++ concepts",
      author: "Production Core",
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // 4 ключевые фичи C++20
  const cpp20Features = [
    {
      title: "Concepts (Концепты)",
      tag: "template <typename T>",
      desc: "Строгие ограничения типов на этапе компиляции с чистыми и понятными ошибками сборки взамен монструозных шаблонов SFINAE и std::enable_if.",
      code: `template <typename T>\nrequires std::integral<T>\nT add(T a, T b) { return a + b; }`
    },
    {
      title: "Ranges (Диапазоны)",
      tag: "std::views",
      desc: "Ленивые вычисления и элегантные конвейеры обработки коллекций через Unix-подобный пайплайн (|) без лишних аллокаций промежуточных векторов.",
      code: `auto res = nums \n  | std::views::filter([](int n) { return n % 2 == 0; })\n  | std::views::transform([](int n) { return n * 2; });`
    },
    {
      title: "Coroutines (Корутины)",
      tag: "co_await / co_yield",
      desc: "Асинхронные генераторы и задачи с возможностью приостановки и возобновления выполнения без блокировки системного потока ОС.",
      code: `generator<int> count(int max) {\n    for (int i = 0; i < max; ++i)\n        co_yield i;\n}`
    },
    {
      title: "Modules (Модули)",
      tag: "import / export",
      desc: "Решение проблемы медленной сборки C++. Изолированные единицы трансляции без макросного загрязнения и медленной вставки заголовочных файлов #include.",
      code: `export module Math;\nexport int square(int x) {\n    return x * x;\n}`
    }
  ];

  return (
    <div className="page-anim" style={{ width: "100%", paddingBottom: "80px" }}>
      
      {/* 1. БАННЕР С ФОТОГРАФИЕЙ НА ФОНЕ */}
      <div style={{
        position: "relative",
        width: "100%",
        minHeight: "480px",
        backgroundImage: `linear-gradient(rgba(13, 13, 13, 0.82), rgba(18, 18, 18, 0.92)), url('https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "80px 20px 60px",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: "inset 0 -40px 60px rgba(0,0,0,0.7)"
      }}>
        
        <h1 style={{
          fontSize: "42px",
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.5px",
          marginBottom: "12px",
          textShadow: "0 2px 10px rgba(0,0,0,0.8)"
        }}>
          Всё, что нужно для уверенного старта в C++
        </h1>

        <p style={{
          color: "rgba(255, 255, 255, 0.85)",
          fontSize: "17px",
          maxWidth: "680px",
          marginBottom: "32px",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)"
        }}>
          Интерактивная шпаргалка, разбор работы компилятора, динамическая память и ООП в удобном трекере знаний.
        </p>

        {/* Форма быстрого поиска */}
        <form 
          onSubmit={handleSearchSubmit}
          style={{
            background: "rgba(24, 24, 24, 0.88)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            padding: "8px 12px",
            display: "flex",
            gap: "10px",
            maxWidth: "620px",
            width: "100%",
            boxShadow: "0 16px 36px rgba(0,0,0,0.5)"
          }}
        >
          <input 
            type="text"
            placeholder="Введите тему (например: указатели, ООП, циклы)..."
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            style={{
              flexGrow: 1,
              background: "transparent",
              border: "none",
              color: "#fff",
              padding: "10px 14px",
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
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Найти тему
          </button>
        </form>

        {/* Быстрые теги */}
        <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {["Память", "ООП", "Шаблоны", "C++20"].map((tag) => (
            <Link
              key={tag}
              to="/topics"
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.7)",
                background: "rgba(255, 255, 255, 0.08)",
                padding: "4px 10px",
                borderRadius: "20px",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <div className="container" style={{ maxWidth: "1240px", marginTop: "44px", padding: "0 16px" }}>
        
        {/* Информационный виджет курса */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "24px 32px",
          marginBottom: "44px",
          display: "grid",
          gridTemplateColumns: "160px 1fr auto",
          alignItems: "center",
          gap: "28px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
        }}>
          <div style={{ borderRight: "1px solid var(--border-color)", paddingRight: "20px" }}>
            <div style={{ fontSize: "44px", fontWeight: 900, color: "var(--accent-orange)", lineHeight: "1" }}>
              {totalTopics}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
              тем в дорожной карте
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: "19px", fontWeight: 700, margin: "0 0 6px 0", color: "var(--text-main)" }}>
              Практическая подготовка к разработке и собеседованиям
            </h2>
            <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
              Синтаксис, разбор низкоуровневых механизмов языка, управление памятью и шаблоны классов в единой структуре.
            </p>
          </div>

          <div>
            <Link
              to="/topics"
              style={{
                background: "var(--accent-orange)",
                color: "#121212",
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: "6px",
                fontSize: "13px",
                whiteSpace: "nowrap",
                display: "inline-block"
              }}
            >
              Открыть весь список →
            </Link>
          </div>
        </div>

        {/* Заголовок блоков обучения */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
          <div>
            <span style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "0.5px" }}>
              Учебные программы
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "4px 0 0 0" }}>
              Рекомендуемые модули курса
            </h3>
          </div>
          <Link to="/topics" style={{ fontSize: "13px", color: "var(--accent-orange)", fontWeight: 600 }}>
            Смотреть все темы →
          </Link>
        </div>

        {/* Сетка карточек модулей */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginBottom: "44px"
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
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
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
              </div>

              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
                  {track.dates}
                </div>

                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 14px 0", lineHeight: "1.4", flexGrow: 1 }}>
                  {track.title}
                </h4>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-color)",
                  fontSize: "12px"
                }}>
                  <span style={{ color: "var(--text-muted)" }}>
                    Направление: <strong style={{ color: "var(--text-main)" }}>{track.author}</strong>
                  </span>
                  <Link 
                    to="/topics" 
                    style={{ color: "var(--accent-orange)", fontWeight: 600 }}
                  >
                    Изучить →
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
          marginBottom: "56px"
        }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-main)" }}>24 темы</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Синтаксис, память и ООП</div>
          </div>
          <div style={{ borderRight: "1px solid var(--border-color)" }} />
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent-green)" }}>C++20 Ready</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Современные стандарты</div>
          </div>
          <div style={{ borderRight: "1px solid var(--border-color)" }} />
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent-orange)" }}>100% Offline</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Прогресс в браузере</div>
          </div>
        </div>

        {/* 3. СЕКЦИЯ: ЧТО НОВОГО В C++20 (HIGHLIGHTS) */}
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "36px 32px",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)"
        }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(44, 187, 93, 0.12)",
                border: "1px solid rgba(44, 187, 93, 0.3)",
                color: "var(--accent-green)",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                marginBottom: "10px"
              }}>
                <span>●</span> ISO/IEC 14882:2020
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800, margin: 0, color: "var(--text-main)" }}>
                Ключевые нововведения C++20
              </h3>
            </div>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "13px", maxWidth: "480px" }}>
              Стандарт C++20 стал самым масштабным обновлением языка со времён C++11, фундаментально изменив метапрограммирование, шаблоны и сборку проектов.
            </p>
          </div>

          {/* Сетка фичей C++20 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "20px"
          }}>
            {cpp20Features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
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

                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5", marginBottom: "16px" }}>
                    {feat.desc}
                  </p>
                </div>

                {/* Мини-окно с кодом фичи */}
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