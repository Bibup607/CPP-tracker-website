import { useState, useEffect } from "react";
import { TOPICS } from "../data/topicsData";
import { PROJECTS } from "../data/projectsData";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "data"
  const [completedTopics, setCompletedTopics] = useState({});
  const [user, setUser] = useState({ name: "C++ Developer", email: "student@cpp-tracker.local" });
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("completedTopics");
    if (saved) {
      try {
        setCompletedTopics(JSON.parse(saved));
      } catch (e) {
        setCompletedTopics({});
      }
    }

    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // fallback
      }
    }
  }, []);

  const totalTopics = TOPICS.length;
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  
  // Расчет XP и уровня (каждая тема дает 100 XP)
  const xp = completedCount * 100;
  const level = Math.floor(xp / 300) + 1;
  const progressToNextLvl = Math.round(((xp % 300) / 300) * 100);

  // 5 C++ ачивок
  const achievements = [
    {
      id: "first_step",
      icon: "🌱",
      title: "Первый `main()`",
      desc: "Изучите первую тему по базовому синтаксису C++",
      unlocked: completedCount >= 1
    },
    {
      id: "pointer_master",
      icon: "🎯",
      title: "Мастер указателей",
      desc: "Изучите темы работы с памятью, стек и кучу",
      unlocked: completedCount >= 6
    },
    {
      id: "oop_architect",
      icon: "🏛️",
      title: "Архитектор ООП",
      desc: "Освойте инкапсуляцию, классы и конструкторы",
      unlocked: completedCount >= 12
    },
    {
      id: "polymorph",
      icon: "⚡",
      title: "Полиморфный гуру",
      desc: "Разберите виртуальные функции и ромбовидное наследование",
      unlocked: completedCount >= 18
    },
    {
      id: "cpp20_legend",
      icon: "👑",
      title: "Легенда C++20",
      desc: "Завершите все темы дорожной карты курса",
      unlocked: completedCount >= totalTopics && totalTopics > 0
    }
  ];

  const handleExportData = () => {
    const exportObject = {
      user,
      completedTopics,
      exportDate: new Date().toISOString(),
      xp,
      level
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cpp-tracker-progress-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showNotification("Прогресс успешно экспортирован в JSON!");
  };

  const handleResetProgress = () => {
    if (window.confirm("Вы действительно хотите полностью сбросить весь прогресс? Действие необратимо.")) {
      localStorage.removeItem("completedTopics");
      setCompletedTopics({});
      showNotification("Весь прогресс был успешно сброшен.");
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  return (
    <div className="container page-anim" style={{ maxWidth: "1150px", padding: "30px 16px 80px" }}>
      
      {notification && (
        <div style={{
          background: "var(--accent-orange)",
          color: "#121212",
          fontWeight: 700,
          padding: "10px 16px",
          borderRadius: "6px",
          marginBottom: "20px",
          fontSize: "13px"
        }}>
          ✓ {notification}
        </div>
      )}

      {/* Шапка профиля */}
      <div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        padding: "24px 28px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-orange), #ff4d00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            color: "#121212",
            fontWeight: 800
          }}>
            {user?.name ? user.name[0].toUpperCase() : "C"}
          </div>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 6px 0", color: "var(--text-main)" }}>
              {user.name || "C++ Студент"}
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
              {user.email || "Локальный профиль"} • Статус: Разработчик C++
            </p>
          </div>
        </div>

        {/* Уровень и XP */}
        <div style={{ display: "flex", gap: "24px", textAlign: "right" }}>
          <div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase" }}>Уровень</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--accent-orange)", fontFamily: "var(--font-mono)" }}>
              LVL {level}
            </div>
          </div>
          <div style={{ borderLeft: "1px solid var(--border-color)", paddingLeft: "24px" }}>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase" }}>Опыт</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>
              {xp} XP
            </div>
          </div>
        </div>
      </div>

      {/* Навигационные вкладки табов */}
      <div style={{
        display: "flex",
        gap: "16px",
        borderBottom: "1px solid var(--border-color)",
        marginBottom: "24px"
      }}>
        <button
          onClick={() => setActiveTab("overview")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "overview" ? "2px solid var(--accent-orange)" : "2px solid transparent",
            color: activeTab === "overview" ? "var(--text-main)" : "var(--text-muted)",
            fontWeight: 700,
            fontSize: "14px",
            padding: "8px 12px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          📊 Обзор, ачивки и прогресс
        </button>

        <button
          onClick={() => setActiveTab("data")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "data" ? "2px solid var(--accent-orange)" : "2px solid transparent",
            color: activeTab === "data" ? "var(--text-main)" : "var(--text-muted)",
            fontWeight: 700,
            fontSize: "14px",
            padding: "8px 12px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          ⚙️ Управление данными
        </button>
      </div>

      {/* ВКЛАДКА 1: ОБЗОР И АЧИВКИ */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Статистика прохождения */}
          <div style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            padding: "20px 24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>Прогресс до следующего уровня</span>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent-orange)" }}>
                {progressToNextLvl}% ({xp % 300} / 300 XP)
              </span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "var(--bg-main)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${progressToNextLvl}%`, height: "100%", background: "var(--accent-orange)", transition: "width 0.3s ease" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Изучено тем</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>{completedCount} из {totalTopics}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Практических работ</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>{PROJECTS.length} работ</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Открыто ачивок</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent-orange)" }}>
                  {achievements.filter((a) => a.unlocked).length} из {achievements.length}
                </div>
              </div>
            </div>
          </div>

          {/* Список ачивок */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "14px" }}>
              Достижения C++ ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "14px" }}>
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  style={{
                    background: "var(--bg-secondary)",
                    border: ach.unlocked ? "1px solid var(--accent-orange)" : "1px solid var(--border-color)",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    opacity: ach.unlocked ? 1 : 0.45,
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{
                    fontSize: "30px",
                    background: "var(--bg-main)",
                    borderRadius: "8px",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-color)"
                  }}>
                    {ach.icon}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: ach.unlocked ? "var(--text-main)" : "var(--text-muted)" }}>
                        {ach.title}
                      </h4>
                      {ach.unlocked && (
                        <span style={{ fontSize: "10px", color: "var(--accent-orange)", fontWeight: 700 }}>
                          ✓ ПОЛУЧЕНО
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                      {ach.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ВКЛАДКА 2: УПРАВЛЕНИЕ ДАННЫМИ */}
      {activeTab === "data" && (
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px 0" }}>Экспорт локального прогресса</h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 14px 0", lineHeight: "1.5" }}>
              Выгрузить всю статистику решённых задач, XP, ачивок и пройденных уроков в один JSON-файл для резервного копирования.
            </p>
            <button
              onClick={handleExportData}
              style={{
                background: "var(--bg-main)",
                color: "var(--text-main)",
                border: "1px solid var(--border-color)",
                padding: "10px 18px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              📥 Экспортировать в JSON
            </button>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px 0", color: "#ef4743" }}>Опасная зона</h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 14px 0", lineHeight: "1.5" }}>
              Полная очистка прогресса: удаление отметок об изученных темах и обнуление опыта из памяти браузера (LocalStorage).
            </p>
            <button
              onClick={handleResetProgress}
              style={{
                background: "rgba(239, 71, 67, 0.15)",
                color: "#ef4743",
                border: "1px solid rgba(239, 71, 67, 0.4)",
                padding: "10px 18px",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              ⚠️ Сбросить весь прогресс
            </button>
          </div>
        </div>
      )}

    </div>
  );
}