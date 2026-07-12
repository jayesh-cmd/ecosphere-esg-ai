import React from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function CarbonTransactions() {
  const { carbonTransactions } = useGlobalState();
  const data = [...carbonTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="card">
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Carbon Transactions</h3>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{data.length} entries this period</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Department', 'Source', 'Date', 'Amount (kg CO₂)'].map(h => (
                <th
                  key={h}
                  className={`py-3 text-xs font-medium ${h === 'Amount (kg CO₂)' ? 'text-right pr-6' : 'text-left px-6'}`}
                  style={{ color: '#9ca3af', letterSpacing: '0.04em' }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const pos = row.amount > 0;
              return (
                <tr
                  key={row.id}
                  className="tr-hover"
                  style={{ borderBottom: i < data.length - 1 ? '1px solid #f9fafb' : 'none' }}
                >
                  <td className="px-6 py-3 font-medium text-sm" style={{ color: '#111827' }}>{row.department}</td>
                  <td className="px-6 py-3 text-sm" style={{ color: '#6b7280' }}>{row.source}</td>
                  <td className="px-6 py-3 text-xs" style={{ color: '#9ca3af' }}>{row.date}</td>
                  <td className="pr-6 py-3 text-right">
                    <span
                      className="flex items-center justify-end gap-1 text-sm font-medium"
                      style={{ color: pos ? '#16a34a' : '#dc2626' }}
                    >
                      {pos ? <ArrowUpRight size={14} strokeWidth={2} /> : <ArrowDownRight size={14} strokeWidth={2} />}
                      {pos ? '+' : ''}{row.amount}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
