import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Пожалуйста, укажите email и пароль");
      return;
    }
    try {
      login(email, password);
      navigate("/topics");
    } catch (err) {
      setError(err.message || "Неверные данные входа");
    }
  };

  return (
    <div className="page-anim" style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 16px"
    }}>
      <div style={{
        display: "flex",
        maxWidth: "840px",
        width: "100%",
        minHeight: "450px",
        background: "var(--bg-secondary)",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)"
      }}>
        
        {/* Левая панель: C++ терминал */}
        <div style={{
          flex: "1 1 45%",
          background: "#111111",
          borderRight: "1px solid var(--border-color)",
          padding: "36px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4743" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffc01e" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2cbb5d" }} />
              <span style={{ color: "var(--text-muted)", fontSize: "11px", fontFamily: "var(--font-mono)", marginLeft: "6px" }}>
                auth_session.cpp
              </span>
            </div>

            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              lineHeight: "1.7",
              color: "#a0a0a0"
            }}>
              <div><span style={{ color: "#ef4743" }}>#include</span> <span style={{ color: "#2cbb5d" }}>&lt;auth/session&gt;</span></div>
              <br />
              <div><span style={{ color: "#569cd6" }}>int</span> <span style={{ color: "#ffc01e" }}>authenticate</span>(Session& s) &#123;</div>
              <div style={{ paddingLeft: "16px" }}><span style={{ color: "#569cd6" }}>if</span> (s.verify_token()) &#123;</div>
              <div style={{ paddingLeft: "32px", color: "var(--accent-green)" }}>return STATUS_OK; // 200</div>
              <div style={{ paddingLeft: "16px" }}>&#125;</div>
              <div style={{ paddingLeft: "16px", color: "var(--accent-orange)" }}>return ACCESS_DENIED;</div>
              <div>&#125;</div>
            </div>
          </div>

          {/* Однострочный комментарий в точности по скриншоту */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            fontStyle: "italic",
            color: "#6a9955",
            paddingTop: "16px",
            borderTop: "1px solid #1f1f1f"
          }}>
            // Проверка сессии разработчика и прав доступа к темам
          </div>
        </div>

        {/* Правая панель: Форма входа */}
        <div style={{
          flex: "1 1 55%",
          padding: "44px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative"
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              position: "absolute",
              top: "20px",
              right: "22px",
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "20px",
              cursor: "pointer",
              lineHeight: 1
            }}
          >
            ✕
          </button>

          <div style={{ marginBottom: "28px" }}>
            <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "1px" }}>
              C++ Tracker
            </span>
            <h2 style={{ fontSize: "28px", fontWeight: 800, margin: "4px 0 0 0", color: "#ffffff" }}>
              Вход в профиль
            </h2>
          </div>

          {error && (
            <div style={{
              background: "rgba(239, 71, 67, 0.12)",
              border: "1px solid rgba(239, 71, 67, 0.3)",
              color: "var(--accent-red)",
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "18px"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="dev@cpptracker.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1.5px solid var(--border-color)",
                  borderRadius: "0",
                  padding: "8px 0",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>
                Пароль
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1.5px solid var(--border-color)",
                  borderRadius: "0",
                  padding: "8px 0",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
              <button
                type="submit"
                style={{
                  background: "var(--accent-orange)",
                  color: "#121212",
                  fontWeight: 700,
                  border: "none",
                  padding: "10px 26px",
                  borderRadius: "30px",
                  fontSize: "13px",
                  cursor: "pointer"
                }}
              >
                Войти
              </button>

              <Link to="/register" style={{ fontSize: "12px", color: "var(--text-muted)", textDecoration: "none" }}>
                Нет аккаунта? <strong style={{ color: "var(--accent-orange)" }}>Создать</strong>
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}