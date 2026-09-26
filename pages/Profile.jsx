import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TOPICS } from "../data/topicsData";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container page-anim">
      <h1 style={{ fontSize: "22px", marginBottom: "4px" }}>Профиль разработчика</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>{user?.email}</p>

      {/* Навигация вложенного маршрута */}
      <div style={{ display: "flex", gap: "20px", borderBottom: "1px solid var(--border-color)", marginBottom: "20px" }}>
        <NavLink 
          to="/profile" 
          end 
          style={({ isActive }) => ({
            padding: "8px 0",
            borderBottom: isActive ? "2px solid var(--accent-orange)" : "none",
            color: isActive ? "var(--text-main)" : "var(--text-muted)",
            fontSize: "14px"
          })}
        >
          Общий прогресс
        </NavLink>
        <NavLink 
          to="/profile/settings" 
          style={({ isActive }) => ({
            padding: "8px 0",
            borderBottom: isActive ? "2px solid var(--accent-orange)" : "none",
            color: isActive ? "var(--text-main)" : "var(--text-muted)",
            fontSize: "14px"
          })}
        >
          Параметры профиля
        </NavLink>
      </div>

      {/* Точка вывода вложенных маршрутов */}
      <Outlet />
    </div>
  );
}

export function ProfileOverview() {
  const completed = JSON.parse(localStorage.getItem("completedTopics") || "{}");
  const count = Object.values(completed).filter(Boolean).length;
  const percentage = Math.round((count / TOPICS.length) * 100);

  return (
    <div style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "6px", border: "1px solid var(--border-color)", maxWidth: "500px" }}>
      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Статистика решённых задач</h3>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "12px" }}>
        Пройдено концепций: <b style={{ color: "var(--accent-green)" }}>{count}</b> из {TOPICS.length} ({percentage}%)
      </p>
      <div style={{ width: "100%", height: "8px", background: "var(--bg-main)", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ width: `${percentage}%`, height: "100%", background: "var(--accent-green)", transition: "width 0.3s ease" }}></div>
      </div>
    </div>
  );
}

export function ProfileSettings() {
  const { user } = useAuth();
  return (
    <div style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "6px", border: "1px solid var(--border-color)", maxWidth: "400px" }}>
      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Данные сессии</h3>
      <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>
        Имя: <span style={{ color: "var(--text-main)" }}>{user?.name}</span>
      </div>
      <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>
        Email: <span style={{ color: "var(--text-main)" }}>{user?.email}</span>
      </div>
      <div style={{ fontSize: "13px", color: "var(--accent-orange)", marginTop: "12px" }}>
        Авторизация сохранена в localStorage (сессия активна)
      </div>
    </div>
  );
}