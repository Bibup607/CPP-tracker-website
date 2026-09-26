import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header style={{
      background: "var(--bg-secondary)",
      borderBottom: "1px solid var(--border-color)",
      padding: "0 24px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <NavLink to="/" style={{ fontWeight: 700, fontSize: "17px", color: "var(--accent-orange)" }}>
          &lt;C++ Tracker/&gt;
        </NavLink>
        <nav style={{ display: "flex", gap: "18px", fontSize: "14px" }}>
          <NavLink 
            to="/" 
            end
            style={({ isActive }) => ({ color: isActive ? "var(--text-main)" : "var(--text-muted)" })}
          >
            Главная
          </NavLink>
          <NavLink 
            to="/topics" 
            style={({ isActive }) => ({ color: isActive ? "var(--text-main)" : "var(--text-muted)" })}
          >
            Темы и синтаксис
          </NavLink>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "14px" }}>
        {user ? (
          <>
            <NavLink to="/profile" style={{ color: "var(--accent-orange)", fontWeight: 500 }}>
              {user.name}
            </NavLink>
            <button 
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-muted)",
                padding: "6px 12px"
              }}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={{ color: "var(--text-muted)" }}>
              Войти
            </NavLink>
            <NavLink 
              to="/register" 
              style={{
                background: "var(--accent-orange)",
                color: "#000",
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: "4px"
              }}
            >
              Регистрация
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}