import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(form.email, form.password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container page-anim" style={{ maxWidth: "380px", marginTop: "60px" }}>
      <div style={{ background: "var(--bg-secondary)", padding: "28px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>Авторизация</h2>
        {error && <div style={{ color: "var(--accent-red)", marginBottom: "12px", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Email</label>
            <input 
              style={{ width: "100%", marginTop: "4px" }}
              type="email" 
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Пароль</label>
            <input 
              style={{ width: "100%", marginTop: "4px" }}
              type="password" 
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" style={{ background: "var(--accent-orange)", color: "#000", fontWeight: 600, padding: "10px", marginTop: "8px" }}>
            Войти в систему
          </button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
          Нет учетной записи? <Link to="/register" style={{ color: "var(--accent-orange)" }}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}