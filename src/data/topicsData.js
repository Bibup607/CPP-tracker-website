export const TOPICS = [
  // БЛОК 1: Базовый C++ и память
  {
    id: "variables-types",
    title: "1. Переменные и типы данных",
    category: "Основы",
    difficulty: "Easy",
    syntax: "int, double, char, bool, auto, const, sizeof()",
    theory: "C++ — статически типизированный компилируемый язык. Каждая переменная имеет фиксированный тип и размер в байтах. Инициализация через список значений (uniform initialization `int x{0};`) защищает от сужающих преобразований (narrowing).",
    notes: "Используйте `auto` для длинных типов. Для целочисленных значений с фиксированным размером применяйте `<cstdint>` (`int32_t`, `int64_t`).",
    code: `#include <iostream>
#include <cstdint>

int main() {
    int32_t count = 42;
    double ratio = 3.1415;
    const char grade = 'A';
    auto flag = true;

    std::cout << "Размер count: " << sizeof(count) << " байт\\n";
    return 0;
}`
  },
  {
    id: "conditions",
    title: "2. Условные конструкции",
    category: "Основы",
    difficulty: "Easy",
    syntax: "if, else if, else, switch, case, default, break, ? :",
    theory: "Операторы ветвления выполняют блоки кода на основе булевых выражений. Оператор `switch` проверяет целочисленные константы или enum и требует `break` для предотвращения проваливания (fallthrough).",
    notes: "В C++17 появилась инициализация внутри if: `if (auto val = calculate(); val > 0) { ... }`.",
    code: `#include <iostream>

int main() {
    int code = 200;

    if (code == 200) {
        std::cout << "OK\\n";
    } else if (code == 404) {
        std::cout << "Not Found\\n";
    }

    switch (code) {
        case 200: std::cout << "Success\\n"; break;
        default:  std::cout << "Unknown\\n"; break;
    }
    return 0;
}`
  },
  {
    id: "loops",
    title: "3. Циклы",
    category: "Основы",
    difficulty: "Easy",
    syntax: "for, while, do while, range-based for, break, continue",
    theory: "Циклы позволяют многократно выполнять инструкции. Range-based for (`for (const auto& item : arr)`) — стандартный способ обхода коллекций без ручной работы с индексами.",
    notes: "Избегайте копирования тяжёлых объектов в range-based циклах — всегда передавайте по константной ссылке `const auto&`.",
    code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {10, 20, 30};

    // Range-based for loop
    for (const auto& num : nums) {
        std::cout << num << " ";
    }
    return 0;
}`
  },
  {
    id: "arrays",
    title: "4. Статические массивы",
    category: "Основы",
    difficulty: "Easy",
    syntax: "int arr[N]; std::array<T, N>",
    theory: "Встроенные C-style массивы имеют фиксированный размер в стеке и не знают своей длины при передаче в функцию. Современной альтернативой является шаблон `std::array` из `<array>`.",
    notes: "C-массивы неявно преобразуются в указатель (decay to pointer). Всегда предпочитайте `std::array`.",
    code: `#include <iostream>
#include <array>

int main() {
    std::array<int, 4> modernArr = {1, 2, 3, 4};
    std::cout << "Размер: " << modernArr.size() << "\\n";
    std::cout << "Первый элемент: " << modernArr.front() << "\\n";
    return 0;
}`
  },
  {
    id: "dynamic-arrays",
    title: "5. Динамический массив",
    category: "Память",
    difficulty: "Medium",
    syntax: "new[], delete[], std::vector<T>",
    theory: "Динамическая память выделяется в куче (heap) через `new[]` и освобождается вручную через `delete[]`. При отсутствии `delete[]` возникает утечка памяти (memory leak).",
    notes: "В production-коде всегда используется `std::vector`, реализующий паттерн RAII.",
    code: `#include <iostream>

int main() {
    int size = 5;
    int* rawArr = new int[size]{1, 2, 3, 4, 5};

    std::cout << "Значение [2]: " << rawArr[2] << "\\n";

    delete[] rawArr; // Обязательное освобождение памяти
    rawArr = nullptr;
    return 0;
}`
  },
  {
    id: "strings",
    title: "6. Строки",
    category: "Основы",
    difficulty: "Easy",
    syntax: "std::string, .length(), .substr(), .c_str(), std::string_view",
    theory: "`std::string` — класс-контейнер для динамических символьных массивов. Управляет памятью самостоятельно и предоставляет методы конкатенации, поиска и модификации.",
    notes: "Для передачи строк только на чтение без аллокаций используйте `std::string_view` (C++17).",
    code: `#include <iostream>
#include <string>

int main() {
    std::string s = "Hello, C++";
    s += " Tracker";
    std::cout << s << " | Длина: " << s.length() << "\\n";
    return 0;
}`
  },
  {
    id: "functions",
    title: "7. Функции",
    category: "Функции",
    difficulty: "Easy",
    syntax: "return_type name(params); inline, constexpr",
    theory: "Функции инкапсулируют переиспользуемые алгоритмические блоки. Параметры могут передаваться по значению (копия), по ссылке `&` или по константной ссылке `const &`.",
    notes: "Передавайте базовые типы (`int`, `double`) по значению, а структуры и классы — по `const &`.",
    code: `#include <iostream>

void modifyByRef(int& value) {
    value *= 2;
}

int main() {
    int x = 20;
    modifyByRef(x);
    std::cout << "Результат: " << x << "\\n"; // 40
    return 0;
}`
  },
  {
    id: "func-overloading",
    title: "8. Перегрузка функций",
    category: "Функции",
    difficulty: "Easy",
    syntax: "void print(int); void print(double);",
    theory: "Возможность объявления нескольких функций с одинаковым именем, но разной сигнатурой (количеством или типами параметров). Выбор функции происходит на этапе компиляции.",
    notes: "Перегрузка только по возвращаемому значению в C++ запрещена.",
    code: `#include <iostream>

void print(int a) {
    std::cout << "Целое: " << a << "\\n";
}

void print(double a) {
    std::cout << "Дробное: " << a << "\\n";
}

int main() {
    print(10);
    print(3.14);
    return 0;
}`
  },
  {
    id: "pointers-vars",
    title: "9. Указатели и переменные",
    category: "Память",
    difficulty: "Medium",
    syntax: "int* ptr = &var; *ptr = 10; nullptr",
    theory: "Указатель — переменная, значением которой является прямой адрес ячейки в оперативной памяти. Оператор `&` берет адрес, оператор `*` разыменовывает указатель.",
    notes: "Никогда не разыменовывайте `nullptr` или неинициализированный указатель (wild pointer) — это приводит к Undefined Behavior (UB).",
    code: `#include <iostream>

int main() {
    int target = 100;
    int* p = &target;

    std::cout << "Адрес в RAM: " << p << "\\n";
    std::cout << "Значение: " << *p << "\\n";

    *p = 200;
    std::cout << "Новое target: " << target << "\\n";
    return 0;
}`
  },
  {
    id: "files-io",
    title: "10. Работа с файлами",
    category: "Файлы",
    difficulty: "Medium",
    syntax: "std::ifstream, std::ofstream, std::fstream, .is_open(), .close()",
    theory: "Библиотека `<fstream>` предоставляет классы для потокового чтения (`ifstream`) и записи (`ofstream`) файлов на диске.",
    notes: "Деструктор потока закрывает файл автоматически, но проверять `.is_open()` перед чтением/записью строго обязательно.",
    code: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ofstream outFile("log.txt");
    if (outFile.is_open()) {
        outFile << "C++ Tracker Initialized\\n";
        outFile.close();
    }
    return 0;
}`
  },
  {
    id: "structs",
    title: "11. Структуры данных",
    category: "Основы",
    difficulty: "Easy",
    syntax: "struct Name { int field; };",
    theory: "Пользовательский тип, объединяющий логически связанные переменные. В C++ структура почти идентична классу, но все члены по умолчанию имеют доступ `public`.",
    notes: "Используйте `struct` для простых DTO (Data Transfer Objects), не требующих сложной инвариантной логики.",
    code: `#include <iostream>

struct Point {
    int x;
    int y;
};

int main() {
    Point p{10, 25};
    std::cout << "Point: (" << p.x << ", " << p.y << ")\\n";
    return 0;
}`
  },
  {
    id: "enums",
    title: "12. Перечисления (Enum & Enum Class)",
    category: "Основы",
    difficulty: "Easy",
    syntax: "enum class State { Idle, Running, Stopped };",
    theory: "Scoped enums (`enum class`) предотвращают загрязнение глобальной области видимости и запрещают неявное приведение к `int`.",
    notes: "Всегда выбирайте `enum class`, а не классический нетипизированный `enum`.",
    code: `#include <iostream>

enum class Status {
    Pending,
    Approved,
    Rejected
};

int main() {
    Status task = Status::Approved;
    if (task == Status::Approved) {
        std::cout << "Задача утверждена!\\n";
    }
    return 0;
}`
  },
  {
    id: "exceptions",
    title: "13. Исключения",
    category: "Основы",
    difficulty: "Medium",
    syntax: "try, catch, throw, std::runtime_error, noexcept",
    theory: "Механизм обработки ошибок во время выполнения программы. Блок `try` оборачивает критический код, `throw` выбрасывает исключение, `catch` перехватывает его по ссылке.",
    notes: "Никогда не выбрасывайте исключения из деструкторов — это вызовет `std::terminate`.",
    code: `#include <iostream>
#include <stdexcept>

void testAge(int age) {
    if (age < 0) throw std::invalid_argument("Возраст не может быть < 0");
}

int main() {
    try {
        testAge(-5);
    } catch (const std::exception& e) {
        std::cerr << "Перехвачено: " << e.what() << "\\n";
    }
    return 0;
}`
  },
  {
    id: "inline-functions",
    title: "14. Встроенные функции (inline & lambda)",
    category: "Функции",
    difficulty: "Medium",
    syntax: "inline, constexpr, [capture](params) -> ret { body }",
    theory: "Ключевое слово `inline` предлагает компилятору подставить тело функции непосредственно в место вызова, устраняя накладные расходы на стековый фрейм.",
    notes: "Лямбда-выражения позволяют создавать анонимные функции прямо внутри выражений.",
    code: `#include <iostream>

inline int square(int x) { return x * x; }

int main() {
    auto multiply = [](int a, int b) { return a * b; };
    std::cout << "Квадрат: " << square(6) << "\\n";
    std::cout << "Лямбда: " << multiply(4, 5) << "\\n";
    return 0;
}`
  },
  {
    id: "header-files",
    title: "15. Разделение по файлам",
    category: "Архитектура",
    difficulty: "Medium",
    syntax: "#pragma once, #include \"header.h\"",
    theory: "Двухфазная структура проекта: декларации объявляются в заголовочных файлах (`.h`/`.hpp`), а реализации — в исходных файлах (`.cpp`). Директива `#pragma once` предотвращает повторное включение заголовка.",
    notes: "Никогда не объявляйте переменные или невстроенные тела функций в `.h` файлах (нарушение правила One Definition Rule).",
    code: `// MathUtils.h
#pragma once

namespace Math {
    int add(int a, int b);
}

// MathUtils.cpp
#include "MathUtils.h"

namespace Math {
    int add(int a, int b) { return a + b; }
}`
  },

  // БЛОК 2: Объектно-ориентированное программирование (ООП)
  {
    id: "oop-classes-objects",
    title: "16. Создание классов и объектов ООП",
    category: "ООП",
    difficulty: "Easy",
    syntax: "class MyClass { private: ... public: ... };",
    theory: "Класс — шаблон для создания объектов, инкапсулирующий данные-члены (поля) и функции-члены (методы). Модификаторы доступа `private`, `protected`, `public` регулируют видимость компонентов.",
    notes: "По умолчанию все поля класса закрыты (`private`).",
    code: `#include <iostream>

class Player {
private:
    int health{100};
public:
    void takeDamage(int amount) {
        health -= amount;
        std::cout << "Осталось HP: " << health << "\\n";
    }
};

int main() {
    Player warrior;
    warrior.takeDamage(20);
    return 0;
}`
  },
  {
    id: "oop-constructors",
    title: "17. Конструкторы, деструкторы и указатель this",
    category: "ООП",
    difficulty: "Medium",
    syntax: "MyClass(); ~MyClass(); this->field;",
    theory: "Конструктор вызывается при инстанцировании объекта. Список инициализации членов (`: member(val)`) инициализирует поля до выполнения тела конструктора. Деструктор освобождает ресурсы при уничтожении объекта.",
    notes: "Указатель `this` хранит адрес текущего экземпляра объекта.",
    code: `#include <iostream>

class Vector2D {
private:
    int x, y;
public:
    Vector2D(int x, int y) : x(x), y(y) {
        std::cout << "Создан: (" << this->x << ", " << this->y << ")\\n";
    }
    ~Vector2D() {
        std::cout << "Уничтожен вектор\\n";
    }
};

int main() {
    Vector2D v(5, 10);
    return 0;
}`
  },
  {
    id: "oop-friend-functions",
    title: "18. Дружественные функции ООП",
    category: "ООП",
    difficulty: "Medium",
    syntax: "friend void inspect(const MyClass&);",
    theory: "Функция, объявленная с ключевым словом `friend` внутри класса, не является методом класса, но имеет доступ к его `private` и `protected` членам.",
    notes: "Дружба не симметрична и не наследуется. Применяйте умеренно, чтобы не нарушать инкапсуляцию.",
    code: `#include <iostream>

class BankAccount {
private:
    double balance{5000.0};
    friend void auditor(const BankAccount& acc);
};

void auditor(const BankAccount& acc) {
    std::cout << "Баланс через friend: " << acc.balance << "\\n";
}

int main() {
    BankAccount myAcc;
    auditor(myAcc);
    return 0;
}`
  },
  {
    id: "oop-friend-classes",
    title: "19. Дружественные классы ООП",
    category: "ООП",
    difficulty: "Medium",
    syntax: "friend class Inspector;",
    theory: "Объявление одного класса другом другого предоставляет всем его методам прямой доступ к приватным данным целевого класса.",
    notes: "Часто применяется для фабрик (Factory) или связки итератора и контейнера.",
    code: `#include <iostream>

class Engine {
private:
    int rpm{3000};
    friend class Diagnostics;
};

class Diagnostics {
public:
    void printStatus(const Engine& e) {
        std::cout << "RPM: " << e.rpm << "\\n";
    }
};

int main() {
    Engine eng;
    Diagnostics diag;
    diag.printStatus(eng);
    return 0;
}`
  },
  {
    id: "oop-inheritance",
    title: "20. Наследование классов ООП",
    category: "ООП",
    difficulty: "Medium",
    syntax: "class Derived : public Base { ... };",
    theory: "Механизм создания производных классов на основе базовых с повторным использованием кода. Спецификатор `protected` делает члены доступными внутри производных классов, но закрытыми для внешнего кода.",
    notes: "Публичное наследование выражает отношение 'является' (IS-A). Всегда делайте деструктор базового класса виртуальным.",
    code: `#include <iostream>

class Entity {
public:
    void spawn() { std::cout << "Сущность заспавнена\\n"; }
};

class Monster : public Entity {
public:
    void roar() { std::cout << "Рычание!\\n"; }
};

int main() {
    Monster orc;
    orc.spawn();
    orc.roar();
    return 0;
}`
  },
  {
    id: "oop-function-templates",
    title: "21. Шаблоны функций ООП",
    category: "Шаблоны",
    difficulty: "Medium",
    syntax: "template <typename T> T getMax(T a, T b);",
    theory: "Обобщённое программирование (Generic Programming). Компилятор генерирует конкретную версию функции под каждый подставляемый тип (инстанцирование).",
    notes: "Шаблоны компилируются во время сборки и должны находиться в заголовочных файлах.",
    code: `#include <iostream>

template <typename T>
T getMaximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << getMaximum<int>(10, 20) << "\\n";
    std::cout << getMaximum<double>(3.14, 2.71) << "\\n";
    return 0;
}`
  },
  {
    id: "oop-class-templates",
    title: "22. Шаблоны классов ООП",
    category: "Шаблоны",
    difficulty: "Hard",
    syntax: "template <typename T> class Box { T content; };",
    theory: "Позволяет создавать параметризуемые структуры и классы данных (контейнеры), работающие с произвольными типами данных без потери строгой типизации.",
    notes: "Пример стандартных шаблонов классов — `std::vector<T>` и `std::map<K, V>`.",
    code: `#include <iostream>

template <typename T>
class Storage {
private:
    T item;
public:
    Storage(T val) : item(val) {}
    T get() const { return item; }
};

int main() {
    Storage<std::string> wordStorage("LeetCode C++");
    std::cout << wordStorage.get() << "\\n";
    return 0;
}`
  },
  {
    id: "oop-polymorphism-virtual",
    title: "23. Полиморфизм и виртуальные функции",
    category: "ООП",
    difficulty: "Hard",
    syntax: "virtual void action(); override;",
    theory: "Динамический (runtime) полиморфизм. Вызов метода объекта через указатель на базовый класс перенаправляется на реализацию в производном классе с помощью таблицы виртуальных методов (vtable).",
    notes: "Всегда помечайте переопределяемые методы спецификатором `override` для контроля сигнатур компилятором.",
    code: `#include <iostream>

class Animal {
public:
    virtual void speak() const { std::cout << "Звук\\n"; }
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Гав-гав!\\n"; }
};

int main() {
    Animal* pet = new Dog();
    pet->speak(); // Выведет "Гав-гав!"
    delete pet;
    return 0;
}`
  },
  {
    id: "oop-abstract-classes",
    title: "24. Абстрактные классы и чистые виртуальные функции",
    category: "ООП",
    difficulty: "Hard",
    syntax: "virtual void render() = 0;",
    theory: "Класс, содержащий хотя бы одну чистую виртуальную функцию (`pure virtual function`, обозначается `= 0`), является абстрактным и не может быть инстанцирован напрямую. Служит интерфейсом.",
    notes: "Производный класс обязан переопределить все чистые виртуальные функции, иначе он сам станет абстрактным.",
    code: `#include <iostream>

class IDevice {
public:
    virtual void turnOn() = 0; // Чистая виртуальная функция
    virtual ~IDevice() = default;
};

class Monitor : public IDevice {
public:
    void turnOn() override {
        std::cout << "Монитор включен: подсветка активна\\n";
    }
};

int main() {
    Monitor m;
    m.turnOn();
    return 0;
}`
  }
];