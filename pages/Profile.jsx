import React, { useState, useMemo } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { TOPICS } from "../data/topicsData";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const auth = useAuth?.() || {};

  // 1. Данные пользователя
  const user = useMemo(() => {
    if (auth.user) return auth.user;
    try {
      const saved = localStorage.getItem("user") || localStorage.getItem("currentUser");
      return saved ? JSON.parse(saved) : { name: "C++ Developer", email: "dev@cpptracker.com" };
    } catch {
      return { name: "C++ Developer", email: "dev@cpptracker.com" };
    }
  }, [auth.user]);

  // 2. Прогресс тем
  const completedMap = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("completedTopics") || "{}");
    } catch {
      return {};
    }
  }, []);

  // 3. Серия ответов в тренажёре
  const outputStreak = useMemo(() => {
    try {
      return Number(localStorage.getItem("outputPredictStreak") || 0);
    } catch {
      return 0;
    }
  }, []);

  const totalTopics = TOPICS.length;
  const completedTopicsList = useMemo(() => {
    return TOPICS.filter((t) => !!completedMap[t.id]);
  }, [completedMap]);

  const completedCount = completedTopicsList.length;
  const developerLevel = Math.floor(completedCount / 3) + 1;
  const totalXP = completedCount * 120 + outputStreak * 25;

  // Обработчик выхода
  const handleLogout = () => {
    if (auth.logout) {
      auth.logout();
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }
    navigate("/login");
  };

  return (
    <div className="container page-anim" style={{ maxWidth: "1280px", padding: "36px 20px 80px" }}>
      
      {/* 1. ГЛАВНАЯ КАРТОЧКА ПРОФИЛЯ */}
      <div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "14px",
        padding: "30px",
        marginBottom: "28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {/* Аватар разработчика */}
          <div style={{
            width: "76px",
            height: "76px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-orange), #ef4743)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            fontWeight: 800,
            color: "#121212",
            boxShadow: "0 8px 24px rgba(255, 161, 22, 0.35)",
            flexShrink: 0
          }}>
            {user?.name ? user.name[0].toUpperCase() : "C"}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 800, margin: 0, color: "var(--text-main)" }}>
                {user?.name || "C++ Developer"}
              </h1>
              <span style={{
                background: "rgba(255, 161, 22, 0.12)",
                border: "1px solid rgba(255, 161, 22, 0.3)",
                color: "var(--accent-orange)",
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "12px",
                fontFamily: "var(--font-mono)"
              }}>
                LEVEL {developerLevel}
              </span>
              <span style={{
                background: "rgba(44, 187, 93, 0.12)",
                border: "1px solid rgba(44, 187, 93, 0.3)",
                color: "var(--accent-green)",
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "12px",
                fontFamily: "var(--font-mono)"
              }}>
                {totalXP} XP
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {user?.email || "dev@cpptracker.internal"} • C++20 Core Track
            </p>
          </div>
        </div>

        {/* Действия шапки */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/topics"
            style={{
              background: "var(--accent-orange)",
              color: "#121212",
              fontWeight: 700,
              padding: "10px 20px",
              borderRadius: "6px",
              fontSize: "13px",
              textDecoration: "none"
            }}
          >
            К каталогу тем →
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-muted)",
              padding: "10px 16px",
              borderRadius: "6px",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      {/* 2. НАВИГАЦИЯ ПО ВЛОЖЕННЫМ РОУТАМ */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid var(--border-color)",
        marginBottom: "32px",
        gap: "12px"
      }}>
        <Link
          to="/profile"
          style={{
            color: "var(--text-main)",
            fontWeight: 700,
            padding: "12px 18px",
            fontSize: "14px",
            textDecoration: "none"
          }}
        >
          📊 Обзор, ачивки и прогресс
        </Link>
        <Link
          to="/profile/settings"
          style={{
            color: "var(--text-muted)",
            fontWeight: 500,
            padding: "12px 18px",
            fontSize: "14px",
            textDecoration: "none"
          }}
        >
          ⚙️ Управление данными
        </Link>
      </div>

      {/* Здесь отрендерится ProfileOverview или ProfileSettings */}
      <Outlet />
    </div>
  );
}

// КОМПОНЕНТ ДЛЯ РОУТА /профиль

