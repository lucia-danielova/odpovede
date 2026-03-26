# Technické zadanie - Fullstack Developer

Tento projekt predstavuje vypracovanie technického zadania. Riešenie je zamerané na čistotu kódu, dodržiavanie SOLID princípov, optimalizáciu výkonu a používateľskú skúsenosť (UX).

## 🚀 Obsah projektu

Projekt je rozdelený do troch hlavných častí podľa požiadaviek zadania:

1.  **Algoritmická úloha (FizzBuzz Variant):**
    * Implementácia logiky s prioritou najprísnejšej podmienky (deliteľnosť 15).
    * Interaktívna verzia na frontende s okamžitou odozvou.
2.  **Databázová úloha (Duplicity):**
    * SQL dopyt využívajúci klauzulu `HAVING` a poddotaz.
    * Navrhnutá stratégia pre prácu s veľkými dátami (1M+ záznamov) vrátane indexácie a dávkového spracovania.
3.  **PHP & ARES API:**
    * Backendový bridge (`ares.php`) zabezpečujúci komunikáciu s českým registrom.
    * Ukážka objektovo orientovaného návrhu (Interface, DTO, Readonly classes) v súlade so SOLID princípmi.

## 🛠️ Použité technológie

* **Frontend:** HTML5, CSS3 (Custom Variables, Dark Mode), JavaScript (ES6+, Module Pattern).
* **Backend:** PHP 8.1+ (Strict types, Error handling).
* **Analytika:** Google Analytics 4 (GA4) pre sledovanie interakcií.

## 📂 Štruktúra súborov

```text
/
├── index.html      # Hlavné používateľské rozhranie
├── style.css       # Kompletný dizajn systém a štýly (vrátane Dark Mode)
├── script.js       # Aplikačná logika a komunikácia s API
├── ares.php        # Backendový skript pre prácu s ARES API
└── README.md       # Dokumentácia k projektu