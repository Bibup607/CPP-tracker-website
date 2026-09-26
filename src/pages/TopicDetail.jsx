import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TOPICS } from "../data/topicsData";

// Вопросы для проверки под каждый уровень темы
const QUIZ_MAP = {
  Easy: {
    question: "Какое поведение гарантирует компилятор при создании статической переменной в локальной области видимости?",
    options: [
      "Переменная создается заново при каждом входе в функцию",
      "Переменная инициализируется ровно один раз при первом выполнении строки кода",
      "Память выделяется в куче (heap) через malloc"
    ],
    correct: 1,
    explanation: "Локальная статическая переменная создается и инициализируется однократно при первом вызове функции и живет до конца выполнения всей программы."
  },
  Medium: {
    question: "Какое ключевое правило предотвращает Undefined Behavior при удалении объекта-наследника через указатель на базовый класс?",
    options: [
      "Использование friend-деструктора",
      "Объявление деструктора базового класса virtual",
      "Принудительный вызов free() вместо delete"
    ],
    correct: 1,
    explanation: "Если у базового класса нет virtual ~Base(), вызов delete basePtr вызовет только деструктор базового класса, а ресурсы наследника останутся неочищенными."
  },
  Hard: {
    question: "Почему шаблонные классы и методы принято полностью определять внутри заголовочных файлов (.h / .hpp)?",
    options: [
      "Для ускорения компоновки исполняемого файла",
      "Компилятору требуется видеть всё тело шаблона в единице трансляции для генерации конкретного типа (инстанцирования)",
      "Спецификация C++ запрещает использование .cpp для шаблонного кода"
    ],
    correct: 1,
    explanation: "Компилятор генерирует машинный код функции только в момент подстановки типа T. Если реализация скрыта в другом .cpp, линкер выдаст unresolved external symbol."
  }
};

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((item) => item.id === id);

  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("theory"); // 'theory' | 'notes' | 'quiz'
  const [copied, setCopied] = useState(false);

  // Состояние квиза
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("completedTopics");
    if (saved) {
      const parsed = JSON.parse(saved);
      setIsCompleted(!!parsed[id]);
    }
    setSelectedOption(null);
    setQuizSubmitted(false);
  }, [id]);

  const handleToggle = () => {
    const saved = JSON.parse(localStorage.getItem("completedTopics") || "{}");
    const nextValue = !isCompleted;
    saved[id] = nextValue;
    localStorage.setItem("completedTopics", JSON.stringify(saved));
    setIsCompleted(nextValue);
  };

  const handleCopyCode = () => {
    if (topic) {
      navigator.clipboard.writeText(topic.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!topic) {
    return (
      <div className="container page-anim" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <div style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "40px 48px",
          maxWidth: "560px",
          width: "100%",
          textAlign: "center"
        }}>
          <div style={{ color: "var(--accent-red)", fontWeight: 700, fontFamily: "var(--font-mono)", marginBottom: "14px", fontSize: "13px" }}>
            ● 404: TOPIC_NOT_FOUND
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>Тема не найдена</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
            Запрошенной темы нет в дорожной карте C++.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button 
              onClick={() => navigate("/")} 
              style={{ background: "var(--accent-orange)", color: "#121212", fontWeight: 700, padding: "10px 22px", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              В главное меню
            </button>
            <button 
              onClick={() => navigate("/topics")} 
              style={{ background: "var(--bg-main)", color: "var(--text-main)", border: "1px solid var(--border-color)", fontWeight: 600, padding: "10px 18px", borderRadius: "6px", cursor: "pointer" }}
            >
              К каталогу тем
            </button>
          </div>
        </div>
      </div>
    );
  }

  const quiz = QUIZ_MAP[topic.difficulty] || QUIZ_MAP.Easy;

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "#2cbb5d";
    if (diff === "Medium") return "#ffc01e";
    return "#ef4743";
  };

  return (
    <div className="container page-anim" style={{ maxWidth: "1350px", padding: "20px 16px" }}>
      {/* Шапка навигации */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <button 
          onClick={() => navigate("/topics")} 
          style={{ background: "transparent", color: "var(--text-muted)", fontSize: "13px", padding: 0, border: "none", cursor: "pointer" }}
        >
          ← Каталог тем ({topic.category})
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", color: getDifficultyColor(topic.difficulty), fontWeight: 700 }}>
            Сложность: {topic.difficulty}
          </span>
          <button 
            onClick={handleToggle}
            style={{
              background: isCompleted ? "var(--accent-green)" : "var(--bg-secondary)",
              border: isCompleted ? "none" : "1px solid var(--border-color)",
              color: isCompleted ? "#000" : "var(--text-main)",
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: "4px",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            {isCompleted ? "✓ Пройдено" : "Отметить выполненным"}
          </button>
        </div>
      </div>

      {/* Двухколоночный интерфейс */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "16px", minHeight: "620px" }}>
        
        {/* Левая панель */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "0.5px" }}>
              {topic.category}
            </span>
            <h1 style={{ fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>
              {topic.title}
            </h1>
          </div>

          {/* Вкладки: Теория / Нюансы / Проверочный вопрос */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", background: "var(--bg-tertiary)" }}>
            <button 
              onClick={() => setActiveTab("theory")}
              style={{
                background: "transparent",
                color: activeTab === "theory" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "theory" ? "2px solid var(--accent-orange)" : "none",
                padding: "10px 18px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              Конспект
            </button>
            <button 
              onClick={() => setActiveTab("notes")}
              style={{
                background: "transparent",
                color: activeTab === "notes" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "notes" ? "2px solid var(--accent-orange)" : "none",
                padding: "10px 18px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              Подводные камни
            </button>
            <button 
              onClick={() => setActiveTab("quiz")}
              style={{
                background: "transparent",
                color: activeTab === "quiz" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "quiz" ? "2px solid var(--accent-orange)" : "none",
                padding: "10px 18px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              Вопрос ({topic.difficulty})
            </button>
          </div>

          {/* Контент вкладок */}
          <div style={{ padding: "24px", overflowY: "auto", flexGrow: 1 }}>
            {activeTab === "theory" && (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                    Ключевой синтаксис
                  </div>
                  <div style={{ background: "var(--bg-main)", padding: "12px 14px", borderRadius: "6px", border: "1px solid var(--border-color)", fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent-orange)" }}>
                    {topic.syntax}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                    Теоретическая база
                  </div>
                  <p style={{ fontSize: "14px", color: "#d0d0d0", lineHeight: "1.7", margin: 0 }}>
                    {topic.theory}
                  </p>
                </div>
              </>
            )}

            {activeTab === "notes" && (
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                  Важно помнить разработчику
                </div>
                <div style={{ background: "rgba(255, 161, 22, 0.05)", borderLeft: "3px solid var(--accent-orange)", padding: "14px", borderRadius: "0 4px 4px 0" }}>
                  <p style={{ fontSize: "14px", color: "#e0e0e0", lineHeight: "1.6", margin: 0 }}>
                    {topic.notes}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "quiz" && (
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "12px" }}>
                  Проверка знаний: сложность {topic.difficulty}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "18px", lineHeight: "1.5" }}>
                  {quiz.question}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  {quiz.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    let border = "1px solid var(--border-color)";
                    let bg = "var(--bg-main)";
                    let color = "var(--text-main)";

                    if (quizSubmitted) {
                      if (idx === quiz.correct) {
                        border = "1px solid var(--accent-green)";
                        bg = "rgba(44, 187, 93, 0.12)";
                        color = "var(--accent-green)";
                      } else if (isSelected) {
                        border = "1px solid var(--accent-red)";
                        bg = "rgba(239, 71, 67, 0.12)";
                        color = "var(--accent-red)";
                      }
                    } else if (isSelected) {
                      border = "1px solid var(--accent-orange)";
                      bg = "rgba(255, 161, 22, 0.08)";
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => !quizSubmitted && setSelectedOption(idx)}
                        style={{
                          border,
                          background: bg,
                          color,
                          padding: "12px 14px",
                          borderRadius: "6px",
                          fontSize: "13px",
                          cursor: quizSubmitted ? "default" : "pointer",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {isSelected ? "● " : "○ "} {opt}
                      </div>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={() => setQuizSubmitted(true)}
                    style={{
                      background: selectedOption !== null ? "var(--accent-orange)" : "var(--bg-tertiary)",
                      color: selectedOption !== null ? "#121212" : "var(--text-muted)",
                      fontWeight: 700,
                      padding: "8px 18px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: selectedOption !== null ? "pointer" : "not-allowed"
                    }}
                  >
                    Проверить ответ
                  </button>
                ) : (
                  <div style={{ background: "var(--bg-main)", padding: "14px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: selectedOption === quiz.correct ? "var(--accent-green)" : "var(--accent-red)", marginBottom: "6px" }}>
                      {selectedOption === quiz.correct ? "✓ Верно!" : "✕ Неверный ответ"}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      {quiz.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Правая панель: Окно кода */}
        <div style={{ background: "#141414", border: "1px solid var(--border-color)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "var(--bg-secondary)", padding: "8px 16px", borderBottom: "1px solid var(--border-color)", fontSize: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4743" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffc01e" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2cbb5d" }} />
              <span style={{ color: "var(--text-muted)", marginLeft: "8px", fontFamily: "var(--font-mono)" }}>main.cpp</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>C++20</span>
              <button 
                onClick={handleCopyCode}
                style={{
                  background: "var(--bg-tertiary)",
                  color: copied ? "var(--accent-green)" : "var(--text-muted)",
                  border: "1px solid var(--border-color)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  cursor: "pointer"
                }}
              >
                {copied ? "✓ Скопировано" : "Копировать"}
              </button>
            </div>
          </div>

          <pre style={{ padding: "20px", margin: 0, background: "#141414", color: "#e6e6e6", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: "1.6", overflowX: "auto", flexGrow: 1 }}>
            <code>{topic.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}