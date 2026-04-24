# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built output
- `npm run lint` — ESLint over the repo (flat config, `eslint.config.js`)

There is no test runner configured.

## Node version

Vite 7 requires Node **20.19+ or 22.12+**. On older Node, `vite` fails at startup with `TypeError: crypto.hash is not a function`. Use `nvm use 22` (or newer) before running `npm run dev`.

## Project nature

This is the starter for Adeniyi expense tracker (see README). It is **intentionally flawed**: the README calls out a deliberate bug, poor UI, and messy code that get fixed over the course. Treat the current state as a baseline to edit against — do not assume existing patterns are the intended end state, and do not do unsolicited cleanup sweeps.

## Architecture

Single-component React 19 app bootstrapped with Vite + `@vitejs/plugin-react`.

- `src/main.jsx` — mounts `<App />` in `StrictMode`.
- `src/App.jsx` — the entire application: transaction list (seeded in `useState`), add-transaction form, type/category filters, and income/expense/balance summary. All state, derived values, and handlers live in this one component; there is no router, no data layer, and no persistence (refresh resets to the seed list).
- `src/App.css` / `src/index.css` — styling.

Transactions are shaped `{ id, description, amount, type: "income"|"expense", category, date }` with `category` drawn from a hardcoded list in `App.jsx`.
