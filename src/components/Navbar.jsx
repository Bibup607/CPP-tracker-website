import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isTopicsActive = location.pathname.startsWith("/topics") || location.pathname.startsWith("/topic/");
  const isProjectsActive = location.pathname.startsWith("/projects");

  return (
    <header style={{
      background: "var(--bg-secondary)",
      borderBottom: "1px solid var(--border-color)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        maxWidth: "1350px",
        padding: "0 16px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        
        {/* Логотип */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            background: "var(--accent-orange)",
            color: "#121212",
            fontWeight: 900,
            fontSize: "14px",
            padding: "4px 8px",
            borderRadius: "4px",
            fontFamily: "var(--font-mono)"
          }}>
            C++
          </span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
            Roadmap Tracker
          </span>
        </Link>

        {/* Навигационные ссылки */}
        <nav style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          
          {/* Темы курса (с аналогичной анимацией и стилем, как у Проектов) */}
          <Link
            to="/topics"
            style={{
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
              color: isTopicsActive ? "var(--accent-orange)" : "var(--text-muted)",
              background: isTopicsActive ? "rgba(255, 161, 22, 0.1)" : "transparent",
              padding: "6px 12px",
              borderRadius: "4px",
              border: isTopicsActive ? "1px solid var(--accent-orange)" : "1px solid transparent",
              transition: "all 0.15s ease"
            }}
          >
             Темы курса
          </Link>

          {/* Проекты */}
          <Link
            to="/projects"
            style={{
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
              color: isProjectsActive ? "var(--accent-orange)" : "var(--text-muted)",
              background: isProjectsActive ? "rgba(255, 161, 22, 0.1)" : "transparent",
              padding: "6px 12px",
              borderRadius: "4px",
              border: isProjectsActive ? "1px solid var(--accent-orange)" : "1px solid transparent",
              transition: "all 0.15s ease"
            }}
          >
             Проекты
          </Link>

          {/* Авторизация: Две отдельные кнопки Вход и Регистрация, либо профиль */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "6px" }}>
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: location.pathname.startsWith("/profile") ? "var(--accent-orange)" : "var(--text-main)",
                  background: "var(--bg-main)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.15s ease"
                }}
              >
                <span>👤</span>
                <span>{user.username || "Профиль"}</span>
              </Link>
              <button
                onClick={logout}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-color)",
                  color: "var(--accent-red)",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                Выйти
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "6px" }}>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-main)",
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  transition: "all 0.15s ease"
                }}
              >
                Вход
              </Link>

              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#121212",
                  background: "var(--accent-orange)",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  transition: "all 0.15s ease"
                }}
              >
                Регистрация
              </Link>
            </div>
          )}
        </nav>

      </div>
    </header>
  );
}