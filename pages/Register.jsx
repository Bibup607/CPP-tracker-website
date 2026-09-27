import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
    try {
      register(name, email, password);
      navigate("/topics");
    } catch (err) {
      setError(err.message || "Ошибка регистрации");
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
        minHeight: "470px",
        background: "var(--bg-secondary)",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)"
      }}>
        
        {/* Левая панель: C++ код */}
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
                init_developer.cpp
              </span>
            </div>

            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              lineHeight: "1.7",
              color: "#a0a0a0"
            }}>
              <div><span style={{ color: "#ef4743" }}>#include</span> <span style={{ color: "#2cbb5d" }}>&lt;memory&gt;</span></div>
              <div><span style={{ color: "#ef4743" }}>#include</span> <span style={{ color: "#2cbb5d" }}>&lt;iostream&gt;</span></div>
              <br />
              <div><span style={{ color: "#ffc01e" }}>struct</span> <span style={{ color: "#ffffff", fontWeight: 700 }}>Developer</span> &#123;</div>
              <div style={{ paddingLeft: "16px" }}>std::string status = <span style={{ color: "var(--accent-orange)" }}>"Ready"</span>;</div>
              <div style={{ paddingLeft: "16px" }}>uint32_t exp = 0;</div>
              <div>&#125;;</div>
              <br />
              <div><span style={{ color: "#569cd6" }}>auto</span> dev = std::make_unique&lt;<span style={{ color: "#ffffff" }}>Developer</span>&gt;();</div>
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
            // Инициализация структуры профиля разработчика C++
          </div>
        </div>

        {/* Правая панель: Форма регистрации */}
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
              Регистрация
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

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>
                Имя разработчика
              </label>
              <input
                type="text"
                placeholder="Ivan_Cpp"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontSize: "13px",
                  cursor: "pointer"
                }}
              >
                Создать аккаунт
              </button>

              <Link to="/login" style={{ fontSize: "12px", color: "var(--text-muted)", textDecoration: "none" }}>
                Уже есть профиль? <strong style={{ color: "var(--accent-orange)" }}>Войти</strong>
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}