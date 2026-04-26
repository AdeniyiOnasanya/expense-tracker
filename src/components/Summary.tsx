import type { Transaction } from '../types/Transaction';

type Props = {
  transactions: Transaction[];
};

function fmt(n: number) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function Summary({ transactions }: Props) {
  const incomeEntries = transactions.filter(t => t.type === "income");
  const expenseEntries = transactions.filter(t => t.type === "expense");

  const totalIncome = incomeEntries.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseEntries.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Income received</h3>
        <p className="figure income-amount">
          <span className="currency">$</span>{fmt(totalIncome)}
        </p>
        <p className="change">{incomeEntries.length} entries posted</p>
      </div>
      <div className="summary-card">
        <h3>Expenses booked</h3>
        <p className="figure expense-amount">
          <span className="currency">$</span>{fmt(totalExpenses)}
        </p>
        <p className="change">{expenseEntries.length} entries posted</p>
      </div>
      <div className="summary-card">
        <h3>Net position</h3>
        <p className="figure balance-amount">
          <span className="currency">$</span>{fmt(balance)}
        </p>
        <p className="change">{balance >= 0 ? 'In the black' : 'In the red'}</p>
      </div>
    </div>
  );
}

export default Summary;
