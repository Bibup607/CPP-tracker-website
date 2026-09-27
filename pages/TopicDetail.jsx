import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TOPICS } from "../data/topicsData";

// Задания и вопросы строго под уровень темы (без синтаксиса из будущих тем)
const TOPIC_CHALLENGES = {
  // Тема 1: Переменные (только примитивные типы, инициализация, вывод)
  "variables-types": {
    quiz: {
      question: "Что произойдет при попытке инициализировать целое число вещественным литералом: int x{5.9};?",
      options: [
        "Переменная округлится до 6",
        "Произойдет ошибка компиляции (narrowing conversion)",
        "Дробная часть отбросится, x станет равен 5",
        "Произойдет переполнение памяти"
      ],
      correct: 1,
      explanation: "Списочная инициализация в фигурных скобках {} запрещает сужающие преобразования (narrowing conversions) и вызывает строгую ошибку компилятора."
    },
    predict: {
      title: "Целочисленное усечение и авто-вывод",
      code: `#include <iostream>

int main() {
    int a = 7;
    int b = 2;
    double res = a / b;
    std::cout << res;
    return 0;
}`,
      options: ["3.5", "3", "3.0", "Ошибка компиляции"],
      correct: 1,
      explanation: "Оба операнда 'a' и 'b' имеют тип int, поэтому сначала выполняется целочисленное деление 7 / 2 = 3 (дробная часть отбрасывается). Затем 3 записывается в double, а std::cout печатает 3."
    },
    gotchas: "1. Деление целых чисел всегда возвращает целое: 5 / 2 даст 2, а не 2.5. Для получения точной дроби хотя бы один операнд должен быть double (5.0 / 2 или static_cast<double>(a) / b).\n2. Неинициализированные переменные 'int x;' на стеке содержат случайный мусор из памяти (UB при чтении)."
  },

  // Тема 2: Условия (только if/else, switch, логические операторы)
  "conditions": {
    quiz: {
      question: "Что произойдет, если в блоке switch забыть написать ключевое слово break после case?",
      options: [
        "Компилятор завершит сборку с ошибкой",
        "Программа немедленно завершится",
        "Управление «провалится» в следующий case независимо от его условия (fallthrough)",
        "Выполнится блок default"
      ],
      correct: 2,
      explanation: "Без break выполнение кода продолжается в тело следующих case подряд до первого встреченного break или конца конструкции switch."
    },
    predict: {
      title: "Присваивание вместо сравнения",
      code: `#include <iostream>

int main() {
    int score = 0;
    if (score = 5) {
        std::cout << "Win";
    } else {
        std::cout << "Lose";
    }
    return 0;
}`,
      options: ["Win", "Lose", "0", "Ошибка компиляции"],
      correct: 0,
      explanation: "Внутри if записано присваивание '=' вместо проверки '=='. Переменной score присваивается 5. Результат выражения (5) приводится к true, поэтому выводится 'Win'."
    },
    gotchas: "1. Опечатка с '=' вместо '==' компилируется без ошибок, если тип операнда приводится к bool. Используйте предупреждения компилятора (-Wall -Wextra).\n2. Переменные, объявленные внутри switch до первого case, не могут быть инициализированы."
  },

  // Тема 3: Циклы (только for, while, do-while, break, continue)
  "loops": {
    quiz: {
      question: "Какое ключевое отличие цикла do-while от стандартного while?",
      options: [
        "Тело do-while гарантированно выполнится хотя бы один раз",
        "do-while выполняется быстрее на уровне инструкций процессора",
        "В do-while запрещено использовать ключевое слово break",
        "do-while работает только с целочисленными счётчиками"
      ],
      correct: 0,
      explanation: "В цикле do-while условие проверяется в конце итерации (постусловие), поэтому тело цикла всегда выполняется минимум один раз."
    },
    predict: {
      title: "Поведение оператора continue",
      code: `#include <iostream>

int main() {
    int count = 0;
    for (int i = 0; i < 4; ++i) {
        if (i == 2) continue;
        count += i;
    }
    std::cout << count;
    return 0;
}`,
      options: ["6", "4", "3", "0"],
      correct: 1,
      explanation: "При i=0 count=0; при i=1 count=1; при i=2 срабатывает continue (пропуск сложения, но ++i выполняется); при i=3 count=1+3=4."
    },
    gotchas: "1. Зацикливание с беззнаковыми типами: 'for (unsigned int i = 5; i >= 0; --i)' уйдёт в бесконечный цикл, так как 0 - 1 переполнится в 4294967295.\n2. Случайная точка с запятой сразу после 'for (...);' делает тело цикла пустым."
  },

  // Тема 4: Массивы (только статические массивы arr[N], индексы)
  "arrays": {
    quiz: {
      question: "Что произойдет при обращении к индексу за пределами статического массива (например, arr[10] при размере 5)?",
      options: [
        "Программа выбросит исключение std::out_of_range",
        "Компилятор автоматически выделит дополнительную память",
        "Произойдет Undefined Behavior (чтение чужой памяти / сбой)",
        "Вернется значение по умолчанию (0)"
      ],
      correct: 2,
      explanation: "Встроенные массивы C++ не проверяют границы индексов на этапе выполнения ради максимальной производительности. Обращение за границу — это UB."
    },
    predict: {
      title: "Границы массива и память",
      code: `#include <iostream>

int main() {
    int data[3] = {10, 20, 30};
    int sum = 0;
    for (int i = 0; i < 3; ++i) {
        sum += data[i];
    }
    std::cout << sum;
    return 0;
}`,
      options: ["60", "30", "Мусор в памяти", "Ошибка компиляции"],
      correct: 0,
      explanation: "Цикл корректно суммирует элементы data[0]=10, data[1]=20 и data[2]=30. Итог: 60."
    },
    gotchas: "1. Массивы в C++ индексируются строго с 0. Последний элемент массива arr[N] находится по индексу N-1.\n2. В C++ нельзя объявить встроенный массив с динамическим размером из переменной 'int arr[n];' — стандарт ISO C++ требует compile-time константу."
  },

  // Тема 7: Функции (появление void, аргументов, return)
  "functions": {
    quiz: {
      question: "Что происходит с локальными переменными функции после выполнения оператора return?",
      options: [
        "Они остаются в памяти до завершения всей программы",
        "Их стек-фрейм разрушается, память автоматически освобождается",
        "Они перемещаются в кучу (heap)",
        "Они сбрасываются в значение 0"
      ],
      correct: 1,
      explanation: "Локальные переменные создаются на стеке и уничтожаются автоматически при выходе из области видимости (завершении функции)."
    },
    predict: {
      title: "Передача аргумента по значению (копия)",
      code: `#include <iostream>

void increment(int x) {
    x += 10;
}

int main() {
    int num = 5;
    increment(num);
    std::cout << num;
    return 0;
}`,
      options: ["15", "5", "0", "Ошибка компиляции"],
      correct: 1,
      explanation: "Аргумент 'x' передан по значению (создается изолированная копия). Изменения внутри функции increment не затрагивают оригинальную переменную num в main."
    },
    gotchas: "1. Возврат адреса или ссылки на локальную переменную из функции приводит к висячему указателю (dangling pointer) — память уничтожится сразу после return.\n2. Функция без типа возврата или без явного return (в не-void функциях, кроме main) вызывает Undefined Behavior."
  }
};

