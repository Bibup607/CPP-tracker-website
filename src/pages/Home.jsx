import { Link } from "react-router-dom";
import { TOPICS } from "../data/topicsData";

export default function Home() {
  return (
    <div className="container page-anim" style={{ marginTop: "40px" }}>
      <div style={{ maxWidth: "760px" }}>
        <span style={{
          display: "inline-block",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          padding: "4px 10px",
          borderRadius: "12px",
          fontSize: "12px",
          color: "var(--accent-orange)",
          marginBottom: "16px"
        }}>
          Концепция платформы в стиле LeetCode
        </span>
        <h1 style={{ fontSize: "38px", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
          Инженерный трекер изучения языка C++
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", marginBottom: "28px" }}>
          Учебное приложение для пошагового освоения конструкций современного C++: 
          от структур данных и указателей до стандартов памяти и библиотеки STL. 
          Отмечайте прогресс в один клик и анализируйте шаблоны кода.
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link 
            to="/topics" 
            style={{ 
              background: "var(--accent-orange)", 
              color: "#000", 
              fontWeight: 600, 
              padding: "10px 22px", 
              borderRadius: "4px" 
            }}
          >
            Перейти к каталогу тем ({TOPICS.length})
          </Link>
          <Link 
            to="/register" 
            style={{ 
              background: "var(--bg-secondary)", 
              border: "1px solid var(--border-color)", 
              color: "var(--text-main)", 
              padding: "10px 22px", 
              borderRadius: "4px" 
            }}
          >
            Создать аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
}