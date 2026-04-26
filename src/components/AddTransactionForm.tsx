import { useState } from 'react';
import type { FormEventHandler } from 'react';
import type { Transaction } from '../types/Transaction';
import type { TransactionType } from '../types/TransactionType';

type Props = {
  categories: string[];
  onAdd: (transaction: Transaction) => void;
};

function AddTransactionForm({ categories, onAdd }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <form className="compose" onSubmit={handleSubmit}>
        <div className="field">
          <label className="field-label" htmlFor="t-desc">Particulars</label>
          <input
            id="t-desc"
            type="text"
            placeholder="e.g. Espresso at the corner café"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="t-amt">Amount</label>
          <input
            id="t-amt"
            className="figure-input"
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="t-type">Ledger</label>
          <select
            id="t-type"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="t-cat">Account</label>
          <select
            id="t-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit">Post entry</button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
