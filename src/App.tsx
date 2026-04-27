import { useState } from 'react'
import './App.css'
import Summary from './components/Summary'
import SpendingByCategoryChart from './components/SpendingByCategoryChart'
import AddTransactionForm from './components/AddTransactionForm'
import Transactions from './components/Transactions'
import type { Transaction } from './types/Transaction'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function formatIssueDate(d: Date) {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const handleAdd = (newTransaction: Transaction) => {
    setTransactions(prev => [...prev, newTransaction]);
  };

  const handleDelete = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const today = new Date();
  const issueNo = String(dayOfYear(today)).padStart(3, '0');

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-meta">
          <strong>Issue №{issueNo}</strong>
          Vol. {today.getFullYear()} · Personal Edition
        </div>
        <h1>The <em>Ledger</em></h1>
        <div className="masthead-meta masthead-meta--right">
          <strong>{formatIssueDate(today)}</strong>
          A private record of in &amp; out
        </div>
      </header>
      <div className="masthead-rule" />

      <section>
        <div className="eyebrow">At a glance</div>
        <Summary transactions={transactions} />
      </section>

      <section>
        <div className="eyebrow">Distribution by category</div>
        <SpendingByCategoryChart transactions={transactions} />
      </section>

      <section>
        <div className="eyebrow">Compose entry</div>
        <AddTransactionForm categories={categories} onAdd={handleAdd} />
      </section>

      <section>
        <div className="eyebrow">The ledger</div>
        <Transactions
          transactions={transactions}
          categories={categories}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}

export default App
