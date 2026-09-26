import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page-anim" style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ fontSize: "56px", fontWeight: 700, color: "var(--accent-orange)" }}>404</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Страница не найдена</p>
      <Link 
        to="/" 
        style={{ 
          background: "var(--bg-secondary)", 
          border: "1px solid var(--border-color)", 
          padding: "8px 16px", 
          borderRadius: "4px",
          display: "inline-block" 
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}