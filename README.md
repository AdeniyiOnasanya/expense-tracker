# The Ledger — Expense Tracker

A personal expense tracker built with React 19, TypeScript, and Vite, styled as a broadsheet-style "Ledger" you can keep alongside your day. Add income and expense entries, see income / expenses / balance at a glance, and view spending by category as a bar chart.

This started as a course exercise that was intentionally rough around the edges (a deliberate bug, plain UI, messy code) and is being refined into a polished single-page app.

## Features

- Add income and expense entries with description, amount, category, and date
- Running summary of total income, total expenses, and current balance
- Filter the ledger by type (all / income / expense)
- Spending-by-category bar chart powered by Recharts
- Delete an entry with a confirmation prompt
- Editorial "broadsheet" styling with a `prefers-reduced-motion` fallback

## Tech Stack

- React 19 + TypeScript
- Vite 7 (with `@vitejs/plugin-react`)
- Recharts for the category chart
- ESLint 9 (flat config) for linting

## Requirements

- **Node 20.19+ or 22.12+** — Vite 7 will fail at startup on older Node with `TypeError: crypto.hash is not a function`.

If you use `nvm`:

```bash
nvm use 22
```

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Scripts

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR                |
| `npm run build`   | Typecheck (`tsc -b`) and build to `dist/`         |
| `npm run preview` | Serve the production build locally                |
| `npm run lint`    | Run ESLint over `.ts` / `.tsx` files              |
| `npx tsc -b`      | Typecheck only, no emit                           |

## Project Structure

```
src/
  App.tsx                          owns transactions state + composes the page
  main.tsx                         mounts <App /> in StrictMode
  components/
    Summary.tsx                    income / expenses / balance totals
    SpendingByCategoryChart.tsx    Recharts bar chart of expenses by category
    AddTransactionForm.tsx         entry form (own form state)
    Transactions.tsx               filterable table with delete action
  types/
    Transaction.ts                 shape of a ledger entry
    TransactionType.ts             "income" | "expense"
    FilterType.ts                  "all" | "income" | "expense"
  App.css, index.css               styling
```

State lives in `App.tsx` — there is no router, data layer, or persistence, so a refresh resets to the seed list.

## Notes

- A `Transaction` is shaped `{ id, description, amount, type, category, date }` with `category` drawn from a hardcoded list in `App.tsx`.
- There is no test runner configured.
