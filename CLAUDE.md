# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — typecheck with `tsc -b` then build to `dist/`
- `npm run preview` — serve the built output
- `npm run lint` — ESLint over `.ts`/`.tsx` (flat config, `eslint.config.js`)
- `npx tsc -b` — typecheck only (no emit)

There is no test runner configured.

## Node version

Vite 7 requires Node **20.19+ or 22.12+**. On older Node, `vite` fails at startup with `TypeError: crypto.hash is not a function`. Use `nvm use 22` (or newer) before running `npm run dev`.

## Project nature

This is the starter for Adeniyi expense tracker (see README). It is **intentionally flawed**: the README calls out a deliberate bug, poor UI, and messy code that get fixed over the course. Treat the current state as a baseline to edit against — do not assume existing patterns are the intended end state, and do not do unsolicited cleanup sweeps.

## Architecture

React 19 + TypeScript app bootstrapped with Vite + `@vitejs/plugin-react`. TS config is split: `tsconfig.app.json` for `src/`, `tsconfig.node.json` for `vite.config.ts`, root `tsconfig.json` references both.

- `src/main.tsx` — mounts `<App />` in `StrictMode`.
- `src/App.tsx` — owns the `transactions` state (seeded list) and `handleAdd`; composes the three child components. No router, no data layer, no persistence (refresh resets to the seed list).
- `src/components/Summary.tsx` — takes `transactions`, derives income/expenses/balance.
- `src/components/AddTransactionForm.tsx` — owns its own form state; calls `onAdd(transaction)` on submit.
- `src/components/Transactions.tsx` — owns its filter state; renders the filtered table.
- `src/types/` — one type per file: `Transaction.ts`, `TransactionType.ts`, `FilterType.ts`.
- `src/vite-env.d.ts` — Vite client type references (needed for CSS side-effect imports under strict TS).
- `src/App.css` / `src/index.css` — styling.

Transactions are shaped `{ id, description, amount, type: "income"|"expense", category, date }` with `category` drawn from a hardcoded list in `App.jsx`.
