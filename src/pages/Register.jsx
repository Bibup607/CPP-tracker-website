import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Пароль должен содержать от 6 символов");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      register(form.name, form.email, form.password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container page-anim" style={{ maxWidth: "400px", marginTop: "40px" }}>
      <div style={{ background: "var(--bg-secondary)", padding: "28px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>Регистрация</h2>
        {error && <div style={{ color: "var(--accent-red)", marginBottom: "12px", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Имя</label>
            <input 
              style={{ width: "100%", marginTop: "4px" }}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
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
          <div>
            <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Повторите пароль</label>
            <input 
              style={{ width: "100%", marginTop: "4px" }}
              type="password"
              required
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          </div>
          <button type="submit" style={{ background: "var(--accent-orange)", color: "#000", fontWeight: 600, padding: "10px", marginTop: "8px" }}>
            Зарегистрироваться
          </button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
          Уже есть профиль? <Link to="/login" style={{ color: "var(--accent-orange)" }}>Войти</Link>
        </p>
      </div>
    </div>
  );
}