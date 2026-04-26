import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../types/Transaction';

type Props = {
  transactions: Transaction[];
};

const COLORS = ['#b8341a', '#3a5a40', '#c08a3e', '#6b4423', '#2e4053', '#8b3a62', '#5a5048'];

function SpendingByCategoryChart({ transactions }: Props) {
  const totalsByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totalsByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return null;

  return (
    <div className="chart">
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 4" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={12} />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              cursor={{ fill: 'rgba(28,24,22,0.06)' }}
              contentStyle={{
                background: '#1c1816',
                border: 'none',
                borderRadius: 0,
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#f1ebdd',
                padding: '10px 14px',
                boxShadow: '0 8px 24px rgba(28,24,22,0.2)',
              }}
              itemStyle={{ color: '#f1ebdd' }}
              labelStyle={{ color: '#f1ebdd', marginBottom: 4 }}
              formatter={(value) => [`$${value}`, 'Amount']}
            />
            <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={56}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SpendingByCategoryChart;
