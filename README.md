# Crown Tower Spell Damage Simulator

#### Video Demo: `<YOUR_VIDEO_URL_HERE>`

## Description

The Crown Tower Spell Damage Simulator is a lightweight, responsive web application tailored for Clash Royale players who want to quickly calculate the combined damage of up to four spells at two different levels (11 and 15) and drill spell damage values through interactive flashcards. Built entirely with HTML5, Tailwind CSS, and vanilla JavaScript, it requires no build tools or backend—just a static file server.

---

## Motivation

During practice sessions or deck-building, manually summing up spell damage can be tedious and error-prone, especially when switching between tournament-standard levels. I wanted a tool that would:

1. **Automate** the damage calculation for common spells.
2. **Prevent mistakes** by disabling invalid or duplicate selections.
3. **Reinforce learning** by offering flashcards to memorize individual spell damages.
4. **Offer a polished UI/UX** with theme toggles, blurred backgrounds, and responsive layouts.

---

## Features

- **Level Toggle**
  A custom segmented-control built from four SVG assets (light/dark × level 11/15) lets users switch levels with a single click. The damage values, dropdown icons, and results update instantly.

- **Deck Import**
  Paste a Clash Royale deck URL (with a `?deck=` query parameter) to auto-populate available spells. Only recognized spells appear; invalid IDs are ignored.

- **Smart Selectors**
  Four dropdowns generate dynamically. They disable options already chosen, enforce “one Void variant only,” and prevent conflicting Zap/Evo Zap selections.

- **Damage Calculation**
  A “Calculate Total Damage” button sums the damage values of the selected spells at the current level and displays the result in a large, centered banner.

- **Flashcards**
  Two standalone pages (`flashcards.html` for level 11 and `flashcards-15.html` for level 15) present flip-card quizzes. Click or tap a card to see the damage, then “Next Card” to cycle.

- **Theme Toggle**
  Light/dark mode can be toggled from any page. The choice persists per session via CSS-only class toggling and smooth SVG icon transitions.

- **Footer Reveal on Scroll**
  A footer with attribution and a Twitter link sits hidden below the fold. It becomes visible only after scrolling past the main content.

- **Responsive & Accessible**
  Tailwind’s utility-first approach ensures the UI looks consistent across desktop and mobile. All interactive elements have focus rings, appropriate `alt` texts, and sufficient contrast ratios.

---

## Project Structure
project/
├─ css/
│  ├─ input.css
│  └─ styles.css
├─ fetchSpells.js
├─ flashcards.html
├─ flashcards-15.html
├─ index.html
├─ inspectCard.js
├─ js/
│  ├─ app.js
│  ├─ flashcards.js
│  ├─ flashcards-15.js
│  ├─ spellData.json
│  └─ theme-toggle.js
├─ img/
│  ├─ bg/
│  │  └─ cr-background.png
│  ├─ icons/
│  │  └─ x.svg
│  ├─ segmented/
│  │  ├─ segmented-dark-11.svg
│  │  ├─ segmented-dark-15.svg
│  │  ├─ segmented-light-11.svg
│  │  └─ segmented-light-15.svg
│  ├─ spells/
│  │  ├─ arrows.png
│  │  ├─ earthquake.png
│  │  ├─ fireball.png
│  │  ├─ freeze.png
│  │  ├─ giant_snowball.png
│  │  ├─ goblin_curse.png
│  │  ├─ lightning.png
│  │  ├─ poison.png
│  │  ├─ rage.png
│  │  ├─ log.png
│  │  ├─ tornado.png
│  │  ├─ void.png
│  │  ├─ zap.png
│  │  └─ evo_zap.png
│  ├─ toggles/
│  │  ├─ light-toggle.svg
│  │  └─ dark-toggle.svg
│  └─ ui/
│     └─ dropdown-inactive.svg
├─ node_modules/
├─ package.json
├─ package-lock.json
└─ README.md

---

## AI Usage

This project benefited from AI assistance in the following ways:

- **UI/UX Design Iterations**
  I leveraged ChatGPT to brainstorm and refine the visual layout, spacing, and interaction patterns (e.g. the glass-style card, drop-down styling, segmented controls).

- **Code Snippets & Refactoring**
  ChatGPT helped generate, update, and refactor HTML, CSS (Tailwind), and JavaScript snippets—particularly for the theme toggle, responsive centering logic, and dynamic SVG-based level switch.

- **Feature Planning & Troubleshooting**
  Throughout development, I consulted the AI to outline implementation steps (e.g. adding a reset button, scroll-triggered footer) and debug layout/scroll issues in a rapid, conversational manner.


All AI-generated guidance was reviewed, adapted, and integrated by me to fit the project’s goals and coding style.
