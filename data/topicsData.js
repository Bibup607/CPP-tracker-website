export const TOPICS = [
  {
    id: "cpp-basics",
    title: "Базовый синтаксис, переменные и ввод/вывод",
    difficulty: "Easy",
    category: "Основы",
    syntaxSummary: "std::cin, std::cout, int, double, char, bool, void",
    codeSample: `#include <iostream>

int main() {
    int count = 10;
    double price = 99.99;
    std::cout << "Элементов: " << count << "\\n";
    std::cout << "Цена: " << price << "\\n";
    return 0;
}`,
    theory: "C++ — строго типизированный компилируемый язык. Ввод и вывод осуществляются через потоки библиотеки iostream с помощью операторов << и >>."
  },
  {
    id: "pointers-references",
    title: "Указатели и Ссылки (Pointers & Refs)",
    difficulty: "Medium",
    category: "Память",
    syntaxSummary: "int* p = &x; int& ref = x; nullptr",
    codeSample: `#include <iostream>

void increment(int* ptr) {
    if (ptr != nullptr) {
        (*ptr)++;
    }
}

int main() {
    int value = 41;
    increment(&value);
    std::cout << "Результат: " << value << "\\n";
    return 0;
}`,
    theory: "Указатель хранит адрес ячейки оперативной памяти. Ссылка — неизменяемый псевдоним уже существующей переменной."
  },
  {
    id: "classes-oop",
    title: "Классы, структуры и модификаторы доступа",
    difficulty: "Medium",
    category: "ООП",
    syntaxSummary: "class Node { private: int val; public: Node(int v); };",
    codeSample: `#include <iostream>

class Solution {
private:
    int answer;
public:
    Solution(int init) : answer(init) {}
    int getAnswer() const { return answer; }
};

int main() {
    Solution s(100);
    std::cout << s.getAnswer();
    return 0;
}`,
    theory: "По умолчанию поля в struct имеют видимость public, а в class — private. Инкапсуляция позволяет защищать внутреннее состояние объекта."
  },
  {
    id: "stl-vectors",
    title: "Динамические массивы: std::vector",
    difficulty: "Easy",
    category: "STL",
    syntaxSummary: "std::vector<int> v; v.push_back(10); v.size();",
    codeSample: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4};
    numbers.push_back(5);
    for (int num : numbers) {
        std::cout << num << " ";
    }
    return 0;
}`,
    theory: "std::vector — стандартный динамический массив, автоматически управляющий памятью в куче при изменении размера."
  },
  {
    id: "smart-pointers",
    title: "Умные указатели: std::unique_ptr и RAII",
    difficulty: "Hard",
    category: "Память",
    syntaxSummary: "std::unique_ptr<T> p = std::make_unique<T>();",
    codeSample: `#include <iostream>
#include <memory>

struct Buffer {
    Buffer() { std::cout << "Память выделена\\n"; }
    ~Buffer() { std::cout << "Память освобождена\\n"; }
};

int main() {
    std::unique_ptr<Buffer> buf = std::make_unique<Buffer>();
    return 0;
}`,
    theory: "RAII (Resource Acquisition Is Initialization) связывает жизненный цикл системных ресурсов с областью видимости объектов C++."
  }
];
