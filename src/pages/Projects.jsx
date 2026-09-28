import { useState } from "react";
import { PROJECTS } from "../data/projectsData";

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="container page-anim" style={{ maxWidth: "1200px", padding: "30px 16px 80px" }}>
      
      {/* Заголовок страницы */}
      <div style={{ marginBottom: "28px" }}>
        <span style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "1px" }}>
          Практические работы курса
        </span>
        <h1 style={{ fontSize: "28px", fontWeight: 800, marginTop: "6px", marginBottom: "8px" }}>
          Комплексные проекты C++
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0, maxWidth: "750px", lineHeight: "1.6" }}>
          Большие самостоятельные практические задания на закрепление ключевых тем: от переменных и побитовых манипуляций до работы с динамическими массивами и многофайловыми проектами.
        </p>
      </div>

      {/* Верхний селектор переключения между 4 практическими работами */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "12px",
        marginBottom: "28px"
      }}>
        {PROJECTS.map((proj) => {
          const isActive = proj.id === activeProject.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              style={{
                background: isActive ? "var(--bg-secondary)" : "var(--bg-main)",
                border: isActive ? "2px solid var(--accent-orange)" : "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "16px 18px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: isActive ? "var(--accent-orange)" : "var(--text-muted)",
                  fontFamily: "var(--font-mono)"
                }}>
                  {proj.number}
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {proj.tasks.length} заданий
                </span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>
                {proj.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Карточка выбранного проекта */}
      <div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        padding: "28px"
      }}>
        
        {/* Заголовок проекта */}
        <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{
              background: "var(--accent-orange)",
              color: "#121212",
              fontWeight: 800,
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)"
            }}>
              {activeProject.number}
            </span>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Категория: {activeProject.category}
            </span>
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, margin: 0 }}>
            {activeProject.title}
          </h2>
        </div>

        {/* Блок критериев оценивания */}
        <div style={{
          background: "rgba(255, 161, 22, 0.05)",
          borderLeft: "3px solid var(--accent-orange)",
          borderRadius: "0 6px 6px 0",
          padding: "16px 20px",
          marginBottom: "32px"
        }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-orange)", marginBottom: "8px" }}>
            Критерии оценивания практической работы:
          </div>
          <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#e0e0e0", lineHeight: "1.7" }}>
            {activeProject.criteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Список всех заданий проекта */}
        <div>
          <div style={{ fontSize: "13px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", marginBottom: "16px" }}>
            Задания практической работы ({activeProject.tasks.length}):
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {activeProject.tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "18px 20px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--accent-orange)",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono)"
                  }}>
                    #{task.id}
                  </span>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
                    {task.title}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "#cccccc", lineHeight: "1.7", whiteSpace: "pre-line" }}>
                  {task.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}