const DEFAULT_CHALLENGE = {
  quiz: {
    question: "Какое поведение гарантирует спецификация стандарта C++ для данного модуля?",
    options: [
      "Строгое соответствие RAII и управление жизненным циклом ресурсов",
      "Автоматическая сборка мусора в фоновом потоке",
      "Принудительная динамическая аллокация",
      "Игнорирование типов данных компилятором"
    ],
    correct: 0,
    explanation: "C++ опирается на детерминированное управление ресурсами и строгую типизацию во время компиляции."
  },
  predict: {
    title: "Анализ последовательности инструкций",
    code: `#include <iostream>

int main() {
    int status = 1;
    status <<= 2;
    std::cout << status;
    return 0;
}`,
    options: ["1", "2", "4", "8"],
    correct: 2,
    explanation: "Битовый сдвиг влево (1 << 2) эквивалентен умножению на 4, результат равен 4."
  },
  gotchas: "1. Всегда проверяйте соответствие времени жизни ресурсов области видимости.\n2. Следите за предупреждениями компилятора касательно неявных преобразований типов."
};

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Находим текущую тему и её индекс
  const currentIndex = TOPICS.findIndex((item) => item.id === id);
  const topic = TOPICS[currentIndex];

  // Предыдущая и следующая темы
  const prevTopic = currentIndex > 0 ? TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex !== -1 && currentIndex < TOPICS.length - 1 ? TOPICS[currentIndex + 1] : null;

  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("theory"); // 'theory' | 'gotchas' | 'quiz' | 'predict'
  const [copied, setCopied] = useState(false);

  // Состояние обычного теста
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Состояние "Что выведет код"
  const [selectedOutput, setSelectedOutput] = useState(null);
  const [outputSubmitted, setOutputSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const saved = localStorage.getItem("completedTopics");
    if (saved) {
      const parsed = JSON.parse(saved);
      setIsCompleted(!!parsed[id]);
    }
    setSelectedQuiz(null);
    setQuizSubmitted(false);
    setSelectedOutput(null);
    setOutputSubmitted(false);
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
            Запрошенная тема отсутствует в курсе C++.
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

  const challenge = TOPIC_CHALLENGES[topic.id] || DEFAULT_CHALLENGE;

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "#2cbb5d";
    if (diff === "Medium") return "#ffc01e";
    return "#ef4743";
  };

  return (
    <div className="container page-anim" style={{ maxWidth: "1350px", padding: "24px 16px 80px" }}>
      
      {/* Навигационная полоса: назад в каталог + переход между темами */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button 
            onClick={() => navigate("/topics")} 
            style={{ background: "transparent", color: "var(--text-muted)", fontSize: "13px", padding: 0, border: "none", cursor: "pointer" }}
          >
            ← Каталог ({topic.category})
          </button>
          <span style={{ color: "var(--border-color)" }}>|</span>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Тема {currentIndex + 1} из {TOPICS.length}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Кнопка "Предыдущая тема" */}
          {prevTopic && (
            <button
              onClick={() => navigate(`/topic/${prevTopic.id}`)}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-main)",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer"
              }}
              title={prevTopic.title}
            >
              ← Предыдущая
            </button>
          )}

          {/* Кнопка "Следующая тема" */}
          {nextTopic ? (
            <button
              onClick={() => navigate(`/topic/${nextTopic.id}`)}
              style={{
                background: "var(--accent-orange)",
                border: "none",
                color: "#121212",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer"
              }}
              title={nextTopic.title}
            >
              Следующая тема →
            </button>
          ) : (
            <button
              onClick={() => navigate("/topics")}
              style={{
                background: "var(--accent-green)",
                border: "none",
                color: "#121212",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Курс завершён 🎉
            </button>
          )}

          <button 
            onClick={handleToggle}
            style={{
              background: isCompleted ? "var(--accent-green)" : "var(--bg-secondary)",
              border: isCompleted ? "none" : "1px solid var(--border-color)",
              color: isCompleted ? "#000" : "var(--text-main)",
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            {isCompleted ? "✓ Пройдено" : "Отметить"}
          </button>
        </div>
      </div>

      {/* Основной двухколоночный экран */}
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "18px", minHeight: "640px" }}>
        
        {/* Левая интерактивная карточка */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--accent-orange)", fontWeight: 700, letterSpacing: "0.5px" }}>
                {topic.category}
              </span>
              <h1 style={{ fontSize: "20px", fontWeight: 700, marginTop: "4px", marginBottom: 0 }}>
                {topic.title}
              </h1>
            </div>
            <span style={{ fontSize: "12px", color: getDifficultyColor(topic.difficulty), fontWeight: 700, background: "var(--bg-main)", padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}>
              {topic.difficulty}
            </span>
          </div>

          {/* Вкладки: Конспект / Частые ошибки / Вопрос / Что выведет код */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", background: "var(--bg-tertiary)", overflowX: "auto" }}>
            <button 
              onClick={() => setActiveTab("theory")}
              style={{
                background: "transparent",
                color: activeTab === "theory" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "theory" ? "2px solid var(--accent-orange)" : "none",
                padding: "10px 16px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              Конспект
            </button>
            <button 
              onClick={() => setActiveTab("gotchas")}
              style={{
                background: "transparent",
                color: activeTab === "gotchas" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "gotchas" ? "2px solid var(--accent-orange)" : "none",
                padding: "10px 16px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              Частые ошибки
            </button>
            <button 
              onClick={() => setActiveTab("quiz")}
              style={{
                background: "transparent",
                color: activeTab === "quiz" ? "var(--text-main)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "quiz" ? "2px solid var(--accent-orange)" : "none",
                padding: "10px 16px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              Тест темы
            </button>
            <button 
              onClick={() => setActiveTab("predict")}
              style={{
                background: "transparent",
                color: activeTab === "predict" ? "var(--accent-orange)" : "var(--text-muted)",
                border: "none",
                borderBottom: activeTab === "predict" ? "2px solid var(--accent-orange)" : "none",
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              ⚡ Что выведет код?
            </button>
          </div>

          {/* Содержимое вкладок */}
          <div style={{ padding: "24px", overflowY: "auto", flexGrow: 1 }}>
            
            {/* 1. КОНСПЕКТ */}
            {activeTab === "theory" && (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                    Синтаксическая конструкция
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

            {/* 2. ЧАСТЫЕ ОШИБКИ И НЮАНСЫ КОМПИЛЯТОРА */}
            {activeTab === "gotchas" && (
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "12px" }}>
                  Тонкости компилятора и грабли стандартов
                </div>
                <div style={{
                  background: "rgba(255, 161, 22, 0.05)",
                  borderLeft: "3px solid var(--accent-orange)",
                  padding: "16px 18px",
                  borderRadius: "0 6px 6px 0",
                  fontSize: "13px",
                  color: "#e6e6e6",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line"
                }}>
                  {challenge.gotchas || topic.notes}
                </div>
              </div>
            )}

            {/* 3. ВОПРОС ПО ТЕМЕ */}
            {activeTab === "quiz" && (
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "12px" }}>
                  Проверка понимания изученного материала
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "18px", lineHeight: "1.5" }}>
                  {challenge.quiz.question}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  {challenge.quiz.options.map((opt, idx) => {
                    const isSelected = selectedQuiz === idx;
                    let border = "1px solid var(--border-color)";
                    let bg = "var(--bg-main)";
                    let color = "var(--text-main)";

                    if (quizSubmitted) {
                      if (idx === challenge.quiz.correct) {
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
                        onClick={() => !quizSubmitted && setSelectedQuiz(idx)}
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
                    disabled={selectedQuiz === null}
                    onClick={() => setQuizSubmitted(true)}
                    style={{
                      background: selectedQuiz !== null ? "var(--accent-orange)" : "var(--bg-tertiary)",
                      color: selectedQuiz !== null ? "#121212" : "var(--text-muted)",
                      fontWeight: 700,
                      padding: "8px 18px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: selectedQuiz !== null ? "pointer" : "not-allowed"
                    }}
                  >
                    Проверить ответ
                  </button>
                ) : (
                  <div style={{ background: "var(--bg-main)", padding: "14px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: selectedQuiz === challenge.quiz.correct ? "var(--accent-green)" : "var(--accent-red)", marginBottom: "6px" }}>
                      {selectedQuiz === challenge.quiz.correct ? "✓ Ответ верный!" : "✕ Неверный ответ"}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      {challenge.quiz.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. ТРЕНАЖЁР "ЧТО ВЫВЕДЕТ КОД?" */}
            {activeTab === "predict" && (
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                  Пошаговый анализ компиляции:
                </div>

                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "var(--text-main)" }}>
                  {challenge.predict.title}
                </div>

                {/* Кодовый блок задачи */}
                <div style={{
                  background: "#101010",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  padding: "14px",
                  marginBottom: "16px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "#e0e0e0",
                  overflowX: "auto",
                  lineHeight: "1.5"
                }}>
                  <pre style={{ margin: 0 }}><code>{challenge.predict.code}</code></pre>
                </div>

                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--accent-orange)", marginBottom: "10px" }}>
                  Какой результат выдаст терминал (stdout)?
                </div>

                {/* Варианты вывода */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                  {challenge.predict.options.map((opt, idx) => {
                    const isSelected = selectedOutput === idx;
                    let border = "1px solid var(--border-color)";
                    let bg = "var(--bg-main)";
                    let color = "var(--text-main)";

                    if (outputSubmitted) {
                      if (idx === challenge.predict.correct) {
                        border = "1px solid var(--accent-green)";
                        bg = "rgba(44, 187, 93, 0.15)";
                        color = "var(--accent-green)";
                      } else if (isSelected) {
                        border = "1px solid var(--accent-red)";
                        bg = "rgba(239, 71, 67, 0.15)";
                        color = "var(--accent-red)";
                      }
                    } else if (isSelected) {
                      border = "1px solid var(--accent-orange)";
                      bg = "rgba(255, 161, 22, 0.1)";
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => !outputSubmitted && setSelectedOutput(idx)}
                        style={{
                          border,
                          background: bg,
                          color,
                          padding: "10px 14px",
                          borderRadius: "6px",
                          fontSize: "13px",
                          fontFamily: "var(--font-mono)",
                          textAlign: "center",
                          cursor: outputSubmitted ? "default" : "pointer"
                        }}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>

                {!outputSubmitted ? (
                  <button
                    disabled={selectedOutput === null}
                    onClick={() => setOutputSubmitted(true)}
                    style={{
                      background: selectedOutput !== null ? "var(--accent-orange)" : "var(--bg-tertiary)",
                      color: selectedOutput !== null ? "#121212" : "var(--text-muted)",
                      fontWeight: 700,
                      padding: "8px 18px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: selectedOutput !== null ? "pointer" : "not-allowed"
                    }}
                  >
                    Проверить вывод
                  </button>
                ) : (
                  <div style={{ background: "var(--bg-main)", padding: "14px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: selectedOutput === challenge.predict.correct ? "var(--accent-green)" : "var(--accent-red)", marginBottom: "6px" }}>
                      {selectedOutput === challenge.predict.correct ? "✓ Вывод угадан абсолютно верно!" : "✕ Неверный результат"}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      {challenge.predict.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Нижний подвал левой панели с кнопками перехода к темам */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-color)", background: "var(--bg-main)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {prevTopic ? (
              <button
                onClick={() => navigate(`/topic/${prevTopic.id}`)}
                style={{ background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "13px", cursor: "pointer", padding: 0 }}
              >
                ← {prevTopic.title}
              </button>
            ) : <div />}

            {nextTopic ? (
              <button
                onClick={() => navigate(`/topic/${nextTopic.id}`)}
                style={{
                  background: "var(--accent-orange)",
                  color: "#121212",
                  fontWeight: 700,
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer"
                }}
              >
                Следующая тема: {nextTopic.title} →
              </button>
            ) : (
              <button
                onClick={() => navigate("/topics")}
                style={{
                  background: "var(--accent-green)",
                  color: "#121212",
                  fontWeight: 700,
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer"
                }}
              >
                Все темы пройдены 🎉
              </button>
            )}
          </div>
        </div>

        {/* Правая панель: Справочный код C++ */}
        <div style={{ background: "#141414", border: "1px solid var(--border-color)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "var(--bg-secondary)", padding: "8px 16px", borderBottom: "1px solid var(--border-color)", fontSize: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4743" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffc01e" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2cbb5d" }} />
              <span style={{ color: "var(--text-muted)", marginLeft: "8px", fontFamily: "var(--font-mono)" }}>reference.cpp</span>
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