export function ProfileOverview() {
  const [activeSubTab, setActiveSubTab] = useState("all");

  const completedMap = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("completedTopics") || "{}");
    } catch {
      return {};
    }
  }, []);

  const outputStreak = useMemo(() => {
    try {
      return Number(localStorage.getItem("outputPredictStreak") || 0);
    } catch {
      return 0;
    }
  }, []);

  const totalTopics = TOPICS.length;
  const completedTopicsList = useMemo(() => {
    return TOPICS.filter((t) => !!completedMap[t.id]);
  }, [completedMap]);

  const completedCount = completedTopicsList.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Разбивка по сложностям
  const statsByDiff = useMemo(() => {
    const stats = {
      Easy: { total: 0, done: 0, color: "#2cbb5d" },
      Medium: { total: 0, done: 0, color: "#ffa116" },
      Hard: { total: 0, done: 0, color: "#ef4743" }
    };

    TOPICS.forEach((t) => {
      const diff = t.difficulty || "Easy";
      if (stats[diff]) {
        stats[diff].total += 1;
        if (completedMap[t.id]) stats[diff].done += 1;
      }
    });

    return stats;
  }, [completedMap]);

  // Система бейджей и ачивок
  const badges = useMemo(() => {
    const memTopics = ["dynamic-arrays", "pointers-vars"];
    const memDone = memTopics.filter((id) => completedMap[id]).length;

    const zeroCostTopics = ["inline-functions", "oop-function-templates", "oop-class-templates"];
    const zeroCostDone = zeroCostTopics.filter((id) => completedMap[id]).length;

    const cpp20Topics = ["oop-abstract-classes", "oop-polymorphism-virtual", "header-files"];
    const cpp20Done = cpp20Topics.filter((id) => completedMap[id]).length;

    return [
      {
        id: "no-mem-leaks",
        icon: "🛡️",
        title: "No Memory Leaks",
        desc: "Закрыть все темы по сырым указателям и динамической памяти в куче (heap).",
        progressText: `${memDone} / ${memTopics.length}`,
        unlocked: memTopics.length > 0 && memDone === memTopics.length,
        color: "#2cbb5d"
      },
      {
        id: "zero-cost",
        icon: "⚡",
        title: "Zero-Cost Abstractions",
        desc: "Изучить inline/constexpr оптимизации и шаблоны функций/классов.",
        progressText: `${zeroCostDone} / ${zeroCostTopics.length}`,
        unlocked: zeroCostTopics.length > 0 && zeroCostDone === zeroCostTopics.length,
        color: "#ffa116"
      },
      {
        id: "compiler-whisperer",
        icon: "🎯",
        title: "Compiler Whisperer",
        desc: "Дать 5 верных ответов подряд в интерактивном тренажёре «Что выведет код?».",
        progressText: `${Math.min(outputStreak, 5)} / 5 streak`,
        unlocked: outputStreak >= 5,
        color: "#00b8a3"
      },
      {
        id: "cpp20-explorer",
        icon: "🚀",
        title: "C++20 Explorer",
        desc: "Пройти архитектурные модули, полиморфизм и современные паттерны языка.",
        progressText: `${cpp20Done} / ${cpp20Topics.length}`,
        unlocked: cpp20Topics.length > 0 && cpp20Done === cpp20Topics.length,
        color: "#569cd6"
      },
      {
        id: "junior-ready",
        icon: "🎓",
        title: "Junior Ready",
        desc: "Завершить более 50% всей дорожной карты подготовки к собеседованиям.",
        progressText: `${completedCount} / ${Math.ceil(totalTopics / 2)}`,
        unlocked: progressPercent >= 50,
        color: "#ef4743"
      }
    ];
  }, [completedMap, outputStreak, completedCount, totalTopics, progressPercent]);

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  return (
    <div>
      {/* Аналитика прогресса */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginBottom: "36px"
      }}>
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "24px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
            Общий прогресс курса
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
            <span style={{ fontSize: "34px", fontWeight: 900, color: "var(--text-main)" }}>{completedCount}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>/ {totalTopics} тем ({progressPercent}%)</span>
          </div>
          <div style={{ width: "100%", height: "8px", background: "var(--bg-main)", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "var(--accent-orange)", transition: "width 0.4s ease" }} />
          </div>
        </div>

        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "11px", color: statsByDiff.Easy.color, fontWeight: 700 }}>EASY</div>
            <div style={{ fontSize: "20px", fontWeight: 800, marginTop: "2px" }}>{statsByDiff.Easy.done} / {statsByDiff.Easy.total}</div>
          </div>
          <div style={{ borderLeft: "1px solid var(--border-color)", height: "36px" }} />
          <div>
            <div style={{ fontSize: "11px", color: statsByDiff.Medium.color, fontWeight: 700 }}>MEDIUM</div>
            <div style={{ fontSize: "20px", fontWeight: 800, marginTop: "2px" }}>{statsByDiff.Medium.done} / {statsByDiff.Medium.total}</div>
          </div>
          <div style={{ borderLeft: "1px solid var(--border-color)", height: "36px" }} />
          <div>
            <div style={{ fontSize: "11px", color: statsByDiff.Hard.color, fontWeight: 700 }}>HARD</div>
            <div style={{ fontSize: "20px", fontWeight: 800, marginTop: "2px" }}>{statsByDiff.Hard.done} / {statsByDiff.Hard.total}</div>
          </div>
        </div>

        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "24px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
            Стрик в тренажёре
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "34px", fontWeight: 900, color: "var(--accent-green)" }}>{outputStreak}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>верных ответов подряд 🔥</span>
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Ачивок открыто: <strong style={{ color: "var(--text-main)" }}>{unlockedBadgesCount} / {badges.length}</strong>
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ БЕЙДЖЕЙ */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "1px" }}>
            Инженерные награды
          </span>
          <h2 style={{ fontSize: "22px", fontWeight: 800, margin: "4px 0 0 0" }}>
            Developer Badges
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
          {badges.map((badge) => (
            <div
              key={badge.id}
              style={{
                background: badge.unlocked ? "var(--bg-secondary)" : "#131313",
                border: badge.unlocked ? `1.5px solid ${badge.color}` : "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                opacity: badge.unlocked ? 1 : 0.45,
                boxShadow: badge.unlocked ? `0 8px 24px ${badge.color}22` : "none"
              }}
            >
              <div style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                color: badge.unlocked ? badge.color : "var(--text-muted)",
                background: badge.unlocked ? `${badge.color}18` : "transparent",
                padding: "3px 8px",
                borderRadius: "10px"
              }}>
                {badge.unlocked ? "UNLOCKED" : "LOCKED"}
              </div>

              <div>
                <div style={{ fontSize: "36px", marginBottom: "14px", filter: badge.unlocked ? "none" : "grayscale(100%)" }}>
                  {badge.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 8px 0", color: badge.unlocked ? "var(--text-main)" : "var(--text-muted)" }}>
                  {badge.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5", margin: 0 }}>
                  {badge.desc}
                </p>
              </div>

              <div style={{
                marginTop: "20px",
                paddingTop: "14px",
                borderTop: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                fontFamily: "var(--font-mono)"
              }}>
                <span style={{ color: "var(--text-muted)" }}>Прогресс:</span>
                <strong style={{ color: badge.unlocked ? badge.color : "var(--text-main)" }}>
                  {badge.progressText}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Список пройденных тем */}
      <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-color)" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>Пройденные темы C++</h3>
        </div>

        {completedTopicsList.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
            Вы пока не отметили ни одной пройденной темы.
            <div style={{ marginTop: "10px" }}>
              <Link to="/topics" style={{ color: "var(--accent-orange)", fontWeight: 600 }}>Перейти в каталог тем →</Link>
            </div>
          </div>
        ) : (
          <div>
            {completedTopicsList.map((t, idx) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 24px",
                  borderBottom: idx !== completedTopicsList.length - 1 ? "1px solid var(--border-color)" : "none",
                  background: idx % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.01)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span>
                  <div>
                    <Link to={`/topic/${t.id}`} style={{ color: "var(--text-main)", fontWeight: 600, textDecoration: "none" }}>
                      {t.title}
                    </Link>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.category}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "12px", color: statsByDiff[t.difficulty]?.color || "#aaa", fontWeight: 700 }}>
                    {t.difficulty}
                  </span>
                  <Link to={`/topic/${t.id}`} style={{ fontSize: "12px", color: "var(--accent-orange)", textDecoration: "none", fontWeight: 600 }}>
                    Повторить →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// КОМПОНЕНТ ДЛЯ РОУТА профиль/настройки
export function ProfileSettings() {
  const handleExportData = () => {
    try {
      const data = localStorage.getItem("completedTopics") || "{}";
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `cpp_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Вы уверены, что хотите сбросить весь прогресс прохождения тем?")) {
      localStorage.removeItem("completedTopics");
      localStorage.removeItem("outputPredictStreak");
      window.location.reload();
    }
  };

  return (
    <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "28px", maxWidth: "680px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 16px 0" }}>Управление локальными данными</h3>
      
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>Резервная копия прогресса</div>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 10px 0" }}>
          Сохраните файл JSON с вашими отметками и достижениями, чтобы перенести его на другое устройство.
        </p>
        <button onClick={handleExportData} style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-color)", color: "var(--text-main)", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>
          Скачать JSON-файл
        </button>
      </div>

      <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-red)", marginBottom: "4px" }}>Сброс всего прогресса</div>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 10px 0" }}>
          Удалит все отметки о пройденных темах и обнулит стрик в тренажёре.
        </p>
        <button onClick={handleResetProgress} style={{ background: "rgba(239, 71, 67, 0.15)", border: "1px solid var(--accent-red)", color: "var(--accent-red)", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontWeight: 700 }}>
          Сбросить прогресс
        </button>
      </div>
    </div>
  );
}