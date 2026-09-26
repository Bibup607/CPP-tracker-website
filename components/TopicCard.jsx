import { Link } from "react-router-dom";

export default function TopicCard({ topic, isCompleted, onToggle }) {
  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "var(--accent-green)";
    if (diff === "Medium") return "var(--accent-yellow)";
    return "var(--accent-red)";
  };

  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: "50px 1fr 120px 100px 110px",
        padding: "14px 16px",
        alignItems: "center",
        borderTop: "1px solid var(--border-color)",
        fontSize: "14px"
      }}
    >
      <div>
        <input 
          type="checkbox" 
          checked={isCompleted} 
          onChange={() => onToggle(topic.id)}
          style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "var(--accent-green)" }}
        />
      </div>
      <div>
        <Link 
          to={`/topic/${topic.id}`} 
          style={{ 
            fontWeight: 500, 
            color: isCompleted ? "var(--text-muted)" : "var(--text-main)",
            textDecoration: isCompleted ? "line-through" : "none" 
          }}
        >
          {topic.title}
        </Link>
      </div>
      <div>
        <span style={{ 
          fontSize: "12px", 
          background: "var(--bg-main)", 
          padding: "3px 8px", 
          borderRadius: "4px", 
          border: "1px solid var(--border-color)" 
        }}>
          {topic.category}
        </span>
      </div>
      <div style={{ color: getDifficultyColor(topic.difficulty), fontSize: "13px", fontWeight: 600 }}>
        {topic.difficulty}
      </div>
      <div style={{ textAlign: "right" }}>
        <Link 
          to={`/topic/${topic.id}`} 
          style={{ 
            fontSize: "12px", 
            color: "var(--accent-orange)", 
            border: "1px solid var(--border-color)", 
            padding: "5px 10px", 
            borderRadius: "4px" 
          }}
        >
          Открыть →
        </Link>
      </div>
    </div>
  );
}